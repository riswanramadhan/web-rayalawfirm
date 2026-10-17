import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { getServices } from '@/lib/i18n/localized-data';
import { siteConfig } from '@/lib/metadata';
import { buildWhatsAppURL } from '@/lib/whatsapp';

interface FooterProps {
  locale: Locale;
}

/** NAP (Name, Address, Phone) — harus identik dengan halaman Kontak. */
const OFFICE_ADDRESS = `${siteConfig.address.street}, ${siteConfig.address.district}, ${siteConfig.address.city} ${siteConfig.address.postalCode}`;
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${siteConfig.name}, ${OFFICE_ADDRESS}`
)}`;

/** "+6281335663379" → "0813 3566 3379" */
const toLocalPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, '');
  const local = digits.startsWith('62') ? `0${digits.slice(2)}` : digits;
  return `${local.slice(0, 4)} ${local.slice(4, 8)} ${local.slice(8)}`.trim();
};

const iconClass = 'h-5 w-5';

const icons: Record<'address' | 'phone' | 'whatsapp' | 'email' | 'clock', ReactNode> = {
  address: (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
  ),
  phone: (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z"
      />
    </svg>
  ),
  whatsapp: (
    <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  ),
  email: (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>
  ),
  clock: (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const headingClass = 'font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white';
const linkBaseClass =
  'flex min-h-[44px] items-center break-words py-1 font-body text-[15px] leading-snug transition-colors hover:text-white';
const linkClass = `${linkBaseClass} text-white/70`;
const contactLinkClass =
  'inline-flex min-h-[44px] items-center break-words text-white/85 underline-offset-4 transition-colors hover:text-white hover:underline';

function ContactRow({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span
        className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/5 text-accent"
        aria-hidden="true"
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">{label}</p>
        <div className="mt-1 text-[15px] leading-relaxed">{children}</div>
      </div>
    </li>
  );
}

export default function Footer({ locale }: FooterProps) {
  const t = getDictionary(locale);
  const services = getServices(locale);
  const waLink = buildWhatsAppURL(t.whatsapp.defaultMessage);
  const phones = [siteConfig.phone, siteConfig.alternatePhone];

  const companyLinks = [
    { label: t.common.about, href: '/tentang' },
    { label: t.footer.team, href: '/tim' },
    { label: t.common.articles, href: '/artikel' },
    { label: t.common.testimonials, href: '/testimoni' },
    { label: t.common.consultation, href: '/konsultasi' },
    { label: t.common.contact, href: '/kontak' },
    { label: t.common.privacyPolicy, href: '/kebijakan-privasi' },
  ];

  return (
    <footer className="border-t border-white/5 bg-navy text-white/70">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-14 sm:px-6 sm:pt-16 lg:px-12 lg:pb-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_0.8fr_1.3fr] lg:gap-10">
          <div className="space-y-5">
            <Link href="/" aria-label={t.common.logoHomeLabel} className="inline-flex min-h-[44px] items-center">
              <Image
                src="/images/logo-rayalawfirm-with-title.png"
                alt={t.common.logoAlt}
                width={173}
                height={80}
                className="h-14 w-auto brightness-0 invert"
              />
            </Link>
            <p className="max-w-sm font-body text-[15px] leading-relaxed text-white/70">{t.footer.description}</p>
            <p className="max-w-sm font-body text-sm leading-relaxed text-white/55">{t.footer.areasServed}</p>
            <div>
              <p className="sr-only">{t.footer.followUs}</p>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-[44px] items-center gap-3 text-white/75 transition-colors hover:text-white"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors group-hover:border-white/50">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </span>
                <span className="text-sm font-medium">
                  Instagram <span className="text-white/50">@rayalawfirm.official</span>
                  <span className="sr-only"> {t.common.opensInNewTab}</span>
                </span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:gap-10 md:col-span-2 lg:contents">
            <nav aria-labelledby="footer-services-heading" className="min-w-0">
              <h2 id="footer-services-heading" className={headingClass}>
                {t.footer.services}
              </h2>
              <ul className="mt-3">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link href={`/layanan/${service.slug}`} className={linkClass}>
                      {service.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/layanan" className={`${linkBaseClass} font-semibold text-accent`}>
                    {t.common.viewAllServices}
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-labelledby="footer-company-heading" className="min-w-0">
              <h2 id="footer-company-heading" className={headingClass}>
                {t.footer.company}
              </h2>
              <ul className="mt-3">
                <li>
                  <Link href="/" className={linkClass}>
                    {t.common.home}
                  </Link>
                </li>
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="min-w-0 md:col-start-2 md:row-start-1 lg:col-start-auto lg:row-start-auto">
            <h2 className={headingClass}>{t.footer.contact}</h2>
            <address className="mt-5 not-italic">
              <p className="font-sans text-base font-semibold text-white">{siteConfig.name}</p>
              <ul className="mt-4 space-y-4">
                <ContactRow icon={icons.address} label={t.common.address}>
                  <p className="break-words text-white/85">{OFFICE_ADDRESS}</p>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex min-h-[32px] items-center gap-1 text-sm font-semibold text-accent underline-offset-4 hover:underline"
                  >
                    {t.common.directions}
                    <span className="sr-only"> {t.common.opensInNewTab}</span>
                  </a>
                </ContactRow>
                <ContactRow icon={icons.phone} label={t.common.phone}>
                  <div className="flex flex-col">
                    {phones.map((phone) => (
                      <a key={phone} href={`tel:${phone}`} className={contactLinkClass}>
                        {toLocalPhone(phone)}
                      </a>
                    ))}
                  </div>
                </ContactRow>
                <ContactRow icon={icons.whatsapp} label={t.footer.whatsapp}>
                  <a href={waLink} target="_blank" rel="noopener noreferrer" className={contactLinkClass}>
                    {toLocalPhone(siteConfig.phone)}
                    <span className="sr-only"> {t.common.opensInNewTab}</span>
                  </a>
                </ContactRow>
                <ContactRow icon={icons.email} label={t.common.email}>
                  <a href={`mailto:${siteConfig.email}`} className={contactLinkClass}>
                    {siteConfig.email}
                  </a>
                </ContactRow>
                <ContactRow icon={icons.clock} label={t.common.operationalHours}>
                  <p className="text-white/85">{t.consultationPage.weekdayHours}</p>
                  <p className="text-white/60">{t.consultationPage.saturdayHours}</p>
                </ContactRow>
              </ul>
            </address>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="footer-safe-bottom mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 pt-6 text-center sm:px-6 md:flex-row md:flex-wrap md:items-center md:gap-x-6 md:pr-60 md:text-left lg:px-12 lg:pr-64">
          <p className="text-xs leading-relaxed text-white/60">
            {t.common.copyright} | {t.common.poweredBy}{' '}
            <a
              href="https://dekatlokal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-white/80 underline transition-colors hover:text-white"
            >
              DekatLokal
            </a>
          </p>
          <Link
            href="/kebijakan-privasi"
            className="inline-flex min-h-[44px] items-center gap-2 text-xs text-white/60 transition-colors hover:text-white md:min-h-0"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
            {t.common.privacyPolicy}
          </Link>
        </div>
      </div>
    </footer>
  );
}
