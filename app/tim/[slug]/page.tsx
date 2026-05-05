import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { lawyers, type Lawyer } from '@/lib/data/team';
import { generatePageMetadata } from '@/lib/metadata';
import { buildWhatsAppURL } from '@/lib/whatsapp';
import LawyerTabs from './LawyerTabs';

interface PageProps {
  params: { slug: string };
}

const expertiseMap: Record<string, string[]> = {
  'raya-putri-sh-mh': [
    'Hukum Pidana Umum',
    'Pidana Korporasi',
    'Konstitusi',
    'Strategi Pembelaan',
    'Pendampingan Persidangan',
  ],
  'ahmad-fauzan-sh': [
    'Hukum Bisnis',
    'Due Diligence',
    'Kontrak Komersial',
    'Kepatuhan Korporasi',
    'Investasi & Akuisisi',
  ],
  'siti-rahma-sh-mkn': [
    'Pertanahan',
    'Transaksi Properti',
    'Sengketa Batas',
    'Verifikasi Sertifikat',
    'Mediasi Properti',
  ],
  'dimas-prasetyo-sh': [
    'Hubungan Industrial',
    'Perjanjian Kerja',
    'PHK & Pesangon',
    'Mediasi Ketenagakerjaan',
    'Kepatuhan HR',
  ],
};

const caseCounts: Record<string, string> = {
  'raya-putri-sh-mh': '120+',
  'ahmad-fauzan-sh': '80+',
  'siti-rahma-sh-mkn': '60+',
  'dimas-prasetyo-sh': '45+',
};

const getLawyerBySlug = (slug: string): Lawyer | undefined =>
  lawyers.find((lawyer) => lawyer.slug === slug);

export function generateStaticParams() {
  return lawyers.map((lawyer) => ({ slug: lawyer.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const lawyer = getLawyerBySlug(params.slug);

  if (!lawyer) {
    return generatePageMetadata({
      title: 'Profil Tidak Ditemukan',
      description: 'Profil advokat yang Anda cari tidak tersedia.',
      path: `/tim/${params.slug}`,
    });
  }

  return generatePageMetadata({
    title: lawyer.name,
    description: `Profil ${lawyer.name}, ${lawyer.position} di Raya Law Firm dengan spesialisasi ${lawyer.specialization}.`,
    path: `/tim/${lawyer.slug}`,
  });
}

export default function LawyerDetailPage({ params }: PageProps) {
  const lawyer = getLawyerBySlug(params.slug);

  if (!lawyer) {
    notFound();
  }

  const expertise = expertiseMap[lawyer.slug] ?? [lawyer.specialization];
  const waLink = buildWhatsAppURL(
    `Halo Raya Law Firm, saya ingin konsultasi langsung dengan ${lawyer.name}.`
  );
  const otherLawyers = lawyers.filter((item) => item.slug !== lawyer.slug).slice(0, 3);

  return (
    <main className="flex flex-col">
      <section className="relative overflow-hidden bg-navy py-16 lg:py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-primary/30" />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-6 lg:grid-cols-[1.2fr_1fr] lg:px-16">
          <div data-aos="fade-right">
            <Breadcrumb
              items={[
                { label: 'Beranda', href: '/' },
                { label: 'Tim', href: '/tim' },
                { label: lawyer.name },
              ]}
            />
            <h1 className="mt-4 font-sans text-5xl font-extrabold tracking-tight text-white lg:text-7xl">
              {lawyer.name}
            </h1>
            <p className="mt-3 text-lg text-white/80">{lawyer.position}</p>
            <span className="mt-4 inline-flex items-center rounded-full bg-primary/20 px-4 py-2 text-xs font-semibold text-accent">
              {lawyer.specialization}
            </span>
          </div>
          <div data-aos="fade-left" className="relative">
            <div className="absolute -inset-4 rounded-[2.5rem] border border-primary/30" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-primary/20 shadow-2xl shadow-primary/20">
              <Image
                src={lawyer.image}
                alt={lawyer.name}
                width={420}
                height={520}
                className="h-full w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 420px"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-7xl px-6 py-6 lg:px-16">
        <Link
          href="/tim"
          className="group inline-flex items-center gap-2 text-sm font-medium text-dark/60 transition-colors duration-200 hover:text-primary"
        >
          <svg
            className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Kembali ke Halaman Tim
        </Link>
      </div>

      <section className="bg-offwhite py-16 lg:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_2fr] lg:px-16">
          <div data-aos="fade-right" className="relative">
            <div className="lg:sticky lg:top-28">
              <div className="rounded-3xl border border-primary/20 bg-white p-4 shadow-lg shadow-primary/10">
                <Image
                  src={lawyer.image}
                  alt={`${lawyer.name} portrait`}
                  width={420}
                  height={520}
                  className="h-full w-full rounded-2xl object-cover"
                  sizes="(max-width: 1024px) 100vw, 360px"
                />
              </div>
              <div className="mt-6 rounded-2xl border border-primary/10 bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-dark/50">
                  Kontak
                </p>
                <p className="mt-3 text-sm text-dark/70">{lawyer.email}</p>
                <p className="text-sm text-dark/70">+{lawyer.phone}</p>
              </div>
            </div>
          </div>

          <div data-aos="fade-left" className="space-y-6">
            <h2 className="font-sans text-3xl font-bold tracking-tight text-dark lg:text-5xl">
              Profil dan Keahlian
            </h2>
            <LawyerTabs lawyer={lawyer} expertise={expertise} />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-6 md:grid-cols-3 lg:px-16">
          <div className="rounded-2xl border border-primary/10 bg-offwhite p-6 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-dark/50">
              Pengalaman
            </p>
            <p className="mt-3 font-sans text-3xl font-bold text-primary">
              {lawyer.experience}
            </p>
          </div>
          <div className="rounded-2xl border border-primary/10 bg-offwhite p-6 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-dark/50">
              Kasus Ditangani
            </p>
            <p className="mt-3 font-sans text-3xl font-bold text-primary">
              {caseCounts[lawyer.slug] ?? '50+'}
            </p>
          </div>
          <div className="rounded-2xl border border-primary/10 bg-offwhite p-6 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-dark/50">
              Spesialisasi
            </p>
            <span className="mt-3 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              {lawyer.specialization}
            </span>
          </div>
        </div>
      </section>

      <section className="bg-navy py-16 lg:py-20">
        <div
          className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 rounded-3xl border border-white/10 bg-white/5 px-6 py-12 text-center text-white"
          data-aos="fade-up"
        >
          <h2 className="font-sans text-3xl font-bold tracking-tight">
            Konsultasi Langsung dengan {lawyer.name}
          </h2>
          <p className="font-body text-sm text-white/70">
            Jadwalkan konsultasi pribadi untuk mendapatkan arahan hukum yang
            tepat dan strategis.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#25D366]/40 transition-transform duration-300 hover:-translate-y-0.5"
            >
              Konsultasi via WhatsApp
            </a>
            <Link
              href="/konsultasi"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/10"
            >
              Form Konsultasi
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-offwhite py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-16">
          <h2 className="font-sans text-3xl font-bold tracking-tight text-dark lg:text-5xl">
            Tim Kami Lainnya
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {otherLawyers.map((item, index) => (
              <Link
                key={item.slug}
                href={`/tim/${item.slug}`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-500 hover:shadow-xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 280px"
                  />
                </div>
                <div className="space-y-2 p-5">
                  <p className="text-base font-semibold text-dark">{item.name}</p>
                  <p className="text-sm text-dark/60">{item.position}</p>
                  <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {item.specialization}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
