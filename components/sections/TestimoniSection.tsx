'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { getTestimonials } from '@/lib/i18n/localized-data';

interface TestimoniSectionProps {
  locale: Locale;
}

const AUTOPLAY_MS = 6000;

const fill = (template: string, values: Record<string, string | number>) =>
  Object.entries(values).reduce((text, [key, value]) => text.replace(`{${key}}`, String(value)), template);

const StarIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.17c.969 0 1.371 1.24.588 1.81l-3.374 2.452a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.539 1.118L10 15.347l-3.955 2.9c-.783.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.055 9.393c-.783-.57-.38-1.81.588-1.81h4.17a1 1 0 00.95-.69l1.286-3.966z" />
  </svg>
);

/**
 * Carousel testimoni berbasis CSS scroll-snap: bisa digeser (swipe) di
 * ponsel, semua testimoni tetap ada di HTML (terbaca crawler). Putar otomatis
 * hanya untuk pointer presisi, berhenti saat hover/fokus/interaksi, dan
 * nonaktif untuk reduced motion.
 */
export default function TestimoniSection({ locale }: TestimoniSectionProps) {
  const t = getDictionary(locale).home.testimonials;
  const testimonials = useMemo(() => getTestimonials(locale), [locale]);
  const total = testimonials.length;

  const trackRef = useRef<HTMLUListElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pageCount, setPageCount] = useState(total);
  const [canAutoplay, setCanAutoplay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocusWithin, setHasFocusWithin] = useState(false);
  const [inView, setInView] = useState(false);

  const getStep = useCallback(() => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap || '0') || 0;
    return first.getBoundingClientRect().width + gap;
  }, []);

  const measure = useCallback(() => {
    const track = trackRef.current;
    const step = getStep();
    if (!track || !step) return;
    const visible = Math.max(1, Math.round((track.clientWidth + 1) / step));
    const pages = Math.max(1, total - visible + 1);
    setPageCount(pages);
    setActiveIndex(Math.min(pages - 1, Math.round(track.scrollLeft / step)));
  }, [getStep, total]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        measure();
      });
    };

    measure();
    track.addEventListener('scroll', onScroll, { passive: true });
    const resizeObserver = new ResizeObserver(() => measure());
    resizeObserver.observe(track);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      track.removeEventListener('scroll', onScroll);
      resizeObserver.disconnect();
    };
  }, [measure]);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const evaluate = () => setCanAutoplay(fine.matches && !reduced.matches);
    evaluate();
    fine.addEventListener('change', evaluate);
    reduced.addEventListener('change', evaluate);
    return () => {
      fine.removeEventListener('change', evaluate);
      reduced.removeEventListener('change', evaluate);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current;
      const step = getStep();
      if (!track || !step) return;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      track.scrollTo({ left: index * step, behavior: reduced ? 'auto' : 'smooth' });
    },
    [getStep]
  );

  const goTo = useCallback(
    (index: number) => {
      const next = ((index % pageCount) + pageCount) % pageCount;
      scrollToIndex(next);
    },
    [pageCount, scrollToIndex]
  );

  const stopAutoplay = () => setIsPlaying(false);

  const autoplayActive = canAutoplay && isPlaying && inView && !isHovered && !hasFocusWithin && pageCount > 1;

  useEffect(() => {
    if (!autoplayActive) return;
    const id = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      goTo(activeIndex + 1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [autoplayActive, activeIndex, goTo]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="home-testimonials-title"
      className="overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 sm:gap-12 sm:px-6 lg:px-16">
        <div className="mx-auto max-w-3xl text-center" data-aos="fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary-700">
            {t.badge}
          </span>
          <h2
            id="home-testimonials-title"
            className="mt-4 text-balance font-sans text-2xl font-bold leading-tight tracking-tight text-dark sm:text-3xl lg:text-5xl"
          >
            {t.title}
          </h2>
        </div>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label={t.carouselLabel}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setHasFocusWithin(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHasFocusWithin(false);
          }}
        >
          <ul
            ref={trackRef}
            tabIndex={0}
            aria-label={t.swipeHint}
            onPointerDown={stopAutoplay}
            onWheel={(event) => {
              if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) stopAutoplay();
            }}
            className="scrollbar-none -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto overscroll-x-contain px-4 pb-4 pt-1 focus-visible:shadow-none sm:mx-0 sm:scroll-px-0 sm:gap-6 sm:px-0"
          >
            {testimonials.map((testimonial, index) => {
              const role = testimonial.company
                ? `${testimonial.position}, ${testimonial.company}`
                : testimonial.position;

              return (
                <li
                  key={testimonial.id}
                  aria-roledescription="slide"
                  aria-label={fill(t.slideLabel, { current: index + 1, total })}
                  className="flex w-[85%] flex-shrink-0 snap-start xs:w-[70%] sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
                >
                  <figure className="flex h-full w-full flex-col rounded-2xl border border-primary/10 bg-offwhite p-5 sm:p-8">
                    <div className="flex items-center gap-1 text-gold" role="img" aria-label={fill(t.ratingLabel, { rating: testimonial.rating })}>
                      {Array.from({ length: testimonial.rating }, (_, idx) => (
                        <StarIcon key={`${testimonial.id}-star-${idx}`} />
                      ))}
                    </div>
                    <blockquote className="mt-4 flex-grow">
                      <p className="font-body text-base italic leading-relaxed text-dark/80 lg:text-lg">
                        &ldquo;{testimonial.text}&rdquo;
                      </p>
                    </blockquote>
                    <figcaption className="mt-6 space-y-3 border-t border-primary/10 pt-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={testimonial.photo}
                          alt=""
                          width={48}
                          height={48}
                          sizes="48px"
                          className="h-12 w-12 flex-shrink-0 rounded-full bg-white object-cover"
                        />
                        <div className="min-w-0 flex-grow">
                          <p className="break-words text-sm font-semibold text-dark">{testimonial.name}</p>
                          <p className="break-words text-xs text-dark/60">{role}</p>
                        </div>
                      </div>
                      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary-700">
                        {testimonial.kasusType}
                      </span>
                    </figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 flex items-center justify-between gap-3 sm:mt-8">
            <button
              type="button"
              onClick={() => {
                stopAutoplay();
                goTo(activeIndex - 1);
              }}
              aria-label={t.previousAria}
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-primary/30 text-primary transition-colors hover:bg-primary/10"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12.78 5.22a.75.75 0 010 1.06L8.81 10l3.97 3.72a.75.75 0 11-1.06 1.06l-4.5-4.22a.75.75 0 010-1.06l4.5-4.22a.75.75 0 011.06 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div className="flex min-w-0 flex-1 items-center justify-center gap-1">
              {Array.from({ length: pageCount }, (_, index) => (
                <button
                  key={`dot-${index}`}
                  type="button"
                  onClick={() => {
                    stopAutoplay();
                    goTo(index);
                  }}
                  aria-label={`${t.goToAria} ${index + 1}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  className="group flex h-11 w-6 items-center justify-center sm:w-7"
                >
                  <span
                    aria-hidden="true"
                    className={`block h-2.5 rounded-full transition-all duration-300 ${
                      index === activeIndex ? 'w-6 bg-primary' : 'w-2.5 bg-primary/20 group-hover:bg-primary/50'
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="flex flex-shrink-0 items-center gap-2">
              {canAutoplay && (
                <button
                  type="button"
                  onClick={() => setIsPlaying((prev) => !prev)}
                  aria-label={isPlaying ? t.pauseAria : t.playAria}
                  aria-pressed={!isPlaying}
                  className="hidden h-11 w-11 items-center justify-center rounded-full text-primary/70 transition-colors hover:bg-primary/10 hover:text-primary lg:flex"
                >
                  {isPlaying ? (
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  )}
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  stopAutoplay();
                  goTo(activeIndex + 1);
                }}
                aria-label={t.nextAria}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 text-primary transition-colors hover:bg-primary/10"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M7.22 5.22a.75.75 0 011.06 0l4.5 4.22a.75.75 0 010 1.06l-4.5 4.22a.75.75 0 11-1.06-1.06L11.19 10 7.22 6.28a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center" data-aos="fade-up">
          <Link
            href="/testimoni"
            className="inline-flex min-h-[48px] items-center gap-2 rounded-xl px-4 text-sm font-semibold text-primary-700 transition-all duration-300 hover:gap-3 hover:bg-primary/5"
          >
            {t.viewAll}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
