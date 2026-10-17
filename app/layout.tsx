import type { Metadata, Viewport } from 'next';
import { Barlow, Poppins } from 'next/font/google';
import type { ReactNode } from 'react';
import '../styles/globals.css';
import { LanguageProvider } from '../components/i18n/LanguageProvider';
import { getCurrentLocale } from '../lib/i18n/server';
import { feedAlternateTypes, siteConfig } from '../lib/metadata';

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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#1a2e40',
};

const defaultTitle = `${siteConfig.name} | ${siteConfig.tagline}`;
const defaultOgImage = new URL(siteConfig.ogImage, siteConfig.url).toString();

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.coreKeywords],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: 'legal',
  alternates: {
    types: feedAlternateTypes,
  },
  manifest: '/manifest.webmanifest',
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    title: defaultTitle,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: defaultOgImage,
        width: siteConfig.ogImageSize.width,
        height: siteConfig.ogImageSize.height,
        alt: siteConfig.ogImageAlt,
      },
    ],
  },
  icons: {
    icon: [
      { url: '/icons/favicon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@rayalawfirm',
    title: defaultTitle,
    description: siteConfig.description,
    images: [{ url: defaultOgImage, alt: siteConfig.ogImageAlt }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
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
        <LanguageProvider initialLocale={locale}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
