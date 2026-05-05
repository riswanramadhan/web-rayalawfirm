'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay },
});

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[700px] max-h-screen overflow-hidden bg-navy">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Raya Law Firm"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-primary/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
      </div>

      <div className="absolute right-20 top-20 hidden h-96 w-96 rounded-full border border-primary/20 opacity-30 lg:block" />
      <div className="absolute right-32 top-32 hidden h-64 w-64 rounded-full border border-accent/20 opacity-40 lg:block" />
      <div className="absolute bottom-20 left-1/2 h-32 w-px bg-gradient-to-b from-transparent to-primary/60" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-6 pt-24 lg:px-16">
        <div className="max-w-4xl">
          <motion.div
            {...fadeUp(0.1)}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/20 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-accent backdrop-blur-sm"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
            Konsultasi Hukum Profesional
          </motion.div>

          <motion.h1
            {...fadeUp(0.25)}
            className="mt-8 font-sans text-5xl font-extrabold leading-tight tracking-tight text-white lg:text-7xl"
          >
            Keadilan yang
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Dapat Anda Percaya
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.4)}
            className="mt-6 max-w-2xl font-body text-base leading-relaxed text-white/70 sm:text-lg"
          >
            Raya Law Firm hadir memberikan solusi hukum komprehensif dengan tim
            advokat berpengalaman. Kami mendampingi Anda di setiap langkah, dari
            konsultasi hingga penyelesaian perkara.
          </motion.p>

          <motion.div
            {...fadeUp(0.55)}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href="/konsultasi"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-8 py-4 font-semibold text-white shadow-lg shadow-primary/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              Konsultasi Gratis
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <Link
              href="/layanan"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
            >
              Lihat Layanan Kami
            </Link>
          </motion.div>

          <motion.div
            {...fadeUp(0.8)}
            className="mt-16 mb-8 grid max-w-lg grid-cols-3 gap-8 border-t border-white/10 pt-8"
          >
            {[
              { num: '15+', label: 'Tahun Pengalaman' },
              { num: '500+', label: 'Kasus Diselesaikan' },
              { num: '98%', label: 'Tingkat Kepuasan' },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-sans text-3xl font-bold text-accent">
                  {item.num}
                </p>
                <p className="mt-1 text-sm text-white/60">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 h-10 w-px -translate-x-1/2 bg-gradient-to-b from-primary/60 to-transparent" />
    </section>
  );
}
