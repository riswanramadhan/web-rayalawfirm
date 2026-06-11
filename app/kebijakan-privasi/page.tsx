import type { Metadata } from 'next';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { generatePageMetadata } from '@/lib/metadata';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { getCurrentLocale } from '@/lib/i18n/server';

export function generateMetadata(): Metadata {
  const locale = getCurrentLocale();
  const t = getDictionary(locale).privacyPage;

  return generatePageMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: '/kebijakan-privasi',
    locale,
  });
}

const sections = [
  {
    title: '1. PENDAHULUAN',
    body: `Raya Law Firm berkomitmen menjaga kerahasiaan dan keamanan data pribadi Anda. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi yang Anda berikan melalui website dan layanan konsultasi kami. Dengan menggunakan layanan kami, Anda menyetujui kebijakan ini.`,
  },
  {
    title: '2. INFORMASI YANG KAMI KUMPULKAN',
    body: `a. Data yang Anda berikan secara langsung:
- Nama lengkap dan informasi identitas
- Nomor telepon/WhatsApp dan alamat email
- Kronologi dan keterangan kasus yang Anda sampaikan
- Dokumen atau bukti yang Anda serahkan untuk keperluan konsultasi

b. Data yang dikumpulkan otomatis:
- Alamat IP dan data perangkat
- Halaman yang dikunjungi dan durasi kunjungan
- Sumber referral (bagaimana Anda menemukan website kami)
- Data cookies untuk pengalaman pengguna yang lebih baik`,
  },
  {
    title: '3. KERAHASIAAN INFORMASI KLIEN (ATTORNEY-CLIENT PRIVILEGE)',
    body: `Seluruh informasi yang Anda sampaikan dalam konteks konsultasi dan perwakilan hukum dilindungi oleh prinsip kerahasiaan advokat-klien (attorney-client privilege) sesuai dengan Undang-Undang Nomor 18 Tahun 2003 tentang Advokat dan Kode Etik Advokat Indonesia. Kami tidak akan mengungkapkan informasi Anda kepada pihak ketiga tanpa izin tertulis Anda, kecuali diwajibkan oleh hukum.`,
  },
  {
    title: '4. PENGGUNAAN INFORMASI',
    body: `Kami menggunakan informasi Anda untuk:
- Memberikan layanan konsultasi dan pendampingan hukum
- Menghubungi Anda terkait perkembangan kasus
- Mengirimkan informasi terkait layanan hukum yang relevan (jika Anda menyetujui)
- Meningkatkan kualitas layanan dan website kami
- Memenuhi kewajiban hukum yang berlaku`,
  },
  {
    title: '5. BERBAGI INFORMASI DENGAN PIHAK KETIGA',
    body: `Kami TIDAK menjual, menyewakan, atau memperdagangkan data pribadi Anda. Kami hanya dapat berbagi informasi dalam kondisi berikut:
- Rekan hukum atau ahli yang ditunjuk dalam penanganan kasus Anda (dengan persetujuan Anda)
- Penyedia layanan teknologi yang membantu operasional website (dengan perjanjian kerahasiaan)
- Kewajiban hukum berdasarkan putusan pengadilan atau peraturan perundang-undangan`,
  },
  {
    title: '6. KEAMANAN DATA',
    body: `Kami menerapkan langkah-langkah keamanan teknis dan organisasional yang wajar untuk melindungi data Anda, termasuk enkripsi data, akses terbatas hanya bagi personel berwenang, dan pemantauan keamanan secara berkala. Namun, tidak ada sistem keamanan yang sepenuhnya bebas risiko di internet.`,
  },
  {
    title: '7. PENYIMPANAN DATA',
    body: `Data konsultasi dan kasus disimpan selama hubungan hukum berlangsung dan minimal 5 (lima) tahun setelah penyelesaian kasus, sesuai ketentuan hukum yang berlaku dan keperluan dokumentasi profesional. Data website (analytics) disimpan maksimal 2 tahun.`,
  },
  {
    title: '8. HAK-HAK ANDA',
    body: `Sesuai peraturan perlindungan data yang berlaku di Indonesia, Anda berhak untuk:
- Mengakses data pribadi yang kami simpan tentang Anda
- Meminta koreksi data yang tidak akurat
- Meminta penghapusan data (dengan mempertimbangkan kewajiban hukum kami)
- Menarik persetujuan pemrosesan data kapan saja
- Mengajukan pengaduan kepada otoritas yang berwenang`,
  },
  {
    title: '9. COOKIES',
    body: `Website kami menggunakan cookies fungsional untuk meningkatkan pengalaman pengguna. Anda dapat mengatur pengaturan cookies melalui browser Anda. Menonaktifkan cookies tertentu dapat mempengaruhi fungsi website.`,
  },
  {
    title: '10. KOMUNIKASI MELALUI WHATSAPP',
    body: `Ketika Anda menghubungi kami melalui WhatsApp, komunikasi tunduk pada kebijakan privasi WhatsApp (Meta). Kami menyarankan Anda untuk tidak berbagi informasi sangat sensitif melalui aplikasi pihak ketiga sebelum ada kesepakatan kerahasiaan formal.`,
  },
  {
    title: '11. PERUBAHAN KEBIJAKAN INI',
    body: `Kami dapat memperbarui kebijakan privasi ini sewaktu-waktu. Perubahan material akan diberitahukan melalui website atau email. Tanggal pembaruan terakhir tercantum di bawah dokumen ini.`,
  },
  {
    title: '12. HUBUNGI KAMI',
    body: `Untuk pertanyaan mengenai kebijakan privasi ini atau untuk menggunakan hak-hak Anda:
Email: info@rayalawfirm.com
Telepon: +62 813 3566 3379
Alamat: Jl. Tebet Barat Dalam IV No. 10, Jakarta.

Terakhir diperbarui: 10 Mei 2026`,
  },
];

export default function KebijakanPrivasiPage() {
  const locale = getCurrentLocale();
  const t = getDictionary(locale);

  return (
    <main className="flex flex-col">
      <section className="relative overflow-hidden bg-navy pt-24 pb-16 lg:pt-28 lg:pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-primary/30" />
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-16">
          <div className="max-w-2xl" data-aos="fade-up">
            <Breadcrumb
              items={[
                { label: t.common.home, href: '/' },
                { label: t.privacyPage.breadcrumb },
              ]}
            />
            <h1 className="mt-4 font-sans text-5xl font-extrabold tracking-tight text-white lg:text-7xl">
              {t.privacyPage.title}
            </h1>
            <p className="mt-4 font-body text-base text-white/70 lg:text-lg">
              {t.privacyPage.description}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-offwhite py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-16">
          <div className="rounded-2xl bg-white p-8 shadow-sm lg:p-12">
            <div className="space-y-8">
              {t.privacyPage.sections.map((section) => (
                <div key={section.title} className="border-b border-gray-100 pb-8 last:border-b-0 last:pb-0 text-left">
                  <h2 className="mb-4 font-sans text-xl font-semibold text-dark">
                    {section.title}
                  </h2>
                  {section.body
                    .split('\n')
                    .filter((line) => line.trim() !== '')
                    .map((line, index) => (
                      <p
                        key={index}
                        className="font-body text-base leading-relaxed text-dark/70"
                      >
                        {line}
                      </p>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
