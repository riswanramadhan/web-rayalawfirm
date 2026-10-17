import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import JsonLd from '@/components/seo/JsonLd';
import { generatePageMetadata, siteConfig } from '@/lib/metadata';
import { buildWhatsAppURL } from '@/lib/whatsapp';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { getCurrentLocale } from '@/lib/i18n/server';
import { SCHEMA_IDS, buildWebPageSchema } from '@/lib/seo/schema';
import KontakForm from './KontakForm';

const PAGE_PATH = '/kontak';

/** NAP harus identik dengan footer. */
const OFFICE_ADDRESS = `${siteConfig.address.street}, ${siteConfig.address.district}, ${siteConfig.address.city} ${siteConfig.address.postalCode}`;
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${siteConfig.name}, ${OFFICE_ADDRESS}`
)}`;
const MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.987073101995!2d106.84331907413147!3d-6.237539161079284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3be1870e33f%3A0x179d46bc7feb6589!2sJl.%20Tebet%20Barat%20Dalam%20IV%20No.10%2C%20RT.17%2FRW.6%2C%20Tebet%20Bar.%2C%20Kec.%20Tebet%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2012810!5e1!3m2!1sid!2sid!4v1778143566646!5m2!1sid!2sid';

/** "+6281335663379" → "0813 3566 3379" */
const toLocalPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, '');
  const local = digits.startsWith('62') ? `0${digits.slice(2)}` : digits;
  return `${local.slice(0, 4)} ${local.slice(4, 8)} ${local.slice(8)}`.trim();
};

const icons = {
  address: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  ),
  phone: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
    </svg>
  ),
  whatsapp: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  ),
  email: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  ),
  clock: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const linkClass =
  'inline-flex min-h-[40px] items-center break-words font-semibold text-dark underline-offset-4 transition-colors hover:text-primary hover:underline';

function InfoItem({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex items-start gap-4 rounded-2xl border border-primary/10 bg-white p-4 shadow-lg shadow-primary/5 sm:p-5">
      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-12 sm:w-12">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dark/50">{label}</p>
        <div className="mt-1 text-base leading-relaxed">{children}</div>
      </div>
    </li>
  );
}

export function generateMetadata(): Metadata {
  const locale = getCurrentLocale();
  const t = getDictionary(locale).contactPage;

  return generatePageMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: PAGE_PATH,
    locale,
  });
}

export default function KontakPage() {
  const locale = getCurrentLocale();
  const t = getDictionary(locale);
  const copy = t.contactPage;
  const waLink = buildWhatsAppURL(copy.waMessage);
  const phones = [siteConfig.phone, siteConfig.alternatePhone];

  const actionCards = [
    {
      ...copy.cards[0],
      detail: toLocalPhone(siteConfig.phone),
      href: waLink,
      external: true,
      style: 'border-[#25D366]/40 bg-[#25D366]/10 text-[#1b5e20]',
      buttonStyle: 'bg-[#25D366] text-dark hover:bg-[#22c55e]',
      icon: icons.whatsapp,
    },
    {
      ...copy.cards[1],
      detail: phones.map(toLocalPhone).join(' / '),
      href: `tel:${siteConfig.phone}`,
      external: false,
      style: 'border-primary/30 bg-primary/10 text-primary',
      buttonStyle: 'bg-primary text-white hover:bg-primary/90',
      icon: icons.phone,
    },
    {
      ...copy.cards[2],
      detail: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      external: false,
      style: 'border-navy/20 bg-navy/5 text-navy',
      buttonStyle: 'bg-navy text-white hover:bg-navy/90',
      icon: icons.email,
    },
  ];

  return (
    <main id="main" className="flex flex-col">
      <JsonLd
        data={buildWebPageSchema({
          path: PAGE_PATH,
          name: copy.metaTitle,
          description: copy.metaDescription,
          locale,
          type: 'ContactPage',
          about: { '@id': SCHEMA_IDS.organization },
          mainEntity: { '@id': SCHEMA_IDS.organization },
        })}
      />

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

      <section aria-labelledby="kontak-kantor" className="bg-offwhite py-12 sm:py-16 lg:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-16">
          <div className="min-w-0 space-y-6">
            <div data-aos="fade-up">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-dark/50">{copy.officeInfo}</p>
              <h2
                id="kontak-kantor"
                className="mt-3 text-balance font-sans text-2xl font-bold tracking-tight text-dark sm:text-3xl"
              >
                {copy.officeTitle}
              </h2>
            </div>

            <address className="not-italic" data-aos="fade-up" data-aos-delay="100">
              <ul className="grid gap-3 sm:gap-4">
                <InfoItem icon={icons.address} label={t.common.address}>
                  <p className="break-words font-semibold text-dark">
                    {siteConfig.name} — {OFFICE_ADDRESS}
                  </p>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex min-h-[40px] items-center text-sm font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    {t.common.directions}
                    <span className="sr-only"> {t.common.opensInNewTab}</span>
                  </a>
                </InfoItem>
                <InfoItem icon={icons.phone} label={t.common.phone}>
                  <div className="flex flex-col">
                    {phones.map((phone) => (
                      <a key={phone} href={`tel:${phone}`} className={linkClass}>
                        {toLocalPhone(phone)}
                      </a>
                    ))}
                  </div>
                </InfoItem>
                <InfoItem icon={icons.whatsapp} label={copy.whatsappLabel}>
                  <a href={waLink} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {toLocalPhone(siteConfig.phone)}
                    <span className="sr-only"> {t.common.opensInNewTab}</span>
                  </a>
                </InfoItem>
                <InfoItem icon={icons.email} label={t.common.email}>
                  <a href={`mailto:${siteConfig.email}`} className={linkClass}>
                    {siteConfig.email}
                  </a>
                </InfoItem>
                <InfoItem icon={icons.clock} label={t.common.operationalHours}>
                  <p className="font-semibold text-dark">{t.consultationPage.weekdayHours}</p>
                  <p className="text-dark/70">{t.consultationPage.saturdayHours}</p>
                </InfoItem>
              </ul>
            </address>
          </div>

          <div className="flex min-w-0 flex-col gap-4" data-aos="fade-up" data-aos-delay="200">
            <h2 className="sr-only">{copy.mapTitle}</h2>
            <div className="overflow-hidden rounded-2xl border border-primary/10 bg-gray-100 shadow-inner">
              <iframe
                src={MAP_EMBED_URL}
                title={t.common.locationIframeTitle}
                className="block h-[300px] w-full sm:h-[380px] lg:h-[460px]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="rounded-2xl border border-primary/10 bg-white p-5 text-base leading-relaxed text-dark/70">
              <p>{copy.mapNote}</p>
              <p className="mt-2 text-sm text-dark/60">{copy.appointmentNote}</p>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-[48px] w-full items-center justify-center rounded-xl border border-primary/30 px-5 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary/10 xs:w-auto"
              >
                {copy.openMap}
                <span className="sr-only"> {t.common.opensInNewTab}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="kontak-kanal" className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
          <div className="space-y-3 text-center" data-aos="fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-dark/50">{copy.contactMethod}</p>
            <h2
              id="kontak-kanal"
              className="text-balance font-sans text-2xl font-bold tracking-tight text-dark sm:text-3xl lg:text-5xl"
            >
              {copy.chooseChannel}
            </h2>
          </div>

          <ul className="mt-10 grid gap-4 sm:gap-6 md:grid-cols-3" data-aos="fade-up" data-aos-delay="100">
            {actionCards.map((card) => (
              <li key={card.title} className={`flex h-full flex-col gap-4 rounded-2xl border p-5 sm:p-6 ${card.style}`}>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/70">{card.icon}</span>
                <div className="min-w-0">
                  <h3 className="font-sans text-lg font-semibold">{card.title}</h3>
                  <p className="mt-1 break-words text-sm font-medium">{card.detail}</p>
                  <p className="mt-3 text-sm leading-relaxed text-dark/70">{card.description}</p>
                </div>
                <a
                  href={card.href}
                  target={card.external ? '_blank' : undefined}
                  rel={card.external ? 'noopener noreferrer' : undefined}
                  className={`mt-auto inline-flex min-h-[48px] items-center justify-center rounded-xl px-4 text-sm font-semibold transition ${card.buttonStyle}`}
                >
                  {t.common.contactNow}
                  <span className="sr-only">
                    {' '}
                    {card.title}
                    {card.external ? ` ${t.common.opensInNewTab}` : ''}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="kontak-form" className="bg-offwhite py-12 sm:py-16 lg:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-10 lg:px-16">
          <div className="space-y-4" data-aos="fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-dark/50">{copy.formBadge}</p>
            <h2 id="kontak-form" className="text-balance font-sans text-2xl font-bold tracking-tight text-dark sm:text-3xl">
              {copy.formTitle}
            </h2>
            <p className="text-pretty font-body text-base leading-relaxed text-dark/70">{copy.formDescription}</p>
          </div>

          <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
            <KontakForm locale={locale} email={siteConfig.email} />
          </div>
        </div>
      </section>
    </main>
  );
}
