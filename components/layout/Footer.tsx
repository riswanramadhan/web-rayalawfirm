import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { getServices } from '@/lib/i18n/localized-data';

interface FooterProps {
  locale: Locale;
}

const icons = {
  address: (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
  ),
  phone: (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z"
      />
    </svg>
  ),
  email: (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>
  ),
  clock: (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
};

export default function Footer({ locale }: FooterProps) {
  const t = getDictionary(locale);
  const services = getServices(locale);

  const companyLinks = [
    { label: t.common.about, href: '/tentang' },
    { label: t.footer.team, href: '/tim' },
    { label: t.common.articles, href: '/artikel' },
    { label: t.common.testimonials, href: '/testimoni' },
    { label: t.common.consultation, href: '/konsultasi' },
    { label: t.common.contact, href: '/kontak' },
  ];

  const contactItems = [
    {
      label: t.common.address,
      value: 'Jl. Tebet Barat Dalam IV No. 10, Jakarta.',
      icon: icons.address,
    },
    {
      label: t.common.phone,
      value: '0813 3566 3379 / 0853 4510 8869',
      icon: icons.phone,
    },
    { label: t.common.email, value: 'info@rayalawfirm.com', icon: icons.email },
    {
      label: t.common.operationalHours,
      value: t.footer.operationalHours,
      icon: icons.clock,
    },
  ];

  return (
    <footer className="bg-navy text-white/70">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-5">
            <Image
              src="/images/logo-rayalawfirm-with-title.png"
              alt="Raya Law Firm"
              width={160}
              height={48}
              className="h-16 w-auto brightness-0 invert"
            />
            <p className="text-sm leading-relaxed text-white/70">
              {t.footer.description}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/rayalawfirm.official"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-white/70 transition-colors hover:text-white"
                aria-label="Instagram"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition-colors group-hover:border-white/50">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </div>

                <span className="text-sm font-medium">
                  @rayalawfirm.official
                </span>
              </a>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-white">
              {t.footer.services}
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/layanan/${service.slug}`}
                    className="transition-colors hover:text-white"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-white">
              {t.footer.company}
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-white">
              {t.footer.contact}
            </p>
            <ul className="mt-5 space-y-4 text-sm">
              {contactItems.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <span className="mt-0.5 text-white/60" aria-hidden="true">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/50">
                      {item.label}
                    </p>
                    <p className="text-white/80">{item.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-6 py-6 text-center lg:px-12">
          <p className="text-xs text-white/60">
            {t.common.copyright} | {t.common.poweredBy}{' '}
            <a
              href="https://dekatlokal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline text-white/80 transition-colors hover:text-white"
            >
              DekatLokal
            </a>
          </p>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <Link
              href="/kebijakan-privasi"
              className="text-xs text-white/60 transition-colors hover:text-white"
            >
              {t.common.privacyPolicy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
