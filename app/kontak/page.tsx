import type { Metadata } from 'next';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { generatePageMetadata } from '@/lib/metadata';
import { buildWhatsAppURL } from '@/lib/whatsapp';

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Kontak & Lokasi | Raya Law Firm',
    description:
      'Hubungi Raya Law Firm untuk konsultasi hukum, jadwal pertemuan, dan kebutuhan pendampingan hukum profesional.',
    path: '/kontak',
  });
}

const contactItems = [
  {
    label: 'Alamat',
    value: 'Jl. Tebet Barat Dalam IV No. 10, Jakarta.',
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
  {
    label: 'Telepon',
    value: '0813 3566 3379',
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    value: '0813 3566 3379',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    value: 'info@rayalawfirm.com',
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: 'Jam Operasional',
    value: 'Senin-Jumat 08:00-17:00, Sabtu 09:00-13:00',
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const actionCards = [
  {
    title: 'WhatsApp',
    detail: '0813 3566 3379',
    description: 'Hubungi tim kami untuk respons cepat.',
    href: buildWhatsAppURL('Halo Raya Law Firm, saya ingin konsultasi.'),
    style:
      'bg-[#25D366]/10 text-[#1b5e20] border-[#25D366]/40 hover:bg-[#25D366]/20',
    buttonStyle: 'bg-[#25D366] text-white hover:bg-[#22c55e]',
    icon: (
      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    title: 'Telepon',
    detail: '0813 3566 3379',
    description: 'Diskusi cepat untuk kebutuhan segera.',
    href: 'tel:+6281335663379',
    style: 'bg-primary/10 text-primary border-primary/30 hover:bg-primary/20',
    buttonStyle: 'bg-primary text-white hover:bg-primary/90',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
      </svg>
    ),
  },
  {
    title: 'Email',
    detail: 'info@rayalawfirm.com',
    description: 'Kirim dokumen atau pertanyaan tertulis.',
    href: 'mailto:info@rayalawfirm.com',
    style: 'bg-navy/10 text-navy border-navy/30 hover:bg-navy/20',
    buttonStyle: 'bg-navy text-white hover:bg-navy/90',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
];

export default function KontakPage() {
  return (
    <main className="flex flex-col">
      <section className="relative overflow-hidden bg-navy pt-24 pb-16 lg:pt-28 lg:pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-primary/30" />
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-16">
          <div className="max-w-2xl" data-aos="fade-up">
            <Breadcrumb items={[{ label: 'Beranda', href: '/' }, { label: 'Kontak' }]} />
            <h1 className="mt-4 font-sans text-5xl font-extrabold tracking-tight text-white lg:text-7xl">
              Kontak dan Lokasi
            </h1>
            <p className="mt-4 font-body text-base text-white/70 lg:text-lg">
              Kami siap membantu kebutuhan hukum Anda. Hubungi tim Raya Law Firm
              melalui kanal komunikasi resmi.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-offwhite py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-16">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div className="space-y-6">
              <div data-aos="fade-up">
                <p className="text-xs uppercase tracking-[0.3em] text-dark/50">
                  Informasi Kantor
                </p>
                <h2 className="mt-3 font-sans text-3xl font-bold tracking-tight text-dark">
                  Kantor Raya Law Firm
                </h2>
              </div>

              <div className="grid gap-4" data-aos="fade-up" data-aos-delay="100">
                {contactItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 rounded-2xl border border-primary/10 bg-white/80 p-5 shadow-lg shadow-primary/5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-dark/50">
                        {item.label}
                      </p>
                      <p className="mt-1 text-base font-semibold text-dark">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6" data-aos="fade-up" data-aos-delay="200">
              <div className="rounded-2xl bg-gray-200/80 p-6 shadow-inner">
                <div className="flex h-96 items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-100">
                  <p className="text-sm font-semibold text-dark/60">
                    Kunjungi Kami di Google Maps
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-primary/10 bg-white/80 p-6 text-sm text-dark/70">
                Lokasi berada di pusat bisnis Jakarta Selatan dengan akses mudah
                ke transportasi umum dan parkir yang memadai.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-16">
          <div className="space-y-4 text-center" data-aos="fade-up">
            <p className="text-xs uppercase tracking-[0.3em] text-dark/50">
              Cara Menghubungi
            </p>
            <h2 className="font-sans text-3xl font-bold tracking-tight text-dark lg:text-5xl">
              Pilih Kanal Komunikasi
            </h2>
          </div>

          <div
            className="mt-10 grid gap-6 lg:grid-cols-3"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {actionCards.map((card) => (
              <div
                key={card.title}
                className={`flex h-full flex-col gap-4 rounded-2xl border p-6 transition-all duration-300 ${card.style}`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/60">
                  {card.icon}
                </div>
                <div>
                  <p className="text-lg font-semibold">{card.title}</p>
                  <p className="mt-1 text-sm">{card.detail}</p>
                  <p className="mt-3 text-sm text-dark/70">
                    {card.description}
                  </p>
                </div>
                <a
                  href={card.href}
                  target={card.href.startsWith('http') ? '_blank' : undefined}
                  rel={card.href.startsWith('http') ? 'noreferrer' : undefined}
                  className={`mt-auto inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition ${card.buttonStyle}`}
                >
                  Hubungi Sekarang
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-offwhite py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div className="space-y-4" data-aos="fade-up">
              <p className="text-xs uppercase tracking-[0.3em] text-dark/50">
                Form Kontak
              </p>
              <h2 className="font-sans text-3xl font-bold tracking-tight text-dark">
                Kirim Pesan Anda
              </h2>
              <p className="font-body text-base text-dark/70">
                Sampaikan pertanyaan atau kebutuhan pendampingan hukum melalui
                formulir ini. Tim kami akan menindaklanjuti secepatnya.
              </p>
            </div>

            <form
              className="rounded-2xl border border-primary/10 bg-white/90 p-8 shadow-xl shadow-primary/10"
              action="mailto:info@rayalawfirm.com"
              method="post"
              encType="text/plain"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="grid gap-5">
                <div className="space-y-2">
                  <label htmlFor="nama" className="text-sm font-medium text-dark">
                    Nama Lengkap
                  </label>
                  <input
                    id="nama"
                    name="nama"
                    type="text"
                    placeholder="Nama lengkap"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-dark">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@domain.com"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subjek" className="text-sm font-medium text-dark">
                    Subjek
                  </label>
                  <input
                    id="subjek"
                    name="subjek"
                    type="text"
                    placeholder="Topik yang ingin dibahas"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="pesan" className="text-sm font-medium text-dark">
                    Pesan
                  </label>
                  <textarea
                    id="pesan"
                    name="pesan"
                    rows={5}
                    placeholder="Tuliskan pesan Anda"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-accent text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Kirim Pesan
                </button>
                <p className="text-xs text-dark/60">
                  Form ini akan membuka aplikasi email Anda untuk mengirim
                  pesan.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
