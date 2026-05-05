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
import { legalServiceSchema } from '../lib/metadata';

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
  metadataBase: new URL('https://rayalawfirm.com'),
  title: {
    default: 'Raya Law Firm | Kantor Hukum Profesional Indonesia',
    template: '%s | Raya Law Firm',
  },
  description:
    'Raya Law Firm adalah kantor hukum profesional di Indonesia. Layanan hukum pidana, perdata, bisnis, keluarga, properti, dan ketenagakerjaan dengan konsultasi terpercaya.',
  keywords: [
    'kantor hukum indonesia',
    'pengacara profesional',
    'advokat terpercaya',
    'konsultasi hukum',
    'pengacara pidana',
    'pengacara perdata',
    'hukum bisnis indonesia',
    'raya law firm',
  ],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://rayalawfirm.com',
    siteName: 'Raya Law Firm',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@rayalawfirm',
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
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className={`${poppins.variable} ${barlow.variable}`}>
      <body className="font-sans bg-offwhite text-dark antialiased">
        <AOSWrapper>
          <ScrollProgress />
          <CustomCursor />
          <Navbar />
          {children}
          <Footer />
          <WhatsAppFloat />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(legalServiceSchema),
            }}
          />
        </AOSWrapper>
      </body>
    </html>
  );
}
