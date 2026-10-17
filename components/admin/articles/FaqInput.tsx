'use client';

import { useEffect, useRef } from 'react';
import { TextArea, TextInput } from '@/components/admin/form';
import type { FaqItem } from '@/lib/content/types';

interface FaqInputProps {
  /** Prefiks id elemen, mis. "article-faqs" → "article-faqs-0-question". */
  id: string;
  value: FaqItem[];
  onChange: (value: FaqItem[]) => void;
  /** Peta error dari zod, mis. { "faqs.0.answer": "…" }. */
  errors?: Record<string, string>;
  /** Kunci error untuk daftar ini ("faqs" / "faqs_en"). */
  errorKey: string;
  maxItems?: number;
  lang?: string;
  questionPlaceholder?: string;
  answerPlaceholder?: string;
}

const iconButtonClassName =
  'inline-flex h-11 w-11 items-center justify-center rounded-lg text-dark/55 transition-colors hover:bg-dark/5 hover:text-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-30';

/** Editor daftar FAQ (pertanyaan + jawaban): tambah, hapus, ubah urutan. */
export default function FaqInput({
  id,
  value,
  onChange,
  errors = {},
  errorKey,
  maxItems = 20,
  lang,
  questionPlaceholder = 'Contoh: Berapa lama proses perceraian di pengadilan agama?',
  answerPlaceholder = 'Jawab singkat dan jelas dalam 2–4 kalimat.',
}: FaqInputProps) {
  const focusIndex = useRef<number | null>(null);

  useEffect(() => {
    if (focusIndex.current === null) return;
    const element = document.getElementById(`${id}-${focusIndex.current}-question`);
    focusIndex.current = null;
    element?.focus();
  }, [value.length, id]);

  const updateAt = (index: number, patch: Partial<FaqItem>) => {
    onChange(value.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };

  const removeAt = (index: number) => {
    const item = value[index];
    if ((item.question.trim() || item.answer.trim()) && !window.confirm('Hapus FAQ ini?')) return;
    onChange(value.filter((_, i) => i !== index));
  };

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= value.length) return;
    const next = [...value];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const add = () => {
    if (value.length >= maxItems) return;
    focusIndex.current = value.length;
    onChange([...value, { question: '', answer: '' }]);
  };

  const listError = errors[errorKey];

  return (
    <div className="space-y-3">
      {value.length > 0 && (
        <ol className="space-y-3">
          {value.map((item, index) => {
            const questionId = `${id}-${index}-question`;
            const answerId = `${id}-${index}-answer`;
            const questionError = errors[`${errorKey}.${index}.question`];
            const answerError = errors[`${errorKey}.${index}.answer`];

            return (
              <li key={index} className="rounded-xl border border-dark/10 bg-offwhite p-3 sm:p-4">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-dark/45">FAQ {index + 1}</span>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => move(index, -1)}
                      disabled={index === 0}
                      className={iconButtonClassName}
                      aria-label={`Naikkan FAQ ${index + 1}`}
                    >
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.83l-3.71 3.94a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => move(index, 1)}
                      disabled={index === value.length - 1}
                      className={iconButtonClassName}
                      aria-label={`Turunkan FAQ ${index + 1}`}
                    >
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => removeAt(index)}
                      className={`${iconButtonClassName} text-red-600 hover:bg-red-50 hover:text-red-700`}
                      aria-label={`Hapus FAQ ${index + 1}`}
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label htmlFor={questionId} className="mb-1.5 block text-sm font-semibold text-dark">
                      Pertanyaan
                    </label>
                    <TextInput
                      id={questionId}
                      lang={lang}
                      value={item.question}
                      onChange={(event) => updateAt(index, { question: event.target.value })}
                      maxLength={300}
                      placeholder={questionPlaceholder}
                      invalid={Boolean(questionError)}
                    />
                    {questionError && (
                      <p id={`${questionId}-desc`} className="mt-1.5 text-sm font-medium text-red-600" role="alert">
                        {questionError}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor={answerId} className="mb-1.5 block text-sm font-semibold text-dark">
                      Jawaban
                    </label>
                    <TextArea
                      id={answerId}
                      lang={lang}
                      rows={3}
                      value={item.answer}
                      onChange={(event) => updateAt(index, { answer: event.target.value })}
                      maxLength={3000}
                      placeholder={answerPlaceholder}
                      invalid={Boolean(answerError)}
                    />
                    {answerError && (
                      <p id={`${answerId}-desc`} className="mt-1.5 text-sm font-medium text-red-600" role="alert">
                        {answerError}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      )}

      {value.length < maxItems ? (
        <button
          type="button"
          id={value.length === 0 ? id : undefined}
          onClick={add}
          className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 px-4 text-sm font-semibold text-primary-700 transition-colors hover:border-primary/50 hover:bg-primary/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
        >
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
          {value.length === 0 ? 'Tambah FAQ pertama' : 'Tambah FAQ'}
        </button>
      ) : (
        <p className="text-xs text-dark/50">Batas maksimal {maxItems} FAQ tercapai.</p>
      )}

      {listError && (
        <p className="text-sm font-medium text-red-600" role="alert">
          {listError}
        </p>
      )}
    </div>
  );
}
