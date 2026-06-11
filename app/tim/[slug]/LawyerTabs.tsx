// import { useState } from 'react';
import type { Lawyer } from '@/lib/data/team';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

// type TabKey = 'Profil' | 'Keahlian' | 'Pencapaian';

interface LawyerTabsProps {
  lawyer: Lawyer;
  expertise: string[];
  locale: Locale;
}

const socialIcons = {
  linkedin: (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  ),
  instagram: (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
      <path d="M17.5 6.5h.01" />
    </svg>
  ),
  facebook: (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.03 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.96.93-1.96 1.89v2.27h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z" />
    </svg>
  ),
};

export default function LawyerTabs({
  lawyer,
  expertise,
  locale,
}: LawyerTabsProps) {
  const t = getDictionary(locale).lawyerDetail;
  // const [activeTab, setActiveTab] = useState<TabKey>('Profil');
  // const bioParagraphs = lawyer.bio.split('\n\n');

  return (
    <div className="rounded-2xl border border-primary/10 bg-white text-sm text-dark/70 p-6 shadow-sm">
      {/* {bioParagraphs.map((paragraph, index) => (
        <p key={`bio-${index}`}>{paragraph}</p>
      ))} */}
      <div className="rounded-2xl border border-primary/10 bg-offwhite p-4">
        <p className="text-xs uppercase tracking-[0.3em] text-dark/50">
          {t.contact}
        </p>
        <div className="mt-3 space-y-2">
          <p className="text-sm text-dark/70">Email: {lawyer.email}</p>
          <p className="text-sm text-dark/70">
            {getDictionary(locale).common.phone}: +{lawyer.phone}
          </p>
          <div className="flex flex-col gap-2">
            {lawyer.linkedin && (
              <a
                href={lawyer.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/15"
              >
                {socialIcons.linkedin}
                LinkedIn
              </a>
            )}
            {lawyer.instagram && (
              <a
                href={lawyer.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/15"
              >
                {socialIcons.instagram}
                Instagram
              </a>             
            )}
            {lawyer.facebook && (
              <a
                href={lawyer.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/15"
              >
                {socialIcons.facebook}
                Facebook
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="rounded-2xl border border-primary/10 bg-offwhite p-4 mt-6">
        <p className="text-xs uppercase tracking-[0.3em] text-dark/50">
          {t.expertise}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {expertise.map((item) => (
            <span
              key={item}
              className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      {/* <div className="mt-6">
        <p>
          Area keahlian berikut menjadi fokus pendampingan utama.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {expertise.map((item) => (
            <span
              key={item}
              className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
            >
              {item}
            </span>
          ))}
        </div>
      </div> */}
      {lawyer.achievements.length > 0 && (
        <div className="rounded-2xl border border-primary/10 bg-offwhite p-4 mt-6">
          <p className="text-xs uppercase tracking-[0.3em] text-dark/50">
            {t.achievements}
          </p>
          <ul className="mt-3 space-y-3">
            {lawyer.achievements.map((achievement) => (
              <li key={achievement} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                <p className="text-sm text-dark/70">{achievement}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* <div className="mt-6 space-y-6">
        <div>
          <p className="text-sm font-semibold text-dark">Pencapaian Utama</p>
          <ul className="mt-3 space-y-3">
            {lawyer.achievements.map((achievement) => (
              <li key={achievement} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                <p className="text-sm text-dark/70">{achievement}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-dark">Pendidikan</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {lawyer.education.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-primary/10 bg-offwhite p-4 text-sm text-dark/70"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div> */}
      {lawyer.handledCases.length > 0 && (
        <div className="rounded-2xl border border-primary/10 bg-offwhite p-4 mt-6">
          <p className="text-xs uppercase tracking-[0.3em] text-dark/50">
            {t.handledCases}
          </p>
          <ul className="mt-3 space-y-3">
            {lawyer.handledCases.map((handledCase) => (
              <li key={handledCase} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                <p className="text-sm text-dark/70">{handledCase}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
