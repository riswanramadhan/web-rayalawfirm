import type { Metadata } from 'next';
import { Barlow, Poppins } from 'next/font/google';
import type { ReactNode } from 'react';
import '../styles/globals.css';
import AOSWrapper from '../components/ui/AOSWrapper';
import ScrollProgress from '../components/ui/ScrollProgress';
import CustomCursor from '../components/layout/CustomCursor';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import WhatsAppFloat from '../components/layout/WhatsAppFloat';
import { LanguageProvider } from '../components/i18n/LanguageProvider';
import { getCurrentLocale } from '../lib/i18n/server';
import { legalServiceSchema, siteConfig } from '../lib/metadata';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-barlow',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Raya Law Firm | Konsultan Hukum Profesional',
    template: '%s | Raya Law Firm',
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  alternates: {
    canonical: siteConfig.url,
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: siteConfig.url,
    title: 'Raya Law Firm | Konsultan Hukum Profesional',
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Raya Law Firm - Kantor Hukum Profesional Indonesia',
      },
    ],
  },
  icons: {
    icon: siteConfig.logo,
    apple: siteConfig.logo,
  },
  twitter: {
    card: 'summary_large_image',
    site: '@rayalawfirm',
    title: 'Raya Law Firm | Konsultan Hukum Profesional',
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  verification: {
    google: 'VwwRvh7mheVuqXwfroIm8Z_O2j0Xcv7smxqzFYLDpgU',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const locale = getCurrentLocale();

  return (
    <html lang={locale} className={`${poppins.variable} ${barlow.variable}`}>
      <body className="font-sans bg-offwhite text-dark antialiased">
        <LanguageProvider initialLocale={locale}>
          <AOSWrapper>
            <ScrollProgress />
            <CustomCursor />
            <Navbar />
            {children}
            <Footer locale={locale} />
            <WhatsAppFloat />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(legalServiceSchema),
              }}
            />
          </AOSWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}
