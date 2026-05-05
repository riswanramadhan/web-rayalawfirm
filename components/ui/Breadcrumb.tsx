import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-4 flex items-center gap-2 text-sm text-white/60"
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && (
            <svg
              className="h-3 w-3 text-white/40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="transition-colors duration-200 hover:text-white"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-white/90">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
