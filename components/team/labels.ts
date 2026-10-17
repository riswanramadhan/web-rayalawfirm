import type { Locale } from '@/lib/i18n/config';

/** String UI khusus halaman tim (melengkapi lib/i18n/dictionaries). */
export const teamLabels = {
  id: {
    photoAlt: (name: string, position: string) => `${name}, ${position} di Raya Law Firm`,
    viewProfile: 'Lihat profil',
    profileEyebrow: 'Profil Advokat',
    profile: 'Profil',
    expertise: 'Bidang Keahlian',
    handledCases: 'Perkara yang Ditangani',
    achievements: 'Pencapaian & Sertifikasi',
    education: 'Pendidikan',
    contact: 'Kontak',
    contactIntro: 'Hubungi langsung untuk menjadwalkan konsultasi hukum yang rahasia.',
    phone: 'Telepon',
    email: 'Email',
    socialMedia: 'Media sosial',
    opensInNewTab: '(membuka tab baru)',
    generatedBio: (name: string, position: string, specialization: string) =>
      specialization
        ? `${name} adalah ${position} di Raya Law Firm, Jakarta, dengan fokus pada ${specialization}.`
        : `${name} adalah ${position} di Raya Law Firm, Jakarta.`,
    generatedBioCta:
      'Untuk konsultasi, Anda dapat menghubungi langsung melalui WhatsApp atau mengisi formulir konsultasi.',
    articlesBy: (name: string) => `Artikel oleh ${name}`,
    articlesIntro: 'Tulisan dan analisis hukum terbaru dari advokat kami.',
    viewAllArticles: 'Lihat semua artikel',
    viewAllTeam: 'Lihat semua tim',
    teamListName: 'Tim Advokat Raya Law Firm',
    metaDescriptionBase: (name: string, position: string, specialization: string) =>
      `${name}, ${position} di Raya Law Firm, Jakarta, dengan spesialisasi ${specialization}.`,
    metaDescriptionSuffixes: [
      ' Konsultasi hukum langsung via WhatsApp atau formulir online.',
      ' Konsultasi langsung via WhatsApp atau formulir online.',
      ' Jadwalkan konsultasi hukum Anda hari ini.',
      ' Jadwalkan konsultasi hukum Anda.',
      ' Konsultasi via WhatsApp.',
    ],
  },
  en: {
    photoAlt: (name: string, position: string) => `${name}, ${position} at Raya Law Firm`,
    viewProfile: 'View profile',
    profileEyebrow: 'Advocate Profile',
    profile: 'Profile',
    expertise: 'Areas of Expertise',
    handledCases: 'Cases Handled',
    achievements: 'Achievements & Certifications',
    education: 'Education',
    contact: 'Contact',
    contactIntro: 'Get in touch directly to schedule a confidential legal consultation.',
    phone: 'Phone',
    email: 'Email',
    socialMedia: 'Social media',
    opensInNewTab: '(opens in a new tab)',
    generatedBio: (name: string, position: string, specialization: string) =>
      specialization
        ? `${name} is ${position} at Raya Law Firm, Jakarta, focusing on ${specialization}.`
        : `${name} is ${position} at Raya Law Firm, Jakarta.`,
    generatedBioCta:
      'For a consultation, you can reach out directly via WhatsApp or fill in the consultation form.',
    articlesBy: (name: string) => `Articles by ${name}`,
    articlesIntro: 'The latest legal writing and analysis from our advocates.',
    viewAllArticles: 'View all articles',
    viewAllTeam: 'View all team',
    teamListName: 'Raya Law Firm Advocate Team',
    metaDescriptionBase: (name: string, position: string, specialization: string) =>
      `${name}, ${position} at Raya Law Firm, Jakarta, specializing in ${specialization}.`,
    metaDescriptionSuffixes: [
      ' Book a legal consultation directly via WhatsApp or the online form.',
      ' Consult directly via WhatsApp or the online form.',
      ' Schedule your legal consultation today.',
      ' Schedule your legal consultation.',
      ' Consult via WhatsApp.',
    ],
  },
} as const;

export const getTeamLabels = (locale: Locale) => teamLabels[locale];
