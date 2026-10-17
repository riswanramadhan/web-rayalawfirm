import type { ReactNode } from 'react';
import type { LawyerProfile } from '@/lib/content/types';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { FacebookIcon, InstagramIcon, LinkedInIcon, MailIcon, PhoneIcon, WhatsAppIcon } from './icons';
import { getTeamLabels } from './labels';

interface LawyerContactProps {
  lawyer: LawyerProfile;
  locale: Locale;
  whatsappUrl: string;
  className?: string;
}

const isHttpUrl = (url: string) => /^https?:\/\//i.test(url.trim());

/** Kartu kontak pengacara (WhatsApp, email, telepon, media sosial). */
export default function LawyerContact({ lawyer, locale, whatsappUrl, className = '' }: LawyerContactProps) {
  const labels = getTeamLabels(locale);
  const t = getDictionary(locale);

  const socials: { label: string; href: string; icon: ReactNode }[] = [
    { label: 'LinkedIn', href: lawyer.linkedin, icon: <LinkedInIcon className="h-5 w-5" /> },
    { label: 'Instagram', href: lawyer.instagram, icon: <InstagramIcon className="h-5 w-5" /> },
    { label: 'Facebook', href: lawyer.facebook, icon: <FacebookIcon className="h-5 w-5" /> },
  ].filter((item) => isHttpUrl(item.href));

  return (
    <section
      id="kontak"
      aria-labelledby="kontak-heading"
      className={`scroll-mt-28 rounded-2xl border border-primary/10 bg-white p-5 shadow-lg shadow-primary/5 sm:p-6 ${className}`}
    >
      <h2 id="kontak-heading" className="font-sans text-xl font-bold tracking-tight text-dark sm:text-2xl">
        {labels.contact}
      </h2>
      <p className="mt-2 font-body text-sm leading-relaxed text-dark/70">{labels.contactIntro}</p>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-center text-sm font-semibold text-dark shadow-lg shadow-[#25D366]/30 transition-transform duration-300 hover:-translate-y-0.5"
      >
        <WhatsAppIcon className="h-5 w-5 shrink-0" />
        {t.common.whatsappConsultation}
        <span className="sr-only"> {labels.opensInNewTab}</span>
      </a>

      <ul className="mt-5 divide-y divide-gray-100 border-y border-gray-100">
        {lawyer.email && (
          <li>
            <a
              href={`mailto:${lawyer.email}`}
              className="flex min-h-[52px] items-center gap-3 py-3 text-sm text-dark/80 transition-colors hover:text-primary"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MailIcon className="h-[18px] w-[18px]" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs text-dark/50">{labels.email}</span>
                <span className="block break-all font-medium">{lawyer.email}</span>
              </span>
            </a>
          </li>
        )}
        {lawyer.phone && (
          <li>
            <a
              href={`tel:+${lawyer.phone}`}
              className="flex min-h-[52px] items-center gap-3 py-3 text-sm text-dark/80 transition-colors hover:text-primary"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <PhoneIcon className="h-[18px] w-[18px]" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs text-dark/50">{labels.phone}</span>
                <span className="block break-all font-medium">+{lawyer.phone}</span>
              </span>
            </a>
          </li>
        )}
      </ul>

      {socials.length > 0 && (
        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dark/50">{labels.socialMedia}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {socials.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary hover:text-white"
                >
                  {item.icon}
                  {item.label}
                  <span className="sr-only"> {labels.opensInNewTab}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
