'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { getTestimonials } from '@/lib/i18n/localized-data';

interface TestimoniClientProps {
  locale: Locale;
}

const fill = (template: string, values: Record<string, string | number>) =>
  Object.entries(values).reduce((text, [key, value]) => text.replace(`{${key}}`, String(value)), template);

export default function TestimoniClient({ locale }: TestimoniClientProps) {
  const dictionary = getDictionary(locale);
  const t = dictionary.testimonialsPage;
  const testimonials = useMemo(() => getTestimonials(locale), [locale]);
  const filters = useMemo(
    () => [t.allFilter, ...Array.from(new Set(testimonials.map((item) => item.kasusType)))],
    [testimonials, t.allFilter]
  );
  const [activeFilter, setActiveFilter] = useState<string>(t.allFilter);

  useEffect(() => {
    setActiveFilter(t.allFilter);
  }, [t.allFilter]);

  const filteredTestimonials = useMemo(() => {
    if (activeFilter === t.allFilter) return testimonials;
    return testimonials.filter((testimonial) => testimonial.kasusType === activeFilter);
  }, [activeFilter, testimonials, t.allFilter]);

  return (
    <div className="mt-8 sm:mt-10">
      <h2 className="sr-only">{t.listTitle}</h2>
      <div
        role="group"
        aria-label={t.filterLabel}
        className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:gap-3 sm:overflow-visible sm:px-0"
      >
        {filters.map((filter) => {
          const active = activeFilter === filter;
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={active}
              onClick={() => setActiveFilter(filter)}
              className={`min-h-[44px] flex-shrink-0 whitespace-nowrap rounded-full px-4 text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
                active ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-primary/10 text-primary hover:bg-primary/20'
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <ul className="mt-6 grid gap-4 sm:mt-8 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTestimonials.map((testimonial, index) => {
          const role = testimonial.company ? `${testimonial.position}, ${testimonial.company}` : testimonial.position;

          return (
            <li key={testimonial.id} className="min-w-0" data-aos="fade-up" data-aos-delay={(index % 3) * 100}>
              <figure className="flex h-full flex-col rounded-2xl border border-primary/10 bg-white p-5 shadow-sm sm:p-8">
                <div
                  className="flex items-center gap-1 text-gold"
                  role="img"
                  aria-label={fill(dictionary.home.testimonials.ratingLabel, { rating: testimonial.rating })}
                >
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
                <span aria-hidden="true" className="mt-3 block font-sans text-5xl leading-none text-primary/20 sm:text-6xl">
                  &ldquo;
                </span>
                <blockquote className="-mt-4 flex-grow">
                  <p className="font-body text-base leading-relaxed text-dark/75">{testimonial.text}</p>
                </blockquote>
                <figcaption className="mt-6 space-y-3 border-t border-primary/10 pt-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={testimonial.photo}
                      alt=""
                      width={48}
                      height={48}
                      sizes="48px"
                      className="h-12 w-12 flex-shrink-0 rounded-full bg-offwhite object-cover"
                    />
                    <div className="min-w-0">
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
    </div>
  );
}
