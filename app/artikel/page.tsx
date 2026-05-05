import type { Metadata } from 'next';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { generatePageMetadata } from '@/lib/metadata';
import ArtikelClient from './ArtikelClient';

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Artikel & Wawasan Hukum | Raya Law Firm',
    description:
      'Kumpulan artikel dan wawasan hukum Raya Law Firm untuk membantu Anda memahami isu legal secara praktis dan strategis.',
    path: '/artikel',
  });
}

export default function ArtikelPage() {
  return (
    <main className="flex flex-col">
      <section className="relative overflow-hidden bg-navy py-16 lg:py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-primary/30" />
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-16">
          <div className="max-w-2xl" data-aos="fade-up">
            <Breadcrumb items={[{ label: 'Beranda', href: '/' }, { label: 'Artikel' }]} />
            <h1 className="mt-4 font-sans text-5xl font-extrabold tracking-tight text-white lg:text-7xl">
              Artikel dan Wawasan Hukum
            </h1>
            <p className="mt-4 font-body text-base text-white/70 lg:text-lg">
              Insight hukum terkini yang dirangkum secara jelas untuk membantu
              Anda memahami risiko dan peluang secara tepat.
            </p>
          </div>
        </div>
      </section>

      <ArtikelClient />
    </main>
  );
}
