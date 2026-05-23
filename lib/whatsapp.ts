import { defaultLocale, type Locale } from './i18n/config';
import { getDictionary } from './i18n/dictionaries';

export interface KonsultasiForm {
  nama: string;
  telepon: string;
  email: string;
  jenisKelamin: string;
  kota: string;
  bidangHukum: string;
  statusKasus: string;
  deskripsiSingkat: string;
  waktuKonsul: string;
  sumberInfo: string;
}

export const WA_NUMBER = '6281335663379';

export function buildWhatsAppMessage(
  form: KonsultasiForm,
  locale: Locale = defaultLocale
): string {
  const t = getDictionary(locale).whatsapp;

  const lines = [
    t.title,
    '----------------------------------------',
    '',
    t.applicantData,
    `- ${t.labels.name}: ${form.nama}`,
    `- ${t.labels.phone}: ${form.telepon}`,
    `- ${t.labels.email}: ${form.email}`,
    `- ${t.labels.gender}: ${form.jenisKelamin}`,
    `- ${t.labels.city}: ${form.kota}`,
    '',
    t.caseDetails,
    `- ${t.labels.lawField}: ${form.bidangHukum}`,
    `- ${t.labels.caseStatus}: ${form.statusKasus}`,
    `- ${t.labels.consultationTime}: ${form.waktuKonsul}`,
    '',
    t.caseDescription,
    form.deskripsiSingkat,
    '',
    `${t.labels.source}: ${form.sumberInfo}`,
    '',
    '----------------------------------------',
    t.sentFromWebsite,
  ];

  return lines.join('\n');
}

export function buildWhatsAppURL(message: string, waNumber: string = WA_NUMBER): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${waNumber}?text=${encoded}`;
}
