'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from 'react';
import HoldDialog from '@/components/admin/HoldDialog';
import ImageInput from '@/components/admin/ImageInput';
import {
  Field,
  FormErrorBanner,
  FormSection,
  ListInput,
  Spinner,
  StickyActionBar,
  TextArea,
  TextInput,
  Toggle,
  primaryButtonClassName,
  secondaryButtonClassName,
} from '@/components/admin/form';
import { phaseLabel, useWriteFlow } from '@/components/admin/useWriteFlow';
import { createLawyer, updateLawyer } from '@/lib/admin/actions/lawyers';
import { uploadAdminImage } from '@/lib/admin/image-upload';
import { lawyerInputSchema, normalizePhone, slugify, toFieldErrors, type LawyerInput } from '@/lib/admin/schemas';
import type { LawyerRow } from '@/lib/content/types';
import LawyerPreview from './LawyerPreview';

type LawyerFormProps = { mode: 'create'; lawyer?: undefined } | { mode: 'edit'; lawyer: LawyerRow };

interface LawyerFormState {
  name: string;
  slug: string;
  position: string;
  specialization: string;
  bio: string;
  expertise: string[];
  achievements: string[];
  handled_cases: string[];
  education: string[];
  position_en: string;
  specialization_en: string;
  bio_en: string;
  expertise_en: string[];
  achievements_en: string[];
  handled_cases_en: string[];
  image_url: string;
  linkedin: string;
  instagram: string;
  facebook: string;
  phone: string;
  email: string;
  sort_order: string;
  is_active: boolean;
}

type FieldKey = keyof LawyerFormState;
type SocialKey = 'linkedin' | 'instagram' | 'facebook';

const SITE_HOST = 'rayalawfirm.com';
const INVALID_MESSAGE = 'Periksa kembali isian yang ditandai.';
const LEAVE_CONFIRM = 'Perubahan belum disimpan. Tinggalkan halaman ini?';

const POSITION_SUGGESTIONS = [
  'Managing Partner',
  'Senior Partner',
  'Partner / Advokat',
  'Senior Associate',
  'Associate',
  'Paralegal',
];

// Urutan sesuai tampilan form — dipakai untuk fokus ke isian salah pertama.
const FIELD_ORDER: FieldKey[] = [
  'image_url',
  'name',
  'slug',
  'position',
  'specialization',
  'bio',
  'expertise',
  'achievements',
  'handled_cases',
  'education',
  'phone',
  'email',
  'linkedin',
  'instagram',
  'facebook',
  'is_active',
  'sort_order',
  'position_en',
  'specialization_en',
  'bio_en',
  'expertise_en',
  'achievements_en',
  'handled_cases_en',
];

const createSchema = lawyerInputSchema;
// Slug tidak dapat diubah saat edit (server juga mengabaikannya).
const updateSchema = lawyerInputSchema.omit({ slug: true });

const fieldId = (key: FieldKey) => `lawyer-${key.replace(/_/g, '-')}`;

/** Slug dari nama tanpa gelar: "Muh. Alif Maulana, S.H." → "muh-alif-maulana". */
const suggestSlug = (name: string) => slugify(name.split(',')[0]?.trim() || name, 80);

const countWords = (value: string) => {
  const text = value.trim();
  return text ? text.split(/\s+/).length : 0;
};

function errorIn(errors: Record<string, string>, key: FieldKey): string | undefined {
  if (errors[key]) return errors[key];
  const nested = Object.keys(errors).find((path) => path.startsWith(`${key}.`));
  return nested ? errors[nested] : undefined;
}

function ensureHttps(key: SocialKey, raw: string): string {
  const value = raw.trim();
  if (!value) return '';
  if (key === 'instagram' && /^@[\w.]+$/.test(value)) return `https://www.instagram.com/${value.slice(1)}`;
  if (/^https:\/\//i.test(value)) return value;
  if (/^http:\/\//i.test(value)) return value.replace(/^http:\/\//i, 'https://');
  return `https://${value.replace(/^\/+/, '')}`;
}

function toFormState(lawyer?: LawyerRow): LawyerFormState {
  return {
    name: lawyer?.name ?? '',
    slug: lawyer?.slug ?? '',
    position: lawyer?.position ?? '',
    specialization: lawyer?.specialization ?? '',
    bio: lawyer?.bio ?? '',
    expertise: lawyer?.expertise ?? [],
    achievements: lawyer?.achievements ?? [],
    handled_cases: lawyer?.handled_cases ?? [],
    education: lawyer?.education ?? [],
    position_en: lawyer?.position_en ?? '',
    specialization_en: lawyer?.specialization_en ?? '',
    bio_en: lawyer?.bio_en ?? '',
    expertise_en: lawyer?.expertise_en ?? [],
    achievements_en: lawyer?.achievements_en ?? [],
    handled_cases_en: lawyer?.handled_cases_en ?? [],
    image_url: lawyer?.image_url ?? '',
    linkedin: lawyer?.linkedin ?? '',
    instagram: lawyer?.instagram ?? '',
    facebook: lawyer?.facebook ?? '',
    phone: lawyer?.phone ?? '',
    email: lawyer?.email ?? '',
    sort_order: String(lawyer?.sort_order ?? 100),
    is_active: lawyer?.is_active ?? true,
  };
}

function toInput(state: LawyerFormState): LawyerInput {
  const sortText = state.sort_order.trim();
  return { ...state, sort_order: sortText === '' ? undefined : Number(sortText) };
}

export default function LawyerForm(props: LawyerFormProps) {
  const { mode } = props;
  const isEdit = mode === 'edit';
  const router = useRouter();
  const { execute, busy, phase, holdOpen, closeHold, error, setError } = useWriteFlow();

  const [initial] = useState(() => toFormState(props.lawyer));
  const initialJson = useMemo(() => JSON.stringify(initial), [initial]);
  const [state, setState] = useState<LawyerFormState>(initial);
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [held, setHeld] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [completed, setCompleted] = useState(false);

  const bannerRef = useRef<HTMLDivElement>(null);
  // Hindari upload ulang file yang sama bila simpan gagal setelah upload berhasil.
  const uploadedRef = useRef<{ file: File; url: string } | null>(null);

  const dirty = !completed && (file !== null || JSON.stringify(state) !== initialJson);

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

  // Navigasi di dalam aplikasi (tombol kembali di top bar, menu samping, dll.)
  // tidak memicu beforeunload — tanyakan dulu bila ada perubahan belum disimpan.
  useEffect(() => {
    if (!dirty) return;
    const onDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      if (!window.confirm(LEAVE_CONFIRM)) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
    document.addEventListener('click', onDocumentClick, true);
    return () => document.removeEventListener('click', onDocumentClick, true);
  }, [dirty]);

  // Sembunyikan banner "periksa isian" begitu semua isian salah sudah diperbaiki.
  const previousErrorCount = useRef(0);
  useEffect(() => {
    const count = Object.keys(fieldErrors).length;
    if (previousErrorCount.current > 0 && count === 0) setError(null);
    previousErrorCount.current = count;
  }, [fieldErrors, setError]);

  const clearFieldError = useCallback((key: FieldKey) => {
    setFieldErrors((previous) => {
      const keys = Object.keys(previous).filter((path) => path === key || path.startsWith(`${key}.`));
      if (keys.length === 0) return previous;
      const next = { ...previous };
      keys.forEach((path) => delete next[path]);
      return next;
    });
  }, []);

  const update = useCallback(
    <K extends FieldKey>(key: K, value: LawyerFormState[K]) => {
      setState((previous) => ({ ...previous, [key]: value }));
      clearFieldError(key);
    },
    [clearFieldError]
  );

  const errorFor = (key: FieldKey) => errorIn(fieldErrors, key);

  const scrollBehavior = (): ScrollBehavior =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

  const focusField = (key: FieldKey) => {
    const element = document.getElementById(fieldId(key));
    if (!element) return;
    const details = element.closest('details');
    if (details && !details.open) details.open = true;
    element.scrollIntoView({ behavior: scrollBehavior(), block: 'center' });
    element.focus({ preventScroll: true });
  };

  const revealErrors = (errors: Record<string, string>) => {
    const key = FIELD_ORDER.find((field) => errorIn(errors, field));
    window.setTimeout(() => {
      if (key) focusField(key);
      else bannerRef.current?.scrollIntoView({ behavior: scrollBehavior(), block: 'center' });
    }, 0);
  };

  const handleNameChange = (value: string) => {
    setState((previous) => ({
      ...previous,
      name: value,
      slug: !isEdit && !slugTouched ? suggestSlug(value) : previous.slug,
    }));
    clearFieldError('name');
    if (!isEdit && !slugTouched) clearFieldError('slug');
  };

  const handleSlugChange = (value: string) => {
    setSlugTouched(true);
    update(
      'slug',
      value
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-{2,}/g, '-')
    );
  };

  const regenerateSlug = () => {
    setSlugTouched(false);
    update('slug', suggestSlug(state.name));
  };

  const handleFileChange = (next: File | null) => {
    setFile(next);
    clearFieldError('image_url');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy) return;

    const values = toInput(state);
    const parsed = (isEdit ? updateSchema : createSchema).safeParse(values);
    const errors: Record<string, string> = parsed.success ? {} : toFieldErrors(parsed.error);
    if (typeof values.sort_order === 'number' && Number.isNaN(values.sort_order)) {
      errors.sort_order = 'Masukkan angka 0–9999';
    }

    setSessionExpired(false);

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError(INVALID_MESSAGE);
      revealErrors(errors);
      return;
    }

    setFieldErrors({});

    const result = await execute({
      action: isEdit ? 'lawyer.update' : 'lawyer.create',
      summary: values.name,
      payload: { ...values, id: props.lawyer?.id, image_pending: Boolean(file) },
      prepare: file
        ? async () => {
            if (uploadedRef.current?.file === file) return { image_url: uploadedRef.current.url };
            const url = await uploadAdminImage(file, 'lawyers', values.slug || values.name, { maxSize: 1400 });
            uploadedRef.current = { file, url };
            return { image_url: url };
          }
        : undefined,
      save: (prepared) =>
        props.mode === 'create'
          ? createLawyer({ ...values, ...prepared })
          : updateLawyer(props.lawyer.id, { ...values, ...prepared }),
    });

    if (!result) {
      revealErrors({});
      return;
    }

    switch (result.status) {
      case 'ok':
        setCompleted(true);
        router.push('/admin/pengacara?saved=1');
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

  // Enter di input satu baris tidak langsung menyimpan (mencegah simpan tak sengaja di HP).
  const preventImplicitSubmit = (event: KeyboardEvent<HTMLFormElement>) => {
    const target = event.target as HTMLElement;
    if (event.key === 'Enter' && target instanceof HTMLInputElement && target.type !== 'submit') {
      event.preventDefault();
    }
  };

  const bioWords = countWords(state.bio);
  const bioEnWords = countWords(state.bio_en);
  const normalizedPhone = normalizePhone(state.phone);
  const hasEnglish = Boolean(
    state.position_en.trim() ||
      state.specialization_en.trim() ||
      state.bio_en.trim() ||
      state.expertise_en.length ||
      state.achievements_en.length ||
      state.handled_cases_en.length
  );
  const submitLabel = isEdit ? 'Simpan Perubahan' : 'Simpan Pengacara';

  const socialField = (key: SocialKey, label: string, placeholder: string) => (
    <Field label={label} htmlFor={fieldId(key)} error={errorFor(key)} hint="Opsional. URL lengkap profil, diawali https://">
      <TextInput
        id={fieldId(key)}
        type="url"
        inputMode="url"
        autoComplete="off"
        autoCapitalize="none"
        spellCheck={false}
        value={state[key]}
        onChange={(event) => update(key, event.target.value)}
        onBlur={(event) => {
          const normalized = ensureHttps(key, event.target.value);
          if (normalized !== state[key]) update(key, normalized);
        }}
        placeholder={placeholder}
        invalid={Boolean(errorFor(key))}
      />
    </Field>
  );

  return (
    <form noValidate onSubmit={handleSubmit} onKeyDown={preventImplicitSubmit} aria-busy={busy} className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_17rem] xl:items-start">
        <div className="min-w-0 space-y-6">
          <FormSection title="Foto Profil" description="Tampil di kartu tim dan halaman profil pengacara.">
            <div className="sm:grid sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-6">
              <div className="mx-auto w-full max-w-[16rem] sm:mx-0 sm:max-w-xs">
                <ImageInput
                  id={fieldId('image_url')}
                  currentUrl={state.image_url}
                  file={file}
                  onFileChange={handleFileChange}
                  aspectClassName="aspect-[3/4]"
                  invalid={Boolean(errorFor('image_url'))}
                  label="Pilih foto"
                />
              </div>
              <div className="mt-4 sm:mt-0">
                <p className="text-sm font-semibold text-dark">Tips foto terbaik</p>
                <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-dark/60">
                  <li>• Potret tegak dengan rasio 3:4</li>
                  <li>• Lebar minimal 800 px, wajah terlihat jelas</li>
                  <li>• Latar belakang polos & rapi</li>
                  <li>• Otomatis dikompres ke WebP agar website tetap cepat</li>
                </ul>
                <p className="mt-3 text-xs leading-relaxed text-dark/50">
                  Foto baru diunggah saat tombol <strong>Simpan</strong> ditekan.
                </p>
                {errorFor('image_url') && (
                  <p className="mt-2 text-sm font-medium text-red-600" role="alert">
                    {errorFor('image_url')}
                  </p>
                )}
              </div>
            </div>
          </FormSection>

          <FormSection title="Identitas" description="Informasi utama yang tampil di kartu dan profil.">
            <Field
              label="Nama lengkap beserta gelar"
              htmlFor={fieldId('name')}
              required
              error={errorFor('name')}
              hint="Contoh: Muh. Alif Maulana, S.H."
            >
              <TextInput
                id={fieldId('name')}
                value={state.name}
                onChange={(event) => handleNameChange(event.target.value)}
                autoComplete="off"
                autoCapitalize="words"
                maxLength={160}
                placeholder="Muh. Alif Maulana, S.H."
                invalid={Boolean(errorFor('name'))}
              />
            </Field>

            {isEdit ? (
              <Field
                label="Slug (alamat URL)"
                htmlFor={fieldId('slug')}
                hint={
                  <>
                    <span className="block break-all font-medium text-dark/70">
                      {SITE_HOST}/tim/{state.slug}
                    </span>
                    Slug tidak dapat diubah agar tautan yang sudah terindeks Google tidak rusak.
                  </>
                }
              >
                <TextInput
                  id={fieldId('slug')}
                  value={state.slug}
                  readOnly
                  aria-readonly="true"
                  className="cursor-not-allowed bg-dark/5 text-dark/60"
                />
              </Field>
            ) : (
              <Field
                label="Slug (alamat URL)"
                htmlFor={fieldId('slug')}
                required
                error={errorFor('slug')}
                hint={
                  <>
                    <span className="block break-all font-medium text-dark/70">
                      {SITE_HOST}/tim/{state.slug || '…'}
                    </span>
                    {slugTouched
                      ? 'Diubah manual. Gunakan huruf kecil, angka, dan tanda hubung.'
                      : 'Dibuat otomatis dari nama. Ubah bila ingin alamat yang lebih singkat.'}
                  </>
                }
              >
                <div className="flex gap-2">
                  <TextInput
                    id={fieldId('slug')}
                    value={state.slug}
                    onChange={(event) => handleSlugChange(event.target.value)}
                    onBlur={() => {
                      const cleaned = slugify(state.slug, 80);
                      if (cleaned !== state.slug) update('slug', cleaned);
                    }}
                    autoComplete="off"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    maxLength={80}
                    placeholder="muh-alif-maulana"
                    invalid={Boolean(errorFor('slug'))}
                  />
                  {slugTouched && (
                    <button
                      type="button"
                      onClick={regenerateSlug}
                      className={`${secondaryButtonClassName} shrink-0 px-3`}
                      title="Buat ulang slug dari nama"
                    >
                      Dari nama
                    </button>
                  )}
                </div>
              </Field>
            )}

            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Jabatan"
                htmlFor={fieldId('position')}
                required
                error={errorFor('position')}
                hint="Pilih dari saran atau ketik sendiri."
              >
                <TextInput
                  id={fieldId('position')}
                  list="lawyer-position-suggestions"
                  value={state.position}
                  onChange={(event) => update('position', event.target.value)}
                  autoComplete="off"
                  maxLength={120}
                  placeholder="Partner / Advokat"
                  invalid={Boolean(errorFor('position'))}
                />
                <datalist id="lawyer-position-suggestions">
                  {POSITION_SUGGESTIONS.map((option) => (
                    <option key={option} value={option} />
                  ))}
                </datalist>
              </Field>

              <Field
                label="Spesialisasi"
                htmlFor={fieldId('specialization')}
                required
                error={errorFor('specialization')}
                hint="Ringkas, tampil di kartu tim."
              >
                <TextInput
                  id={fieldId('specialization')}
                  value={state.specialization}
                  onChange={(event) => update('specialization', event.target.value)}
                  autoComplete="off"
                  maxLength={200}
                  placeholder="Litigasi, Hukum Perdata & Pidana"
                  invalid={Boolean(errorFor('specialization'))}
                />
              </Field>
            </div>

            <Field
              label="Biografi singkat"
              htmlFor={fieldId('bio')}
              error={errorFor('bio')}
              counter={{ value: bioWords, max: 200, recommended: [80, 200] }}
              hint="80-200 kata tentang pengalaman & pendekatan — membantu SEO dan kepercayaan calon klien. Pisahkan paragraf dengan baris kosong."
            >
              <TextArea
                id={fieldId('bio')}
                rows={6}
                value={state.bio}
                onChange={(event) => update('bio', event.target.value)}
                maxLength={5000}
                placeholder="Ceritakan pengalaman, bidang yang ditangani, dan pendekatan dalam mendampingi klien."
                invalid={Boolean(errorFor('bio'))}
              />
            </Field>
          </FormSection>

          <FormSection
            title="Keahlian & Rekam Jejak"
            description="Tampil di halaman profil. Semua bagian ini opsional, namun sangat dianjurkan."
          >
            <Field
              label="Bidang keahlian"
              htmlFor={fieldId('expertise')}
              error={errorFor('expertise')}
              hint="Ketik lalu tekan Enter, atau pisahkan dengan koma. Contoh: Hukum Pidana, Hukum Perdata."
            >
              <ListInput
                id={fieldId('expertise')}
                variant="chips"
                value={state.expertise}
                onChange={(value) => update('expertise', value)}
                maxItems={20}
                placeholder="Hukum Pidana"
                invalid={Boolean(errorFor('expertise'))}
              />
            </Field>

            <Field label="Pencapaian" htmlFor={fieldId('achievements')} error={errorFor('achievements')}>
              <ListInput
                id={fieldId('achievements')}
                value={state.achievements}
                onChange={(value) => update('achievements', value)}
                maxItems={25}
                placeholder="Contoh: Mendampingi 100+ perkara perdata"
                invalid={Boolean(errorFor('achievements'))}
              />
            </Field>

            <Field label="Jenis perkara yang ditangani" htmlFor={fieldId('handled_cases')} error={errorFor('handled_cases')}>
              <ListInput
                id={fieldId('handled_cases')}
                value={state.handled_cases}
                onChange={(value) => update('handled_cases', value)}
                maxItems={25}
                placeholder="Contoh: Sengketa tanah dan waris"
                invalid={Boolean(errorFor('handled_cases'))}
              />
            </Field>

            <Field label="Pendidikan" htmlFor={fieldId('education')} error={errorFor('education')}>
              <ListInput
                id={fieldId('education')}
                value={state.education}
                onChange={(value) => update('education', value)}
                maxItems={10}
                placeholder="Contoh: S.H. — Universitas Hasanuddin"
                invalid={Boolean(errorFor('education'))}
              />
            </Field>
          </FormSection>

          <FormSection title="Kontak & Media Sosial" description="Opsional. Hanya diisi bila boleh ditampilkan ke publik.">
            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Nomor WhatsApp"
                htmlFor={fieldId('phone')}
                error={errorFor('phone')}
                hint={
                  state.phone.trim() && normalizedPhone
                    ? `Tersimpan sebagai ${normalizedPhone}`
                    : 'Nomor WhatsApp, contoh 0813xxxx atau 62813xxxx'
                }
              >
                <TextInput
                  id={fieldId('phone')}
                  type="tel"
                  inputMode="tel"
                  autoComplete="off"
                  value={state.phone}
                  onChange={(event) => update('phone', event.target.value)}
                  placeholder="0813xxxxxxxx"
                  invalid={Boolean(errorFor('phone'))}
                />
              </Field>

              <Field label="Email" htmlFor={fieldId('email')} error={errorFor('email')}>
                <TextInput
                  id={fieldId('email')}
                  type="email"
                  inputMode="email"
                  autoComplete="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  value={state.email}
                  onChange={(event) => update('email', event.target.value)}
                  placeholder="nama@rayalawfirm.com"
                  invalid={Boolean(errorFor('email'))}
                />
              </Field>
            </div>

            {socialField('linkedin', 'LinkedIn', 'https://www.linkedin.com/in/nama')}
            {socialField('instagram', 'Instagram', 'https://www.instagram.com/nama')}
            {socialField('facebook', 'Facebook', 'https://www.facebook.com/nama')}
          </FormSection>

          <FormSection title="Tampilan di Website">
            <Toggle
              id={fieldId('is_active')}
              checked={state.is_active}
              onChange={(checked) => update('is_active', checked)}
              label="Tampilkan di website"
              description="Matikan untuk menyembunyikan profil tanpa menghapus data."
            />

            <Field
              label="Urutan tampil"
              htmlFor={fieldId('sort_order')}
              error={errorFor('sort_order')}
              hint="Angka kecil tampil lebih dulu."
              className="sm:max-w-xs"
            >
              <TextInput
                id={fieldId('sort_order')}
                type="number"
                inputMode="numeric"
                min={0}
                max={9999}
                step={1}
                value={state.sort_order}
                onChange={(event) => update('sort_order', event.target.value)}
                invalid={Boolean(errorFor('sort_order'))}
              />
            </Field>
          </FormSection>

          <FormSection
            title="Terjemahan Bahasa Inggris (opsional)"
            description={
              hasEnglish
                ? 'Sebagian sudah diisi. Kosongkan untuk memakai versi Bahasa Indonesia.'
                : 'Kosongkan untuk memakai versi Bahasa Indonesia.'
            }
            collapsible
            defaultOpen={false}
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Jabatan (EN)" htmlFor={fieldId('position_en')} error={errorFor('position_en')}>
                <TextInput
                  id={fieldId('position_en')}
                  lang="en"
                  value={state.position_en}
                  onChange={(event) => update('position_en', event.target.value)}
                  autoComplete="off"
                  maxLength={120}
                  placeholder="Partner / Attorney"
                  invalid={Boolean(errorFor('position_en'))}
                />
              </Field>

              <Field
                label="Spesialisasi (EN)"
                htmlFor={fieldId('specialization_en')}
                error={errorFor('specialization_en')}
              >
                <TextInput
                  id={fieldId('specialization_en')}
                  lang="en"
                  value={state.specialization_en}
                  onChange={(event) => update('specialization_en', event.target.value)}
                  autoComplete="off"
                  maxLength={200}
                  placeholder="Litigation, Civil & Criminal Law"
                  invalid={Boolean(errorFor('specialization_en'))}
                />
              </Field>
            </div>

            <Field
              label="Biografi (EN)"
              htmlFor={fieldId('bio_en')}
              error={errorFor('bio_en')}
              counter={{ value: bioEnWords, max: 200, recommended: [80, 200] }}
            >
              <TextArea
                id={fieldId('bio_en')}
                lang="en"
                rows={6}
                value={state.bio_en}
                onChange={(event) => update('bio_en', event.target.value)}
                maxLength={5000}
                invalid={Boolean(errorFor('bio_en'))}
              />
            </Field>

            <Field label="Bidang keahlian (EN)" htmlFor={fieldId('expertise_en')} error={errorFor('expertise_en')}>
              <ListInput
                id={fieldId('expertise_en')}
                variant="chips"
                value={state.expertise_en}
                onChange={(value) => update('expertise_en', value)}
                maxItems={20}
                placeholder="Criminal Law"
                invalid={Boolean(errorFor('expertise_en'))}
              />
            </Field>

            <Field label="Pencapaian (EN)" htmlFor={fieldId('achievements_en')} error={errorFor('achievements_en')}>
              <ListInput
                id={fieldId('achievements_en')}
                value={state.achievements_en}
                onChange={(value) => update('achievements_en', value)}
                maxItems={25}
                invalid={Boolean(errorFor('achievements_en'))}
              />
            </Field>

            <Field
              label="Jenis perkara yang ditangani (EN)"
              htmlFor={fieldId('handled_cases_en')}
              error={errorFor('handled_cases_en')}
            >
              <ListInput
                id={fieldId('handled_cases_en')}
                value={state.handled_cases_en}
                onChange={(value) => update('handled_cases_en', value)}
                maxItems={25}
                invalid={Boolean(errorFor('handled_cases_en'))}
              />
            </Field>
          </FormSection>
        </div>

        <aside
          aria-label="Pratinjau kartu pengacara"
          className="rounded-2xl border border-dark/10 bg-offwhite p-4 sm:p-6 xl:sticky xl:top-6"
        >
          <LawyerPreview
            name={state.name}
            position={state.position}
            specialization={state.specialization}
            imageSrc={filePreview ?? (state.image_url.trim() || null)}
            isActive={state.is_active}
          />
        </aside>
      </div>

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
            <strong className="text-dark">Mode demo aktif.</strong> Perubahan belum tersimpan ke website. Isian Anda tetap
            ada di layar ini; hubungi developer untuk mengaktifkan pembaruan data.
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
        <Link href="/admin/pengacara" className={secondaryButtonClassName}>
          Batal
        </Link>
        <button type="submit" disabled={busy} className={primaryButtonClassName}>
          {busy && <Spinner />}
          {busy ? phaseLabel[phase] : submitLabel}
        </button>
        <span className="sr-only" aria-live="polite">
          {busy ? phaseLabel[phase] : ''}
        </span>
      </StickyActionBar>

      <HoldDialog
        open={holdOpen}
        onClose={closeHold}
        actionLabel={isEdit ? 'memperbarui profil pengacara' : 'menambahkan pengacara baru'}
      />
    </form>
  );
}
