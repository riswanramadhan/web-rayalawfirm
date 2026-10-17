'use client';

import {
  useCallback,
  useDeferredValue,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import Markdown from '@/components/content/Markdown';
import { countWords, estimateReadingMinutes } from '@/lib/markdown';

export type EditorView = 'write' | 'preview' | 'split';

interface MarkdownEditorProps {
  /** id textarea (dipakai label Field & fokus error). */
  id: string;
  value: string;
  onChange: (value: string) => void;
  invalid?: boolean;
  placeholder?: string;
  /** Mode tampilan terkontrol (opsional). */
  view?: EditorView;
  onViewChange?: (view: EditorView) => void;
  /** Isi pratinjau kustom. Default: <Markdown /> di kartu putih. */
  renderPreview?: (content: string) => ReactNode;
  /** Versi ringkas (mis. terjemahan): textarea lebih pendek. */
  compact?: boolean;
  /** Bahasa isi (untuk pemeriksa ejaan browser). */
  lang?: string;
  /** Hitungan kata dari parent (hindari menghitung dua kali). */
  wordCount?: number;
  readingMinutes?: number;
}

type LineKind = 'h2' | 'h3' | 'ul' | 'ol' | 'quote';

interface Edit {
  start: number;
  end: number;
  text: string;
  selectStart: number;
  selectEnd: number;
}

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const LINE_PATTERNS: Record<LineKind, RegExp> = {
  h2: /^##\s+/,
  h3: /^###\s+/,
  ul: /^\s*[-*+]\s+/,
  ol: /^\s*\d{1,3}[.)]\s+/,
  quote: /^\s*>\s?/,
};

// Prefiks lain yang dibersihkan saat mengganti jenis baris (mis. daftar → subjudul).
const ANY_BLOCK_PREFIX = /^(\s*#{1,6}\s+|\s*[-*+]\s+|\s*\d{1,3}[.)]\s+|\s*>\s?)/;

const LINE_PLACEHOLDER: Record<LineKind, string> = {
  h2: 'Judul bagian',
  h3: 'Sub-bagian',
  ul: 'Poin',
  ol: 'Langkah',
  quote: 'Kutipan',
};

function prefixFor(kind: LineKind, index: number): string {
  switch (kind) {
    case 'h2':
      return '## ';
    case 'h3':
      return '### ';
    case 'ul':
      return '- ';
    case 'ol':
      return `${index + 1}. `;
    default:
      return '> ';
  }
}

function hasPrefix(kind: LineKind, line: string): boolean {
  if (kind === 'h2') return LINE_PATTERNS.h2.test(line) && !/^###/.test(line);
  return LINE_PATTERNS[kind].test(line);
}

/** Terapkan/lepaskan prefiks baris (subjudul, daftar, kutipan) pada baris yang terseleksi. */
function buildLineEdit(value: string, start: number, end: number, kind: LineKind): Edit {
  const lineStart = value.lastIndexOf('\n', start - 1) + 1;
  const endProbe = end > start && value[end - 1] === '\n' ? end - 1 : end;
  let lineEnd = value.indexOf('\n', endProbe);
  if (lineEnd === -1) lineEnd = value.length;

  const lines = value.slice(lineStart, lineEnd).split('\n');
  const filled = lines.filter((line) => line.trim());

  if (filled.length === 0) {
    const prefix = prefixFor(kind, 0);
    const placeholder = LINE_PLACEHOLDER[kind];
    return {
      start: lineStart,
      end: lineEnd,
      text: `${prefix}${placeholder}`,
      selectStart: lineStart + prefix.length,
      selectEnd: lineStart + prefix.length + placeholder.length,
    };
  }

  const removing = filled.every((line) => hasPrefix(kind, line));
  let counter = 0;
  const next = lines.map((line) => {
    if (!line.trim()) return line;
    if (removing) return line.replace(LINE_PATTERNS[kind], '');
    const prefix = prefixFor(kind, counter);
    counter += 1;
    return `${prefix}${line.replace(ANY_BLOCK_PREFIX, '')}`;
  });
  const text = next.join('\n');

  return lines.length === 1
    ? { start: lineStart, end: lineEnd, text, selectStart: lineStart + text.length, selectEnd: lineStart + text.length }
    : { start: lineStart, end: lineEnd, text, selectStart: lineStart, selectEnd: lineStart + text.length };
}

/** Spasi pemisah saat menyisipkan teks baru di tengah kata. */
function spacing(value: string, start: number, end: number): { before: string; after: string } {
  const previous = value[start - 1];
  const next = value[end];
  return {
    before: previous !== undefined && !/\s/.test(previous) ? ' ' : '',
    after: next !== undefined && !/[\s.,;:!?)]/.test(next) ? ' ' : '',
  };
}

/** Bungkus seleksi dengan **…** / *…* (atau lepaskan bila sudah terbungkus). */
function buildWrapEdit(value: string, rawStart: number, rawEnd: number, marker: '**' | '*', placeholder: string): Edit {
  let start = rawStart;
  let end = rawEnd;
  // Spasi di tepi seleksi membuat format Markdown tidak terbaca ("**kata **").
  while (start < end && /\s/.test(value[start])) start += 1;
  while (end > start && /\s/.test(value[end - 1])) end -= 1;

  const size = marker.length;
  const selected = value.slice(start, end);

  if (selected) {
    const before = value.slice(start - size, start);
    const after = value.slice(end, end + size);
    const insideBold = marker === '*' && value.slice(start - 2, start) === '**' && value.slice(start - 3, start) !== '***';
    if (before === marker && after === marker && !insideBold) {
      return {
        start: start - size,
        end: end + size,
        text: selected,
        selectStart: start - size,
        selectEnd: end - size,
      };
    }
    if (selected.startsWith(marker) && selected.endsWith(marker) && selected.length > size * 2) {
      const inner = selected.slice(size, -size);
      return { start, end, text: inner, selectStart: start, selectEnd: start + inner.length };
    }
    return {
      start,
      end,
      text: `${marker}${selected}${marker}`,
      selectStart: start + size,
      selectEnd: end + size,
    };
  }

  const pad = spacing(value, rawStart, rawEnd);
  return {
    start: rawStart,
    end: rawEnd,
    text: `${pad.before}${marker}${placeholder}${marker}${pad.after}`,
    selectStart: rawStart + pad.before.length + size,
    selectEnd: rawStart + pad.before.length + size + placeholder.length,
  };
}

function buildLinkEdit(value: string, start: number, end: number): Edit {
  const selected = value.slice(start, end).trim();
  const looksLikeUrl = /^(https?:\/\/|\/)\S*$/i.test(selected);

  if (selected && looksLikeUrl) {
    const label = 'teks tautan';
    const text = `[${label}](${selected})`;
    return { start, end, text, selectStart: start + 1, selectEnd: start + 1 + label.length };
  }

  if (selected) {
    const url = 'https://';
    const text = `[${selected}](${url})`;
    const urlStart = start + selected.length + 3;
    return { start, end, text, selectStart: urlStart, selectEnd: urlStart + url.length };
  }

  const label = 'teks tautan';
  const pad = spacing(value, start, end);
  const text = `${pad.before}[${label}](https://)${pad.after}`;
  const labelStart = start + pad.before.length + 1;
  return { start, end, text, selectStart: labelStart, selectEnd: labelStart + label.length };
}

/* ------------------------------------------------------------------ */

function ToolButton({
  label,
  shortcut,
  onPress,
  children,
}: {
  label: string;
  shortcut?: string;
  onPress: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={shortcut ? `${label} (${shortcut})` : label}
      // Jangan pindahkan fokus dari textarea (seleksi & keyboard HP tetap).
      onMouseDown={(event) => event.preventDefault()}
      onPointerDown={(event) => {
        if (event.pointerType === 'mouse') event.preventDefault();
      }}
      onClick={onPress}
      className="inline-flex h-11 min-w-[44px] shrink-0 items-center justify-center rounded-lg px-2 text-sm font-semibold text-dark/70 transition-colors hover:bg-primary/10 hover:text-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      {children}
    </button>
  );
}

function Separator() {
  return <span className="mx-0.5 h-6 w-px shrink-0 bg-dark/10" aria-hidden="true" />;
}

const iconClass = 'h-5 w-5';

function ViewButton({
  active,
  onClick,
  children,
  className = '',
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-[44px] items-center justify-center rounded-lg px-4 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
        active ? 'bg-white text-navy shadow-sm' : 'text-dark/60 hover:text-dark'
      } ${className || 'inline-flex'}`}
    >
      {children}
    </button>
  );
}

const GUIDE_ROWS: { syntax: string; result: string }[] = [
  { syntax: '## Judul bagian', result: 'Subjudul utama (H2) — masuk daftar isi' },
  { syntax: '### Sub-bagian', result: 'Subjudul kecil (H3)' },
  { syntax: '**teks tebal**', result: 'Teks tebal' },
  { syntax: '*teks miring*', result: 'Teks miring' },
  { syntax: '- poin', result: 'Daftar berpoin' },
  { syntax: '1. langkah', result: 'Daftar bernomor' },
  { syntax: '> kutipan', result: 'Kutipan pasal / putusan' },
  { syntax: '[konsultasi](/konsultasi)', result: 'Tautan ke halaman website' },
  { syntax: '[UU](https://peraturan.go.id)', result: 'Tautan ke situs lain' },
  { syntax: '---', result: 'Garis pemisah' },
];

function FormatGuide() {
  return (
    <details className="group rounded-xl border border-dark/10 bg-offwhite [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-3 px-4 py-2 text-sm font-semibold text-dark">
        Panduan format
        <svg
          className="h-5 w-5 shrink-0 text-dark/40 transition-transform group-open:rotate-180"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </summary>
      <div className="border-t border-dark/5 px-4 pb-4 pt-3">
        <dl className="divide-y divide-dark/5 text-sm">
          {GUIDE_ROWS.map((row) => (
            <div key={row.syntax} className="flex flex-col gap-0.5 py-2 sm:flex-row sm:items-baseline sm:gap-4">
              <dt className="sm:w-56 sm:shrink-0">
                <code className="break-all rounded bg-white px-1.5 py-0.5 font-mono text-[13px] text-navy ring-1 ring-inset ring-dark/10">
                  {row.syntax}
                </code>
              </dt>
              <dd className="text-dark/65">{row.result}</dd>
            </div>
          ))}
        </dl>
        <ul className="mt-3 space-y-1 text-xs leading-relaxed text-dark/55">
          <li>• Pisahkan paragraf dengan satu baris kosong.</li>
          <li>• Buka artikel dengan 1–2 paragraf yang langsung menjawab pertanyaan pembaca.</li>
          <li>• Pintasan keyboard: Ctrl/⌘ + B (tebal), Ctrl/⌘ + I (miring), Ctrl/⌘ + K (tautan).</li>
        </ul>
      </div>
    </details>
  );
}

/* ------------------------------------------------------------------ */

/**
 * Editor Markdown ringan untuk HP & desktop: toolbar format (menempel di atas
 * saat menggulir), tab Tulis/Pratinjau, dan tampilan berdampingan di layar xl.
 */
export default function MarkdownEditor({
  id,
  value,
  onChange,
  invalid,
  placeholder,
  view: controlledView,
  onViewChange,
  renderPreview,
  compact,
  lang = 'id',
  wordCount,
  readingMinutes,
}: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const onChangeRef = useRef(onChange);
  const pendingSelection = useRef<[number, number] | null>(null);
  const [innerView, setInnerView] = useState<EditorView>('write');
  const view = controlledView ?? innerView;
  const deferredValue = useDeferredValue(value);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const setView = useCallback(
    (next: EditorView) => {
      if (controlledView === undefined) setInnerView(next);
      onViewChange?.(next);
    },
    [controlledView, onViewChange]
  );

  // Mode berdampingan hanya untuk layar ≥ 1280px.
  useEffect(() => {
    if (view !== 'split') return;
    const query = window.matchMedia('(min-width: 1280px)');
    const check = () => {
      if (!query.matches) setView('write');
    };
    check();
    query.addEventListener('change', check);
    return () => query.removeEventListener('change', check);
  }, [view, setView]);

  const resize = useCallback(() => {
    const element = textareaRef.current;
    if (!element || element.offsetParent === null) return;
    const scrollY = window.scrollY;
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight + 2}px`;
    if (window.scrollY !== scrollY) window.scrollTo({ top: scrollY });
  }, []);

  useIsomorphicLayoutEffect(() => {
    resize();
    const selection = pendingSelection.current;
    const element = textareaRef.current;
    if (selection && element) {
      pendingSelection.current = null;
      element.focus({ preventScroll: true });
      element.setSelectionRange(selection[0], selection[1]);
    }
  }, [value, view, resize]);

  useEffect(() => {
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [resize]);

  /** Ganti rentang teks; pakai execCommand agar Undo (Ctrl+Z) tetap berfungsi. */
  const applyEdit = useCallback((edit: Edit) => {
    const element = textareaRef.current;
    if (!element) return;
    if (edit.start === edit.end && !edit.text) return;

    const current = element.value;
    const expected = current.slice(0, edit.start) + edit.text + current.slice(edit.end);

    element.focus({ preventScroll: true });
    element.setSelectionRange(edit.start, edit.end);

    let applied = false;
    try {
      applied = edit.text
        ? document.execCommand('insertText', false, edit.text)
        : document.execCommand('delete', false);
    } catch {
      applied = false;
    }

    if (!applied || element.value !== expected) {
      pendingSelection.current = [edit.selectStart, edit.selectEnd];
      onChangeRef.current(expected);
      return;
    }

    element.setSelectionRange(edit.selectStart, edit.selectEnd);
  }, []);

  const runLine = (kind: LineKind) => {
    const element = textareaRef.current;
    if (!element) return;
    applyEdit(buildLineEdit(element.value, element.selectionStart, element.selectionEnd, kind));
  };

  const runWrap = (marker: '**' | '*', text: string) => {
    const element = textareaRef.current;
    if (!element) return;
    applyEdit(buildWrapEdit(element.value, element.selectionStart, element.selectionEnd, marker, text));
  };

  const runLink = () => {
    const element = textareaRef.current;
    if (!element) return;
    applyEdit(buildLinkEdit(element.value, element.selectionStart, element.selectionEnd));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.nativeEvent.isComposing) return;
    const element = event.currentTarget;
    const modifier = event.metaKey || event.ctrlKey;

    if (modifier && !event.altKey && !event.shiftKey) {
      const key = event.key.toLowerCase();
      if (key === 'b') {
        event.preventDefault();
        runWrap('**', 'teks tebal');
        return;
      }
      if (key === 'i') {
        event.preventDefault();
        runWrap('*', 'teks miring');
        return;
      }
      if (key === 'k') {
        event.preventDefault();
        runLink();
        return;
      }
    }

    // Enter di item daftar: lanjutkan daftar; Enter di item kosong: akhiri daftar.
    if (event.key === 'Enter' && !event.shiftKey && !modifier && !event.altKey) {
      const { selectionStart: start, selectionEnd: end, value: current } = element;
      if (start !== end) return;
      const lineStart = current.lastIndexOf('\n', start - 1) + 1;
      let lineEnd = current.indexOf('\n', start);
      if (lineEnd === -1) lineEnd = current.length;
      const beforeCursor = current.slice(lineStart, start);
      const afterCursor = current.slice(start, lineEnd);

      const bullet = /^(\s*)([-*+])\s+(.*)$/.exec(beforeCursor);
      const numbered = bullet ? null : /^(\s*)(\d{1,3})([.)])\s+(.*)$/.exec(beforeCursor);
      if (!bullet && !numbered) return;

      event.preventDefault();
      const itemText = bullet ? bullet[3] : (numbered as RegExpExecArray)[4];

      if (!itemText.trim() && !afterCursor.trim()) {
        applyEdit({ start: lineStart, end: lineEnd, text: '', selectStart: lineStart, selectEnd: lineStart });
        return;
      }

      const prefix = bullet
        ? `${bullet[1]}${bullet[2]} `
        : `${(numbered as RegExpExecArray)[1]}${Number((numbered as RegExpExecArray)[2]) + 1}${(numbered as RegExpExecArray)[3]} `;
      const insert = `\n${prefix}`;
      applyEdit({ start, end, text: insert, selectStart: start + insert.length, selectEnd: start + insert.length });
    }
  };

  const stats = useMemo(() => {
    if (wordCount !== undefined) {
      return { words: wordCount, minutes: readingMinutes ?? Math.max(1, Math.round(wordCount / 200)) };
    }
    return { words: countWords(deferredValue), minutes: estimateReadingMinutes(deferredValue) };
  }, [deferredValue, wordCount, readingMinutes]);

  const showWrite = view !== 'preview';
  const writePaneClass = view === 'preview' ? 'hidden' : 'min-w-0';
  const previewPaneClass =
    view === 'preview'
      ? 'min-w-0'
      : view === 'split'
        ? 'hidden min-w-0 xl:sticky xl:top-6 xl:block xl:max-h-[calc(100vh_-_3rem)] xl:overflow-y-auto xl:overscroll-contain'
        : 'hidden';

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div role="group" aria-label="Mode editor" className="inline-flex rounded-xl bg-dark/5 p-1">
          <ViewButton active={view === 'write'} onClick={() => setView('write')}>
            Tulis
          </ViewButton>
          <ViewButton active={view === 'preview'} onClick={() => setView('preview')}>
            Pratinjau
          </ViewButton>
          <ViewButton active={view === 'split'} onClick={() => setView('split')} className="hidden xl:inline-flex">
            Berdampingan
          </ViewButton>
        </div>
        <p className="text-xs tabular-nums text-dark/55" aria-live="polite">
          {new Intl.NumberFormat('id-ID').format(stats.words)} kata
          {stats.words > 0 ? ` · ${stats.minutes} menit baca` : ''}
        </p>
      </div>

      <div className={view === 'split' ? 'xl:grid xl:grid-cols-2 xl:items-start xl:gap-4' : ''}>
        <div className={writePaneClass}>
          <div
            className={`rounded-xl border bg-white shadow-sm transition focus-within:ring-4 ${
              invalid
                ? 'border-red-500 focus-within:ring-red-500/15'
                : 'border-dark/15 focus-within:border-primary focus-within:ring-primary/15'
            }`}
          >
            {showWrite && (
              <div className="sticky top-[calc(3.5rem_+_env(safe-area-inset-top))] z-10 rounded-t-xl border-b border-dark/10 bg-white/95 backdrop-blur lg:top-0">
                <div
                  role="toolbar"
                  aria-label="Format teks"
                  aria-controls={id}
                  className="flex items-center gap-0.5 overflow-x-auto overscroll-x-contain px-1.5 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  <ToolButton label="Subjudul H2" onPress={() => runLine('h2')}>
                    H2
                  </ToolButton>
                  <ToolButton label="Subjudul H3" onPress={() => runLine('h3')}>
                    H3
                  </ToolButton>
                  <Separator />
                  <ToolButton label="Tebal" shortcut="Ctrl/⌘+B" onPress={() => runWrap('**', 'teks tebal')}>
                    <span className="font-sans text-base font-extrabold">B</span>
                  </ToolButton>
                  <ToolButton label="Miring" shortcut="Ctrl/⌘+I" onPress={() => runWrap('*', 'teks miring')}>
                    <span className="font-serif text-base italic">I</span>
                  </ToolButton>
                  <Separator />
                  <ToolButton label="Daftar" onPress={() => runLine('ul')}>
                    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </ToolButton>
                  <ToolButton label="Daftar bernomor" onPress={() => runLine('ol')}>
                    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.242 5.992h12m-12 6.003h12m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 111.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 010 2.25H3.74m0-.002h.375a1.125 1.125 0 010 2.25H2.99" />
                    </svg>
                  </ToolButton>
                  <ToolButton label="Kutipan" onPress={() => runLine('quote')}>
                    <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M9.5 6.5C6.46 7.4 4.5 9.92 4.5 13.25v4.25h5.25v-5.25H7.06c.19-1.82 1.27-3.18 3.04-3.84L9.5 6.5zm9.5 0c-3.04.9-5 3.42-5 6.75v4.25h5.25v-5.25h-2.69c.19-1.82 1.27-3.18 3.04-3.84L19 6.5z" />
                    </svg>
                  </ToolButton>
                  <ToolButton label="Tautan" shortcut="Ctrl/⌘+K" onPress={runLink}>
                    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                    </svg>
                  </ToolButton>
                </div>
              </div>
            )}
            <textarea
              ref={textareaRef}
              id={id}
              lang={lang}
              value={value}
              onChange={(event) => onChange(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              aria-invalid={invalid || undefined}
              aria-describedby={`${id}-desc`}
              spellCheck
              autoCapitalize="sentences"
              rows={compact ? 8 : 14}
              className={`block w-full resize-none overflow-hidden rounded-b-xl bg-transparent px-4 py-4 font-body text-base leading-7 text-dark outline-none placeholder:text-dark/35 ${
                compact ? 'min-h-[40vh]' : 'min-h-[60vh]'
              }`}
            />
          </div>
        </div>

        <div className={previewPaneClass} role="region" aria-label="Pratinjau isi">
          {renderPreview ? (
            renderPreview(deferredValue)
          ) : (
            <div className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm sm:p-8">
              {deferredValue.trim() ? (
                <Markdown content={deferredValue} />
              ) : (
                <p className="text-sm text-dark/50">Belum ada isi untuk dipratinjau.</p>
              )}
            </div>
          )}
        </div>
      </div>

      <FormatGuide />
    </div>
  );
}
