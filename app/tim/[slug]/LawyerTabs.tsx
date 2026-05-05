'use client';

import { useState } from 'react';
import type { Lawyer } from '@/lib/data/team';

type TabKey = 'Profil' | 'Keahlian' | 'Pencapaian';

interface LawyerTabsProps {
  lawyer: Lawyer;
  expertise: string[];
}

export default function LawyerTabs({ lawyer, expertise }: LawyerTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('Profil');
  const bioParagraphs = lawyer.bio.split('\n\n');

  return (
    <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap gap-3">
        {(['Profil', 'Keahlian', 'Pencapaian'] as TabKey[]).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              activeTab === tab
                ? 'bg-primary text-white'
                : 'bg-primary/10 text-primary hover:bg-primary/20'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Profil' && (
        <div className="mt-6 space-y-4 text-sm text-dark/70">
          {bioParagraphs.map((paragraph, index) => (
            <p key={`bio-${index}`}>{paragraph}</p>
          ))}
          <div className="mt-6 rounded-2xl border border-primary/10 bg-offwhite p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-dark/50">
              Kontak
            </p>
            <div className="mt-3 space-y-2">
              <p className="text-sm text-dark/70">Email: {lawyer.email}</p>
              <p className="text-sm text-dark/70">Telepon: +{lawyer.phone}</p>
              <a
                href={lawyer.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-primary"
              >
                Profil LinkedIn
              </a>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Keahlian' && (
        <div className="mt-6">
          <p className="text-sm text-dark/70">
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
        </div>
      )}

      {activeTab === 'Pencapaian' && (
        <div className="mt-6 space-y-6">
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
        </div>
      )}
    </div>
  );
}
