import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

interface VisiMisiSectionProps {
  locale: Locale;
}

export default function VisiMisiSection({ locale }: VisiMisiSectionProps) {
  const t = getDictionary(locale).home.visionMission;

  return (
    <section
      aria-labelledby="home-vision-title"
      className="relative bg-gradient-to-br from-navy to-navy/90 py-16 text-white sm:py-20 lg:py-24"
    >
      <h2 id="home-vision-title" className="sr-only">
        {t.heading}
      </h2>

      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 top-10 h-80 w-80 rounded-full border border-primary/20 opacity-40" />
        <div className="absolute bottom-16 left-12 h-40 w-40 rounded-full border border-accent/20 opacity-50" />
        <svg className="absolute right-0 top-0 h-64 w-64 text-primary/20" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" />
          <line x1="0" y1="100" x2="200" y2="100" stroke="currentColor" strokeWidth="1" />
          <line x1="100" y1="0" x2="100" y2="200" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-4 sm:gap-16 sm:px-6 lg:grid-cols-[1.1fr_1.4fr] lg:px-16">
        <figure data-aos="fade-right" className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle,_rgba(255,255,255,0.12)_1px,_transparent_1px)] opacity-40 [background-size:24px_24px]"
          />
          <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-10">
            <span
              aria-hidden="true"
              className="block font-sans text-[120px] leading-none text-primary/20 sm:text-[200px]"
            >
              &ldquo;
            </span>
            <blockquote className="-mt-12 sm:-mt-20">
              <p className="text-balance font-sans text-xl font-semibold leading-snug text-white/90 sm:text-2xl lg:text-3xl">
                {t.quote}
              </p>
            </blockquote>
            <figcaption className="mt-4 font-body text-sm uppercase tracking-[0.25em] text-accent/80">
              Raya Law Firm
            </figcaption>
          </div>
        </figure>

        <div className="min-w-0 space-y-8">
          <div
            data-aos="fade-left"
            data-aos-delay="100"
            className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-8"
          >
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3v2m0 14v2M7 5h10l2 7-2 7H7l-2-7 2-7z" />
                </svg>
              </span>
              <h3 className="font-sans text-xl font-bold sm:text-2xl">{t.visionTitle}</h3>
            </div>
            <p className="mt-4 text-pretty font-body text-base leading-relaxed text-white/80 lg:text-lg">
              {t.visionText}
            </p>
          </div>

          <div data-aos="fade-left" data-aos-delay="200" className="space-y-4">
            <h3 className="font-sans text-xl font-bold sm:text-2xl">{t.missionTitle}</h3>
            <ul className="space-y-4">
              {t.missions.map((mission) => (
                <li key={mission} className="flex items-start gap-3 sm:gap-4">
                  <svg
                    className="mt-1 h-5 w-5 flex-shrink-0 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <p className="font-body text-base leading-relaxed text-white/80 lg:text-lg">{mission}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
