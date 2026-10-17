import type { Metadata } from 'next';
import { Suspense } from 'react';
import HeroSection from '@/components/sections/HeroSection';
import ProfileSection from '@/components/sections/ProfileSection';
import ServicesSection from '@/components/sections/ServicesSection';
import VisiMisiSection from '@/components/sections/VisiMisiSection';
import TeamSection from '@/components/sections/TeamSection';
import TestimoniSection from '@/components/sections/TestimoniSection';
import ArtikelSection from '@/components/sections/ArtikelSection';
import KonsultasiSection from '@/components/sections/KonsultasiSection';
import HomeFaqSection from '@/components/sections/HomeFaqSection';
import CTASection from '@/components/sections/CTASection';
import { generatePageMetadata } from '@/lib/metadata';
import { getCurrentLocale } from '@/lib/i18n/server';
import { getDictionary } from '@/lib/i18n/dictionaries';

/** Placeholder ringan selama section async (data Supabase) di-stream. */
const SectionSkeleton = ({ className = 'bg-offwhite' }: { className?: string }) => (
  <div aria-hidden="true" className={`min-h-[480px] w-full ${className}`} />
);

export function generateMetadata(): Metadata {
  const locale = getCurrentLocale();
  const t = getDictionary(locale).home;

  return generatePageMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: '/',
    locale,
  });
}

export default function HomePage() {
  const locale = getCurrentLocale();

  return (
    <main id="main" className="flex flex-col">
      <HeroSection locale={locale} />
      <ProfileSection locale={locale} />
      <ServicesSection locale={locale} />
      <VisiMisiSection locale={locale} />
      <Suspense fallback={<SectionSkeleton />}>
        <TeamSection locale={locale} />
      </Suspense>
      <TestimoniSection locale={locale} />
      <Suspense fallback={<SectionSkeleton />}>
        <ArtikelSection locale={locale} />
      </Suspense>
      <KonsultasiSection locale={locale} />
      <HomeFaqSection locale={locale} />
      <CTASection locale={locale} />
    </main>
  );
}
