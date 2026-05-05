'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { testimonials } from '../../lib/data/testimonials';

const totalTestimonials = testimonials.length;

const wrapIndex = (index: number) =>
  (index + totalTestimonials) % totalTestimonials;

export default function TestimoniSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const updateCount = () => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
      setVisibleCount(isDesktop ? 3 : 1);
    };

    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  const goNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => wrapIndex(prev + 1));
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => wrapIndex(prev - 1));
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      setDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(wrapIndex(index));
    },
    [activeIndex]
  );

  useEffect(() => {
    if (isPaused) return;
    const id = window.setInterval(goNext, 5000);
    return () => window.clearInterval(id);
  }, [goNext, isPaused]);

  const visibleTestimonials = useMemo(() => {
    return Array.from({ length: visibleCount }, (_, idx) =>
      testimonials[wrapIndex(activeIndex + idx)]
    );
  }, [activeIndex, visibleCount]);

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto flex w-full max-w-7xl flex-col space-y-12 px-6 sm:px-8 lg:px-16">
        <div className="text-center" data-aos="fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary">
            Testimoni Klien
          </span>
          <h2 className="mt-4 font-sans text-3xl font-bold tracking-tight text-dark lg:text-5xl">
            Kepercayaan yang Terbukti
          </h2>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.div
              key={`${activeIndex}-${visibleCount}`}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
              transition={{ duration: 0.35 }}
              className="grid gap-6 lg:grid-cols-3"
            >
              {visibleTestimonials.map((testimonial) => {
                const role = testimonial.company
                  ? `${testimonial.position}, ${testimonial.company}`
                  : testimonial.position;
                return (
                  <div
                    key={testimonial.id}
                    className="rounded-2xl border border-primary/10 bg-offwhite p-8 flex flex-col h-full"
                  >
                    <div className="flex items-center gap-1 text-gold">
                      {Array.from({ length: testimonial.rating }, (_, idx) => (
                        <svg
                          key={`${testimonial.id}-star-${idx}`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-4 w-4"
                          aria-hidden="true"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.17c.969 0 1.371 1.24.588 1.81l-3.374 2.452a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.539 1.118L10 15.347l-3.955 2.9c-.783.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.055 9.393c-.783-.57-.38-1.81.588-1.81h4.17a1 1 0 00.95-.69l1.286-3.966z" />
                        </svg>
                      ))}
                    </div>
                    <p className="mt-4 flex-grow font-body text-base italic text-dark/80 lg:text-lg">
                      {testimonial.text}
                    </p>
                    <div className="mt-6 space-y-3 border-t border-primary/10 pt-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={testimonial.photo}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-grow">
                          <p className="text-sm font-semibold text-dark">
                            {testimonial.name}
                          </p>
                          <p className="text-xs text-dark/60">{role}</p>
                        </div>
                      </div>
                      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {testimonial.kasusType}
                      </span>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-between">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Sebelumnya"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 text-primary transition-colors hover:bg-primary/10"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.78 5.22a.75.75 0 010 1.06L8.81 10l3.97 3.72a.75.75 0 11-1.06 1.06l-4.5-4.22a.75.75 0 010-1.06l4.5-4.22a.75.75 0 011.06 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={`dot-${index}`}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Pergi ke testimoni ${index + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    index === activeIndex
                      ? 'bg-primary'
                      : 'bg-primary/20 hover:bg-primary/50'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goNext}
              aria-label="Berikutnya"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 text-primary transition-colors hover:bg-primary/10"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.22 5.22a.75.75 0 011.06 0l4.5 4.22a.75.75 0 010 1.06l-4.5 4.22a.75.75 0 11-1.06-1.06L11.19 10 7.22 6.28a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex justify-center" data-aos="fade-up">
          <Link
            href="/testimoni"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-300 hover:gap-3"
          >
            Lihat Semua Testimoni
            <span aria-hidden="true">&gt;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
