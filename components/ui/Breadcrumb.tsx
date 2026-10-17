import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/lib/seo/schema';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /** Path halaman saat ini (opsional) agar item terakhir di JSON-LD ikut punya URL. */
  currentPath?: string;
  className?: string;
}

/**
 * Breadcrumb visual + BreadcrumbList JSON-LD otomatis.
 * Tanpa hooks sehingga aman dipakai di server component.
 */
export default function Breadcrumb({ items, currentPath, className = '' }: BreadcrumbProps) {
  if (!items.length) return null;

  const schema = buildBreadcrumbSchema(
    items.map((item) => ({ name: item.label, path: item.href })),
    currentPath
  );

  return (
    <>
      <nav aria-label="Breadcrumb" className={`mb-4 min-w-0 ${className}`.trim()}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/60">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={`${index}-${item.label}`} className="flex min-w-0 max-w-full items-center gap-2">
                {index > 0 && (
                  <svg
                    className="h-3 w-3 flex-shrink-0 text-white/40"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                )}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="inline-flex min-h-[32px] items-center rounded transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? 'page' : undefined}
                    title={item.label}
                    className="block max-w-[70vw] truncate font-medium text-white/90 sm:max-w-md lg:max-w-xl"
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={schema} />
    </>
  );
}
