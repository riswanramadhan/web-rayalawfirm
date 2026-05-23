import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import HeroSection from '@/components/sections/HeroSection';
import ProfileSection from '@/components/sections/ProfileSection';
import ServicesSection from '@/components/sections/ServicesSection';
import VisiMisiSection from '@/components/sections/VisiMisiSection';
import {
  generatePageMetadata,
  legalServiceSchema,
  organizationSchema,
} from '@/lib/metadata';
import { getCurrentLocale } from '@/lib/i18n/server';
import { getDictionary } from '@/lib/i18n/dictionaries';

const SectionSkeleton = ({ className = 'bg-offwhite' }: { className?: string }) => (
  <div className={`min-h-[60vh] w-full animate-pulse ${className}`} />
);

const TeamSection = dynamic(() => import('@/components/sections/TeamSection'), {
  loading: () => <SectionSkeleton className="bg-offwhite" />,
});

const TestimoniSection = dynamic(
  () => import('@/components/sections/TestimoniSection'),
  {
    loading: () => <SectionSkeleton className="bg-white" />,
  }
);

const ArtikelSection = dynamic(
  () => import('@/components/sections/ArtikelSection'),
  {
    loading: () => <SectionSkeleton className="bg-offwhite" />,
  }
);

const KonsultasiSection = dynamic(
  () => import('@/components/sections/KonsultasiSection'),
  {
    loading: () => (
      <SectionSkeleton className="bg-gradient-to-br from-primary/5 via-accent/10 to-primary/5" />
    ),
  }
);

const CTASection = dynamic(() => import('@/components/sections/CTASection'), {
  loading: () => <SectionSkeleton className="bg-navy" />,
});

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
    <main className="flex flex-col">
      <HeroSection locale={locale} />
      <ProfileSection locale={locale} />
      <ServicesSection locale={locale} />
      <VisiMisiSection locale={locale} />
      <TeamSection locale={locale} />
      <TestimoniSection locale={locale} />
      <ArtikelSection locale={locale} />
      <KonsultasiSection locale={locale} />
      <CTASection locale={locale} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(legalServiceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
    </main>
  );
}
