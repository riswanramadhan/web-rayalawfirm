'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';
import HoldDialog from '@/components/admin/HoldDialog';
import ImageInput from '@/components/admin/ImageInput';
import {
  Field,
  FormErrorBanner,
  FormSection,
  ListInput,
  Select,
  Spinner,
  StickyActionBar,
  TextArea,
  TextInput,
  Toggle,
  primaryButtonClassName,
  secondaryButtonClassName,
} from '@/components/admin/form';
import { phaseLabel, useWriteFlow } from '@/components/admin/useWriteFlow';
import { createArticle } from '@/lib/admin/actions/articles';
import { uploadAdminImage } from '@/lib/admin/image-upload';
import { articleInputSchema, slugify, toFieldErrors } from '@/lib/admin/schemas';
import { formatDate } from '@/lib/content/format';
import { countWords, estimateReadingMinutes } from '@/lib/markdown';
import ArticlePreview from './ArticlePreview';
import FaqInput from './FaqInput';
import {
  ARTICLE_FIELD_ORDER,
  EMPTY_ARTICLE_STATE,
  articleFieldId,
  authorNameFor,
  errorIn,
  hasEnglishContent,
  isArticleDraftEmpty,
  isScheduled,
  localDateTimeToIso,
  pruneEmptyFaqs,
  sanitizeArticleDraft,
  toArticleInput,
  toLocalDateTimeInput,
  type ArticleDraftData,
  type ArticleFieldKey,
  type ArticleFormState,
  type AuthorOption,
} from './form-state';
import MarkdownEditor, { type EditorView } from './MarkdownEditor';
import PublishConfirmDialog, { type PublishSummary } from './PublishConfirmDialog';
import SeoPanel, { SeoScoreBadge } from './SeoPanel';
import { evaluateSeo } from './seo';
import { useArticleDraft } from './useArticleDraft';

interface ArticleFormProps {
  categories: string[];
  authors: AuthorOption[];
  /** Slug yang sudah dipakai artikel lain (peringatan sebelum terbit). */
  existingSlugs?: string[];
}

type StateKey = keyof ArticleFormState;

const SITE_HOST = 'rayalawfirm.com';
const INVALID_MESSAGE = 'Periksa kembali isian yang ditandai.';
const SLUG_TAKEN_MESSAGE = 'Slug sudah dipakai artikel lain. Gunakan slug yang berbeda.';
const LEAVE_CONFIRM = 'Tinggalkan halaman ini? Draf tetap tersimpan otomatis di browser ini.';
const EMPTY_JSON = JSON.stringify(EMPTY_ARTICLE_STATE);
const SLUG_MAX = 100;

const scheduleFormatter = new Intl.DateTimeFormat('id-ID', { dateStyle: 'full', timeStyle: 'short' });
const draftTimeFormatter = new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
const clockFormatter = new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit' });

const scrollBehavior = (): ScrollBehavior =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

const cleanSlugTyping = (value: string) =>
  value
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-{2,}/g, '-');

function formatSafe(formatter: Intl.DateTimeFormat, value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : formatter.format(date);
}

/* ------------------------------------------------------------------ */

interface PublishAtFieldProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

/** Input jadwal terbit. Kosong = terbit saat tombol Terbitkan ditekan (input menampilkan waktu sekarang). */
function PublishAtField({ id, value, onChange, error }: PublishAtFieldProps) {
  const [nowLocal, setNowLocal] = useState('');

  useEffect(() => {
    if (value) return;
    const tick = () => setNowLocal(toLocalDateTimeInput(new Date()));
    tick();
    const timer = window.setInterval(tick, 30_000);
    return () => window.clearInterval(timer);
  }, [value]);

  const scheduled = isScheduled({ published_at: value });
  const time = value ? new Date(value).getTime() : Number.NaN;
  const past = Boolean(value) && !Number.isNaN(time) && time < Date.now() - 5 * 60_000;

  let status = 'Terbit langsung saat Anda menekan Terbitkan.';
  if (value && scheduled) status = `Terjadwal — tampil di website mulai ${formatSafe(scheduleFormatter, value)}.`;
  else if (past) status = 'Tanggal lampau — artikel tampil dengan tanggal tersebut.';
  else if (value) status = 'Terbit segera setelah dikonfirmasi.';

  return (
    <Field
      label="Tanggal & waktu terbit"
      htmlFor={id}
      error={error}
      hint="Atur tanggal mendatang untuk menjadwalkan. Waktu mengikuti zona waktu perangkat Anda."
    >
      <div className="flex flex-wrap gap-2">
        <TextInput
          id={id}
          type="datetime-local"
          step={60}
          value={value || nowLocal}
          onChange={(event) => onChange(event.target.value)}
          invalid={Boolean(error)}
          className="min-w-0 flex-1 basis-48"
        />
        {value && (
          <button type="button" onClick={() => onChange('')} className={twMerge(secondaryButtonClassName, 'shrink-0 px-4')}>
            Sekarang
          </button>
        )}
      </div>
      <p
        className={`mt-2 flex items-start gap-2 rounded-lg px-3 py-2 text-xs font-medium ${
          scheduled ? 'bg-primary/10 text-navy' : past ? 'bg-amber-50 text-amber-800' : 'bg-dark/5 text-dark/65'
        }`}
        aria-live="polite"
      >
        {status}
      </p>
    </Field>
  );
}

/* ------------------------------------------------------------------ */

/**
 * Form "Tulis Artikel". Artikel tidak dapat diubah setelah terbit, jadi form
 * ini menyediakan pratinjau, checklist SEO, draf otomatis, dan konfirmasi.
 * Semua penyimpanan lewat useWriteFlow (mode HOLD → dialog, form tetap terisi).
 */
export default function ArticleForm({ categories, authors, existingSlugs = [] }: ArticleFormProps) {
  const router = useRouter();
  const { execute, busy, phase, holdOpen, closeHold, error, setError } = useWriteFlow();

  const [state, setState] = useState<ArticleFormState>(EMPTY_ARTICLE_STATE);
  const [slugTouched, setSlugTouched] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [view, setView] = useState<EditorView>('write');
  const [enView, setEnView] = useState<EditorView>('write');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [held, setHeld] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [coverReminder, setCoverReminder] = useState(false);
  const [todayIso, setTodayIso] = useState<string | null>(null);

  const bannerRef = useRef<HTMLDivElement>(null);
  const editorSectionRef = useRef<HTMLDivElement>(null);
  // Hindari upload ulang file yang sama bila simpan gagal setelah upload berhasil.
  const uploadedRef = useRef<{ file: File; url: string } | null>(null);

  const takenSlugs = useMemo(() => new Set(existingSlugs.map((slug) => slug.toLowerCase())), [existingSlugs]);

  const draftValue = useMemo<ArticleDraftData>(
    () => ({ state, slugTouched, hadCover: file !== null }),
    [state, slugTouched, file]
  );
  const draft = useArticleDraft({
    value: draftValue,
    enabled: !completed,
    isEmpty: isArticleDraftEmpty,
    sanitize: sanitizeArticleDraft,
  });

  const dirty = !completed && (file !== null || JSON.stringify(state) !== EMPTY_JSON);

  useEffect(() => {
    setTodayIso(new Date().toISOString());
  }, []);

  useEffect(() => {
    if (!file) {
      setFilePreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setFilePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [dirty]);

  // Sembunyikan banner "periksa isian" begitu semua isian salah sudah diperbaiki.
  const previousErrorCount = useRef(0);
  useEffect(() => {
    const count = Object.keys(fieldErrors).length;
    if (previousErrorCount.current > 0 && count === 0) setError(null);
    previousErrorCount.current = count;
  }, [fieldErrors, setError]);

  const clearFieldError = useCallback((key: ArticleFieldKey) => {
    setFieldErrors((previous) => {
      const keys = Object.keys(previous).filter((path) => path === key || path.startsWith(`${key}.`));
      if (keys.length === 0) return previous;
      const next = { ...previous };
      keys.forEach((path) => delete next[path]);
      return next;
    });
  }, []);

  const update = useCallback(
    <K extends StateKey>(key: K, value: ArticleFormState[K]) => {
      setState((previous) => ({ ...previous, [key]: value }));
      clearFieldError(key);
    },
    [clearFieldError]
  );

  const errorFor = (key: ArticleFieldKey) => errorIn(fieldErrors, key);

  /* ---------------- turunan (ditunda agar mengetik tetap lancar) ---------------- */

  const deferred = useDeferredValue(state);
  const wordCount = useMemo(() => countWords(deferred.content), [deferred.content]);
  const readingMinutes = useMemo(() => estimateReadingMinutes(deferred.content), [deferred.content]);
  const wordCountEn = useMemo(() => countWords(deferred.content_en), [deferred.content_en]);
  const readingMinutesEn = useMemo(() => estimateReadingMinutes(deferred.content_en), [deferred.content_en]);

  const seo = useMemo(
    () =>
      evaluateSeo({
        title: deferred.title,
        metaTitle: deferred.meta_title,
        excerpt: deferred.excerpt,
        metaDescription: deferred.meta_description,
        content: deferred.content,
        slug: deferred.slug,
        keyPointCount: deferred.key_points.filter((point) => point.trim()).length,
        faqCount: deferred.faqs.filter((item) => item.question.trim() && item.answer.trim()).length,
        hasCover: file !== null,
        coverAlt: deferred.cover_image_alt,
        wordCount,
      }),
    [deferred, file, wordCount]
  );

  const authorName = authorNameFor(state.author_lawyer_id, authors);
  const scheduled = isScheduled(state);
  const publishDateIso = state.published_at ? localDateTimeToIso(state.published_at) : todayIso;
  const dateLabel = publishDateIso ? formatDate(publishDateIso, 'id') : '';
  const slugTaken = Boolean(state.slug) && takenSlugs.has(state.slug.toLowerCase());
  const hasEnglish = hasEnglishContent(state);

  /* ---------------- fokus ke isian salah ---------------- */

  const focusPath = useCallback((path: string) => {
    const [base, index, sub] = path.split('.');
    const key = base as ArticleFieldKey;
    if (key === 'content') setView('write');
    if (key === 'content_en') setEnView('write');

    window.setTimeout(() => {
      let element: HTMLElement | null = null;
      if ((key === 'faqs' || key === 'faqs_en') && index !== undefined) {
        element = document.getElementById(`${articleFieldId(key)}-${index}-${sub === 'answer' ? 'answer' : 'question'}`);
      }
      element = element ?? document.getElementById(articleFieldId(key)) ?? document.getElementById(`${articleFieldId(key)}-group`);
      if (!element) return;
      const details = element.closest('details');
      if (details && !details.open) details.open = true;
      element.scrollIntoView({ behavior: scrollBehavior(), block: 'center' });
      element.focus({ preventScroll: true });
    }, 0);
  }, []);

  const revealErrors = (errors: Record<string, string>) => {
    const key = ARTICLE_FIELD_ORDER.find((field) => errorIn(errors, field));
    if (!key) {
      window.setTimeout(() => bannerRef.current?.scrollIntoView({ behavior: scrollBehavior(), block: 'center' }), 0);
      return;
    }
    const path = errors[key] ? key : Object.keys(errors).find((item) => item.startsWith(`${key}.`)) ?? key;
    focusPath(path);
  };

  /* ---------------- handler isian ---------------- */

  const handleTitleChange = (value: string) => {
    setState((previous) => ({
      ...previous,
      title: value,
      slug: slugTouched ? previous.slug : slugify(value, SLUG_MAX),
    }));
    clearFieldError('title');
    if (!slugTouched) clearFieldError('slug');
  };

  const handleSlugChange = (value: string) => {
    setSlugTouched(true);
    update('slug', cleanSlugTyping(value));
  };

  const regenerateSlug = () => {
    setSlugTouched(false);
    update('slug', slugify(state.title, SLUG_MAX));
  };

  const handleFileChange = (next: File | null) => {
    setFile(next);
    if (next) setCoverReminder(false);
    clearFieldError('cover_image_url');
  };

  /* ---------------- draf ---------------- */

  const restoreDraft = () => {
    if (dirty && !window.confirm('Isian saat ini akan diganti dengan draf terakhir. Lanjutkan?')) return;
    const data = draft.restore();
    if (!data) return;
    setState(data.state);
    setSlugTouched(data.slugTouched);
    setFieldErrors({});
    setError(null);
    setCoverReminder(data.hadCover && file === null);
  };

  const discardDraft = () => {
    if (!window.confirm('Buang draf terakhir? Isi draf akan dihapus dari browser ini.')) return;
    draft.discard();
  };

  /* ---------------- simpan ---------------- */

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy) return;

    const cleaned = pruneEmptyFaqs(state);
    if (cleaned !== state) setState(cleaned);

    const values = toArticleInput(cleaned, authors);
    const parsed = articleInputSchema.safeParse(values);
    const errors: Record<string, string> = parsed.success ? {} : toFieldErrors(parsed.error);
    if (!errors.slug && takenSlugs.has(values.slug.trim().toLowerCase())) errors.slug = SLUG_TAKEN_MESSAGE;
    if (cleaned.author_lawyer_id && !authors.some((author) => author.id === cleaned.author_lawyer_id)) {
      errors.author_lawyer_id = 'Penulis tidak ditemukan. Pilih ulang penulis.';
    }

    setSessionExpired(false);

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError(INVALID_MESSAGE);
      revealErrors(errors);
      return;
    }

    setFieldErrors({});
    setError(null);
    setConfirmOpen(true);
  };

  const closeConfirm = useCallback(() => setConfirmOpen(false), []);

  const publish = async () => {
    setConfirmOpen(false);
    const values = toArticleInput(state, authors);

    const result = await execute({
      action: 'article.create',
      summary: values.title,
      payload: { ...values, cover_pending: Boolean(file) },
      prepare: file
        ? async () => {
            if (uploadedRef.current?.file === file) return { cover_image_url: uploadedRef.current.url };
            const url = await uploadAdminImage(file, 'articles', values.slug || values.title, { maxSize: 1600 });
            uploadedRef.current = { file, url };
            return { cover_image_url: url };
          }
        : undefined,
      save: (prepared) => createArticle({ ...values, ...prepared }),
    });

    if (!result) {
      revealErrors({});
      return;
    }

    switch (result.status) {
      case 'ok':
        draft.clear();
        setCompleted(true);
        router.push('/admin/artikel?saved=1');
        router.refresh();
        break;
      case 'hold':
        setHeld(true);
        break;
      case 'invalid':
        setFieldErrors(result.fieldErrors);
        revealErrors(result.fieldErrors);
        break;
      case 'unauthorized':
        setSessionExpired(true);
        revealErrors({});
        break;
      default:
        revealErrors({});
    }
  };

  // Enter di input satu baris tidak langsung mengirim form (mencegah terbit tak sengaja di HP).
  const preventImplicitSubmit = (event: KeyboardEvent<HTMLFormElement>) => {
    const target = event.target as HTMLElement;
    if (event.key === 'Enter' && target instanceof HTMLInputElement && target.type !== 'submit') {
      event.preventDefault();
    }
  };

  const confirmLeave = (event: MouseEvent<HTMLAnchorElement>) => {
    if (dirty && !window.confirm(LEAVE_CONFIRM)) event.preventDefault();
  };

  const togglePreview = () => {
    setView((current) => (current === 'preview' ? 'write' : 'preview'));
    window.setTimeout(
      () => editorSectionRef.current?.scrollIntoView({ behavior: scrollBehavior(), block: 'start' }),
      0
    );
  };

  /* ---------------- ringkasan konfirmasi ---------------- */

  const summary: PublishSummary = {
    title: state.title.trim(),
    slug: state.slug,
    category: state.category.trim(),
    authorName,
    scheduleLabel: state.published_at
      ? `${formatSafe(scheduleFormatter, state.published_at)}${
          !scheduled && new Date(state.published_at).getTime() < Date.now() - 5 * 60_000 ? ' (tanggal lampau)' : ''
        }`
      : 'Langsung setelah dikonfirmasi',
    scheduled,
    featured: state.featured,
    wordCount,
    readingMinutes,
    hasCover: file !== null,
    hasEnglish,
  };

  let draftStatus = 'Draf disimpan otomatis di browser ini';
  if (draft.saveFailed) draftStatus = 'Draf tidak dapat disimpan di browser ini';
  else if (draft.pendingDraft) draftStatus = 'Draf lama menunggu keputusan Anda';
  else if (draft.lastSavedAt) draftStatus = `Draf tersimpan · ${formatSafe(clockFormatter, draft.lastSavedAt)}`;

  const renderPreview = (content: string) => (
    <ArticlePreview
      title={deferred.title}
      excerpt={deferred.excerpt}
      content={content}
      category={deferred.category}
      authorName={authorName}
      dateLabel={dateLabel}
      readingMinutes={readingMinutes}
      coverSrc={filePreview}
      coverAlt={deferred.cover_image_alt}
      keyPoints={deferred.key_points}
      faqs={deferred.faqs}
      tags={deferred.tags}
    />
  );

  return (
    <form noValidate onSubmit={handleSubmit} onKeyDown={preventImplicitSubmit} aria-busy={busy} className="space-y-6">
      {draft.pendingDraft && (
        <div role="region" aria-label="Draf tersimpan" className="rounded-2xl border border-primary/30 bg-primary/5 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-navy">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
              </svg>
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-sans text-base font-semibold text-dark">Pulihkan draf terakhir?</p>
              <p className="mt-0.5 break-words text-sm text-dark/70">
                <span className="font-medium text-dark">
                  “{draft.pendingDraft.data.state.title.trim() || 'Tanpa judul'}”
                </span>{' '}
                · disimpan {formatSafe(draftTimeFormatter, draft.pendingDraft.savedAt)}
              </p>
              {draft.pendingDraft.data.hadCover && (
                <p className="mt-1 text-xs text-dark/55">Gambar sampul tidak ikut tersimpan di draf — pilih ulang setelah dipulihkan.</p>
              )}
              <p className="mt-1 text-xs text-dark/55">Tulisan baru Anda tetap tersimpan otomatis; draf lama dicadangkan sampai Anda memilih.</p>
            </div>
          </div>
          <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button type="button" onClick={discardDraft} className={secondaryButtonClassName}>
              Buang
            </button>
            <button type="button" onClick={restoreDraft} className={primaryButtonClassName}>
              Pulihkan
            </button>
          </div>
        </div>
      )}

      {/* a) Judul & URL */}
      <FormSection title="Judul & URL" description="Judul yang jelas & mengandung kata kunci utama membantu pembaca dan Google.">
        <Field
          label="Judul artikel"
          htmlFor={articleFieldId('title')}
          required
          error={errorFor('title')}
          counter={{ value: state.title.trim().length, max: 200, recommended: [40, 65] }}
          hint="Ideal 40–65 karakter. Contoh: Cara Mengurus Hak Asuh Anak Setelah Perceraian"
        >
          <TextInput
            id={articleFieldId('title')}
            value={state.title}
            onChange={(event) => handleTitleChange(event.target.value)}
            autoComplete="off"
            autoCapitalize="sentences"
            maxLength={200}
            placeholder="Cara Mengurus Hak Asuh Anak Setelah Perceraian"
            invalid={Boolean(errorFor('title'))}
          />
        </Field>

        <Field
          label="Slug (alamat URL)"
          htmlFor={articleFieldId('slug')}
          required
          error={errorFor('slug') ?? (slugTaken ? SLUG_TAKEN_MESSAGE : undefined)}
          hint={
            <>
              <span className="block break-all font-medium text-dark/70">
                {SITE_HOST}/artikel/{state.slug || '…'}
              </span>
              {slugTouched
                ? 'Diubah manual. Gunakan huruf kecil, angka, dan tanda hubung. '
                : 'Dibuat otomatis dari judul. '}
              <strong className="font-semibold text-dark/70">Slug tidak dapat diubah setelah artikel terbit.</strong>
            </>
          }
        >
          <div className="flex gap-2">
            <TextInput
              id={articleFieldId('slug')}
              value={state.slug}
              onChange={(event) => handleSlugChange(event.target.value)}
              onBlur={() => {
                const cleaned = slugify(state.slug, 120);
                if (cleaned !== state.slug) update('slug', cleaned);
              }}
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              maxLength={120}
              placeholder="cara-mengurus-hak-asuh-anak"
              invalid={Boolean(errorFor('slug')) || slugTaken}
            />
            {slugTouched && (
              <button
                type="button"
                onClick={regenerateSlug}
                className={twMerge(secondaryButtonClassName, 'shrink-0 px-3')}
                aria-label="Buat ulang slug dari judul"
                title="Buat ulang dari judul"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                <span className="hidden sm:inline">Dari judul</span>
              </button>
            )}
          </div>
        </Field>
      </FormSection>

      {/* b) Gambar sampul */}
      <FormSection title="Gambar Sampul" description="Tampil di kartu artikel, bagian atas artikel, dan saat dibagikan ke WhatsApp/media sosial.">
        <div className="sm:grid sm:grid-cols-[minmax(0,22rem)_1fr] sm:gap-6">
          <ImageInput
            id={articleFieldId('cover_image_url')}
            file={file}
            onFileChange={handleFileChange}
            aspectClassName="aspect-video"
            invalid={Boolean(errorFor('cover_image_url'))}
            label="Pilih gambar sampul"
          />
          <div className="mt-4 sm:mt-0">
            <p className="text-sm font-semibold text-dark">Tips gambar sampul</p>
            <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-dark/60">
              <li>• Rasio 16:9, lebar minimal 1200 px</li>
              <li>• Hindari teks kecil di dalam gambar</li>
              <li>• Otomatis dikompres ke WebP agar website tetap cepat</li>
            </ul>
            <p className="mt-3 text-xs leading-relaxed text-dark/50">
              Gambar baru diunggah saat artikel <strong>diterbitkan</strong>. Tanpa gambar, website memakai gambar bawaan
              Raya Law Firm.
            </p>
            {coverReminder && (
              <p className="mt-3 rounded-lg bg-gold/15 px-3 py-2 text-xs font-medium text-dark/80" role="status">
                Draf ini sebelumnya memakai gambar sampul. Pilih ulang gambarnya.
              </p>
            )}
            {errorFor('cover_image_url') && (
              <p className="mt-2 text-sm font-medium text-red-600" role="alert">
                {errorFor('cover_image_url')}
              </p>
            )}
          </div>
        </div>

        <Field
          label="Teks alternatif (alt) gambar"
          htmlFor={articleFieldId('cover_image_alt')}
          error={errorFor('cover_image_alt')}
          counter={{ value: state.cover_image_alt.trim().length, max: 200 }}
          hint="Jelaskan isi gambar secara singkat untuk aksesibilitas (pembaca layar) & Google Images."
        >
          <TextInput
            id={articleFieldId('cover_image_alt')}
            value={state.cover_image_alt}
            onChange={(event) => update('cover_image_alt', event.target.value)}
            maxLength={200}
            placeholder={state.title.trim() || 'Contoh: Advokat mendampingi klien menandatangani perjanjian'}
            invalid={Boolean(errorFor('cover_image_alt'))}
          />
        </Field>
      </FormSection>

      {/* c) Ringkasan */}
      <FormSection title="Ringkasan">
        <Field
          label="Ringkasan artikel"
          htmlFor={articleFieldId('excerpt')}
          required
          error={errorFor('excerpt')}
          counter={{ value: state.excerpt.trim().length, max: 400, recommended: [120, 160] }}
          hint="Jawab inti topik dalam 1-2 kalimat. Ringkasan ini tampil di kartu artikel dan sering dikutip Google AI Overview."
        >
          <TextArea
            id={articleFieldId('excerpt')}
            rows={3}
            value={state.excerpt}
            onChange={(event) => update('excerpt', event.target.value)}
            maxLength={400}
            placeholder="Hak asuh anak setelah perceraian ditentukan pengadilan berdasarkan kepentingan terbaik anak. Berikut syarat, prosedur, dan dokumen yang perlu disiapkan."
            invalid={Boolean(errorFor('excerpt'))}
          />
        </Field>
      </FormSection>

      {/* d) Isi artikel */}
      <div ref={editorSectionRef} className="scroll-mt-20 lg:scroll-mt-6">
        <FormSection
          title="Isi Artikel"
          description="Gunakan subjudul H2 untuk setiap bagian utama dan tautkan ke halaman layanan terkait."
        >
          <Field
            label="Isi artikel"
            htmlFor={articleFieldId('content')}
            required
            error={errorFor('content')}
            hint="Disarankan minimal 800 kata. Pratinjau menampilkan perkiraan tampilan di website."
          >
            <MarkdownEditor
              id={articleFieldId('content')}
              value={state.content}
              onChange={(value) => update('content', value)}
              invalid={Boolean(errorFor('content'))}
              view={view}
              onViewChange={setView}
              wordCount={wordCount}
              readingMinutes={readingMinutes}
              renderPreview={renderPreview}
              placeholder={
                'Tulis paragraf pembuka yang langsung menjawab pertanyaan pembaca…\n\n## Subjudul pertama\nPenjelasan bagian pertama.\n\n## Subjudul kedua\n- Poin penting\n- Poin lainnya'
              }
            />
          </Field>
        </FormSection>
      </div>

      {/* e) Poin penting */}
      <FormSection title="Poin Penting">
        <Field
          label="Poin penting"
          htmlFor={articleFieldId('key_points')}
          error={errorFor('key_points')}
          hint="3-5 poin ringkas; tampil sebagai kotak Poin Penting di atas artikel dan membantu AI Overview."
        >
          <div id={`${articleFieldId('key_points')}-group`} tabIndex={-1} className="outline-none">
            <ListInput
              id={articleFieldId('key_points')}
              value={state.key_points}
              onChange={(value) => update('key_points', value)}
              variant="list"
              maxItems={10}
              placeholder="Tulis satu poin lalu tekan Enter"
              invalid={Boolean(errorFor('key_points'))}
            />
          </div>
        </Field>
      </FormSection>

      {/* f) FAQ */}
      <FormSection
        title="FAQ"
        description="Pertanyaan yang sering diajukan klien. Tampil di akhir artikel & bisa muncul sebagai hasil kaya (rich result) di Google."
      >
        <div id={`${articleFieldId('faqs')}-group`} tabIndex={-1} className="outline-none">
          <FaqInput
            id={articleFieldId('faqs')}
            value={state.faqs}
            onChange={(value) => update('faqs', value)}
            errors={fieldErrors}
            errorKey="faqs"
            lang="id"
          />
        </div>
      </FormSection>

      {/* g) Kategori & tag */}
      <FormSection title="Kategori & Tag">
        <Field
          label="Kategori"
          htmlFor={articleFieldId('category')}
          required
          error={errorFor('category')}
          hint="Pilih kategori yang ada atau ketik kategori baru."
        >
          <TextInput
            id={articleFieldId('category')}
            list="article-category-options"
            value={state.category}
            onChange={(event) => update('category', event.target.value)}
            autoComplete="off"
            maxLength={80}
            placeholder="Hukum Keluarga"
            invalid={Boolean(errorFor('category'))}
          />
          <datalist id="article-category-options">
            {categories.map((category) => (
              <option key={category} value={category} />
            ))}
          </datalist>
          {categories.length > 0 && (
            <div
              role="group"
              aria-label="Pilih kategori cepat"
              className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:thin] sm:flex-wrap sm:overflow-visible"
            >
              {categories.map((category) => {
                const selected = state.category.trim().toLowerCase() === category.toLowerCase();
                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => update('category', category)}
                    className={`inline-flex min-h-[44px] shrink-0 items-center rounded-full border px-4 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 ${
                      selected
                        ? 'border-navy bg-navy text-white'
                        : 'border-dark/15 bg-white text-dark/70 hover:border-primary/40 hover:text-primary'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          )}
        </Field>

        <Field
          label="Tag"
          htmlFor={articleFieldId('tags')}
          error={errorFor('tags')}
          hint="Opsional, maksimal 15. Pisahkan beberapa tag dengan koma."
        >
          <div id={`${articleFieldId('tags')}-group`} tabIndex={-1} className="outline-none">
            <ListInput
              id={articleFieldId('tags')}
              value={state.tags}
              onChange={(value) => update('tags', value)}
              variant="chips"
              maxItems={15}
              placeholder="hak asuh anak, perceraian"
              invalid={Boolean(errorFor('tags'))}
            />
          </div>
        </Field>
      </FormSection>

      {/* h) Penulis */}
      <FormSection title="Penulis">
        <Field
          label="Penulis artikel"
          htmlFor={articleFieldId('author_lawyer_id')}
          error={errorFor('author_lawyer_id')}
          hint="Memilih advokat sebagai penulis meningkatkan kredibilitas (E-E-A-T) di mata Google."
        >
          <Select
            id={articleFieldId('author_lawyer_id')}
            value={state.author_lawyer_id}
            onChange={(event) => update('author_lawyer_id', event.target.value)}
            invalid={Boolean(errorFor('author_lawyer_id'))}
          >
            <option value="">Tim Redaksi Raya Law Firm</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
                {author.position ? ` — ${author.position}` : ''}
                {author.is_active ? '' : ' (tidak aktif)'}
              </option>
            ))}
          </Select>
        </Field>
      </FormSection>

      {/* i) SEO */}
      <FormSection title="SEO" description="Atur tampilan di hasil pencarian Google dan periksa kelengkapan artikel.">
        <SeoPanel
          report={seo}
          slug={state.slug}
          metaTitle={state.meta_title}
          metaDescription={state.meta_description}
          onMetaTitleChange={(value) => update('meta_title', value)}
          onMetaDescriptionChange={(value) => update('meta_description', value)}
          metaTitleId={articleFieldId('meta_title')}
          metaDescriptionId={articleFieldId('meta_description')}
          metaTitleError={errorFor('meta_title')}
          metaDescriptionError={errorFor('meta_description')}
          titleFallback={state.title.trim()}
          descriptionFallback={state.excerpt.trim()}
          dateLabel={dateLabel}
        />
      </FormSection>

      {/* j) Pengaturan terbit */}
      <FormSection title="Pengaturan Terbit">
        <Toggle
          id={articleFieldId('featured')}
          checked={state.featured}
          onChange={(checked) => update('featured', checked)}
          label="Jadikan artikel unggulan (tampil di beranda)"
          description="Artikel unggulan ditampilkan lebih menonjol di beranda website."
        />
        <PublishAtField
          id={articleFieldId('published_at')}
          value={state.published_at}
          onChange={(value) => update('published_at', value)}
          error={errorFor('published_at')}
        />
      </FormSection>

      {/* k) Terjemahan Inggris */}
      <FormSection
        title="Terjemahan Bahasa Inggris (opsional)"
        description={hasEnglish ? 'Berisi terjemahan. Kosongkan untuk memakai versi Indonesia.' : 'Kosongkan untuk memakai versi Indonesia.'}
        collapsible
        defaultOpen={false}
      >
        <Field
          label="Judul (EN)"
          htmlFor={articleFieldId('title_en')}
          error={errorFor('title_en')}
          counter={{ value: state.title_en.trim().length, max: 200, recommended: [40, 65] }}
        >
          <TextInput
            id={articleFieldId('title_en')}
            lang="en"
            value={state.title_en}
            onChange={(event) => update('title_en', event.target.value)}
            maxLength={200}
            placeholder={state.title.trim() || 'English title'}
            invalid={Boolean(errorFor('title_en'))}
          />
        </Field>

        <Field
          label="Ringkasan (EN)"
          htmlFor={articleFieldId('excerpt_en')}
          error={errorFor('excerpt_en')}
          counter={{ value: state.excerpt_en.trim().length, max: 400, recommended: [120, 160] }}
        >
          <TextArea
            id={articleFieldId('excerpt_en')}
            lang="en"
            rows={3}
            value={state.excerpt_en}
            onChange={(event) => update('excerpt_en', event.target.value)}
            maxLength={400}
            invalid={Boolean(errorFor('excerpt_en'))}
          />
        </Field>

        <Field label="Isi artikel (EN)" htmlFor={articleFieldId('content_en')} error={errorFor('content_en')}>
          <MarkdownEditor
            id={articleFieldId('content_en')}
            value={state.content_en}
            onChange={(value) => update('content_en', value)}
            invalid={Boolean(errorFor('content_en'))}
            view={enView}
            onViewChange={setEnView}
            wordCount={wordCountEn}
            readingMinutes={readingMinutesEn}
            compact
            lang="en"
            placeholder={'Write the English version here…\n\n## First section'}
          />
        </Field>

        <Field label="Kategori (EN)" htmlFor={articleFieldId('category_en')} error={errorFor('category_en')}>
          <TextInput
            id={articleFieldId('category_en')}
            lang="en"
            value={state.category_en}
            onChange={(event) => update('category_en', event.target.value)}
            maxLength={80}
            placeholder="Family Law"
            invalid={Boolean(errorFor('category_en'))}
          />
        </Field>

        <Field label="Tag (EN)" htmlFor={articleFieldId('tags_en')} error={errorFor('tags_en')}>
          <div id={`${articleFieldId('tags_en')}-group`} tabIndex={-1} className="outline-none">
            <ListInput
              id={articleFieldId('tags_en')}
              value={state.tags_en}
              onChange={(value) => update('tags_en', value)}
              variant="chips"
              maxItems={15}
              placeholder="child custody, divorce"
              invalid={Boolean(errorFor('tags_en'))}
            />
          </div>
        </Field>

        <Field label="Poin penting (EN)" htmlFor={articleFieldId('key_points_en')} error={errorFor('key_points_en')}>
          <div id={`${articleFieldId('key_points_en')}-group`} tabIndex={-1} className="outline-none">
            <ListInput
              id={articleFieldId('key_points_en')}
              value={state.key_points_en}
              onChange={(value) => update('key_points_en', value)}
              variant="list"
              maxItems={10}
              placeholder="Write one point and press Enter"
              invalid={Boolean(errorFor('key_points_en'))}
            />
          </div>
        </Field>

        <div>
          <p className="mb-1.5 text-sm font-semibold text-dark">FAQ (EN)</p>
          <div id={`${articleFieldId('faqs_en')}-group`} tabIndex={-1} className="outline-none">
            <FaqInput
              id={articleFieldId('faqs_en')}
              value={state.faqs_en}
              onChange={(value) => update('faqs_en', value)}
              errors={fieldErrors}
              errorKey="faqs_en"
              lang="en"
              questionPlaceholder="Example: How long does a divorce process take?"
              answerPlaceholder="Answer clearly in 2–4 sentences."
            />
          </div>
        </div>

        <Field
          label="Judul SEO (EN)"
          htmlFor={articleFieldId('meta_title_en')}
          error={errorFor('meta_title_en')}
          counter={{ value: state.meta_title_en.trim().length, max: 70, recommended: [50, 60] }}
        >
          <TextInput
            id={articleFieldId('meta_title_en')}
            lang="en"
            value={state.meta_title_en}
            onChange={(event) => update('meta_title_en', event.target.value)}
            maxLength={70}
            placeholder={state.title_en.trim() || 'Same as English title'}
            invalid={Boolean(errorFor('meta_title_en'))}
          />
        </Field>

        <Field
          label="Deskripsi SEO (EN)"
          htmlFor={articleFieldId('meta_description_en')}
          error={errorFor('meta_description_en')}
          counter={{ value: state.meta_description_en.trim().length, max: 170, recommended: [120, 160] }}
        >
          <TextArea
            id={articleFieldId('meta_description_en')}
            lang="en"
            rows={3}
            value={state.meta_description_en}
            onChange={(event) => update('meta_description_en', event.target.value)}
            maxLength={170}
            placeholder={state.excerpt_en.trim() || 'Same as English summary'}
            invalid={Boolean(errorFor('meta_description_en'))}
          />
        </Field>
      </FormSection>

      {held && (
        <div role="status" className="flex items-start gap-3 rounded-xl border border-gold/40 bg-gold/10 p-4 text-sm text-dark/80">
          <svg className="mt-0.5 h-5 w-5 shrink-0 text-gold" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
              clipRule="evenodd"
            />
          </svg>
          <p>
            <strong className="text-dark">Mode demo aktif.</strong> Artikel belum diterbitkan ke website. Isian Anda tetap ada
            di layar ini dan tersimpan sebagai draf di browser; hubungi developer untuk mengaktifkan pembaruan data.
          </p>
        </div>
      )}

      <div ref={bannerRef} className="scroll-mt-24 space-y-2">
        <FormErrorBanner message={error} />
        {sessionExpired && (
          <a
            href="/admin/login"
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-[44px] items-center text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Login ulang di tab baru (isian di sini tetap tersimpan)
          </a>
        )}
      </div>

      <StickyActionBar>
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="flex min-w-0 items-center justify-between gap-2 sm:justify-start">
            <p className="truncate text-xs text-dark/50" aria-live="polite">
              {draftStatus}
            </p>
            <SeoScoreBadge report={seo} className="shrink-0" />
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/admin/artikel" onClick={confirmLeave} className={twMerge(secondaryButtonClassName, 'px-3 sm:px-5')}>
              Batal
            </Link>
            <button type="button" onClick={togglePreview} className={twMerge(secondaryButtonClassName, 'px-3 sm:px-5')}>
              {view === 'preview' ? 'Edit Isi' : 'Pratinjau'}
            </button>
            <button type="submit" disabled={busy} className={twMerge(primaryButtonClassName, 'min-w-0 flex-1 px-4 sm:flex-none sm:px-6')}>
              {busy && <Spinner />}
              <span className="min-w-0 truncate">
                {busy ? (
                  phaseLabel[phase]
                ) : (
                  <>
                    <span className="sm:hidden">Terbitkan</span>
                    <span className="hidden sm:inline">Terbitkan Artikel</span>
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
        <span className="sr-only" aria-live="polite">
          {busy ? phaseLabel[phase] : ''}
        </span>
      </StickyActionBar>

      <PublishConfirmDialog open={confirmOpen} summary={summary} seo={seo} onCancel={closeConfirm} onConfirm={publish} />
      <HoldDialog open={holdOpen} onClose={closeHold} actionLabel="menerbitkan artikel" />
    </form>
  );
}
