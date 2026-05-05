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
  return generatePageMetadata({
    title: 'Raya Law Firm | Kantor Hukum Profesional Indonesia',
    description:
      'Raya Law Firm adalah kantor hukum profesional di Indonesia dengan layanan pidana, perdata, bisnis, keluarga, properti, dan ketenagakerjaan. Konsultasi terpercaya untuk kebutuhan hukum Anda.',
    path: '/',
  });
}

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <ProfileSection />
      <ServicesSection />
      <VisiMisiSection />
      <TeamSection />
      <TestimoniSection />
      <ArtikelSection />
      <KonsultasiSection />
      <CTASection />

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
