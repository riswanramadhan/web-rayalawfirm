import type { Locale } from '@/lib/i18n/config';

/** String UI khusus halaman artikel (melengkapi dictionary articlePage/articleDetail). */
const labels = {
  id: {
    by: 'Oleh',
    published: 'Diterbitkan',
    updated: 'Diperbarui',
    category: 'Kategori',
    editorialTeam: 'Tim Redaksi',
    keyPoints: 'Poin Penting',
    toc: 'Daftar Isi',
    tocSections: (count: number) => `${count} bagian`,
    faqTitle: 'Pertanyaan yang Sering Diajukan',
    aboutAuthor: 'Tentang Penulis',
    viewProfile: 'Lihat profil',
    lawyerAuthorLine: (position: string) =>
      `${position} di Raya Law Firm. Lihat profil lengkap untuk pengalaman dan bidang keahlian beliau.`,
    disclaimerTitle: 'Catatan Penting',
    disclaimer:
      'Artikel ini bersifat informasi hukum umum dan bukan nasihat hukum untuk kasus tertentu. Untuk situasi Anda, konsultasikan dengan advokat Raya Law Firm.',
    disclaimerCta: 'Ajukan konsultasi',
    articleNav: 'Navigasi artikel',
    continueReading: 'Lanjutkan Membaca',
    consultForm: 'Isi form konsultasi',
    opensInNewTab: '(membuka tab baru)',
    readMore: 'Baca selengkapnya',
    featured: 'Pilihan Redaksi',
    latest: 'Artikel Terbaru',
    searchLabel: 'Cari artikel',
    searchSubmit: 'Cari',
    clearSearch: 'Hapus kata kunci',
    filterLabel: 'Filter kategori',
    resultsFor: (count: number, query: string) =>
      query ? `${count} artikel untuk “${query}”` : `${count} artikel`,
    resultsTitle: 'Hasil Pencarian',
    inCategory: (category: string) => `dalam kategori ${category}`,
    emptyTitle: 'Artikel tidak ditemukan',
    emptyDescription:
      'Coba kata kunci lain atau pilih kategori yang berbeda. Anda juga bisa langsung berkonsultasi dengan tim kami.',
    resetFilters: 'Tampilkan semua artikel',
    articleCount: (count: number) => `${count} artikel`,
    categoryCount: (count: number) => `${count} kategori`,
    share: 'Bagikan',
    shareVia: (network: string) => `Bagikan ke ${network}`,
    shareNative: 'Bagikan lewat aplikasi',
    blogName: 'Artikel Raya Law Firm',
  },
  en: {
    by: 'By',
    published: 'Published',
    updated: 'Updated',
    category: 'Category',
    editorialTeam: 'Editorial Team',
    keyPoints: 'Key Takeaways',
    toc: 'Table of Contents',
    tocSections: (count: number) => `${count} sections`,
    faqTitle: 'Frequently Asked Questions',
    aboutAuthor: 'About the Author',
    viewProfile: 'View profile',
    lawyerAuthorLine: (position: string) =>
      `${position} at Raya Law Firm. See the full profile for experience and areas of practice.`,
    disclaimerTitle: 'Important Note',
    disclaimer:
      'This article provides general legal information and is not legal advice for any specific case. For your situation, consult an advocate at Raya Law Firm.',
    disclaimerCta: 'Request a consultation',
    articleNav: 'Article navigation',
    continueReading: 'Keep Reading',
    consultForm: 'Fill in the consultation form',
    opensInNewTab: '(opens in a new tab)',
    readMore: 'Read more',
    featured: "Editor's Pick",
    latest: 'Latest Articles',
    searchLabel: 'Search articles',
    searchSubmit: 'Search',
    clearSearch: 'Clear search',
    filterLabel: 'Filter by category',
    resultsFor: (count: number, query: string) =>
      query
        ? `${count} ${count === 1 ? 'article' : 'articles'} for “${query}”`
        : `${count} ${count === 1 ? 'article' : 'articles'}`,
    resultsTitle: 'Search Results',
    inCategory: (category: string) => `in ${category}`,
    emptyTitle: 'No articles found',
    emptyDescription:
      'Try another keyword or choose a different category. You can also consult our team directly.',
    resetFilters: 'Show all articles',
    articleCount: (count: number) => `${count} ${count === 1 ? 'article' : 'articles'}`,
    categoryCount: (count: number) => `${count} ${count === 1 ? 'category' : 'categories'}`,
    share: 'Share',
    shareVia: (network: string) => `Share on ${network}`,
    shareNative: 'Share via apps',
    blogName: 'Raya Law Firm Articles',
  },
} as const;

export type ArticleLabels = (typeof labels)[Locale];

export function getArticleLabels(locale: Locale): ArticleLabels {
  return labels[locale] ?? labels.id;
}
