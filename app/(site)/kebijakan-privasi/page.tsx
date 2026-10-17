import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { generatePageMetadata } from '@/lib/metadata';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { getCurrentLocale } from '@/lib/i18n/server';

const PAGE_PATH = '/kebijakan-privasi';

export function generateMetadata(): Metadata {
  const locale = getCurrentLocale();
  const t = getDictionary(locale).privacyPage;

  return generatePageMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: PAGE_PATH,
    locale,
  });
}

type Block = { type: 'p'; text: string } | { type: 'sub'; text: string } | { type: 'ul'; items: string[] };

const sectionId = (index: number) => `bagian-${index + 1}`;

/** Ubah teks kebijakan (baris "- " = daftar, "a. ..." = subjudul) menjadi blok semantik. */
function toBlocks(body: string): Block[] {
  const blocks: Block[] = [];

  for (const raw of body.split('\n')) {
    const line = raw.trim();
    if (!line) continue;

    if (line.startsWith('- ')) {
      const last = blocks[blocks.length - 1];
      if (last?.type === 'ul') last.items.push(line.slice(2));
      else blocks.push({ type: 'ul', items: [line.slice(2)] });
    } else if (/^[a-z]\.\s/i.test(line) && line.endsWith(':')) {
      blocks.push({ type: 'sub', text: line });
    } else {
      blocks.push({ type: 'p', text: line });
    }
  }

  return blocks;
}

/** Jadikan email & telepon pada baris kontak sebagai tautan. */
function renderText(text: string): ReactNode {
  const email = text.match(/[\w.+-]+@[\w-]+\.[\w.]+/);
  if (email) {
    const [before, after] = text.split(email[0]);
    return (
      <>
        {before}
        <a href={`mailto:${email[0]}`} className="font-semibold text-primary underline-offset-4 hover:underline">
          {email[0]}
        </a>
        {after}
      </>
    );
  }

  const phone = text.match(/\+62[\d\s-]{8,}/);
  if (phone) {
    const [before, after] = text.split(phone[0]);
    return (
      <>
        {before}
        <a
          href={`tel:+${phone[0].replace(/\D/g, '')}`}
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          {phone[0].trim()}
        </a>
        {after}
      </>
    );
  }

  return text;
}

export default function KebijakanPrivasiPage() {
  const locale = getCurrentLocale();
  const t = getDictionary(locale);
  const copy = t.privacyPage;

  const toc = (
    <ol className="space-y-1">
      {copy.sections.map((section, index) => (
        <li key={section.title}>
          <a
            href={`#${sectionId(index)}`}
            className="flex min-h-[40px] items-center rounded-lg px-3 py-1.5 font-body text-[15px] leading-snug text-dark/70 transition-colors hover:bg-primary/5 hover:text-primary"
          >
            {section.title}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <main id="main" className="flex flex-col">
      <section className="relative overflow-hidden bg-navy pb-12 pt-24 sm:pb-16 lg:pb-20 lg:pt-28">
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-primary/30" />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
          <div className="max-w-3xl" data-aos="fade-up">
            <Breadcrumb items={[{ label: t.common.home, href: '/' }, { label: copy.breadcrumb }]} currentPath={PAGE_PATH} />
            <h1 className="mt-4 text-balance break-words font-sans text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">
              {copy.title}
            </h1>
            <p className="mt-4 max-w-2xl text-pretty font-body text-base leading-relaxed text-white/75 sm:text-lg">
              {copy.description}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-offwhite py-10 sm:py-16 lg:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-10 lg:px-16">
          <nav aria-label={copy.tocTitle} className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <details className="group rounded-2xl border border-primary/10 bg-white shadow-sm lg:hidden">
              <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-3 px-5 font-sans text-sm font-semibold text-dark [&::-webkit-details-marker]:hidden">
                {copy.tocTitle}
                <svg
                  className="h-4 w-4 text-dark/50 transition-transform group-open:rotate-180"
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
              <div className="border-t border-primary/10 px-2 py-3">{toc}</div>
            </details>
            <div className="hidden rounded-2xl border border-primary/10 bg-white p-4 shadow-sm lg:block">
              <p className="px-3 pb-2 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-dark/50">
                {copy.tocTitle}
              </p>
              {toc}
            </div>
          </nav>

          <article className="min-w-0 rounded-2xl bg-white p-5 shadow-sm sm:p-8 lg:p-12">
            <div className="mx-auto max-w-3xl space-y-10">
              {copy.sections.map((section, index) => (
                <section
                  key={section.title}
                  id={sectionId(index)}
                  aria-labelledby={`${sectionId(index)}-title`}
                  className="scroll-mt-28 border-b border-gray-100 pb-10 last:border-b-0 last:pb-0"
                >
                  <h2
                    id={`${sectionId(index)}-title`}
                    className="text-balance font-sans text-lg font-semibold leading-snug text-dark sm:text-xl"
                  >
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-3 font-body text-base leading-relaxed text-dark/75 sm:text-[17px]">
                    {toBlocks(section.body).map((block, blockIndex) => {
                      if (block.type === 'ul') {
                        return (
                          <ul key={blockIndex} className="list-disc space-y-1.5 pl-5 marker:text-primary">
                            {block.items.map((item) => (
                              <li key={item} className="pl-1">
                                {item}
                              </li>
                            ))}
                          </ul>
                        );
                      }

                      if (block.type === 'sub') {
                        return (
                          <h3 key={blockIndex} className="pt-2 font-sans text-base font-semibold text-dark">
                            {block.text}
                          </h3>
                        );
                      }

                      return (
                        <p key={blockIndex} className="break-words">
                          {renderText(block.text)}
                        </p>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
