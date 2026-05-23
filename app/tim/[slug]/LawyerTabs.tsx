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
                className="text-sm font-semibold text-primary"
              >
                LinkedIn
              </a>
            )}
            {lawyer.instagram && (
              <a
                href={lawyer.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-primary"
              >
                Instagram
              </a>             
            )}
            {lawyer.facebook && (
              <a
                href={lawyer.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-primary"
              >
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
