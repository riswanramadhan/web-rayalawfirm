import Link from 'next/link';
import type { ReactNode } from 'react';
import { parseInline, parseMarkdown, type InlineNode } from '@/lib/markdown';

interface MarkdownProps {
  content: string;
  className?: string;
}

function renderInline(nodes: InlineNode[], keyPrefix: string): ReactNode[] {
  return nodes.map((node, index) => {
    const key = `${keyPrefix}-${index}`;

    switch (node.type) {
      case 'text':
        return node.value;
      case 'strong':
        return (
          <strong key={key} className="font-semibold text-dark">
            {renderInline(node.children, key)}
          </strong>
        );
      case 'em':
        return <em key={key}>{renderInline(node.children, key)}</em>;
      case 'code':
        return (
          <code key={key} className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[0.9em] text-navy">
            {node.value}
          </code>
        );
      case 'link': {
        const children = renderInline(node.children, key);
        const linkClass =
          'font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary';

        if (node.href.startsWith('/') || node.href.startsWith('#')) {
          return (
            <Link key={key} href={node.href} className={linkClass}>
              {children}
            </Link>
          );
        }

        const isHttp = /^https?:\/\//i.test(node.href);
        return (
          <a
            key={key}
            href={node.href}
            className={linkClass}
            {...(isHttp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {children}
          </a>
        );
      }
      default:
        return null;
    }
  });
}

/**
 * Merender konten artikel (Markdown sederhana) menjadi elemen semantik:
 * h2/h3/h4 dengan id (untuk daftar isi & anchor), p, ul/ol, blockquote.
 * Aman: tidak ada HTML mentah yang dirender.
 */
export default function Markdown({ content, className }: MarkdownProps) {
  const blocks = parseMarkdown(content);

  return (
    <div className={`break-words ${className ?? ''}`}>
      {blocks.map((block, index) => {
        const key = `block-${index}`;

        switch (block.type) {
          case 'heading': {
            const children = renderInline(parseInline(block.text), key);
            if (block.level === 2) {
              return (
                <h2
                  key={key}
                  id={block.id}
                  className="mt-10 scroll-mt-28 font-sans text-xl font-bold leading-snug tracking-tight text-dark first:mt-0 sm:text-2xl"
                >
                  {children}
                </h2>
              );
            }
            if (block.level === 3) {
              return (
                <h3
                  key={key}
                  id={block.id}
                  className="mt-8 scroll-mt-28 font-sans text-lg font-semibold leading-snug text-dark sm:text-xl"
                >
                  {children}
                </h3>
              );
            }
            return (
              <h4
                key={key}
                id={block.id}
                className="mt-6 scroll-mt-28 font-sans text-base font-semibold text-dark sm:text-lg"
              >
                {children}
              </h4>
            );
          }
          case 'paragraph':
            return (
              <p key={key} className="mt-4 font-body text-base leading-relaxed text-dark/80 sm:text-[1.0625rem] sm:leading-8">
                {renderInline(parseInline(block.text), key)}
              </p>
            );
          case 'list': {
            const ListTag = block.ordered ? 'ol' : 'ul';
            return (
              <ListTag
                key={key}
                className={`mt-4 space-y-2 pl-6 font-body text-base leading-relaxed text-dark/80 sm:text-[1.0625rem] ${
                  block.ordered ? 'list-decimal marker:font-semibold marker:text-primary' : 'list-disc marker:text-primary'
                }`}
              >
                {block.items.map((item, itemIndex) => (
                  <li key={`${key}-${itemIndex}`} className="pl-1">
                    {renderInline(parseInline(item), `${key}-${itemIndex}`)}
                  </li>
                ))}
              </ListTag>
            );
          }
          case 'quote':
            return (
              <blockquote
                key={key}
                className="mt-6 rounded-r-xl border-l-4 border-primary bg-primary/5 px-4 py-3 font-body text-base italic leading-relaxed text-dark/80 sm:text-lg"
              >
                {renderInline(parseInline(block.text), key)}
              </blockquote>
            );
          case 'hr':
            return <hr key={key} className="my-8 border-primary/15" />;
          default:
            return null;
        }
      })}
    </div>
  );
}
