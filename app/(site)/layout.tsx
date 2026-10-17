import type { ReactNode } from 'react';
import AOSWrapper from '@/components/ui/AOSWrapper';
import ScrollProgress from '@/components/ui/ScrollProgress';
import CustomCursor from '@/components/layout/CustomCursor';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppFloat from '@/components/layout/WhatsAppFloat';
import JsonLd from '@/components/seo/JsonLd';
import { getCurrentLocale } from '@/lib/i18n/server';
import { buildSiteGraph } from '@/lib/seo/schema';

/** Layout halaman publik (navbar, footer, WhatsApp, structured data global). */
export default function SiteLayout({ children }: { children: ReactNode }) {
  const locale = getCurrentLocale();

  return (
    <AOSWrapper>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      {children}
      <Footer locale={locale} />
      <WhatsAppFloat />
      <JsonLd data={buildSiteGraph(locale)} />
    </AOSWrapper>
  );
}
