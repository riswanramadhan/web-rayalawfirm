'use client';

import { Field, TextArea, TextInput } from '@/components/admin/form';
import { seoToneClassName, type SeoCheck, type SeoReport, type SeoStatus } from './seo';

interface SeoPanelProps {
  report: SeoReport;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  onMetaTitleChange: (value: string) => void;
  onMetaDescriptionChange: (value: string) => void;
  metaTitleId: string;
  metaDescriptionId: string;
  metaTitleError?: string;
  metaDescriptionError?: string;
  /** Placeholder = judul & ringkasan (dipakai bila kolom SEO kosong). */
  titleFallback: string;
  descriptionFallback: string;
  /** Tanggal terbit yang ditampilkan di pratinjau Google, mis. "17 Okt 2026". */
  dateLabel?: string;
}

const SITE_URL = 'https://rayalawfirm.com';

function truncate(value: string, max: number): string {
  if (value.length <= max) return value;
  const cut = value.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

export function StatusIcon({ status, className = 'h-5 w-5' }: { status: SeoStatus; className?: string }) {
  if (status === 'pass') {
    return (
      <svg className={`${className} text-emerald-600`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
      </svg>
    );
  }
  if (status === 'warn') {
    return (
      <svg className={`${className} text-amber-500`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
      </svg>
    );
  }
  return (
    <svg className={`${className} text-red-500`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
    </svg>
  );
}

const statusText: Record<SeoStatus, string> = { pass: 'Terpenuhi', warn: 'Perlu perhatian', fail: 'Belum terpenuhi' };

function CheckRow({ check }: { check: SeoCheck }) {
  return (
    <li className="flex items-start gap-3 py-3">
      <span className="mt-0.5 shrink-0">
        <StatusIcon status={check.status} />
        <span className="sr-only">{statusText[check.status]}:</span>
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
          <p className="text-sm font-medium text-dark">{check.label}</p>
          <p className="text-xs tabular-nums text-dark/50">{check.detail}</p>
        </div>
        {check.tip && check.status !== 'pass' && (
          <p className="mt-1 break-words text-xs leading-relaxed text-dark/55">{check.tip}</p>
        )}
      </div>
    </li>
  );
}

export function SeoScoreBadge({ report, className = '' }: { report: SeoReport; className?: string }) {
  const tone = seoToneClassName[report.tone];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold tabular-nums ring-1 ring-inset ${tone.bg} ${tone.text} ${tone.ring} ${className}`}
    >
      SEO {report.score}/100
    </span>
  );
}

/** Kolom meta SEO + pratinjau hasil Google + checklist SEO dengan skor. */
export default function SeoPanel({
  report,
  slug,
  metaTitle,
  metaDescription,
  onMetaTitleChange,
  onMetaDescriptionChange,
  metaTitleId,
  metaDescriptionId,
  metaTitleError,
  metaDescriptionError,
  titleFallback,
  descriptionFallback,
  dateLabel,
}: SeoPanelProps) {
  const tone = seoToneClassName[report.tone];
  const previewTitle = report.effectiveTitle || 'Judul artikel Anda akan tampil di sini';
  const previewDescription =
    report.effectiveDescription || 'Ringkasan artikel akan tampil di sini sebagai deskripsi hasil pencarian.';
  const breadcrumb = `${SITE_URL} › artikel${slug ? ` › ${slug}` : ''}`;
  const passed = report.checks.filter((check) => check.status === 'pass').length;

  return (
    <div className="space-y-6">
      <Field
        label="Judul SEO"
        htmlFor={metaTitleId}
        error={metaTitleError}
        counter={{ value: metaTitle.trim().length, max: 70, recommended: [50, 60] }}
        hint="Opsional. Judul khusus untuk Google (ideal 50–60 karakter). Kosongkan untuk memakai judul artikel."
      >
        <TextInput
          id={metaTitleId}
          value={metaTitle}
          onChange={(event) => onMetaTitleChange(event.target.value)}
          maxLength={70}
          placeholder={titleFallback || 'Sama dengan judul artikel'}
          invalid={Boolean(metaTitleError)}
        />
      </Field>

      <Field
        label="Deskripsi SEO"
        htmlFor={metaDescriptionId}
        error={metaDescriptionError}
        counter={{ value: metaDescription.trim().length, max: 170, recommended: [120, 160] }}
        hint="Opsional. Tampil di bawah judul pada hasil Google (ideal 120–160 karakter). Kosongkan untuk memakai ringkasan."
      >
        <TextArea
          id={metaDescriptionId}
          rows={3}
          value={metaDescription}
          onChange={(event) => onMetaDescriptionChange(event.target.value)}
          maxLength={170}
          placeholder={descriptionFallback || 'Sama dengan ringkasan artikel'}
          invalid={Boolean(metaDescriptionError)}
        />
      </Field>

      <div>
        <p className="mb-2 text-sm font-semibold text-dark">Pratinjau di Google</p>
        <div className="rounded-xl border border-dark/10 bg-white p-4 shadow-sm" role="group" aria-label="Pratinjau hasil pencarian Google">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full border border-dark/10 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo-rayalawfirm.png" alt="" width={20} height={20} className="h-5 w-5 object-contain" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm leading-tight text-[#202124]">Raya Law Firm</p>
              <p className="truncate text-xs leading-tight text-[#4d5156]">{breadcrumb}</p>
            </div>
          </div>
          <p className="mt-2 break-words text-lg leading-snug text-[#1a0dab] sm:text-xl">{truncate(previewTitle, 60)}</p>
          <p className="mt-1 break-words text-sm leading-relaxed text-[#4d5156]">
            {dateLabel && <span className="text-[#70757a]">{dateLabel} — </span>}
            {truncate(previewDescription, 160)}
          </p>
        </div>
        <p className="mt-1.5 text-xs text-dark/50">Perkiraan tampilan. Google dapat menyesuaikan judul & deskripsi.</p>
      </div>

      <div className="rounded-xl border border-dark/10 bg-offwhite p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-dark">Checklist SEO</p>
            <p className="text-xs text-dark/55">
              {passed} dari {report.checks.length} terpenuhi
            </p>
          </div>
          <div className="text-right">
            <p className={`font-sans text-2xl font-bold tabular-nums ${tone.text}`}>
              {report.score}
              <span className="text-sm font-semibold text-dark/40">/100</span>
            </p>
            <p className={`text-xs font-semibold ${tone.text}`}>{report.label}</p>
          </div>
        </div>
        <div
          className="mt-3 h-2 overflow-hidden rounded-full bg-dark/10"
          role="progressbar"
          aria-label="Skor SEO"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={report.score}
        >
          <div className={`h-full rounded-full transition-all ${tone.bar}`} style={{ width: `${report.score}%` }} />
        </div>
        <ul className="mt-2 divide-y divide-dark/5">
          {report.checks.map((check) => (
            <CheckRow key={check.id} check={check} />
          ))}
        </ul>
      </div>
    </div>
  );
}
