'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { buildWhatsAppURL } from '../../lib/whatsapp';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
  viewport: { once: true, amount: 0.4 },
});

interface CTASectionProps {
  locale: Locale;
}

export default function CTASection({ locale }: CTASectionProps) {
  const t = getDictionary(locale);
  const waLink = buildWhatsAppURL(t.whatsapp.furtherConsultation);

  return (
    <section className="relative overflow-hidden bg-navy py-16 sm:py-20 lg:py-24">
      <div className="absolute -top-20 left-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-10 right-8 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute top-1/3 right-1/3 h-40 w-40 rounded-full bg-accent/10 blur-2xl" />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-6 sm:px-8 text-center text-white lg:px-16">
        <motion.span
          {...fadeUp(0)}
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-accent"
        >
          {t.home.cta.badge}
        </motion.span>

        <motion.h2
          {...fadeUp(0.1)}
          className="font-sans text-3xl font-bold tracking-tight lg:text-5xl"
        >
          {t.home.cta.title}
        </motion.h2>

        <motion.p {...fadeUp(0.2)} className="font-body text-base text-white/70 lg:text-lg">
          {t.home.cta.description}
        </motion.p>

        <motion.div
          {...fadeUp(0.3)}
          className="mt-2 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#25D366]/40 transition-transform duration-300 hover:-translate-y-0.5"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t.home.cta.whatsapp}
          </a>
          <Link
            href="/kontak"
            className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/10"
          >
            {t.home.cta.contact}
          </Link>
        </motion.div>

        <motion.div
          {...fadeUp(0.4)}
          className="mt-6 grid gap-3 text-sm text-white/70 sm:grid-cols-3"
        >
          {t.home.cta.badges.map((item) => (
            <div
              key={item}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2"
            >
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
