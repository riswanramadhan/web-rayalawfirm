import Link from 'next/link';
import { services } from '../../lib/data/services';

const companyLinks = [
  { label: 'Tentang', href: '/tentang' },
  { label: 'Tim Kami', href: '/tim' },
  { label: 'Artikel', href: '/artikel' },
  { label: 'Testimoni', href: '/testimoni' },
  { label: 'Konsultasi', href: '/konsultasi' },
  { label: 'Kontak', href: '/kontak' },
];

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 8.98h4v12H3v-12zM9.5 8.98h3.8v1.64h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.09v6.33h-4v-5.61c0-1.34-.02-3.07-1.87-3.07-1.88 0-2.17 1.46-2.17 2.97v5.71h-4v-12z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm10 2H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2zm-5 3.5A4.5 4.5 0 1112 17a4.5 4.5 0 010-9zm0 2A2.5 2.5 0 1014.5 13 2.5 2.5 0 0012 10.5zm4.75-3.25a1 1 0 11-1 1 1 1 0 011-1z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M13.5 9.5V7.8c0-.7.45-1.05 1.1-1.05H16V4h-2.1c-2.2 0-3.4 1.4-3.4 3.5v2H8.5V12h2v8h3v-8h2.2l.3-2.5h-2.5z" />
      </svg>
    ),
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M19.9 7.37c.01.17.01.34.01.51 0 5.2-3.96 11.2-11.2 11.2-2.22 0-4.28-.65-6.02-1.77.31.04.61.05.93.05 1.84 0 3.53-.62 4.87-1.67a3.95 3.95 0 01-3.69-2.73c.25.04.5.06.76.06.36 0 .71-.05 1.04-.14a3.95 3.95 0 01-3.16-3.87v-.05c.54.3 1.16.48 1.82.5a3.95 3.95 0 01-1.22-5.27 11.2 11.2 0 008.12 4.12 4.46 4.46 0 01-.1-.9 3.95 3.95 0 016.83-2.7 7.78 7.78 0 002.5-.95 3.94 3.94 0 01-1.73 2.18 7.89 7.89 0 002.27-.62 8.54 8.54 0 01-1.97 2.05z" />
      </svg>
    ),
  },
];

const contactItems = [
  {
    label: 'Alamat',
    value: 'Jl. Tebet Barat Dalam IV No. 10, Jakarta.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
  {
    label: 'Telepon',
    value: '0813 3566 3379',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    value: 'info@rayalawfirm.com',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: 'Jam Operasional',
    value: 'Senin - Jumat, 08:00 - 17:00 WIB',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white/70">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-5">
            <div>
              <p className="font-sans text-2xl font-bold text-white">RAYA</p>
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">
                Law Firm
              </p>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              Raya Law Firm adalah kantor hukum profesional yang menghadirkan
              layanan litigasi dan konsultasi strategis untuk individu maupun
              korporasi di Indonesia.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white/50 hover:text-white"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-white">
              Layanan
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
              Perusahaan
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
              Kontak
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
            Copyright 2026 Raya Law Firm. All rights reserved | Powered by{' '}
            <a
              href="https://dekatlokal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline text-white/80 hover:text-white transition-colors"
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
              Kebijakan Privasi
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
