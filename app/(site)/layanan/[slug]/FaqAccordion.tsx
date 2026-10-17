import type { ServiceFaq } from '@/lib/data/services';

interface FaqAccordionProps {
  items: ServiceFaq[];
  /** Prefix id elemen agar unik bila ada lebih dari satu accordion di halaman. */
  idPrefix?: string;
}

/**
 * FAQ memakai <details>/<summary> bawaan browser: tanpa JavaScript, dapat
 * diakses keyboard, dan seluruh jawaban tetap ada di HTML server sehingga
 * terbaca oleh mesin pencari & crawler AI meski dalam keadaan tertutup.
 */
export default function FaqAccordion({ items, idPrefix = 'faq' }: FaqAccordionProps) {
  if (!items.length) return null;

  return (
    <div className="divide-y divide-primary/10">
      {items.map((item, index) => (
        <details
          key={`${idPrefix}-${index}`}
          id={`${idPrefix}-${index + 1}`}
          className="group scroll-mt-28"
          open={index === 0}
        >
          <summary className="flex min-h-[44px] cursor-pointer list-none items-start justify-between gap-4 rounded-lg py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 [&::-webkit-details-marker]:hidden">
            <h3 className="min-w-0 break-words font-sans text-base font-semibold text-dark">
              {item.question}
            </h3>
            <svg
              className="mt-1 h-4 w-4 flex-shrink-0 text-dark/40 transition-transform duration-200 group-open:rotate-180 group-open:text-primary"
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
          </summary>
          <div className="pb-4 font-body sm:pr-8 text-base leading-relaxed text-dark/70">
            <p>{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
