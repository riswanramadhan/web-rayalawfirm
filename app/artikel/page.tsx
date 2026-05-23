import type { Metadata } from 'next';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { generatePageMetadata } from '@/lib/metadata';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { getCurrentLocale } from '@/lib/i18n/server';
import ArtikelClient from './ArtikelClient';

export function generateMetadata(): Metadata {
  const locale = getCurrentLocale();
  const t = getDictionary(locale).articlePage;

  return generatePageMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: '/artikel',
    locale,
  });
}

export default function ArtikelPage() {
  const locale = getCurrentLocale();
  const t = getDictionary(locale);

  return (
    <main className="flex flex-col">
      <section className="relative overflow-hidden bg-navy pt-24 pb-16 lg:pt-28 lg:pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-primary/30" />
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-16">
          <div className="max-w-2xl" data-aos="fade-up">
            <Breadcrumb
              items={[
                { label: t.common.home, href: '/' },
                { label: t.articlePage.breadcrumb },
              ]}
            />
            <h1 className="mt-4 font-sans text-5xl font-extrabold tracking-tight text-white lg:text-7xl">
              {t.articlePage.title}
            </h1>
            <p className="mt-4 font-body text-base text-white/70 lg:text-lg">
              {t.articlePage.description}
            </p>
          </div>
        </div>
      </section>

      <ArtikelClient locale={locale} />
    </main>
  );
}
