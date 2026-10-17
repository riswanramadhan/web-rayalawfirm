import Link from 'next/link';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

interface HeroSectionProps {
  locale: Locale;
}

/** Animasi masuk berbasis CSS (tanpa JS) agar LCP tidak menunggu hidrasi. */
const enter = 'animate-fade-up motion-reduce:animate-none';

export default function HeroSection({ locale }: HeroSectionProps) {
  const t = getDictionary(locale).home.hero;

  return (
    <section aria-labelledby="home-hero-title" className="relative isolate overflow-hidden bg-navy">
      <div
        aria-hidden="true"
        className="absolute right-20 top-20 hidden h-96 w-96 rounded-full border border-primary/20 opacity-30 lg:block"
      />
      <div
        aria-hidden="true"
        className="absolute right-32 top-32 hidden h-64 w-64 rounded-full border border-accent/20 opacity-40 lg:block"
      />

      <div className="relative mx-auto w-full max-w-[1536px]">
        {/*
          Satu gambar untuk semua ukuran layar: latar penuh di ponsel, bingkai
          kanan di desktop. Hanya satu preload dengan atribut sizes yang tepat.
        */}
        <div className="absolute inset-0 -z-10 lg:inset-auto lg:bottom-0 lg:right-0 lg:z-0 lg:aspect-[8/9] lg:max-h-[680px] lg:w-[40vw] lg:max-w-[800px] lg:overflow-hidden lg:rounded-t-3xl lg:motion-safe:animate-slide-in-right">
          <Image
            src="/images/gambar-hero.png"
            alt={t.imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover object-top opacity-30 lg:opacity-100"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-primary/40 lg:bg-gradient-to-t lg:from-navy/60 lg:via-transparent lg:to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:to-navy/20"
          />
        </div>

        <div className="min-h-screen-safe relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-4 pb-12 pt-28 sm:px-6 sm:pb-16 lg:min-h-[720px] lg:px-16 lg:pb-20 lg:pt-32 xl:min-h-[780px]">
          <div className="max-w-2xl lg:w-[58%] xl:w-[55%]">
            <p
              className={`${enter} inline-flex max-w-full items-center gap-2 rounded-full border border-primary/30 bg-primary/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-accent backdrop-blur-sm sm:text-sm`}
            >
              <span className="h-2 w-2 flex-shrink-0 animate-pulse rounded-full bg-accent motion-reduce:animate-none" aria-hidden="true" />
              <span className="truncate">{t.badge}</span>
            </p>

            <h1
              id="home-hero-title"
              className={`${enter} mt-6 text-balance break-words font-sans text-[2rem] font-extrabold leading-[1.15] tracking-tight text-white [animation-delay:80ms] xs:text-4xl sm:text-5xl sm:leading-[1.1] lg:text-5xl xl:text-[3.5rem]`}
            >
              {t.titleLine}{' '}
              {t.titleHighlight ? (
                <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {t.titleHighlight}
                </span>
              ) : null}
            </h1>

            <p
              className={`${enter} mt-5 max-w-xl text-pretty font-body text-base leading-relaxed text-white/75 [animation-delay:180ms] sm:mt-6 sm:text-lg`}
            >
              {t.description}
            </p>

            <div className={`${enter} mt-8 flex flex-col gap-3 [animation-delay:280ms] xs:flex-row sm:mt-10 sm:gap-4`}>
              <Link
                href="/konsultasi"
                className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6fa6c9] to-accent px-7 py-3.5 font-semibold text-navy shadow-lg shadow-primary/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl xs:w-auto"
              >
                {t.primaryCta}
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/layanan"
                className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl border border-white/30 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 xs:w-auto"
              >
                {t.secondaryCta}
              </Link>
            </div>

            <dl
              className={`${enter} mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-6 [animation-delay:380ms] sm:mt-14 sm:gap-8 sm:pt-8`}
            >
              {t.stats.map((item) => (
                <div key={item.label} className="flex min-w-0 flex-col-reverse">
                  <dt className="mt-1 text-xs leading-snug text-white/60 sm:text-sm">{item.label}</dt>
                  <dd className="font-sans text-2xl font-bold text-accent sm:text-3xl">{item.num}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
