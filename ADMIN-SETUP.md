# Panduan Setup Database & Dashboard Admin — Raya Law Firm

Dokumen ini untuk **developer**. Ikuti urutannya dari atas ke bawah (±15 menit).

---

## 1. Gambaran singkat

| Bagian | Teknologi | Lokasi kode |
| --- | --- | --- |
| Website publik | Next.js 14 (App Router) | `app/(site)/` |
| Dashboard admin | Next.js + Supabase Auth | `app/admin/` (URL: `/admin`) |
| Database | Supabase Postgres + Row Level Security | `supabase/migrations/` |
| Foto & gambar | Supabase Storage, bucket publik `media` | diunggah dari dashboard |
| Data cadangan | Data statis bawaan | `lib/data/` (dipakai otomatis bila Supabase belum diisi/error) |

**Hak akses admin (sesuai permintaan, dikunci juga di level database):**

- ✅ Tambah pengacara
- ✅ Edit pengacara (termasuk sembunyikan/tampilkan dan urutan tampil)
- ✅ Tambah artikel
- ❌ Hapus apa pun, edit/hapus artikel, kelola konten lain — **tidak tersedia**

---

## 2. Buat project Supabase

1. Buka <https://supabase.com/dashboard> → **New project**.
2. Region disarankan **Southeast Asia (Singapore)** agar cepat untuk pengunjung Indonesia.
3. Simpan database password di tempat aman.

## 3. Jalankan skema database

1. Supabase Dashboard → **SQL Editor** → **New query**.
2. Tempel seluruh isi `supabase/migrations/20261017000000_init.sql` → **Run**.
3. Buat query baru, tempel seluruh isi `supabase/seed.sql` → **Run**
   (mengisi 4 pengacara + 6 artikel yang sudah ada di website, lengkap dengan terjemahan Inggris).

Kedua file aman dijalankan ulang (idempotent) — data yang sudah ada tidak ditimpa.

> Pakai Supabase CLI? `supabase link` lalu `supabase db push`, kemudian jalankan `seed.sql` di SQL Editor.

## 4. Amankan Authentication

Supabase Dashboard → **Authentication**:

1. **Sign In / Providers → Email**: pastikan aktif.
2. **Sign In / Providers → "Allow new users to sign up"**: **MATIKAN**.
   Admin dibuat manual; tidak boleh ada pendaftaran publik.
3. **URL Configuration → Site URL**: `https://rayalawfirm.com`.

## 5. Buat akun admin

Email admin yang sudah terdaftar di `admin_allowlist`: **`admin@rayalawfirm.com`**.

**Cara A — lewat Dashboard (paling mudah):**
Authentication → **Users** → **Add user** → **Create new user**
- Email: `admin@rayalawfirm.com`
- Password: password yang sudah Anda tentukan
- ✅ centang **Auto Confirm User** (wajib — admin harus berstatus terkonfirmasi)

**Cara B — lewat script (butuh service role key di `.env.local`):**

```bash
npm run admin:create -- admin@rayalawfirm.com "PASSWORD_ANDA"
```

Script ini membuat user (atau memperbarui password bila sudah ada), mengonfirmasi email, dan memastikan email ada di `admin_allowlist`.

> 🔐 Jangan pernah menyimpan password admin di repository. Sarankan klien mengganti password setelah serah terima.

**Menambah admin lain** (opsional):

```sql
insert into public.admin_allowlist (email) values ('nama@rayalawfirm.com');
```

## 6. Environment variables

Salin `.env.example` → `.env.local` (lokal) dan isi juga di **Vercel → Project → Settings → Environment Variables**:

| Variabel | Wajib | Keterangan |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Project Settings → API → `anon` `public` key (atau publishable key) |
| `NEXT_PUBLIC_DEVELOPER_NAME` | disarankan | Nama yang tampil di dialog mode hold |
| `NEXT_PUBLIC_DEVELOPER_WHATSAPP` | disarankan | Nomor WA developer (format `628xxx`) untuk tombol "Hubungi" |
| `NEXT_PUBLIC_DEVELOPER_EMAIL` | opsional | Dipakai bila WA kosong |
| `INDEXNOW_KEY` | opsional | String acak 32 karakter; artikel baru langsung dilaporkan ke Bing/ChatGPT Search |
| `SUPABASE_SERVICE_ROLE_KEY` | ❌ jangan di Vercel | Hanya untuk `npm run admin:create` di laptop |

Setelah mengubah variabel `NEXT_PUBLIC_*`, lakukan **Redeploy** (nilainya ditanam saat build).

## 7. Uji

1. Buka `https://rayalawfirm.com/admin` → otomatis diarahkan ke `/admin/login`.
2. Login dengan akun admin.
3. Coba **Tambah Pengacara** → isi form → **Simpan** → muncul dialog
   **"Pembaruan data belum diaktifkan"** (karena mode HOLD aktif — lihat bagian 8).

---

## 8. 🔒 MODE HOLD (demo untuk klien)

Secara default, dashboard berada dalam **mode hold**: klien bisa login, melihat data, mengisi form,
dan melihat pratinjau, tetapi saat menekan **Simpan/Terbitkan** muncul dialog:

> *Pembaruan data belum diaktifkan — Dashboard admin ini masih dalam mode demo. Perubahan yang Anda buat belum tersimpan ke website…* + tombol **Hubungi developer**.

Isian form tetap ada di layar (draf artikel juga disimpan otomatis di browser), jadi klien tidak kehilangan tulisannya.

**Penguncian berlapis (tidak bisa diakali dari browser):**

1. Server action mengecek saklar sebelum menyimpan.
2. Row Level Security database menolak INSERT/UPDATE bila saklar mati.
3. Upload gambar ke Storage juga ditolak bila saklar mati.

### ▶️ Mengaktifkan penyimpanan (setelah klien deal)

Supabase → SQL Editor → jalankan:

```sql
update public.app_settings set admin_writes_enabled = true;
```

Langsung berlaku tanpa redeploy.

### ⏸️ Mengunci kembali

```sql
update public.app_settings set admin_writes_enabled = false;
```

### 👀 Melihat apa yang ingin disimpan klien selama mode hold

Setiap percobaan simpan dicatat (lengkap dengan isi form) di tabel `admin_write_requests`:

```sql
select created_at, user_email, action, summary
from public.admin_write_requests
order by created_at desc;
```

Kolom `payload` berisi data form lengkap (JSON) bila ingin Anda terapkan manual.

---

## 9. Cara kerja konten di website

- Halaman publik membaca pengacara aktif & artikel terbit dari Supabase, di-cache maksimal 5 menit.
- Saat admin menyimpan, cache langsung disegarkan (`revalidateTag`) sehingga perubahan tampil seketika.
- Bila Supabase belum dikonfigurasi atau sedang gangguan, website **tetap tampil** memakai data statis di `lib/data/`.
- Gambar yang diunggah admin otomatis dikompres ke WebP (maks. 1400–1600 px) di browser sebelum diunggah.
- Artikel baru otomatis masuk `sitemap.xml`, `feed.xml`, `llms.txt`, dan (bila `INDEXNOW_KEY` diisi) dilaporkan ke IndexNow.

## 10. Troubleshooting

| Gejala | Penyebab & solusi |
| --- | --- |
| Halaman login menampilkan "Supabase belum dikonfigurasi" | Env `NEXT_PUBLIC_SUPABASE_URL` / `ANON_KEY` belum diisi atau belum redeploy. |
| "Email atau kata sandi salah" | Cek user di Authentication → Users; reset password via Dashboard atau `npm run admin:create`. |
| "Akun ini tidak memiliki akses admin" | Email belum ada di `admin_allowlist` **atau** user belum terkonfirmasi (Auto Confirm). |
| Dashboard: "Tabel database belum dibuat" | Jalankan file migration (langkah 3). |
| Website tidak menampilkan pengacara/artikel baru | Tunggu ≤5 menit atau cek `is_active`/`published_at` (artikel terjadwal tampil sesuai tanggal). |
| Gambar Supabase tidak tampil | Pastikan bucket `media` publik (dibuat otomatis oleh migration) dan URL project benar. |
| Saat simpan selalu muncul dialog hold | Memang mode hold aktif — lihat bagian 8. |

## 11. Perintah berguna

```bash
npm run dev                # jalankan lokal
npm run build              # build produksi
npm run typecheck          # cek TypeScript
npm run db:seed:generate   # buat ulang supabase/seed.sql dari lib/data
npm run admin:create -- <email> <password>
```
