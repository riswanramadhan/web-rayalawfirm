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

export function buildWhatsAppMessage(form: KonsultasiForm): string {
  const lines = [
    'KONSULTASI RAYA LAW FIRM',
    '----------------------------------------',
    '',
    'DATA PEMOHON:',
    `- Nama: ${form.nama}`,
    `- Telepon: ${form.telepon}`,
    `- Email: ${form.email}`,
    `- Jenis Kelamin: ${form.jenisKelamin}`,
    `- Kota: ${form.kota}`,
    '',
    'DETAIL KASUS:',
    `- Bidang Hukum: ${form.bidangHukum}`,
    `- Status Kasus: ${form.statusKasus}`,
    `- Waktu Konsultasi: ${form.waktuKonsul}`,
    '',
    'DESKRIPSI KASUS:',
    form.deskripsiSingkat,
    '',
    `Sumber Informasi: ${form.sumberInfo}`,
    '',
    '----------------------------------------',
    'Pesan ini dikirim dari website Raya Law Firm',
  ];

  return lines.join('\n');
}

export function buildWhatsAppURL(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WA_NUMBER}?text=${encoded}`;
}
