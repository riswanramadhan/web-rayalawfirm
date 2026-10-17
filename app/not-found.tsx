import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { getCurrentLocale } from '@/lib/i18n/server';

export const metadata: Metadata = {
  title: 'Halaman tidak ditemukan',
  robots: { index: false, follow: true },
};

const ArrowIcon = () => (
  <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M8.22 5.22a.75.75 0 011.06 0l5 5a.75.75 0 010 1.06l-5 5a.75.75 0 11-1.06-1.06L12.19 11 8.22 7.03a.75.75 0 010-1.06z"
      clipRule="evenodd"
    />
  </svg>
);

/**
 * 404 bermerek. Dirender oleh root layout (tanpa chrome situs), jadi Navbar
 * dan Footer dipasang langsung di sini.
 */
export default function NotFound() {
  const locale = getCurrentLocale();
  const t = getDictionary(locale);
  const copy = t.notFoundPage;

  const links = [
    { href: '/layanan', label: t.common.services, description: copy.links.services },
    { href: '/artikel', label: t.common.articles, description: copy.links.articles },
    { href: '/konsultasi', label: t.common.consultation, description: copy.links.consultation },
    { href: '/kontak', label: t.common.contact, description: copy.links.contact },
  ];

  return (
    <>
      <Navbar />
      <main id="main" className="flex flex-col">
        <section className="relative overflow-hidden bg-navy pb-16 pt-28 sm:pb-20 lg:pb-24 lg:pt-36">
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-primary/30" />
          <div
            aria-hidden="true"
            className="absolute -right-24 top-16 hidden h-80 w-80 rounded-full border border-primary/20 opacity-40 sm:block"
          />
          <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
            <div className="max-w-3xl">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-accent sm:text-sm">
                {copy.eyebrow}
              </p>
              <p
                aria-hidden="true"
                className="mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text font-sans text-7xl font-extrabold leading-none text-transparent sm:text-8xl lg:text-9xl"
              >
                404
              </p>
              <h1 className="mt-4 text-balance break-words font-sans text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
                {copy.title}
              </h1>
              <p className="mt-4 max-w-2xl text-pretty font-body text-base leading-relaxed text-white/75 sm:text-lg">
                {copy.description}
              </p>
              <Link
                href="/"
                className="mt-8 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6fa6c9] to-accent px-7 font-semibold text-navy shadow-lg shadow-primary/30 transition-transform duration-300 hover:-translate-y-0.5 xs:w-auto"
              >
                {copy.backHome}
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </section>

        <section aria-labelledby="not-found-links" className="bg-offwhite py-12 sm:py-16 lg:py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
            <h2
              id="not-found-links"
              className="text-balance font-sans text-xl font-bold tracking-tight text-dark sm:text-2xl"
            >
              {copy.linksTitle}
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
              {links.map((link) => (
                <li key={link.href} className="min-w-0">
                  <Link
                    href={link.href}
                    className="group flex h-full min-h-[88px] flex-col justify-center rounded-2xl border border-primary/10 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
                  >
                    <span className="flex items-center justify-between gap-3 font-sans text-base font-semibold text-dark transition-colors group-hover:text-primary">
                      {link.label}
                      <ArrowIcon />
                    </span>
                    <span className="mt-1 font-body text-sm leading-relaxed text-dark/65">{link.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
