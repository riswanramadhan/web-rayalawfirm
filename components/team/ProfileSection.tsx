import type { ReactNode } from 'react';
import { CheckIcon } from './icons';

interface ProfileSectionProps {
  id: string;
  title: string;
  children: ReactNode;
  action?: ReactNode;
}

/** Blok konten halaman profil (kartu putih dengan judul h2). */
export default function ProfileSection({ id, title, children, action }: ProfileSectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="scroll-mt-28 rounded-2xl border border-primary/10 bg-white p-5 shadow-sm sm:p-8"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <h2 id={headingId} className="break-words font-sans text-xl font-bold tracking-tight text-dark sm:text-2xl">
          {title}
        </h2>
        {action}
      </div>
      <div className="mt-4 sm:mt-5">{children}</div>
    </section>
  );
}

export function ProfileList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={`${index}-${item}`} className="flex items-start gap-3">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckIcon className="h-3.5 w-3.5" />
          </span>
          <span className="min-w-0 break-words font-body text-[15px] leading-relaxed text-dark/75 sm:text-base">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function ChipList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <li
          key={`${index}-${item}`}
          className="max-w-full break-words rounded-xl border border-primary/15 bg-primary/5 px-3.5 py-2 font-body text-sm font-semibold text-primary-700"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
