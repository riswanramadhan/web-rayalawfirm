# 🏛️ RAYA LAW FIRM — CLAUDE OPUS COPILOT INSTRUCTION
## Website Company Profile | Next.js 14 + Tailwind + Framer Motion + AOS

---

## 🎯 PERAN & KONTEKS

Kamu adalah senior fullstack developer dengan spesialisasi di **Next.js 14 App Router**, **Tailwind CSS**, **Framer Motion**, dan **SEO teknikal**. Kamu akan membangun website company profile premium untuk **Raya Law Firm**, sebuah kantor hukum profesional di Indonesia.

**Filosofi desain:** Bukan template AI generik. Ini adalah website law firm bertaraf internasional — setiap piksel harus mencerminkan kepercayaan, otoritas, dan profesionalisme. Desain mengacu pada standar top-tier law firm website seperti Kirkland & Ellis, Freshfields, atau Hermawan Juniarto — bukan tema WordPress gratisan.

---

## 📐 IDENTITAS BRAND

```
Nama:        Raya Law Firm
Tagline:     Keadilan yang Dapat Anda Percaya
Warna Utama: #4b8fbb (Biru Profesional)
Warna Aksen: #bfdee8 (Biru Muda Elegan)
Warna Gelap: #1a2e40 (Navy Deep)
Warna Teks:  #0d1b2a
Background:  #f8fbfd (Off-white dingin)
Accent Gold: #c9a84c (untuk highlight premium)
Font Judul:  Playfair Display (serif, authority)
Font Body:   Inter (sans-serif, readability)
Bahasa:      Indonesia (konten), SEO bilingual ID/EN
```

---

## 🏗️ STRUKTUR PROYEK

Bangun dengan struktur berikut secara lengkap:

```
raya-law-firm/
├── app/
│   ├── layout.tsx                    # Root layout + metadata global
│   ├── page.tsx                      # Homepage
│   ├── tentang/
│   │   └── page.tsx                  # Profil & Sejarah Kantor
│   ├── layanan/
│   │   ├── page.tsx                  # Daftar Semua Layanan
│   │   └── [slug]/
│   │       └── page.tsx              # Detail Layanan
│   ├── tim/
│   │   ├── page.tsx                  # Semua Lawyer
│   │   └── [slug]/
│   │       └── page.tsx              # Profil Detail Lawyer
│   ├── testimoni/
│   │   └── page.tsx                  # Semua Testimoni
│   ├── artikel/
│   │   ├── page.tsx                  # Blog / Artikel Hukum
│   │   └── [slug]/
│   │       └── page.tsx              # Detail Artikel
│   ├── konsultasi/
│   │   └── page.tsx                  # Form Konsultasi + WhatsApp Redirect
│   ├── kontak/
│   │   └── page.tsx                  # Halaman Kontak
│   ├── sitemap.ts                    # Dynamic sitemap
│   └── robots.ts                     # Robots.txt config
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── WhatsAppFloat.tsx
│   │   └── CustomCursor.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ProfileSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── VisiMisiSection.tsx
│   │   ├── TeamSection.tsx
│   │   ├── TestimoniSection.tsx
│   │   ├── ArtikelSection.tsx
│   │   ├── KonsultasiSection.tsx
│   │   ├── KontakSection.tsx
│   │   └── CTASection.tsx
│   └── ui/
│       ├── AOSWrapper.tsx
│       ├── ScrollProgress.tsx
│       └── CustomScrollbar.tsx
├── lib/
│   ├── data/
│   │   ├── services.ts
│   │   ├── team.ts
│   │   ├── testimonials.ts
│   │   └── articles.ts
│   ├── metadata.ts
│   └── whatsapp.ts
├── public/
│   ├── images/
│   └── icons/
├── styles/
│   └── globals.css
├── tailwind.config.ts
├── next.config.js
└── package.json
```

---

## ⚙️ KONFIGURASI TEKNIKAL

### package.json dependencies

```json
{
  "dependencies": {
    "next": "14.2.x",
    "react": "^18",
    "react-dom": "^18",
    "framer-motion": "^11",
    "aos": "^2.3.4",
    "@next/font": "latest",
    "next-seo": "^6",
    "clsx": "^2",
    "tailwind-merge": "^2"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/aos": "^2.3.4",
    "tailwindcss": "^3",
    "autoprefixer": "^10",
    "postcss": "^8"
  }
}
```

### next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  poweredByHeader: false,
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    },
  ],
};

module.exports = nextConfig;
```

### tailwind.config.ts

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4b8fbb',
        accent: '#bfdee8',
        navy: '#1a2e40',
        gold: '#c9a84c',
        dark: '#0d1b2a',
        offwhite: '#f8fbfd',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      screens: {
        xs: '475px',
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 🎨 PANDUAN DESAIN — WAJIB DIIKUTI

### Prinsip Visual Utama

1. **Full-screen sections di desktop** — Setiap section minimum `min-h-screen` atau `h-screen`. Tidak ada section yang terasa "kerdil" di layar besar.

2. **Hierarki tipografi yang kuat:**
   - H1: `font-serif text-6xl lg:text-8xl font-bold` dengan letter-spacing `-0.02em`
   - H2: `font-serif text-4xl lg:text-5xl font-bold`
   - Body: `font-sans text-lg text-dark/80 leading-relaxed`

3. **Gradient premium:** Selalu gunakan `from-[#4b8fbb] to-[#bfdee8]` atau variasi inversenya. Untuk overlay gelap gunakan `from-navy/95 via-navy/80 to-transparent`.

4. **Elemen dekoratif:** Tambahkan geometric shapes abstrak sebagai background elements menggunakan SVG atau div dengan border-radius. Contoh: lingkaran semi-transparan, garis diagonal, grid pattern subtle.

5. **Spacing yang mewah:** Padding section minimal `py-24 lg:py-32`. Beri ruang napas.

6. **Card style premium:**
   ```
   backdrop-blur-sm bg-white/80 border border-primary/20 
   shadow-xl shadow-primary/10 rounded-2xl p-8
   hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1
   transition-all duration-500
   ```

7. **Hover effects yang smooth:** Semua interaktif element harus punya hover state yang elegan dengan `transition-all duration-300` minimum.

---

## 🖱️ CUSTOM CURSOR (components/layout/CustomCursor.tsx)

```tsx
'use client';
import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  
  const followerX = useSpring(mouseX, { damping: 35, stiffness: 200 });
  const followerY = useSpring(mouseY, { damping: 35, stiffness: 200 });

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX - 6);
      mouseY.set(e.clientY - 6);
    };
    window.addEventListener('mousemove', updateMouse);
    return () => window.removeEventListener('mousemove', updateMouse);
  }, []);

  // Hanya tampil di desktop
  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999]">
      {/* Dot utama */}
      <motion.div
        style={{ x: cursorX, y: cursorY }}
        className="fixed w-3 h-3 bg-primary rounded-full"
      />
      {/* Ring follower */}
      <motion.div
        style={{ x: followerX, y: followerY }}
        className="fixed w-8 h-8 -translate-x-1 -translate-y-1 rounded-full border-2 border-primary/60"
      />
    </div>
  );
}
```

Tambahkan CSS global:
```css
/* Di globals.css — hanya hide default cursor di desktop */
@media (min-width: 1024px) {
  * { cursor: none !important; }
}
```

---

## 📜 CUSTOM SCROLLBAR (styles/globals.css)

```css
/* Custom scrollbar untuk desktop */
@media (min-width: 1024px) {
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #f8fbfd;
  }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #4b8fbb, #bfdee8);
    border-radius: 999px;
    border: 2px solid #f8fbfd;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #4b8fbb;
  }
}
```

---

## 🎬 SETUP AOS (components/ui/AOSWrapper.tsx)

```tsx
'use client';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AOSWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,         // animasi hanya sekali — lebih ringan
      offset: 80,
      delay: 0,
    });
  }, []);
  
  return <>{children}</>;
}
```

**Cara pakai AOS di setiap section:**
```tsx
<div data-aos="fade-up" data-aos-delay="100">...</div>
<div data-aos="fade-up" data-aos-delay="200">...</div>
<div data-aos="fade-right">...</div>
<div data-aos="zoom-in" data-aos-delay="300">...</div>
```

---

## 📱 WHATSAPP FLOAT (components/layout/WhatsAppFloat.tsx)

```tsx
'use client';
import { motion } from 'framer-motion';

export default function WhatsAppFloat() {
  const waNumber = '6281234567890'; // Ganti dengan nomor WA kantor
  const waLink = `https://wa.me/${waNumber}?text=Halo%20Raya%20Law%20Firm%2C%20saya%20ingin%20konsultasi.`;
  
  return (
    <motion.a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 300 }}
      whileHover={{ scale: 1.05 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 
                 bg-[#25D366] text-white px-4 py-3 rounded-full 
                 shadow-lg shadow-[#25D366]/40 hover:shadow-xl 
                 hover:shadow-[#25D366]/50 transition-shadow duration-300"
    >
      {/* WhatsApp SVG Icon */}
      <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      <span className="text-sm font-semibold whitespace-nowrap">Hubungi Sekarang</span>
    </motion.a>
  );
}
```

---

## 🏠 SECTION HERO (components/sections/HeroSection.tsx)

```tsx
'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-navy">
      
      {/* Background image dengan overlay gradient */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"  // Foto gedung hukum/gavel/library
          alt="Raya Law Firm"
          fill
          className="object-cover opacity-30"
          priority
        />
        {/* Gradient overlay berlapis */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-primary/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
      </div>

      {/* Dekoratif geometric */}
      <div className="absolute top-20 right-20 w-96 h-96 border border-primary/20 rounded-full opacity-30 hidden lg:block" />
      <div className="absolute top-32 right-32 w-64 h-64 border border-accent/20 rounded-full opacity-40 hidden lg:block" />
      <div className="absolute bottom-20 left-1/2 w-px h-32 bg-gradient-to-b from-transparent to-primary/60" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-16 pt-24">
        <div className="max-w-4xl">
          
          {/* Label badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 
                       text-accent text-sm px-4 py-2 rounded-full mb-8 backdrop-blur-sm"
          >
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            Konsultasi Hukum Profesional
          </motion.div>

          {/* Headline utama */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-5xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight mb-6"
          >
            Keadilan yang
            <span className="block text-transparent bg-clip-text 
                             bg-gradient-to-r from-accent to-primary">
              Dapat Anda Percaya
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-sans text-xl text-white/70 max-w-2xl leading-relaxed mb-12"
          >
            Raya Law Firm hadir memberikan solusi hukum komprehensif dengan tim advokat 
            berpengalaman. Kami mendampingi Anda di setiap langkah — dari konsultasi 
            hingga penyelesaian perkara.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/konsultasi"
              className="inline-flex items-center justify-center gap-2 
                         bg-gradient-to-r from-primary to-accent text-white 
                         font-semibold px-8 py-4 rounded-xl hover:shadow-xl 
                         hover:shadow-primary/40 hover:-translate-y-0.5 
                         transition-all duration-300"
            >
              Konsultasi Gratis
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/layanan"
              className="inline-flex items-center justify-center gap-2 
                         border border-white/30 text-white font-semibold 
                         px-8 py-4 rounded-xl hover:bg-white/10 
                         backdrop-blur-sm transition-all duration-300"
            >
              Lihat Layanan Kami
            </Link>
          </motion.div>

          {/* Stats bar bawah */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-20 pt-8 border-t border-white/10 grid grid-cols-3 gap-8 max-w-lg"
          >
            {[
              { num: '15+', label: 'Tahun Pengalaman' },
              { num: '500+', label: 'Kasus Diselesaikan' },
              { num: '98%', label: 'Tingkat Kepuasan' },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-serif text-3xl font-bold text-accent">{s.num}</p>
                <p className="font-sans text-sm text-white/60 mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs font-sans tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-primary/60 to-transparent" />
      </motion.div>
    </section>
  );
}
```

---

## ⚖️ SECTION LAYANAN HUKUM (components/sections/ServicesSection.tsx)

```tsx
const services = [
  {
    slug: 'hukum-pidana',
    title: 'Hukum Pidana',
    icon: '⚖️',
    desc: 'Pendampingan hukum pidana menyeluruh dari penyelidikan hingga persidangan.',
    highlights: ['Pendampingan tersangka/terdakwa', 'Upaya hukum banding & kasasi', 'Peninjauan kembali perkara'],
  },
  {
    slug: 'hukum-perdata',
    title: 'Hukum Perdata',
    icon: '📜',
    desc: 'Penyelesaian sengketa perdata, kontrak, dan perjanjian bisnis.',
    highlights: ['Sengketa perjanjian', 'Gugatan wanprestasi', 'Perbuatan melawan hukum'],
  },
  {
    slug: 'hukum-bisnis',
    title: 'Hukum Bisnis & Korporat',
    icon: '🏢',
    desc: 'Konsultasi dan pendampingan hukum untuk kebutuhan korporasi dan startup.',
    highlights: ['Pendirian PT & CV', 'Due diligence', 'Kontrak bisnis & MoU'],
  },
  {
    slug: 'hukum-keluarga',
    title: 'Hukum Keluarga',
    icon: '👨‍👩‍👧',
    desc: 'Pendampingan sensitif dan profesional dalam perkara hukum keluarga.',
    highlights: ['Perceraian & hak asuh', 'Waris & hibah', 'Adopsi & perwalian'],
  },
  {
    slug: 'hukum-properti',
    title: 'Hukum Properti & Pertanahan',
    icon: '🏠',
    desc: 'Solusi hukum komprehensif untuk properti, tanah, dan sengketa agraria.',
    highlights: ['Sengketa tanah & batas', 'Akta jual beli properti', 'Sertifikat HGB/SHM'],
  },
  {
    slug: 'hukum-ketenagakerjaan',
    title: 'Hukum Ketenagakerjaan',
    icon: '👔',
    desc: 'Advokasi hubungan industrial dan perlindungan hak-hak ketenagakerjaan.',
    highlights: ['PHK & pesangon', 'Sengketa hubungan industrial', 'Perjanjian kerja'],
  },
];
```

Tampilkan services dalam **grid 3 kolom di desktop, 1 kolom di mobile** dengan card style premium. Setiap card harus:
- `hover:-translate-y-2 transition-all duration-500`
- Memiliki gradient border top dengan warna primary
- Icon besar di atas
- Link ke `/layanan/[slug]` dengan arrow icon
- AOS: `data-aos="fade-up"` dengan delay bertahap per card

---

## 📋 FORM KONSULTASI + WHATSAPP REDIRECT

### Form fields yang wajib ada (app/konsultasi/page.tsx):

```typescript
interface KonsultasiForm {
  nama: string;           // Nama lengkap
  telepon: string;        // No. HP/WA
  email: string;          // Email
  jenisKelamin: string;   // Laki-laki / Perempuan
  kota: string;           // Kota domisili
  bidangHukum: string;    // Pilih dari: Pidana, Perdata, Bisnis, Keluarga, Properti, Ketenagakerjaan, Lainnya
  statusKasus: string;    // Baru / Sudah berjalan / Banding
  deskripsiSingkat: string; // Textarea — kronologi singkat
  waktuKonsul: string;    // Segera / Minggu ini / Fleksibel
  sumberInfo: string;     // Tahu dari mana: Google / Medsos / Referensi / Lainnya
}
```

### Logika WhatsApp Redirect:

```typescript
// lib/whatsapp.ts
export function buildWhatsAppMessage(form: KonsultasiForm): string {
  const msg = `
*🏛️ KONSULTASI RAYA LAW FIRM*
━━━━━━━━━━━━━━━━━━━━━

*📋 DATA PEMOHON:*
• Nama: ${form.nama}
• Telepon: ${form.telepon}
• Email: ${form.email}
• Jenis Kelamin: ${form.jenisKelamin}
• Kota: ${form.kota}

*⚖️ DETAIL KASUS:*
• Bidang Hukum: ${form.bidangHukum}
• Status Kasus: ${form.statusKasus}
• Waktu Konsultasi: ${form.waktuKonsul}

*📝 DESKRIPSI KASUS:*
${form.deskripsiSingkat}

*📣 Sumber Informasi:* ${form.sumberInfo}

━━━━━━━━━━━━━━━━━━━━━
_Pesan ini dikirim dari website Raya Law Firm_
  `.trim();
  
  const encoded = encodeURIComponent(msg);
  const waNumber = '6281234567890'; // Ganti nomor asli
  return `https://wa.me/${waNumber}?text=${encoded}`;
}
```

Form harus memiliki:
- Validasi client-side sebelum redirect
- Loading state pada tombol
- Step indicator jika perlu (bisa 1 step)
- Design premium dengan floating labels atau clear labels
- Tombol: **"Konsultasi via WhatsApp"** dengan icon WA berwarna hijau

---

## 🔍 SEO METADATA — SETIAP HALAMAN

### app/layout.tsx (Root)

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://rayalawfirm.co.id'),
  title: {
    default: 'Raya Law Firm | Kantor Hukum Profesional Indonesia',
    template: '%s | Raya Law Firm',
  },
  description: 'Raya Law Firm – Kantor hukum terpercaya di Indonesia. Layanan hukum pidana, perdata, bisnis, keluarga, dan properti. Konsultasi gratis tersedia.',
  keywords: [
    'kantor hukum indonesia', 'pengacara profesional', 'advokat terpercaya',
    'konsultasi hukum gratis', 'pengacara pidana', 'pengacara perdata',
    'hukum bisnis indonesia', 'raya law firm',
  ],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://rayalawfirm.co.id',
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
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
  },
};
```

### JSON-LD Schema (wajib di homepage)

```typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: 'Raya Law Firm',
  description: 'Kantor hukum profesional di Indonesia',
  url: 'https://rayalawfirm.co.id',
  telephone: '+6281234567890',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Jl. Contoh No. 123',
    addressLocality: 'Jakarta Selatan',
    addressRegion: 'DKI Jakarta',
    postalCode: '12190',
    addressCountry: 'ID',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:00',
  },
  priceRange: '$$',
  areaServed: 'Indonesia',
};
// Render: <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
```

---

## 🗺️ SITEMAP & ROBOTS

### app/sitemap.ts

```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rayalawfirm.co.id';
  
  const staticRoutes = ['', '/tentang', '/layanan', '/tim', '/testimoni', '/artikel', '/konsultasi', '/kontak'];
  
  const services = ['hukum-pidana', 'hukum-perdata', 'hukum-bisnis', 'hukum-keluarga', 'hukum-properti', 'hukum-ketenagakerjaan'];
  
  return [
    ...staticRoutes.map(route => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    })),
    ...services.map(slug => ({
      url: `${baseUrl}/layanan/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
```

---

## 📝 NAVBAR (components/layout/Navbar.tsx)

Spesifikasi Navbar:
- **Transparent** saat di-top hero, **blur glass** saat scroll (`backdrop-blur-xl bg-white/90 shadow-sm`)
- Deteksi scroll dengan `useEffect` + `addEventListener('scroll')`
- Logo: "RAYA LAW FIRM" dengan font serif, warna berubah sesuai background
- Menu: Beranda, Tentang, Layanan (dropdown), Tim, Artikel, Konsultasi
- Mobile: hamburger menu dengan animasi slide dari kanan menggunakan Framer Motion
- CTA button: "Konsultasi Gratis" dengan gradient primary

```tsx
const navLinks = [
  { label: 'Beranda', href: '/' },
  { label: 'Tentang', href: '/tentang' },
  { 
    label: 'Layanan', href: '/layanan',
    dropdown: [
      { label: 'Hukum Pidana', href: '/layanan/hukum-pidana' },
      { label: 'Hukum Perdata', href: '/layanan/hukum-perdata' },
      { label: 'Hukum Bisnis', href: '/layanan/hukum-bisnis' },
      { label: 'Hukum Keluarga', href: '/layanan/hukum-keluarga' },
      { label: 'Hukum Properti', href: '/layanan/hukum-properti' },
      { label: 'Ketenagakerjaan', href: '/layanan/hukum-ketenagakerjaan' },
    ]
  },
  { label: 'Tim Kami', href: '/tim' },
  { label: 'Artikel', href: '/artikel' },
  { label: 'Kontak', href: '/kontak' },
];
```

---

## 🏛️ SECTION VISI MISI

Design: Split layout 2 kolom di desktop.
- Kiri: Visual dekoratif (abstract shapes / quote besar)
- Kanan: Content visi misi dengan garis dekoratif

```
Visi:
"Menjadi kantor hukum terdepan di Indonesia yang menghadirkan keadilan, 
kejujuran, dan pelayanan hukum berkualitas tinggi bagi seluruh lapisan masyarakat."

Misi:
1. Memberikan layanan hukum profesional, integritas tinggi, dan berorientasi hasil
2. Mendampingi klien dengan pendekatan personal dan solusi strategis
3. Berkontribusi pada penegakan hukum dan keadilan di Indonesia
4. Membangun kepercayaan melalui transparansi dan komunikasi yang efektif
```

---

## 👥 DATA TIM LAWYER

```typescript
// lib/data/team.ts
export const lawyers = [
  {
    slug: 'raya-putri-sh-mh',
    name: 'Raya Putri, S.H., M.H.',
    position: 'Founding Partner & Senior Advocate',
    specialization: 'Hukum Pidana & Konstitusi',
    experience: '15 tahun',
    education: ['S.H. Universitas Indonesia', 'M.H. Universitas Gadjah Mada', 'Bar Association Certified'],
    bio: 'Lebih dari 15 tahun berpengalaman menangani kasus pidana kompleks...',
    image: '/images/team/raya-putri.jpg',
    linkedin: 'https://linkedin.com',
  },
  // tambah 3-4 lawyer lagi
];
```

Tim section: Grid 4 kolom di desktop. Setiap card:
- Foto professional dengan overlay gradient saat hover
- Nama + posisi
- Tag spesialisasi
- Link ke halaman detail `/tim/[slug]`
- Hover: kartu flip atau slide-up info

---

## 💬 SECTION TESTIMONI

```typescript
// lib/data/testimonials.ts
export const testimonials = [
  {
    id: 1,
    name: 'Budi Santoso',
    position: 'Direktur PT Maju Bersama',
    kasus: 'Sengketa Bisnis',
    rating: 5,
    text: 'Raya Law Firm sangat profesional dan responsif. Kasus bisnis kami diselesaikan dengan solusi yang memuaskan semua pihak. Sangat merekomendasikan!',
    photo: '/images/testimonials/budi.jpg',
  },
  // 5-6 testimoni lagi
];
```

Layout: Carousel/slider dengan Framer Motion `AnimatePresence` atau grid masonry.
Halaman `/testimoni`: Semua testimoni dalam grid dengan filter per kategori kasus.

---

## 📰 SECTION ARTIKEL/BLOG

```typescript
// lib/data/articles.ts
export const articles = [
  {
    slug: 'cara-membuat-surat-perjanjian-yang-sah',
    title: 'Cara Membuat Surat Perjanjian yang Sah Secara Hukum',
    excerpt: 'Perjanjian yang sah membutuhkan empat syarat utama menurut KUHPerdata...',
    category: 'Hukum Perdata',
    author: 'Raya Putri, S.H., M.H.',
    date: '2024-01-15',
    readTime: '5 menit',
    image: '/images/articles/perjanjian.jpg',
    tags: ['perjanjian', 'kontrak', 'hukum perdata'],
    content: '...',
  },
  // 5+ artikel
];
```

Homepage: Grid 3 artikel terbaru dengan tombol "Lihat Semua Artikel".
Halaman `/artikel`: Semua artikel + search + filter kategori.
Halaman `/artikel/[slug]`: Full artikel dengan sidebar (artikel terkait, CTA konsultasi).

---

## 🎯 SECTION CTA (Sebelum Footer)

Design: Full-width section dengan background gradient gelap.
```
Headline: "Siap Mendapatkan Solusi Hukum Terbaik?"
Sub: "Jadwalkan konsultasi gratis dengan tim advokat kami sekarang."
CTA Primary: "Konsultasi Gratis via WhatsApp"
CTA Secondary: "Hubungi Kami"
```
Tambahkan countdown/urgency elements opsional.

---

## 🦶 FOOTER (components/layout/Footer.tsx)

Layout 4 kolom:
1. **Brand column:** Logo + deskripsi singkat + sosmed icons
2. **Layanan:** Link ke semua halaman layanan
3. **Perusahaan:** Tentang, Tim, Artikel, Testimoni, Kontak
4. **Kontak:** Alamat, telepon, email, jam operasional

Bottom bar: Copyright + link kebijakan privasi

---

## 🚀 HALAMAN-HALAMAN DETAIL

### /tentang (Profil & Sejarah)
Wajib ada:
- Timeline sejarah berdirinya kantor (2009-sekarang) dengan animasi scroll
- Nilai-nilai perusahaan (Integritas, Profesional, Empati, Inovatif)
- Penghargaan & sertifikasi
- Foto kantor/tim

### /layanan/[slug] (Detail Layanan)
Wajib ada:
- Hero section dengan nama layanan
- Penjelasan lengkap layanan
- Proses penanganan (step by step)
- FAQ layanan tersebut
- CTA: Form konsultasi untuk layanan ini

### /tim/[slug] (Profil Lawyer)
Wajib ada:
- Foto besar professional
- Bio lengkap
- Spesialisasi & area keahlian
- Pendidikan & sertifikasi
- Rekam jejak kasus (tanpa detail sensitif)
- Tombol konsultasi langsung

---

## ⚡ OPTIMASI PERFORMA

1. **Images:** Selalu gunakan `next/image` dengan `sizes` yang tepat dan format avif/webp
2. **Fonts:** Gunakan `next/font/google` dengan `display: 'swap'`
3. **Code splitting:** Setiap section besar gunakan `dynamic()` import dengan `ssr: false` untuk komponen yang berat
4. **AOS:** Set `once: true` agar animasi tidak diulang
5. **Lazy loading:** Section di bawah fold menggunakan dynamic import
6. **Bundle:** Hindari import library besar yang tidak perlu

```typescript
// Contoh dynamic import
const TestimoniSection = dynamic(() => import('@/components/sections/TestimoniSection'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-xl" />,
});
```

---

## 📱 MOBILE RESPONSIVENESS CHECKLIST

- [ ] Navbar: hamburger menu yang smooth
- [ ] Hero: text lebih kecil tapi tetap impactful
- [ ] Grid sections: 1 kolom di mobile, 2 di tablet, 3-4 di desktop
- [ ] WhatsApp button: visible dan tidak menutupi konten penting
- [ ] Form konsultasi: full-width, easy to type
- [ ] Tidak ada horizontal scroll di mobile
- [ ] Touch targets minimal 44x44px

---

## 🔧 URUTAN EKSEKUSI (Build Order)

Kerjakan dalam urutan ini agar efisien:

1. `package.json` + `next.config.js` + `tailwind.config.ts`
2. `styles/globals.css` (custom scrollbar, cursor hide, base styles)
3. `lib/data/` semua file data (services, team, testimonials, articles)
4. `lib/whatsapp.ts` + `lib/metadata.ts`
5. `components/ui/` (AOSWrapper, ScrollProgress)
6. `components/layout/CustomCursor.tsx`
7. `components/layout/Navbar.tsx`
8. `components/layout/Footer.tsx`
9. `components/layout/WhatsAppFloat.tsx`
10. `app/layout.tsx` (root layout + semua layout components)
11. **Semua section homepage** (HeroSection → ProfileSection → ServicesSection → VisiMisiSection → TeamSection → TestimoniSection → ArtikelSection → CTASection → KonsultasiSection)
12. `app/page.tsx` (homepage assembly)
13. `app/tentang/page.tsx`
14. `app/layanan/page.tsx` + `app/layanan/[slug]/page.tsx`
15. `app/tim/page.tsx` + `app/tim/[slug]/page.tsx`
16. `app/testimoni/page.tsx`
17. `app/artikel/page.tsx` + `app/artikel/[slug]/page.tsx`
18. `app/konsultasi/page.tsx` (form + WA redirect)
19. `app/kontak/page.tsx`
20. `app/sitemap.ts` + `app/robots.ts`

---

## ✅ QUALITY GATES — CEK SEBELUM SELESAI

- [ ] Semua halaman punya `generateMetadata()` yang unik
- [ ] JSON-LD schema ada di homepage
- [ ] Custom cursor bekerja di desktop, tidak muncul di mobile
- [ ] Custom scrollbar bekerja di desktop
- [ ] AOS animasi trigger saat scroll, `once: true`
- [ ] WhatsApp float button ada di semua halaman
- [ ] Form konsultasi: validasi + pesan WA terformat rapi
- [ ] Semua link internal berfungsi (tidak ada 404)
- [ ] Gambar semua menggunakan `next/image` dengan `alt` text
- [ ] Mobile: tidak ada horizontal scroll
- [ ] Gradient konsisten `#4b8fbb` → `#bfdee8` di seluruh site
- [ ] Font Playfair Display untuk heading, Inter untuk body
- [ ] sitemap.ts dan robots.ts sudah benar
- [ ] Tidak ada console.error saat development

---

## 💡 CATATAN PENTING UNTUK CLAUDE OPUS

1. **Jangan buat desain generik.** Setiap komponen harus terasa bespoke dan premium — bukan Shadcn default atau Tailwind starter template.

2. **Desktop sections harus full-height.** Investor dan klien korporat menggunakan desktop. Setiap section `min-h-screen`.

3. **Animasi harus halus bukan berlebihan.** Gunakan `ease-out` atau `cubic-bezier` yang terasa natural. Duration 300-800ms.

4. **Konten hukum harus terasa authoritative.** Copy/teks harus menggunakan bahasa formal-profesional, bukan casual.

5. **Konsistensi warna adalah kunci.** `#4b8fbb` adalah warna utama — selalu gunakan ini sebagai anchor, bukan pilih warna baru.

6. **Setiap page transition menggunakan Framer Motion** `AnimatePresence` untuk halus.

7. **Performance first** — jika ada pilihan antara efek visual berat vs performa, pilih performa.

---

*Prompt ini dirancang untuk dieksekusi oleh Claude Opus secara step-by-step. Mulai dari langkah 1 dan eksekusi satu per satu sampai Quality Gates semua tercentang. Total estimasi: website profesional production-ready.*
