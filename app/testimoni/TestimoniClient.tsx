'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { testimonials } from '@/lib/data/testimonials';

const filters = ['Semua', ...Array.from(new Set(testimonials.map((t) => t.kasusType)))];

export default function TestimoniClient() {
  const [activeFilter, setActiveFilter] = useState<string>('Semua');

  const filteredTestimonials = useMemo(() => {
    if (activeFilter === 'Semua') return testimonials;
    return testimonials.filter((testimonial) => testimonial.kasusType === activeFilter);
  }, [activeFilter]);

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-center gap-3" data-aos="fade-up">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-colors ${
              activeFilter === filter
                ? 'bg-primary text-white'
                : 'bg-primary/10 text-primary hover:bg-primary/20'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTestimonials.map((testimonial, index) => {
          const role = testimonial.company
            ? `${testimonial.position}, ${testimonial.company}`
            : testimonial.position;

          return (
            <div
              key={testimonial.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="flex flex-col rounded-2xl border border-primary/10 bg-white p-8 shadow-sm"
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
              <p className="mt-4 font-sans text-6xl text-primary/20">“</p>
              <p className="-mt-6 flex-grow text-sm text-dark/70">{testimonial.text}</p>
              <div className="mt-6 space-y-3 justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Image
                    src={testimonial.photo}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-dark">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-dark/60">{role}</p>
                  </div>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {testimonial.kasusType}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
