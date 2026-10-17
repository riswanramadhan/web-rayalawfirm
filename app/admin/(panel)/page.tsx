import type { PostgrestError } from '@supabase/supabase-js';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { ComponentType, ReactNode } from 'react';
import { canOptimizeImage, initialsOf } from '@/components/admin/shell/image';
import {
  ArrowRightIcon,
  CalendarIcon,
  DatabaseIcon,
  DocumentIcon,
  ExternalLinkIcon,
  LightBulbIcon,
  PencilIcon,
  PencilSquareIcon,
  RefreshIcon,
  StarIcon,
  UserPlusIcon,
  UsersIcon,
  WarningIcon,
  type IconProps,
} from '@/components/admin/shell/icons';
import { requireAdmin } from '@/lib/admin/auth';
import { formatDate } from '@/lib/content/format';

export const metadata: Metadata = {
  title: 'Beranda',
};

interface LawyerSummary {
  id: string;
  name: string;
  slug: string;
  position: string | null;
  is_active: boolean;
  image_url: string | null;
}

interface ArticleSummary {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  published_at: string;
  featured: boolean;
  is_published: boolean;
}

const TEAM_PREVIEW_LIMIT = 8;
const DAY_MS = 86_400_000;

const jakartaDay = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Jakarta',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

function jakartaDayNumber(date: Date): number {
  const [year, month, day] = jakartaDay.format(date).split('-').map(Number);
  return Date.UTC(year, month - 1, day) / DAY_MS;
}

/** "hari ini", "kemarin", "3 hari yang lalu", "2 bulan yang lalu". */
function relativeDays(iso: string, now: Date): string | null {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;

  const days = Math.max(0, jakartaDayNumber(now) - jakartaDayNumber(date));
  const rtf = new Intl.RelativeTimeFormat('id-ID', { numeric: 'auto' });
  if (days < 31) return rtf.format(-days, 'day');
  if (days < 365) return rtf.format(-Math.round(days / 30), 'month');
  return rtf.format(-Math.round(days / 365), 'year');
}

function isMissingSchema(error: PostgrestError | null): boolean {
  if (!error) return false;
  return (
    error.code === '42P01' ||
    error.code === 'PGRST205' ||
    /does not exist|schema cache/i.test(error.message ?? '')
  );
}

function isLive(article: ArticleSummary, now: Date): boolean {
  return article.is_published && new Date(article.published_at).getTime() <= now.getTime();
}

/* ------------------------------------------------------------------ */

export default async function AdminDashboardPage() {
  const { user, supabase } = await requireAdmin();
  const now = new Date();

  const [lawyersRes, articlesRes, liveCountRes] = await Promise.all([
    supabase
      .from('lawyers')
      .select('id, name, slug, position, is_active, image_url')
      .order('sort_order')
      .order('created_at'),
    supabase
      .from('articles')
      .select('id, title, slug, category, published_at, featured, is_published', { count: 'exact' })
      .order('published_at', { ascending: false })
      .limit(5),
    supabase
      .from('articles')
      .select('id', { count: 'exact', head: true })
      .eq('is_published', true)
      .lte('published_at', now.toISOString()),
  ]);

  const email = user.email ?? '';
  const todayLabel = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Jakarta',
  }).format(now);

  const loadError = lawyersRes.error ?? articlesRes.error;
  if (loadError) {
    const missingSchema = isMissingSchema(lawyersRes.error) || isMissingSchema(articlesRes.error);
    if (!missingSchema) console.error('[admin] dashboard query failed', loadError);

    return (
      <div className="space-y-8">
        <Greeting email={email} todayLabel={todayLabel} />
        {missingSchema ? <SetupNotice /> : <LoadErrorCard />}
        <QuickActions />
      </div>
    );
  }

  const lawyers = (lawyersRes.data ?? []) as LawyerSummary[];
  const articles = (articlesRes.data ?? []) as ArticleSummary[];
  const activeLawyers = lawyers.filter((lawyer) => lawyer.is_active).length;
  const hiddenLawyers = lawyers.length - activeLawyers;
  const totalArticles = articlesRes.count ?? articles.length;
  const liveArticles = liveCountRes.error ? totalArticles : liveCountRes.count ?? 0;
  const scheduledArticles = Math.max(0, totalArticles - liveArticles);
  const latestArticle = articles.find((article) => isLive(article, now)) ?? null;

  return (
    <div className="space-y-8 lg:space-y-10">
      <Greeting email={email} todayLabel={todayLabel} />

      <section aria-labelledby="dashboard-summary">
        <h2 id="dashboard-summary" className="sr-only">
          Ringkasan
        </h2>
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          <StatCard
            icon={UsersIcon}
            tone="primary"
            label="Pengacara aktif"
            value={
              <>
                {activeLawyers}
                <span className="ml-1.5 text-sm font-medium text-dark/45">dari {lawyers.length}</span>
              </>
            }
            hint={hiddenLawyers > 0 ? `${hiddenLawyers} disembunyikan` : 'Semua tampil di website'}
          />
          <StatCard
            icon={DocumentIcon}
            tone="gold"
            label="Artikel terbit"
            value={liveArticles}
            hint={scheduledArticles > 0 ? `${scheduledArticles} terjadwal` : 'Tampil di website'}
          />
          <StatCard
            icon={CalendarIcon}
            tone="navy"
            className="col-span-2 sm:col-span-1"
            label="Artikel terakhir"
            value={
              latestArticle ? (
                <time dateTime={latestArticle.published_at} className="text-xl sm:text-2xl">
                  {formatDate(latestArticle.published_at, 'id')}
                </time>
              ) : (
                <span className="text-xl sm:text-2xl">Belum ada</span>
              )
            }
            hint={
              latestArticle
                ? relativeDays(latestArticle.published_at, now) ?? ''
                : 'Tulis artikel pertama Anda'
            }
          />
        </dl>
      </section>

      <QuickActions />

      <div className="grid gap-6 lg:grid-cols-5 lg:items-start">
        <RecentArticles articles={articles} now={now} />
        <TeamPreview lawyers={lawyers} activeCount={activeLawyers} hiddenCount={hiddenLawyers} />
        <SeoTips />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Bagian halaman                                                      */
/* ------------------------------------------------------------------ */

function Greeting({ email, todayLabel }: { email: string; todayLabel: string }) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Dashboard Admin</p>
        <h1 className="mt-2 font-sans text-2xl font-bold tracking-tight text-dark sm:text-3xl">Selamat datang</h1>
        <p className="mt-1.5 font-body text-[0.95rem] text-dark/60">
          Masuk sebagai <span className="break-all font-semibold text-dark/80">{email || 'Admin'}</span>
        </p>
      </div>
      <p className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-dark/[0.06] bg-white px-3.5 py-2 text-xs font-medium text-dark/60 shadow-sm">
        <CalendarIcon className="h-4 w-4 text-primary" />
        {todayLabel}
      </p>
    </header>
  );
}

const toneClasses = {
  primary: 'bg-primary/10 text-primary',
  gold: 'bg-gold/15 text-[#a98a35]',
  navy: 'bg-navy/[0.08] text-navy',
} as const;

function StatCard({
  icon: Icon,
  tone,
  label,
  value,
  hint,
  className = '',
}: {
  icon: ComponentType<IconProps>;
  tone: keyof typeof toneClasses;
  label: string;
  value: ReactNode;
  hint: string;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-dark/[0.06] bg-white p-4 shadow-sm sm:p-5 ${className}`}>
      <div className="flex items-start justify-between gap-2">
        <dt className="pt-1 text-[13px] font-medium leading-snug text-dark/55">{label}</dt>
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${toneClasses[tone]}`} aria-hidden="true">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <dd className="mt-2 font-sans text-3xl font-bold tabular-nums leading-tight tracking-tight text-dark">{value}</dd>
      {hint && <dd className="mt-1 text-xs text-dark/50">{hint}</dd>}
    </div>
  );
}

function QuickActions() {
  const actions: {
    href: string;
    title: string;
    description: string;
    icon: ComponentType<IconProps>;
    featured?: boolean;
  }[] = [
    {
      href: '/admin/pengacara/baru',
      title: 'Tambah Pengacara',
      description: 'Tambahkan profil advokat baru ke halaman Tim.',
      icon: UserPlusIcon,
    },
    {
      href: '/admin/artikel/baru',
      title: 'Tulis Artikel',
      description: 'Terbitkan artikel hukum baru di website.',
      icon: PencilSquareIcon,
      featured: true,
    },
    {
      href: '/admin/pengacara',
      title: 'Kelola Pengacara',
      description: 'Ubah profil, urutan, dan status tampil.',
      icon: UsersIcon,
    },
  ];

  return (
    <section aria-labelledby="dashboard-actions">
      <h2 id="dashboard-actions" className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-dark/50">
        Aksi cepat
      </h2>
      <ul className="mt-3 grid gap-3 sm:grid-cols-3 sm:gap-4">
        {actions.map(({ href, title, description, icon: Icon, featured }) => (
          <li key={href}>
            <Link
              href={href}
              className={`group flex h-full min-h-[76px] items-center gap-4 rounded-2xl border p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 sm:flex-col sm:items-start sm:p-5 ${
                featured
                  ? 'border-navy bg-navy text-white hover:bg-[#213a50]'
                  : 'border-dark/[0.06] bg-white text-dark hover:border-primary/30'
              }`}
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                  featured ? 'bg-gold text-navy' : 'bg-primary/10 text-primary'
                }`}
                aria-hidden="true"
              >
                <Icon className="h-[22px] w-[22px]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2 font-sans text-[15px] font-semibold">
                  {title}
                  <ArrowRightIcon
                    className={`hidden h-4 w-4 transition-transform group-hover:translate-x-0.5 sm:block ${
                      featured ? 'text-gold' : 'text-primary'
                    }`}
                  />
                </span>
                <span className={`mt-0.5 block text-[13px] leading-snug ${featured ? 'text-white/70' : 'text-dark/55'}`}>
                  {description}
                </span>
              </span>
              <ArrowRightIcon className={`h-5 w-5 shrink-0 sm:hidden ${featured ? 'text-gold' : 'text-dark/30'}`} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CardHeader({
  id,
  title,
  description,
  action,
}: {
  id: string;
  title: string;
  description?: ReactNode;
  action?: { href: string; label: string };
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-dark/[0.06] px-4 py-3.5 sm:px-6">
      <div className="min-w-0">
        <h2 id={id} className="font-sans text-base font-semibold text-dark">
          {title}
        </h2>
        {description && <p className="mt-0.5 text-xs text-dark/50">{description}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="-mr-2 inline-flex min-h-[44px] shrink-0 items-center gap-1 rounded-xl px-2 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary/5 hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          {action.label}
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

function EmptyState({ icon: Icon, title, description, action }: {
  icon: ComponentType<IconProps>;
  title: string;
  description: string;
  action: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col items-center px-6 py-10 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary" aria-hidden="true">
        <Icon className="h-6 w-6" />
      </span>
      <p className="mt-4 font-sans text-[15px] font-semibold text-dark">{title}</p>
      <p className="mt-1 max-w-xs text-sm text-dark/55">{description}</p>
      <Link
        href={action.href}
        className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-navy px-5 text-sm font-semibold text-white transition-colors hover:bg-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
      >
        {action.label}
      </Link>
    </div>
  );
}

function RecentArticles({ articles, now }: { articles: ArticleSummary[]; now: Date }) {
  return (
    <section
      aria-labelledby="dashboard-articles"
      className="overflow-hidden rounded-2xl border border-dark/[0.06] bg-white shadow-sm lg:col-span-3"
    >
      <CardHeader
        id="dashboard-articles"
        title="Artikel terbaru"
        description="Lima artikel terakhir"
        action={{ href: '/admin/artikel', label: 'Lihat semua' }}
      />

      {articles.length === 0 ? (
        <EmptyState
          icon={DocumentIcon}
          title="Belum ada artikel"
          description="Artikel yang Anda terbitkan akan muncul di sini."
          action={{ href: '/admin/artikel/baru', label: 'Tulis artikel pertama' }}
        />
      ) : (
        <ul className="divide-y divide-dark/[0.06]">
          {articles.map((article) => {
            const live = isLive(article, now);
            const meta = (
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-dark/55">
                {article.category && (
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 font-medium text-primary">{article.category}</span>
                )}
                <span className="inline-flex items-center gap-1">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  <time dateTime={article.published_at}>{formatDate(article.published_at, 'id')}</time>
                </span>
                {article.featured && (
                  <span className="inline-flex items-center gap-1 font-medium text-[#a98a35]">
                    <StarIcon className="h-3.5 w-3.5" />
                    Unggulan
                  </span>
                )}
                {!live && (
                  <span className="rounded-full bg-amber-100 px-2.5 py-1 font-medium text-amber-800">
                    {article.is_published ? 'Terjadwal' : 'Tidak tampil'}
                  </span>
                )}
              </div>
            );

            return (
              <li key={article.id}>
                {live ? (
                  <Link
                    href={`/artikel/${article.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 px-4 py-4 transition-colors hover:bg-[#f8fbfd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40 sm:px-6"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="break-words font-sans text-[15px] font-semibold leading-snug text-dark transition-colors group-hover:text-primary">
                        {article.title}
                      </p>
                      {meta}
                    </div>
                    <ExternalLinkIcon className="mt-1 h-4 w-4 shrink-0 text-dark/30 transition-colors group-hover:text-primary" />
                    <span className="sr-only">(membuka tab baru)</span>
                  </Link>
                ) : (
                  <div className="px-4 py-4 sm:px-6">
                    <p className="break-words font-sans text-[15px] font-semibold leading-snug text-dark">{article.title}</p>
                    {meta}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

function LawyerAvatar({ lawyer }: { lawyer: LawyerSummary }) {
  const src = lawyer.image_url?.trim();

  if (!src) {
    return (
      <span
        aria-hidden="true"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/60 font-sans text-sm font-semibold text-navy"
      >
        {initialsOf(lawyer.name)}
      </span>
    );
  }

  return (
    <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-accent/40 ring-1 ring-dark/5">
      <Image
        src={src}
        alt={`Foto ${lawyer.name}`}
        fill
        sizes="44px"
        className="object-cover object-top"
        unoptimized={!canOptimizeImage(src)}
      />
    </span>
  );
}

function TeamPreview({
  lawyers,
  activeCount,
  hiddenCount,
}: {
  lawyers: LawyerSummary[];
  activeCount: number;
  hiddenCount: number;
}) {
  const preview = lawyers.slice(0, TEAM_PREVIEW_LIMIT);
  const remaining = lawyers.length - preview.length;

  return (
    <section
      aria-labelledby="dashboard-team"
      className="overflow-hidden rounded-2xl border border-dark/[0.06] bg-white shadow-sm lg:col-span-2 lg:row-span-2"
    >
      <CardHeader
        id="dashboard-team"
        title="Tim pengacara"
        description={
          lawyers.length > 0
            ? `${activeCount} aktif${hiddenCount > 0 ? ` · ${hiddenCount} disembunyikan` : ''}`
            : undefined
        }
        action={{ href: '/admin/pengacara', label: 'Kelola' }}
      />

      {lawyers.length === 0 ? (
        <EmptyState
          icon={UsersIcon}
          title="Belum ada pengacara"
          description="Tambahkan profil advokat agar tampil di halaman Tim."
          action={{ href: '/admin/pengacara/baru', label: 'Tambah pengacara' }}
        />
      ) : (
        <>
          <ul className="divide-y divide-dark/[0.06]">
            {preview.map((lawyer) => (
              <li key={lawyer.id} className="flex items-center gap-3 py-3 pl-4 pr-2 sm:pl-5 sm:pr-3">
                <LawyerAvatar lawyer={lawyer} />
                <div className="min-w-0 flex-1">
                  <p className="break-words font-sans text-sm font-semibold leading-snug text-dark">{lawyer.name}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                    {lawyer.position && (
                      <span className="min-w-0 break-words text-xs text-dark/55">{lawyer.position}</span>
                    )}
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        lawyer.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-dark/[0.06] text-dark/55'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${lawyer.is_active ? 'bg-emerald-500' : 'bg-dark/35'}`}
                        aria-hidden="true"
                      />
                      {lawyer.is_active ? 'Aktif' : 'Disembunyikan'}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/admin/pengacara/${lawyer.id}`}
                  aria-label={`Edit ${lawyer.name}`}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-dark/45 transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  <PencilIcon className="h-[18px] w-[18px]" />
                </Link>
              </li>
            ))}
          </ul>
          {remaining > 0 && (
            <div className="border-t border-dark/[0.06] p-2">
              <Link
                href="/admin/pengacara"
                className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl text-sm font-semibold text-primary-700 transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                Lihat {remaining} pengacara lainnya
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
}

function SeoTips() {
  const tips: ReactNode[] = [
    <>
      Tulis <strong className="font-semibold text-white">minimal 800 kata</strong> agar pembahasan tuntas dan dipercaya
      mesin pencari.
    </>,
    <>
      Gunakan <strong className="font-semibold text-white">subjudul berbentuk pertanyaan</strong>, mis. &ldquo;Bagaimana
      cara mengajukan gugatan cerai?&rdquo;
    </>,
    <>
      Isi bagian <strong className="font-semibold text-white">Poin Penting &amp; FAQ</strong> &mdash; jawaban singkat ini
      sering tampil di Google dan asisten AI.
    </>,
    <>
      Pilih <strong className="font-semibold text-white">advokat sebagai penulis</strong> untuk menunjukkan keahlian dan
      kredibilitas.
    </>,
    <>
      <strong className="font-semibold text-white">Tautkan ke halaman layanan terkait</strong> agar pembaca mudah
      berkonsultasi.
    </>,
  ];

  return (
    <section
      aria-labelledby="dashboard-seo-tips"
      className="relative isolate overflow-hidden rounded-2xl bg-navy p-5 text-white shadow-sm sm:p-6 lg:col-span-3"
    >
      <div
        aria-hidden="true"
        className="absolute -right-16 -top-20 -z-10 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(75,143,187,0.45),transparent_70%)]"
      />
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold" aria-hidden="true">
          <LightBulbIcon className="h-5 w-5" />
        </span>
        <h2 id="dashboard-seo-tips" className="font-sans text-base font-semibold sm:text-lg">
          Tips menulis artikel SEO
        </h2>
      </div>
      <ol className="mt-5 space-y-3.5">
        {tips.map((tip, index) => (
          <li key={index} className="flex gap-3">
            <span
              aria-hidden="true"
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 font-sans text-xs font-semibold text-gold"
            >
              {index + 1}
            </span>
            <p className="font-body text-[0.95rem] leading-relaxed text-white/75">{tip}</p>
          </li>
        ))}
      </ol>
      <Link
        href="/admin/artikel/baru"
        className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-gold px-5 text-sm font-semibold text-navy transition-colors hover:bg-[#d6b75c] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold/40"
      >
        Mulai menulis
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </section>
  );
}

function SetupNotice() {
  return (
    <section aria-labelledby="dashboard-setup" className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700" aria-hidden="true">
          <DatabaseIcon className="h-6 w-6" />
        </span>
        <div className="min-w-0">
          <h2 id="dashboard-setup" className="font-sans text-base font-semibold text-amber-900">
            Database belum siap
          </h2>
          <p className="mt-1.5 break-words text-sm leading-relaxed text-amber-900/80">
            Tabel database belum dibuat. Jalankan{' '}
            <code className="rounded bg-white/70 px-1 py-0.5 text-[0.85em]">supabase/migrations/20261017000000_init.sql</code> dan{' '}
            <code className="rounded bg-white/70 px-1 py-0.5 text-[0.85em]">supabase/seed.sql</code> di Supabase SQL Editor &mdash;
            lihat <strong className="font-semibold">ADMIN-SETUP.md</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}

function LoadErrorCard() {
  return (
    <section aria-labelledby="dashboard-error" className="rounded-2xl border border-red-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600" aria-hidden="true">
          <WarningIcon className="h-6 w-6" />
        </span>
        <div className="min-w-0">
          <h2 id="dashboard-error" className="font-sans text-base font-semibold text-dark">
            Data dashboard gagal dimuat
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-dark/60">
            Terjadi kendala saat mengambil data dari server. Periksa koneksi internet Anda, lalu muat ulang halaman ini.
          </p>
          <Link
            href="/admin"
            className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-dark/15 bg-white px-4 text-sm font-semibold text-dark transition-colors hover:bg-dark/5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
          >
            <RefreshIcon className="h-4 w-4" />
            Muat ulang
          </Link>
        </div>
      </div>
    </section>
  );
}
