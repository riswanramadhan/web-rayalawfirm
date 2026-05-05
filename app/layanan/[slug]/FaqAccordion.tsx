'use client';

import { useState } from 'react';
import type { ServiceFaq } from '@/lib/data/services';

interface FaqAccordionProps {
  items: ServiceFaq[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="divide-y divide-primary/10">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const contentId = `faq-content-${index}`;

        return (
          <div key={item.question} className="py-4">
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              aria-controls={contentId}
              className="flex w-full items-center justify-between gap-4 text-left"
            >
              <span className="text-base font-semibold text-dark">
                {item.question}
              </span>
              <svg
                className={`h-4 w-4 transition-transform ${
                  isOpen ? 'rotate-180 text-primary' : 'text-dark/40'
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.19l3.71-3.96a.75.75 0 111.08 1.04l-4.24 4.52a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div
              id={contentId}
              className={`mt-3 text-sm text-dark/70 ${
                isOpen ? 'block' : 'hidden'
              }`}
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
