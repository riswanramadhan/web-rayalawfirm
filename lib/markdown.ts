/**
 * Parser Markdown ringan & aman (tanpa HTML mentah) untuk konten artikel.
 *
 * Sintaks yang didukung:
 *   ## Judul bagian         → <h2>  (# juga diturunkan menjadi <h2>)
 *   ### Sub-judul           → <h3>
 *   #### Sub-sub-judul      → <h4>
 *   - item / * item         → daftar berpoin
 *   1. item                 → daftar bernomor
 *   > kutipan               → blockquote
 *   ---                     → garis pemisah
 *   **tebal**, *miring*, `kode`, [teks](https://tautan)
 *
 * Paragraf dipisahkan baris kosong. Baris berurutan digabung jadi satu paragraf.
 */

export type InlineNode =
  | { type: 'text'; value: string }
  | { type: 'strong'; children: InlineNode[] }
  | { type: 'em'; children: InlineNode[] }
  | { type: 'code'; value: string }
  | { type: 'link'; href: string; children: InlineNode[] };

export type BlockNode =
  | { type: 'heading'; level: 2 | 3 | 4; text: string; id: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'quote'; text: string }
  | { type: 'hr' };

export interface MarkdownHeading {
  id: string;
  text: string;
  level: 2 | 3 | 4;
}

const HEADING_RE = /^(#{1,6})\s+(.+?)\s*#*\s*$/;
const UL_RE = /^\s*[-*+]\s+(.*)$/;
const OL_RE = /^\s*\d{1,3}[.)]\s+(.*)$/;
const QUOTE_RE = /^\s*>\s?(.*)$/;
const HR_RE = /^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/;

export function slugifyHeading(text: string): string {
  const slug = stripInline(text)
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

  return slug || 'bagian';
}

export function parseMarkdown(source: string): BlockNode[] {
  const lines = (source ?? '').replace(/\r\n?/g, '\n').split('\n');
  const blocks: BlockNode[] = [];
  const usedIds = new Map<string, number>();

  let paragraph: string[] = [];
  let quote: string[] = [];
  const open: { list: { ordered: boolean; items: string[] } | null } = { list: null };

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ type: 'paragraph', text: paragraph.join(' ').trim() });
      paragraph = [];
    }
  };
  const flushList = () => {
    if (open.list && open.list.items.length) {
      blocks.push({ type: 'list', ordered: open.list.ordered, items: open.list.items });
    }
    open.list = null;
  };
  const flushQuote = () => {
    if (quote.length) {
      blocks.push({ type: 'quote', text: quote.join(' ').trim() });
      quote = [];
    }
  };
  const flushAll = () => {
    flushParagraph();
    flushList();
    flushQuote();
  };

  for (const rawLine of lines) {
    const line = rawLine.replace(/\s+$/, '');

    if (!line.trim()) {
      flushAll();
      continue;
    }

    if (HR_RE.test(line)) {
      flushAll();
      blocks.push({ type: 'hr' });
      continue;
    }

    const heading = HEADING_RE.exec(line);
    if (heading) {
      flushAll();
      const hashes = heading[1].length;
      const level = (hashes <= 2 ? 2 : hashes === 3 ? 3 : 4) as 2 | 3 | 4;
      const text = heading[2].trim();
      const base = slugifyHeading(text);
      const count = usedIds.get(base) ?? 0;
      usedIds.set(base, count + 1);
      blocks.push({
        type: 'heading',
        level,
        text,
        id: count === 0 ? base : `${base}-${count + 1}`,
      });
      continue;
    }

    const ul = UL_RE.exec(line);
    const ol = ul ? null : OL_RE.exec(line);
    if (ul || ol) {
      flushParagraph();
      flushQuote();
      const ordered = Boolean(ol);
      if (!open.list || open.list.ordered !== ordered) {
        flushList();
        open.list = { ordered, items: [] };
      }
      open.list.items.push(((ul ?? ol) as RegExpExecArray)[1].trim());
      continue;
    }

    const quoteMatch = QUOTE_RE.exec(line);
    if (quoteMatch) {
      flushParagraph();
      flushList();
      quote.push(quoteMatch[1].trim());
      continue;
    }

    // Baris lanjutan (menjorok) dari item daftar sebelumnya.
    if (open.list && /^\s{2,}\S/.test(rawLine) && open.list.items.length) {
      open.list.items[open.list.items.length - 1] += ` ${line.trim()}`;
      continue;
    }

    flushList();
    flushQuote();
    paragraph.push(line.trim());
  }

  flushAll();
  return blocks;
}

export function extractHeadings(source: string, maxLevel: 2 | 3 | 4 = 3): MarkdownHeading[] {
  return parseMarkdown(source)
    .filter((block): block is Extract<BlockNode, { type: 'heading' }> => block.type === 'heading')
    .filter((block) => block.level <= maxLevel)
    .map(({ id, text, level }) => ({ id, text: stripInline(text), level }));
}

const SAFE_HREF_RE = /^(https?:\/\/|mailto:|tel:|\/(?!\/)|#)/i;

export function isSafeHref(href: string): boolean {
  return SAFE_HREF_RE.test(href.trim());
}

/**
 * Mengubah teks inline (bold/italic/code/link) menjadi node.
 */
export function parseInline(text: string): InlineNode[] {
  const nodes: InlineNode[] = [];
  let rest = text;

  const pushText = (value: string) => {
    if (!value) return;
    const last = nodes[nodes.length - 1];
    if (last && last.type === 'text') {
      last.value += value;
    } else {
      nodes.push({ type: 'text', value });
    }
  };

  const patterns: Array<{
    re: RegExp;
    build: (match: RegExpExecArray) => InlineNode | null;
  }> = [
    { re: /`([^`]+)`/, build: (m) => ({ type: 'code', value: m[1] }) },
    {
      re: /\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/,
      build: (m) =>
        isSafeHref(m[2])
          ? { type: 'link', href: m[2].trim(), children: parseInline(m[1]) }
          : null,
    },
    { re: /\*\*([^*]+(?:\*(?!\*)[^*]*)*)\*\*/, build: (m) => ({ type: 'strong', children: parseInline(m[1]) }) },
    { re: /__([^_]+)__/, build: (m) => ({ type: 'strong', children: parseInline(m[1]) }) },
    { re: /\*([^*\s][^*]*?)\*/, build: (m) => ({ type: 'em', children: parseInline(m[1]) }) },
    { re: /(?<![\w])_([^_\s][^_]*?)_(?![\w])/, build: (m) => ({ type: 'em', children: parseInline(m[1]) }) },
  ];

  while (rest) {
    let best: { index: number; match: RegExpExecArray; build: (m: RegExpExecArray) => InlineNode | null } | null = null;

    for (const pattern of patterns) {
      const match = pattern.re.exec(rest);
      if (match && (best === null || match.index < best.index)) {
        best = { index: match.index, match, build: pattern.build };
      }
    }

    if (!best) {
      pushText(rest);
      break;
    }

    pushText(rest.slice(0, best.index));
    const node = best.build(best.match);
    if (node) {
      nodes.push(node);
    } else {
      // Tautan tidak aman: tampilkan teksnya saja.
      pushText(best.match[1] ?? best.match[0]);
    }
    rest = rest.slice(best.index + best.match[0].length);
  }

  return nodes;
}

/** Menghapus sintaks inline (bold, link, dll) dan menyisakan teks. */
export function stripInline(text: string): string {
  return text
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/(?<![\w])_([^_]+)_(?![\w])/g, '$1');
}

/** Konversi Markdown ke teks polos (untuk llms.txt, hitung kata, deskripsi). */
export function markdownToPlainText(source: string): string {
  return parseMarkdown(source)
    .map((block) => {
      switch (block.type) {
        case 'heading':
          return stripInline(block.text);
        case 'paragraph':
        case 'quote':
          return stripInline(block.text);
        case 'list':
          return block.items.map((item) => `- ${stripInline(item)}`).join('\n');
        default:
          return '';
      }
    })
    .filter(Boolean)
    .join('\n\n');
}

export function countWords(source: string): number {
  const text = markdownToPlainText(source);
  const words = text.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu);
  return words ? words.length : 0;
}

/** Estimasi menit baca (≈200 kata/menit, minimal 1). */
export function estimateReadingMinutes(source: string): number {
  return Math.max(1, Math.round(countWords(source) / 200));
}
