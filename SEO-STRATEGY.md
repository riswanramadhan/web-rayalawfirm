# Strategi SEO & AI Search — Raya Law Firm

Target: tampil organik di halaman 1 (idealnya posisi 1–3) untuk pencarian hukum berbahasa Indonesia,
masuk **Google Local Pack** untuk "pengacara/konsultan hukum Jakarta", dan **dikutip** oleh
Google AI Overviews, ChatGPT Search, Perplexity, Gemini, dan Claude.

> Catatan jujur: tidak ada pihak yang bisa *menjamin* peringkat #1. Peringkat ditentukan oleh kualitas
> teknis (✅ sudah dikerjakan di kode), konten yang konsisten, otoritas (backlink & ulasan), dan waktu
> (biasanya 3–6 bulan untuk kata kunci kompetitif). Dokumen ini adalah peta jalannya.

---

## 1. Yang sudah diimplementasikan di kode

### Teknis & crawling
- `sitemap.xml` dinamis — semua halaman, layanan, profil advokat, dan artikel (tanggal `lastModified` asli).
- `robots.txt` — mengizinkan semua mesin pencari **dan crawler AI** (GPTBot, OAI-SearchBot, ChatGPT-User,
  ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Applebot-Extended, CCBot, dll.);
  memblokir `/admin` dan `/api`.
- `llms.txt` & `llms-full.txt` — ringkasan dan basis pengetahuan lengkap website dalam teks polos
  untuk model AI (standar llmstxt.org).
- `feed.xml` — RSS artikel (mempercepat penemuan konten oleh agregator & AI).
- **IndexNow** — setiap artikel/profil baru otomatis dilaporkan ke Bing (dipakai ChatGPT Search & Copilot),
  Yandex, Seznam, Naver. Aktif bila env `INDEXNOW_KEY` diisi.
- Canonical URL bersih di setiap halaman, judul tanpa duplikasi brand, Open Graph & Twitter Card lengkap.
- Dashboard admin `noindex` (meta + header `X-Robots-Tag`).
- Gambar diunggah otomatis dikompres ke WebP, `next/image` (AVIF/WebP, lazy-load), cache 1 tahun.
- Header keamanan (HSTS, nosniff, Referrer-Policy, Permissions-Policy) — sinyal kepercayaan.

### Structured data (schema.org JSON-LD)
- **LegalService/Organization** + **WebSite (SearchAction)** di seluruh halaman (satu `@graph`
  dengan `@id` stabil): alamat lengkap + kode pos, koordinat, jam operasional, area layanan, kontak.
- **BreadcrumbList** otomatis di setiap halaman yang memakai breadcrumb.
- **Person/ProfilePage** untuk setiap advokat (jabatan, keahlian, pencapaian, pendidikan, sosial media).
- **Article** untuk setiap artikel (penulis = advokat bila dipilih, tanggal terbit & diperbarui,
  jumlah kata, kategori) + **FAQPage** bila artikel punya FAQ.
- **Service** + **FAQPage** di setiap halaman layanan; **ItemList** di daftar layanan & tim; **Blog** di daftar artikel.

### Konten & UX (mobile first)
- Artikel: kotak **Poin Penting** di atas (format favorit AI Overview), **Daftar Isi** dengan anchor,
  subjudul H2/H3 semantik, **FAQ** (native `<details>`, terbaca crawler), kotak penulis advokat (E-E-A-T),
  disclaimer hukum (sinyal kepercayaan untuk topik YMYL), tautan internal ke layanan & artikel terkait.
- Halaman layanan: FAQ terbaca crawler, artikel terkait, advokat terkait (internal linking).
- Beranda: satu H1 berisi intent utama, FAQ beranda + schema FAQPage.
- Tipografi responsif, target sentuh ≥44px, tanpa scroll horizontal, LCP hero dengan `priority`.

### Keputusan teknis penting
- **Judul tanpa duplikasi brand** (sebelumnya banyak halaman tampil "… | Raya Law Firm | Raya Law Firm").
- **Judul layanan berbasis kata kunci** (53–61 karakter), mis. "Pengacara Perdata Jakarta & Sengketa Kontrak | Raya Law Firm";
  meta description 120–160 karakter di semua halaman.
- **Meta keywords per halaman** (bukan 25 kata kunci yang sama di semua halaman — itu sinyal spam).
- **Satu URL per halaman** (canonical bersih tanpa query). Bahasa Inggris memakai cookie di URL yang sama,
  jadi sengaja **tanpa hreflang**; Google mengindeks versi Indonesia (pasar utama).
- **FAQ selalu ada di HTML server** (`<details>`), sehingga terbaca crawler & AI walau tidak diklik.
- **Internal linking**: layanan ↔ advokat terkait ↔ artikel terkait; daftar layanan memakai judul layanan sebagai anchor text.
- **Performa (Core Web Vitals)**: foto advokat 6–7 MB diperkecil menjadi ±120 KB, logo/favicon 2,1 MB → 120 KB / 3 KB,
  gambar OG 114 KB (syarat pratinjau WhatsApp < 300 KB), framer-motion tidak lagi dimuat di HP,
  hero tanpa JavaScript animasi, `sharp` terpasang untuk optimasi gambar.
- **Aksesibilitas** (ikut dinilai Lighthouse): kontras tombol utama diperbaiki, skip-link, focus trap dialog,
  target sentuh ≥ 44 px, safe-area iPhone.

### Dashboard admin yang "SEO-aware"
- Editor artikel dengan **checklist SEO** (panjang judul, meta description, jumlah kata, jumlah H2,
  poin penting, FAQ, gambar & alt, tautan internal) + **pratinjau hasil Google**.
- Pemilihan advokat sebagai penulis, slug otomatis, meta title/description dengan penghitung karakter.

---

## 2. Langkah WAJIB setelah deploy (minggu pertama)

1. **Google Search Console** (sudah ada token verifikasi di kode)
   - Pastikan properti `https://rayalawfirm.com` terverifikasi.
   - *Sitemaps* → kirim `https://rayalawfirm.com/sitemap.xml`.
   - *URL Inspection* → minta indeks untuk beranda, `/layanan`, setiap `/layanan/...`, `/tim`, `/artikel`.
   - Cek *Enhancements*: Breadcrumbs, FAQ, Profile page — pastikan tanpa error.
2. **Bing Webmaster Tools** (penting untuk ChatGPT Search & Copilot)
   - Import properti dari Google Search Console (1 klik), kirim sitemap.
   - Isi `INDEXNOW_KEY` di Vercel → redeploy → artikel baru otomatis terindeks.
3. **Google Business Profile** — faktor #1 untuk "pengacara jakarta" (Local Pack/Maps)
   - Kategori utama: *Law firm* (Kantor hukum); tambahan: *Lawyer*, *Legal services*.
   - NAP **persis sama** dengan website:
     `Raya Law Firm — Jl. Tebet Barat Dalam IV No. 10, Tebet Barat, Jakarta Selatan 12810` · `+62 813-3566-3379`.
   - Website: `https://rayalawfirm.com`, jam: Senin–Jumat 08.00–17.00.
   - Unggah foto kantor, tim, logo (min. 10 foto). Tulis deskripsi berisi layanan utama.
   - Posting mingguan (bagikan artikel baru). Jawab setiap ulasan.
4. **Ulasan Google** — minta setiap klien puas memberi ulasan (kirim tautan ulasan via WhatsApp setelah perkara selesai).
   Target: 20+ ulasan bintang 5 dalam 3 bulan.
5. Uji di <https://search.google.com/test/rich-results> dan <https://pagespeed.web.dev/> (target skor mobile ≥ 90).

---

## 3. Peta kata kunci (keyword map)

| Halaman | Kata kunci utama | Kata kunci pendukung |
| --- | --- | --- |
| Beranda `/` | konsultan hukum jakarta, kantor hukum jakarta | law firm jakarta, advokat jakarta selatan, pengacara profesional |
| `/layanan` | jasa pengacara, layanan hukum | konsultasi hukum perusahaan, pendampingan hukum |
| `/layanan/hukum-pidana` | pengacara pidana jakarta | pendampingan laporan polisi, praperadilan |
| `/layanan/hukum-perdata` | pengacara perdata jakarta | gugatan wanprestasi, sengketa perjanjian, hutang piutang |
| `/layanan/hukum-bisnis` | pengacara bisnis / corporate lawyer jakarta | pendirian PT, legal due diligence, kontrak bisnis |
| `/layanan/hukum-keluarga` | pengacara perceraian jakarta | hak asuh anak, harta gono-gini, waris |
| `/layanan/hukum-properti` | pengacara sengketa tanah jakarta | sertifikat ganda, mafia tanah, jual beli tanah |
| `/layanan/hukum-ketenagakerjaan` | pengacara ketenagakerjaan / PHK | pesangon PHK, PHI, perselisihan hubungan industrial |
| `/layanan/hukum-ptun` | pengacara PTUN jakarta | gugatan tata usaha negara, sengketa izin, sengketa ASN |
| `/konsultasi` | konsultasi hukum online | konsultasi pengacara via WhatsApp |
| `/tim/...` | nama advokat + "advokat" | (pencarian bermerek / reputasi) |
| `/artikel/...` | pertanyaan informasional (lihat bagian 4) | — |

> **Makassar**: kata kunci "pengacara makassar" hanya bisa dikejar maksimal jika ada alamat kantor/
> perwakilan nyata di Makassar (Google Business Profile terpisah). Jangan membuat alamat fiktif —
> itu melanggar pedoman Google. Bila ada kantor nyata, tambahkan halaman lokasi khusus.

---

## 4. Rencana konten 12 minggu (1 artikel/minggu)

Pilih topik berbentuk **pertanyaan nyata** — inilah yang dijawab AI Overview. Setiap artikel ditulis/
ditinjau oleh advokat (pilih sebagai penulis di dashboard).

1. Cara Melaporkan Penipuan Online ke Polisi: Langkah & Dokumen yang Dibutuhkan
2. Pesangon PHK Terbaru: Cara Menghitung Hak Pekerja Menurut PP 35/2021
3. Prosedur Cerai di Pengadilan Agama: Syarat, Biaya Perkara, dan Lama Proses
4. Wanprestasi vs Penipuan: Perbedaan dan Langkah Hukumnya
5. Cara Membuat Surat Somasi yang Efektif (Contoh & Format)
6. Sertifikat Tanah Ganda: Cara Mengecek di BPN dan Menyelesaikannya
7. Cara Mendirikan PT Perorangan dan PT Biasa: Syarat & Perbedaannya
8. Gaji Tidak Dibayar Perusahaan: Langkah Hukum yang Bisa Ditempuh Pekerja
9. Hak Asuh Anak Setelah Cerai: Siapa yang Berhak Menurut Hukum Indonesia?
10. Pembagian Harta Gono-Gini: Aturan dan Cara Mengajukannya
11. Kewajiban Perusahaan dalam UU Perlindungan Data Pribadi (UU PDP)
12. Mediasi vs Gugatan Pengadilan: Mana yang Tepat untuk Sengketa Bisnis?

### Template artikel ramah AI Overview
1. **Judul** 40–65 karakter, mengandung kata kunci utama.
2. **Ringkasan** (excerpt) 1–2 kalimat yang langsung **menjawab** pertanyaan.
3. **Poin Penting** 3–5 butir (fakta, angka, dasar hukum).
4. Subjudul **H2 berbentuk pertanyaan** ("Apa syarat…?", "Berapa lama…?", "Bagaimana cara…?");
   kalimat pertama di bawahnya = jawaban langsung, lalu penjelasan.
5. Sebut **dasar hukum spesifik** (UU/PP/Pasal) — AI lebih suka mengutip sumber yang presisi.
6. Gunakan **daftar bernomor** untuk prosedur dan **daftar poin** untuk syarat/dokumen.
7. **FAQ** 3–6 pertanyaan lanjutan (masuk schema FAQPage).
8. **Tautan internal**: minimal 1 ke halaman layanan terkait (`/layanan/...`) dan `/konsultasi`.
9. 800–1.500 kata, gambar sampul + teks alt deskriptif.
10. Penulis: advokat (bukan "Admin") → sinyal E-E-A-T untuk topik hukum (YMYL).

---

## 5. E-E-A-T (Experience, Expertise, Authoritativeness, Trust)

Untuk topik hukum, Google sangat ketat. Lengkapi lewat dashboard admin:
- **Bio** 80–200 kata untuk setiap advokat, **pendidikan**, keanggotaan organisasi (PERADI/KAI/dll. + nomor
  anggota bila bersedia), sertifikasi, dan tautan LinkedIn aktif.
- Foto profesional seragam (rasio 3:4, latar polos).
- Halaman Tentang: sejarah firma, nilai, legalitas (bila ada nomor izin/akta yang boleh ditampilkan).
- Testimoni & ulasan **asli** saja.

## 6. Otoritas (backlink) — 3 bulan pertama

- Profil di direktori hukum & bisnis Indonesia (mis. direktori advokat organisasi profesi, Google Business,
  Bing Places, Apple Business Connect, direktori bisnis lokal Jakarta).
- Tulis artikel tamu/opini hukum di media online & portal hukum; selalu cantumkan tautan ke artikel terkait.
- Sponsori/isi webinar kampus atau komunitas UMKM → tautan dari situs penyelenggara.
- Instagram `@rayalawfirm.official`: tautan bio ke website, bagikan setiap artikel.
- Pastikan NAP identik di semua direktori (konsistensi = sinyal lokal kuat).

## 7. Visibilitas di AI (ChatGPT, Perplexity, Gemini, Claude)

- ✅ Crawler AI diizinkan di `robots.txt`; ✅ `llms.txt` & `llms-full.txt`; ✅ IndexNow → Bing.
- AI mengutip halaman yang **jelas, faktual, terstruktur**, dan **disebut di sumber lain** — jadi backlink &
  penyebutan merek (brand mentions) di media/direktori sangat membantu.
- Cek berkala: tanyakan ke ChatGPT/Perplexity "rekomendasi kantor hukum di Jakarta Selatan untuk sengketa
  tanah" dan catat apakah Raya Law Firm muncul.

## 8. Perlu dikonfirmasi ke klien

- **Jam Sabtu 09.00–13.00 WIB** — tercantum di halaman Kontak/Konsultasi lama, sekarang juga di schema,
  footer, dan llms.txt. Hapus dari `lib/i18n/dictionaries.ts` & `lib/metadata.ts` bila tidak benar.
- **Akun X/Twitter `@rayalawfirm`** di meta Twitter Card — pastikan akun ini milik firma, atau hapus.
- **LinkedIn advokat** — beberapa data lama berupa URL *hasil pencarian* LinkedIn (bukan profil).
  Ganti dengan URL profil asli lewat dashboard admin (sudah otomatis dikecualikan dari schema `sameAs`).
- **Statistik "5+ tahun" & "30+ kasus"** di beranda berasal dari konten lama — pastikan akurat.

## 9. Rekomendasi lanjutan (opsional)

- Gambar OG khusus per artikel/advokat (rasio 1200×630 berisi judul) — saat ini memakai foto sampul
  yang sebagian berorientasi potret sehingga terpotong saat dibagikan.
- Halaman lokasi **Makassar** hanya bila ada kantor/perwakilan nyata.
- Bila kelak ingin bahasa Inggris ikut terindeks: pindahkan ke URL `/en/...` + hreflang.

## 10. KPI & pemantauan bulanan

| KPI | Alat | Target 3 bulan | Target 6 bulan |
| --- | --- | --- | --- |
| Halaman terindeks | Search Console | 100% | 100% |
| Klik organik / bulan | Search Console | 300+ | 1.000+ |
| Kata kunci top-10 | Search Console | 15+ | 40+ |
| Ulasan Google | Business Profile | 20+ | 50+ |
| Skor PageSpeed mobile | PageSpeed Insights | ≥ 90 | ≥ 90 |
| Konsultasi masuk dari website | WhatsApp/form | catat sumbernya | naik tiap bulan |
