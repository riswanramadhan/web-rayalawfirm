-- =============================================================================
-- Raya Law Firm — data awal (pengacara & artikel). Dibuat otomatis oleh
-- scripts/generate-seed.mjs — jangan edit manual.
-- Jalankan SETELAH supabase/migrations/20261017000000_init.sql.
-- Aman dijalankan ulang: data yang sudah ada (berdasarkan slug) tidak ditimpa.
-- =============================================================================

insert into public.lawyers (slug, name, position, position_en, specialization, specialization_en, bio, bio_en, expertise, expertise_en, achievements, achievements_en, handled_cases, handled_cases_en, education, image_url, linkedin, instagram, facebook, phone, email, sort_order, is_active) values
  ('alif', 'Muh. Alif Maulana Akbar Paisal, S.H.', 'Managing Partner', 'Managing Partner', 'Hukum Perdata, Hukum Pidana & Corporate Lawyer', 'Civil Law, Criminal Law & Corporate Lawyer', '', null, '{}'::text[], '{}'::text[], array['Pelatihan Pendidikan Keterampilan Profesi Advokat (PKPA) 2023', 'Anggota Advokat DPN Indonesia', 'Sertifikasi Kelulusan Profesi Advokat']::text[], array['Advocate Professional Skills Education Training (PKPA) 2023', 'DPN Indonesia Advocate Member', 'Advocate Professional Qualification Certification']::text[], array['Litigasi dan Hukum Perdata', 'Hukum Pidana', 'Corporate Lawyer', 'Legal Risk Management']::text[], array['Litigation and Civil Law', 'Criminal Law', 'Corporate Lawyer', 'Legal Risk Management']::text[], '{}'::text[], '/images/team/tim-alif-1.jpg', 'https://www.linkedin.com/search/results/people/?keywords=Alif%20Paisal', 'https://www.instagram.com/alifmaulana.paisal', '', '6281335663379', 'info@rayalawfirm.com', 10, true),
  ('arham', 'Muhammad Arham Yusuf, S.H., M.H.', 'Partner / Advokat', 'Partner / Advocate', 'Litigasi dan Hukum Perdata', 'Litigation and Civil Law', '', null, array['Litigasi dan Hukum Perdata']::text[], array['Litigation and Civil Law']::text[], array['Anggota PERADI']::text[], array['PERADI Member']::text[], '{}'::text[], '{}'::text[], '{}'::text[], '/images/team/tim-arham-1.jpg', 'https://www.linkedin.com/in/arham-yusuf-952829278', 'https://www.instagram.com/arhamyusufk', '', '6281242079060', 'info@rayalawfirm.com', 20, true),
  ('yuli', 'Yuliana Damayanti, S.H.', 'Partner / Advokat', 'Partner / Advocate', 'Legal Risk Management & Legal Drafting', 'Legal Risk Management & Legal Drafting', '', null, array['Identifikasi dan Mitigasi Risiko Hukum', 'Contract & Agreement Analysis', 'Legal Drafting & Writing', 'Legal Risk Management', 'Legal Documentation & Administration Management']::text[], array['Legal Risk Identification and Mitigation', 'Contract & Agreement Analysis', 'Legal Drafting & Writing', 'Legal Risk Management', 'Legal Documentation & Administration Management']::text[], array['Pendidikan Khusus Profesi Advokat (PKPA)', 'Sertifikasi Kelulusan Profesi Advokat']::text[], array['Special Advocate Professional Education (PKPA)', 'Advocate Professional Qualification Certification']::text[], array['Perkara pidana', 'Perdata', 'Hukum ketenagakerjaan']::text[], array['Criminal cases', 'Civil cases', 'Employment law']::text[], '{}'::text[], '/images/team/tim-yuli-1.jpg', 'https://www.linkedin.com/search/results/people/?keywords=Yuliana%20Damayanti', 'https://www.instagram.com/yuliana.dmynt', '', '6285345108869', 'info@rayalawfirm.com', 30, true),
  ('dimas', 'Ryan Arya Dimas, S.H.', 'Partner / Advokat', 'Partner / Advocate', 'Litigasi, Ketenagakerjaan, Perdata, Pidana', 'Litigation, Employment, Civil, Criminal', '', null, array['Litigasi', 'Ketenagakerjaan', 'Perdata', 'Pidana']::text[], array['Litigation', 'Employment', 'Civil', 'Criminal']::text[], array['Mediasi']::text[], array['Mediation']::text[], array['Litigasi', 'Ketenagakerjaan', 'Perdata', 'Sengketa Tanah', 'Hutang Piutang']::text[], array['Litigation', 'Employment', 'Civil', 'Land Dispute', 'Debt Collection']::text[], '{}'::text[], '/images/team/tim-dimas-1.jpg', 'https://www.linkedin.com/in/ryan-a-dimas-93b9a6b7', 'https://www.instagram.com/r.a_dimas', 'https://www.facebook.com/dimas.ran.5', '628111126103', 'info@rayalawfirm.com', 40, true)
on conflict (slug) do nothing;

insert into public.articles (slug, title, title_en, excerpt, excerpt_en, content, content_en, category, category_en, tags, tags_en, key_points, key_points_en, faqs, faqs_en, cover_image_url, cover_image_alt, author_name, author_name_en, meta_title, meta_title_en, meta_description, meta_description_en, featured, is_published, published_at, created_at, updated_at) values
  ('cara-membuat-perjanjian-yang-kuat-secara-hukum', 'Cara Membuat Perjanjian yang Kuat Secara Hukum', 'How to Draft a Legally Strong Agreement', 'Perjanjian tertulis adalah fondasi kepastian hukum yang melindungi hak dan kewajiban para pihak. Artikel ini membahas unsur sah, struktur klausul, dan langkah praktis agar perjanjian Anda benar-benar efektif.', 'A written agreement is the foundation of legal certainty that protects the rights and obligations of the parties. This article explains validity requirements, clause structure, and practical steps to make your agreement truly effective.', '## Mengapa Perjanjian Harus Tertulis
Perjanjian tertulis adalah alat utama untuk menjaga kepastian hak dan kewajiban. Dalam praktik bisnis maupun personal, kesepakatan lisan sering menimbulkan tafsir berbeda ketika terjadi sengketa. Dokumen tertulis memberikan bukti konkret tentang apa yang disepakati, kapan berlaku, dan bagaimana pelaksanaannya. Dengan demikian, perjanjian tertulis bukan sekadar formalitas, tetapi mekanisme perlindungan yang menekan risiko konflik di kemudian hari.

Perjanjian yang baik juga membantu membangun disiplin pelaksanaan. Ketika struktur kewajiban, jadwal pembayaran, atau standar kualitas dituangkan jelas, para pihak dapat mengukur kinerja dan menghindari perselisihan karena asumsi. Dokumen yang rapi akan mempermudah proses penagihan, audit, hingga pembuktian di pengadilan apabila sengketa tidak dapat diselesaikan secara damai.

## Unsur Sah dan Struktur Klausul
Dalam hukum perdata Indonesia, ada empat syarat sah perjanjian: sepakat mereka yang mengikatkan diri, cakap bertindak hukum, objek tertentu, serta sebab yang halal. Keempat unsur ini harus terwujud secara nyata, bukan hanya di atas kertas. Karena itu, identitas para pihak, kewenangan menandatangani, dan uraian objek perjanjian harus ditulis dengan presisi.

Struktur klausul yang rapi memudahkan implementasi. Idealnya perjanjian memuat bagian definisi, ruang lingkup kerja, hak dan kewajiban, jangka waktu, serta ketentuan harga atau imbalan. Jangan lupa klausul mengenai standar kinerja, mekanisme perubahan (addendum), dan metode penyelesaian sengketa. Semakin jelas struktur perjanjian, semakin kecil ruang interpretasi yang merugikan.

Klausul wanprestasi dan ganti rugi sering diabaikan, padahal menjadi kunci saat terjadi pelanggaran. Tentukan apa yang dianggap wanprestasi, tenggat peringatan, dan bentuk kompensasi yang wajar. Sertakan juga klausul force majeure agar peristiwa di luar kendali para pihak memiliki prosedur penyelesaian yang adil. Ini melindungi kedua belah pihak dari ekspektasi yang tidak realistis.

## Praktik Terbaik Sebelum Menandatangani
Sebelum menandatangani, lakukan uji kelayakan sederhana terhadap lawan kontrak. Periksa legalitas badan usaha, izin usaha, serta kewenangan penandatangan. Untuk transaksi bernilai tinggi, due diligence hukum akan mengungkap potensi sengketa, beban jaminan, atau kewajiban tersembunyi. Langkah ini tidak hanya melindungi kepentingan Anda, tetapi juga mencegah perjanjian dibatalkan karena cacat hukum.

Dokumentasikan proses negosiasi dan pastikan versi final disetujui semua pihak. Hindari perubahan menit terakhir tanpa verifikasi, dan pastikan para pihak memahami kewajiban yang tertuang. Jika perjanjian memuat istilah teknis, sertakan definisi yang tegas. Untuk transaksi lintas negara atau pihak asing, pertimbangkan perjanjian bilingual agar tidak terjadi perbedaan tafsir di kemudian hari.

## Penutup
Perjanjian yang kuat adalah investasi perlindungan. Dengan penyusunan yang tepat, perjanjian tidak hanya mengunci hak Anda, tetapi juga menjaga hubungan bisnis tetap sehat. Konsultasi dengan penasihat hukum akan membantu memetakan risiko dan menyiapkan klausul yang sesuai kebutuhan, sehingga perjanjian menjadi alat yang benar-benar bekerja saat dibutuhkan.', '## Why Agreements Should Be Written
A written agreement is the main tool for protecting legal certainty around rights and obligations. In business and personal practice, verbal agreements often create different interpretations when a dispute arises. A written document provides concrete evidence of what was agreed, when it applies, and how it should be performed. For that reason, a written agreement is not merely a formality, but a protection mechanism that reduces the risk of future conflict.

A good agreement also helps create discipline in performance. When obligations, payment schedules, or quality standards are stated clearly, the parties can measure performance and avoid disputes based on assumptions. A well-structured document will support collection, audit, and proof in court if the dispute cannot be settled amicably.

## Validity Requirements and Clause Structure
Under Indonesian civil law, four requirements make an agreement valid: consent of the parties, legal capacity, a specific object, and a lawful cause. These elements must exist in practice, not only on paper. Therefore, the identities of the parties, signing authority, and description of the agreement object must be written precisely.

A neat clause structure makes implementation easier. Ideally, an agreement includes definitions, scope of work, rights and obligations, term, and price or compensation provisions. Clauses on performance standards, amendment mechanisms, and dispute resolution methods should not be overlooked. The clearer the structure, the smaller the room for harmful interpretation.

Default and damages clauses are often neglected even though they are critical when a breach occurs. Define what counts as default, the warning period, and reasonable compensation. Include a force majeure clause so events beyond the parties control have a fair resolution procedure. This protects both sides from unrealistic expectations.

## Best Practices Before Signing
Before signing, conduct simple due diligence on the counterparty. Check business legality, licenses, and signing authority. For high-value transactions, legal due diligence can reveal potential disputes, security encumbrances, or hidden obligations. This step protects your interests and prevents an agreement from being annulled due to legal defects.

Document the negotiation process and ensure the final version is approved by all parties. Avoid last-minute changes without verification, and make sure each party understands the obligations written in the agreement. If the agreement contains technical terms, include clear definitions. For cross-border transactions or foreign parties, consider a bilingual agreement to prevent conflicting interpretations later.

## Closing
A strong agreement is an investment in protection. With proper drafting, an agreement does not only lock in your rights, it also keeps business relationships healthy. Consulting a legal advisor helps map risks and prepare clauses that fit your needs, so the agreement works when it is needed.', 'Hukum Perdata', 'Civil Law', array['perjanjian', 'kontrak', 'hukum perdata']::text[], array['agreement', 'contract', 'civil law']::text[], '{}'::text[], '{}'::text[], '[]'::jsonb, '[]'::jsonb, '/images/articles/artikel-hukum-perdata.jpg', null, 'Tim Redaksi Raya Law Firm', 'Raya Law Firm Editorial Team', 'Perjanjian yang Kuat Secara Hukum | Raya Law Firm', 'Legally Strong Agreements | Raya Law Firm', 'Panduan membuat perjanjian yang sah dan efektif, mulai dari unsur hukum, struktur klausul, hingga tips sebelum menandatangani kontrak.', 'Guide to preparing valid and effective agreements, from legal requirements and clause structure to practical tips before signing a contract.', true, true, '2026-05-10T01:00:00.000Z'::timestamptz, '2026-05-10T01:00:00.000Z'::timestamptz, '2026-05-10T01:00:00.000Z'::timestamptz),
  ('hak-tenaga-kerja-saat-phk-panduan-praktis', 'Hak Tenaga Kerja Saat PHK: Panduan Praktis', 'Employee Rights During Termination: A Practical Guide', 'PHK harus mengikuti prosedur dan memberikan hak minimum kepada pekerja. Pelajari dasar hukum, langkah yang dapat diambil, serta dokumen yang perlu disiapkan agar posisi Anda terlindungi.', 'Employment termination must follow procedure and provide minimum rights to employees. Learn the legal basis, steps to take, and documents to prepare so your position remains protected.', '## Dasar Hukum PHK dan Hak Minimum
Pemutusan hubungan kerja adalah langkah terakhir yang idealnya ditempuh setelah upaya pencegahan dilakukan. Regulasi ketenagakerjaan di Indonesia mengatur bahwa PHK wajib disertai alasan yang jelas, prosedur yang tepat, serta pemenuhan hak pekerja. Peraturan Pemerintah Nomor 35 Tahun 2021 menjadi rujukan penting terkait alasan PHK, mekanisme perundingan, dan formula perhitungan kompensasi.

Hak minimum pekerja meliputi uang pesangon, uang penghargaan masa kerja, dan uang penggantian hak. Selain itu, hak seperti sisa cuti tahunan, biaya transportasi, hingga THR yang belum dibayarkan harus dipastikan dipenuhi. Besaran kompensasi sangat bergantung pada masa kerja, alasan PHK, dan status hubungan kerja yang disepakati.

## Langkah Pekerja Saat Terjadi PHK
Langkah pertama yang perlu dilakukan adalah meninjau surat PHK secara teliti. Pastikan alasan PHK dicantumkan secara jelas, termasuk dasar hukumnya. Jika ada ketidaksesuaian, pekerja berhak meminta penjelasan tertulis. Simpan seluruh komunikasi resmi, bukti kinerja, dan dokumen hubungan kerja agar posisi Anda memiliki dasar yang kuat.

Jika terjadi perbedaan pandangan, proses bipartit wajib ditempuh terlebih dahulu dalam jangka waktu tertentu. Hasil perundingan bipartit harus dibuat dalam risalah tertulis. Bila belum tercapai kesepakatan, pekerja dapat melanjutkan ke mediasi di dinas ketenagakerjaan setempat. Proses ini penting karena menjadi prasyarat sebelum sengketa dibawa ke Pengadilan Hubungan Industrial.

## Strategi Negosiasi dan Dokumen yang Perlu Disiapkan
Pekerja sebaiknya menghitung hak secara mandiri dengan mengacu pada masa kerja dan ketentuan yang berlaku. Siapkan kontrak kerja, slip gaji, mutasi jabatan, serta bukti pembayaran BPJS dan THR. Dokumen ini menjadi dasar perhitungan hak dan memperkuat posisi saat negosiasi.

Dalam negosiasi, fokuskan pada kepastian jumlah hak dan waktu pembayarannya. Kesepakatan yang baik adalah yang tertulis dan memiliki jadwal pembayaran yang jelas. Jika perusahaan menawarkan paket kompensasi, pastikan seluruh komponen dihitung secara transparan dan tidak menghapus hak yang seharusnya diterima.

Pertimbangkan peran serikat pekerja atau pendamping hukum jika terdapat ketidakseimbangan informasi. Kehadiran pihak pendamping membantu memastikan perhitungan hak sesuai ketentuan dan mencegah tekanan psikologis dalam perundingan. Catat setiap pertemuan dan minta salinan risalah, karena dokumen ini akan menjadi bukti penting bila sengketa berlanjut ke mediasi atau pengadilan.

## Kesalahan Umum yang Perlu Dihindari
Kesalahan umum pekerja adalah menandatangani surat pengunduran diri atau pernyataan penerimaan hak tanpa memahami konsekuensinya. Tindakan tersebut dapat mengurangi hak pesangon secara signifikan. Di sisi lain, perusahaan juga sering melakukan PHK tanpa prosedur bipartit, yang berpotensi menimbulkan sengketa lebih besar.

## Penutup
PHK bukan hanya persoalan administratif, tetapi menyangkut hak yang dilindungi oleh hukum. Dengan memahami dasar hukum dan proses yang benar, pekerja dapat menjaga posisinya tetap terlindungi. Konsultasi dengan penasihat hukum dapat membantu menilai kelayakan PHK dan memastikan hak Anda dihitung secara adil.', '## Legal Basis for Termination and Minimum Rights
Employment termination is a final step that should ideally be taken after preventive efforts have been attempted. Indonesian employment regulations require termination to be supported by clear reasons, proper procedure, and fulfillment of employee rights. Government Regulation Number 35 of 2021 is an important reference for termination grounds, negotiation mechanisms, and compensation formulas.

Minimum employee rights include severance pay, service appreciation pay, and compensation for rights. Other rights such as unused annual leave, transportation costs, and unpaid religious holiday allowance must also be checked. The amount of compensation depends heavily on length of service, the reason for termination, and the agreed employment status.

## Steps Employees Should Take
The first step is to review the termination letter carefully. Make sure the termination reason is clearly stated, including its legal basis. If there is any inconsistency, the employee has the right to request written clarification. Keep all official communication, performance evidence, and employment documents so your position has a strong basis.

If there is disagreement, bipartite negotiation must be carried out first within the required timeframe. The result of bipartite negotiation must be recorded in written minutes. If no agreement is reached, the employee may proceed to mediation at the local manpower office. This process is important because it is a prerequisite before bringing the dispute to the Industrial Relations Court.

## Negotiation Strategy and Documents to Prepare
Employees should calculate their rights independently by referring to length of service and applicable provisions. Prepare the employment contract, payslips, position transfer records, BPJS payment evidence, and holiday allowance evidence. These documents support the calculation of rights and strengthen your position during negotiation.

In negotiation, focus on certainty of the amount and timing of payment. A good agreement is written and contains a clear payment schedule. If the company offers a compensation package, ensure every component is calculated transparently and does not eliminate rights that should be received.

Consider involving a labor union or legal assistant when information is imbalanced. A companion helps ensure calculations follow the rules and prevents psychological pressure in negotiation. Record each meeting and request copies of minutes, because these documents will be important evidence if the dispute continues to mediation or court.

## Common Mistakes to Avoid
A common employee mistake is signing a resignation letter or statement of rights acceptance without understanding the consequences. This can significantly reduce severance rights. On the other side, companies often terminate employment without bipartite procedure, which can create a larger dispute.

## Closing
Termination is not only an administrative matter; it concerns rights protected by law. By understanding the legal basis and correct process, employees can keep their position protected. Legal consultation can help assess whether termination is proper and ensure your rights are calculated fairly.', 'Ketenagakerjaan', 'Employment Law', array['phk', 'ketenagakerjaan', 'hak pekerja']::text[], array['termination', 'employment', 'employee rights']::text[], '{}'::text[], '{}'::text[], '[]'::jsonb, '[]'::jsonb, '/images/articles/artikel-ketenagakerjaan.jpg', null, 'Tim Redaksi Raya Law Firm', 'Raya Law Firm Editorial Team', 'Hak Pekerja Saat PHK | Raya Law Firm', 'Employee Rights During Termination | Raya Law Firm', 'Panduan praktis hak pekerja saat PHK, mulai dari dasar hukum, langkah bipartit, hingga dokumen yang perlu disiapkan.', 'A practical guide to employee rights during termination, from legal basis and bipartite steps to documents that should be prepared.', true, true, '2026-05-12T01:00:00.000Z'::timestamptz, '2026-05-12T01:00:00.000Z'::timestamptz, '2026-05-12T01:00:00.000Z'::timestamptz),
  ('sengketa-tanah-dan-sertifikat-ganda', 'Sengketa Tanah dan Sertifikat Ganda: Cara Menyikapi', 'Land Disputes and Duplicate Certificates: How to Respond', 'Sertifikat ganda sering memicu sengketa pertanahan yang kompleks. Kenali penyebabnya, langkah verifikasi, dan strategi penyelesaian agar aset Anda tetap terlindungi.', 'Duplicate certificates often trigger complex land disputes. Understand the causes, verification steps, and resolution strategies so your asset remains protected.', '## Penyebab Umum Sertifikat Ganda
Sertifikat ganda terjadi ketika satu bidang tanah memiliki lebih dari satu sertifikat yang diterbitkan pada waktu berbeda. Kondisi ini umumnya muncul karena data peta bidang yang belum sinkron, perubahan batas alam, atau riwayat peralihan hak yang tidak tercatat dengan rapi. Akibatnya, dua pihak sama-sama merasa memiliki hak yang sah.

Dalam praktik, sertifikat ganda juga bisa dipicu oleh kurangnya verifikasi saat transaksi, penggunaan alas hak lama yang tidak diperbarui, atau data waris yang belum diselesaikan. Ketika terjadi konflik, sengketa bukan hanya soal kepemilikan, tetapi juga menyangkut nilai ekonomi aset dan kelangsungan rencana investasi.

## Langkah Verifikasi dan Mediasi
Langkah pertama adalah melakukan pengecekan resmi di BPN untuk memverifikasi status sertifikat, peta bidang, dan riwayat hak. Pemeriksaan ini membantu memastikan apakah ada tumpang tindih atau kesalahan administrasi. Selain itu, pengukuran ulang di lapangan dengan melibatkan petugas BPN dapat memberikan kejelasan atas batas-batas tanah.

Mediasi sering menjadi cara efektif untuk menyelesaikan sengketa tanpa litigasi panjang. Dengan mediasi, para pihak dapat menegosiasikan solusi yang mempertimbangkan kepentingan masing-masing, seperti pembagian area, kompensasi, atau pengalihan hak. Mediasi yang didokumentasikan dengan benar akan mencegah sengketa berulang di kemudian hari.

## Strategi Litigasi dan Perlindungan Aset
Jika mediasi tidak mencapai kesepakatan, jalur litigasi menjadi pilihan. Sengketa pertanahan dapat diajukan melalui gugatan perdata untuk menentukan kepemilikan, atau melalui PTUN bila terkait dengan kesalahan administrasi penerbitan sertifikat. Dalam beberapa kasus, unsur pidana juga dapat muncul jika ditemukan pemalsuan dokumen.

Selain jalur litigasi, penting mengumpulkan bukti historis seperti bukti pembayaran PBB, surat keterangan riwayat tanah, serta kesaksian pihak yang mengetahui batas fisik. Bukti-bukti ini sering menjadi penentu di persidangan untuk menegaskan penguasaan nyata dan itikad baik. Pengumpulan bukti sejak awal membuat posisi Anda lebih kuat ketika proses berjalan panjang.

Untuk melindungi aset selama sengketa berjalan, pemilik dapat mengajukan permohonan blokir sertifikat atau sita jaminan sesuai prosedur. Langkah ini penting agar aset tidak dialihkan kepada pihak lain dan hak Anda tetap terlindungi hingga proses hukum selesai.

## Pencegahan di Masa Depan
Pencegahan selalu lebih baik daripada penyelesaian sengketa. Sebelum membeli tanah, lakukan due diligence menyeluruh, termasuk pengecekan di BPN, wawancara dengan pihak sekitar, serta verifikasi alas hak. Pastikan transaksi dilakukan melalui PPAT yang kompeten dan seluruh dokumen peralihan tercatat dengan benar.

## Penutup
Sengketa tanah memerlukan ketelitian serta strategi yang tepat sejak awal. Verifikasi dokumen, mediasi, dan langkah litigasi harus disusun secara terukur agar aset tetap aman. Pendampingan hukum yang memahami prosedur pertanahan akan membantu Anda mengambil keputusan terbaik dengan risiko yang terkontrol.', '## Common Causes of Duplicate Certificates
A duplicate certificate occurs when one parcel of land has more than one certificate issued at different times. This condition often arises because land map data is not synchronized, natural boundaries have changed, or the history of title transfer was not recorded neatly. As a result, two parties may both believe they hold valid rights.

In practice, duplicate certificates can also be triggered by weak verification during transactions, use of old title documents that were never updated, or unsettled inheritance records. When conflict occurs, the dispute is not only about ownership, but also the economic value of the asset and the continuity of investment plans.

## Verification and Mediation Steps
The first step is to conduct an official check at the land office to verify certificate status, land maps, and rights history. This examination helps determine whether there is overlap or administrative error. In addition, field remeasurement involving land office officers can clarify physical boundaries.

Mediation is often an effective way to resolve disputes without lengthy litigation. Through mediation, the parties can negotiate solutions that consider their interests, such as area division, compensation, or transfer of rights. Properly documented mediation helps prevent the same dispute from recurring later.

## Litigation Strategy and Asset Protection
If mediation fails, litigation becomes an option. Land disputes may be filed through a civil lawsuit to determine ownership, or through the State Administrative Court when the issue relates to administrative error in certificate issuance. In some cases, criminal elements may arise if document falsification is found.

Beyond litigation routes, it is important to collect historical evidence such as land tax payment proof, land history certificates, and witness statements from people who know the physical boundaries. These materials often become decisive in court to prove actual control and good faith. Collecting evidence early makes your position stronger when the process takes time.

To protect assets while a dispute is ongoing, owners may request certificate blocking or security seizure according to procedure. This step is important so the asset is not transferred to another party and your rights remain protected until the legal process ends.

## Prevention for the Future
Prevention is always better than dispute resolution. Before buying land, conduct thorough due diligence, including land office checks, interviews with surrounding parties, and verification of title documents. Make sure the transaction is handled through a competent land deed official and that all transfer documents are properly recorded.

## Closing
Land disputes require precision and the right strategy from the start. Document verification, mediation, and litigation steps must be prepared in a measured way so assets remain safe. Legal assistance that understands land procedures will help you make the best decision with controlled risk.', 'Properti & Pertanahan', 'Property & Land Law', array['pertanahan', 'sertifikat ganda', 'properti']::text[], array['land', 'duplicate certificate', 'property']::text[], '{}'::text[], '{}'::text[], '[]'::jsonb, '[]'::jsonb, '/images/articles/artikel-hukum-properti.jpg', null, 'Tim Redaksi Raya Law Firm', 'Raya Law Firm Editorial Team', 'Sengketa Tanah dan Sertifikat Ganda | Raya Law Firm', 'Land Disputes and Duplicate Certificates | Raya Law Firm', 'Pelajari penyebab sertifikat ganda, langkah verifikasi di BPN, hingga strategi penyelesaian sengketa tanah secara efektif.', 'Learn the causes of duplicate certificates, verification steps at the land office, and effective land dispute resolution strategies.', false, true, '2026-05-13T01:00:00.000Z'::timestamptz, '2026-05-13T01:00:00.000Z'::timestamptz, '2026-05-13T01:00:00.000Z'::timestamptz),
  ('risiko-hukum-pidana-digital-dan-perlindungan-data', 'Risiko Hukum Pidana Digital dan Perlindungan Data', 'Digital Criminal Law Risks and Data Protection', 'Aktivitas digital membawa risiko pidana baru bagi individu dan korporasi. Artikel ini membahas kategori pelanggaran, tanggung jawab korporasi, serta langkah pencegahan yang perlu disiapkan.', 'Digital activity brings new criminal risks for individuals and corporations. This article explains violation categories, corporate responsibility, and preventive steps that should be prepared.', '## Apa yang Dimaksud Pidana Digital
Pidana digital merujuk pada tindak pidana yang melibatkan teknologi informasi, sistem elektronik, atau data digital. Bentuknya beragam, mulai dari akses tanpa izin, penyebaran data pribadi, sampai penipuan berbasis platform online. Perkembangan teknologi membuat modus operandi semakin canggih sehingga risiko tidak hanya muncul pada pelaku, tetapi juga pada pihak yang lalai menjaga sistem.

Di Indonesia, ketentuan pidana digital diatur dalam beberapa regulasi, termasuk UU ITE dan aturan terkait perlindungan data. Pelanggaran dapat terjadi ketika ada penyebaran konten yang merugikan, penyalahgunaan akses, atau kegagalan melindungi data pelanggan. Karena itu, pemahaman atas batasan hukum sangat penting bagi individu maupun organisasi.

## Risiko bagi Individu dan Korporasi
Bagi individu, risiko pidana digital sering muncul dari aktivitas sehari-hari seperti penggunaan media sosial, pengelolaan akun, atau transaksi daring. Unggahan yang menyinggung pihak lain, penggunaan data tanpa izin, atau percobaan akses ke sistem bisa berujung pada proses hukum. Kealpaan pun dapat berakibat pidana jika terbukti merugikan pihak lain.

Korporasi menghadapi risiko lebih luas karena memiliki tanggung jawab atas keamanan sistem dan data pelanggan. Kegagalan mengamankan data dapat menyebabkan kebocoran yang berujung pada tuntutan pidana dan reputasi yang rusak. Selain itu, praktik internal seperti penggunaan perangkat lunak ilegal atau akses data tanpa kewenangan dapat menimbulkan konsekuensi hukum bagi perusahaan dan pengurusnya.

Risiko juga muncul dari keterlibatan pihak ketiga seperti vendor cloud, konsultan TI, atau mitra pemasaran digital. Jika kontrak tidak mengatur kewajiban keamanan dan kerahasiaan secara tegas, perusahaan dapat ikut menanggung dampak kebocoran data. Karena itu, pengelolaan risiko pihak ketiga dan audit vendor perlu menjadi bagian dari kebijakan kepatuhan.

## Langkah Pencegahan dan Tanggap Insiden
Pencegahan dimulai dari tata kelola yang jelas. Perusahaan perlu menerapkan kebijakan akses berbasis peran, audit keamanan berkala, serta pelatihan staf mengenai keamanan informasi. Kebijakan penggunaan perangkat dan penyimpanan data harus tertulis agar setiap karyawan memahami kewajiban dan batasan yang berlaku.

Jika terjadi insiden, langkah pertama adalah mengamankan sistem dan menjaga bukti digital agar tidak hilang. Dokumentasi waktu kejadian, jenis data yang terdampak, dan akses yang terjadi sangat penting untuk proses investigasi. Pendampingan hukum diperlukan untuk memastikan komunikasi kepada pihak terkait, termasuk regulator dan pengguna, dilakukan secara tepat dan tidak menimbulkan risiko tambahan.

## Penutup
Risiko pidana digital dapat diminimalkan melalui kepatuhan, edukasi, dan kesiapan tanggap insiden. Bagi individu, kehati-hatian dalam aktivitas digital menjadi langkah dasar. Bagi korporasi, investasi pada keamanan dan prosedur kepatuhan adalah kebutuhan strategis, bukan sekadar biaya. Konsultasi hukum membantu memastikan langkah pencegahan Anda sejalan dengan regulasi yang berlaku.', '## What Digital Crime Means
Digital crime refers to criminal acts involving information technology, electronic systems, or digital data. The forms vary, from unauthorized access and personal data distribution to online platform fraud. Technological development makes methods increasingly sophisticated, so risks may arise not only for perpetrators but also for parties that fail to secure their systems.

In Indonesia, digital crime provisions are regulated under several rules, including the Electronic Information and Transactions Law and data protection regulations. Violations may occur through harmful content distribution, access misuse, or failure to protect customer data. Understanding legal boundaries is therefore important for individuals and organizations.

## Risks for Individuals and Corporations
For individuals, digital criminal risks often arise from daily activities such as social media use, account management, or online transactions. Posts that harm others, use of data without permission, or attempts to access systems can lead to legal proceedings. Negligence may also create criminal exposure if it causes harm to others.

Corporations face broader risks because they are responsible for system and customer data security. Failure to secure data may cause leaks leading to criminal claims and reputational damage. Internal practices such as use of illegal software or unauthorized data access can also create legal consequences for companies and their management.

Risks may also arise from third parties such as cloud vendors, IT consultants, or digital marketing partners. If contracts do not clearly regulate security and confidentiality obligations, a company may share the impact of a data leak. Therefore, third-party risk management and vendor audits should be part of compliance policy.

## Prevention and Incident Response
Prevention begins with clear governance. Companies should implement role-based access policies, periodic security audits, and staff training on information security. Device use and data storage policies should be written so every employee understands applicable obligations and limits.

If an incident occurs, the first step is to secure systems and preserve digital evidence. Documentation of incident timing, affected data types, and access events is very important for investigation. Legal assistance is needed to ensure communication to relevant parties, including regulators and users, is handled properly and does not create additional risk.

## Closing
Digital criminal risk can be minimized through compliance, education, and incident response readiness. For individuals, careful digital activity is the basic step. For corporations, investment in security and compliance procedures is a strategic need, not just a cost. Legal consultation helps ensure your preventive steps align with applicable regulations.', 'Hukum Pidana', 'Criminal Law', array['pidana digital', 'keamanan data', 'kepatuhan']::text[], array['digital crime', 'data security', 'compliance']::text[], '{}'::text[], '{}'::text[], '[]'::jsonb, '[]'::jsonb, '/images/articles/artikel-hukum-pidana.jpg', null, 'Tim Redaksi Raya Law Firm', 'Raya Law Firm Editorial Team', 'Risiko Pidana Digital dan Perlindungan Data | Raya Law Firm', 'Digital Criminal Risk and Data Protection | Raya Law Firm', 'Kenali risiko pidana digital, tanggung jawab korporasi, serta langkah pencegahan dan tanggap insiden untuk melindungi data.', 'Understand digital criminal risk, corporate responsibility, and prevention and incident response steps to protect data.', false, true, '2026-05-12T01:00:00.000Z'::timestamptz, '2026-05-12T01:00:00.000Z'::timestamptz, '2026-05-12T01:00:00.000Z'::timestamptz),
  ('langkah-hukum-perceraian-dan-hak-asuh-anak', 'Langkah Hukum Perceraian dan Hak Asuh Anak', 'Legal Steps for Divorce and Child Custody', 'Perceraian harus dilakukan melalui prosedur pengadilan dengan pertimbangan hak anak dan keadilan bagi para pihak. Artikel ini menjelaskan jalur hukum, hak asuh, serta dokumen yang perlu dipersiapkan.', 'Divorce must proceed through court procedures with attention to children rights and fairness for the parties. This article explains legal routes, custody, and documents to prepare.', '## Pilihan Jalur Hukum
Di Indonesia, perceraian hanya dapat diputus melalui pengadilan. Pasangan beragama Islam mengajukan perkara di Pengadilan Agama, sementara pasangan non-Islam di Pengadilan Negeri. Pengadilan akan menilai alasan perceraian, proses mediasi, dan bukti yang diajukan sebelum memutus perkara.

Mediasi merupakan tahapan wajib dalam perkara perceraian. Tujuannya memberi kesempatan bagi para pihak untuk berdamai atau menyepakati solusi yang paling adil. Meskipun tidak selalu berhasil, mediasi membantu mengurangi konflik dan menjadi ruang untuk menyusun kesepakatan terkait hak asuh, nafkah, serta pembagian harta bersama.

Alasan perceraian harus dibuktikan secara legal, misalnya perselisihan terus-menerus, kekerasan, atau penelantaran. Pengadilan menilai bukti melalui saksi, dokumen, dan kronologi yang konsisten. Karena itu, penyusunan narasi perkara dan pengumpulan bukti sejak awal akan membantu hakim memahami konteks dan menilai alasan perceraian secara objektif.

Jika para pihak telah sepakat, kesepakatan damai dapat dituangkan dalam perjanjian tertulis yang mencakup hak asuh, nafkah, pembagian aset, serta kewajiban lain. Kesepakatan tertulis memudahkan pelaksanaan putusan dan mengurangi potensi konflik lanjutan. Pengadilan umumnya menghargai kesepakatan yang adil dan tidak merugikan anak.

## Hak Asuh dan Nafkah
Hak asuh anak diputus berdasarkan kepentingan terbaik bagi anak. Pengadilan mempertimbangkan faktor seperti usia anak, kapasitas pengasuhan, stabilitas emosional, serta kemampuan orang tua memenuhi kebutuhan anak. Tidak jarang, pengadilan menetapkan pola pengasuhan bersama agar anak tetap dekat dengan kedua orang tua.

Selain hak asuh, nafkah anak tetap menjadi kewajiban orang tua, khususnya ayah, kecuali ada putusan berbeda. Besaran nafkah disesuaikan dengan kemampuan dan kebutuhan anak. Kesepakatan tertulis mengenai nafkah, jadwal kunjungan, dan pendidikan akan meminimalkan konflik pasca putusan.

## Pembagian Harta Bersama
Harta bersama dibagi menurut kontribusi dan ketentuan hukum yang berlaku. Dokumen seperti buku tabungan, sertifikat, dan bukti pembelian menjadi dasar penilaian. Jika ada perjanjian pranikah atau pascanikah, pengadilan akan menjadikannya rujukan utama dalam menentukan pembagian aset.

Dalam kasus tertentu, aset yang diperoleh sebelum menikah atau yang berasal dari warisan dapat dikategorikan sebagai harta bawaan. Namun pembuktiannya harus jelas melalui dokumen kepemilikan dan riwayat transaksi. Kejelasan kategori aset membantu mencegah sengketa tambahan setelah putusan perceraian.

## Dokumen dan Etika Proses
Dokumen yang umumnya diperlukan meliputi akta nikah, KTP, KK, serta bukti-bukti pendukung alasan perceraian. Semakin lengkap dokumen, semakin jelas posisi hukum Anda. Menjaga komunikasi yang sopan dan fokus pada kepentingan anak akan membantu proses berjalan lebih lancar dan mengurangi tekanan emosional.

## Penutup
Perceraian adalah proses hukum yang memerlukan ketenangan dan strategi yang jelas. Dengan memahami prosedur, hak asuh, dan pembagian harta bersama, Anda dapat mengambil keputusan yang lebih terarah. Pendampingan hukum akan membantu menyiapkan dokumen, menyusun argumen, dan memastikan hak Anda serta anak terlindungi.', '## Legal Route Options
In Indonesia, divorce can only be decided through court. Muslim spouses file cases at the Religious Court, while non-Muslim spouses file at the District Court. The court will assess the reasons for divorce, mediation process, and evidence before issuing a decision.

Mediation is a mandatory stage in divorce cases. Its purpose is to give the parties an opportunity to reconcile or agree on the fairest solution. Although it does not always succeed, mediation helps reduce conflict and creates room to arrange custody, support, and division of marital assets.

Reasons for divorce must be legally proven, for example continuous conflict, violence, or abandonment. The court assesses evidence through witnesses, documents, and consistent chronology. Therefore, preparing the case narrative and collecting evidence early will help the judge understand the context and evaluate the reasons objectively.

If the parties have reached agreement, the settlement can be written in an agreement covering custody, support, asset division, and other obligations. A written agreement makes decision implementation easier and reduces potential future conflict. Courts generally respect agreements that are fair and do not harm the child.

## Custody and Child Support
Child custody is decided based on the best interests of the child. Courts consider factors such as the child age, caregiving capacity, emotional stability, and parents ability to meet the child needs. In some cases, courts set shared parenting arrangements so the child remains close to both parents.

In addition to custody, child support remains a parental obligation, particularly for the father unless the decision states otherwise. The support amount is adjusted to ability and the child needs. Written agreements on support, visitation schedules, and education help minimize post-decision conflict.

## Division of Marital Assets
Marital assets are divided according to contribution and applicable legal provisions. Documents such as bank books, certificates, and purchase evidence become the basis for assessment. If there is a prenuptial or postnuptial agreement, the court will use it as the main reference in determining asset division.

In certain cases, assets acquired before marriage or received through inheritance may be categorized as separate property. However, this must be clearly proven through ownership documents and transaction history. Clear asset categorization helps prevent additional disputes after the divorce decision.

## Documents and Process Ethics
Commonly required documents include marriage certificate, identity card, family card, and supporting evidence for divorce grounds. The more complete the documents, the clearer your legal position. Maintaining polite communication and focusing on the child interests will help the process run more smoothly and reduce emotional pressure.

## Closing
Divorce is a legal process that requires calm and a clear strategy. By understanding procedure, custody, and marital asset division, you can make more focused decisions. Legal assistance helps prepare documents, build arguments, and ensure your rights and the child rights are protected.', 'Hukum Keluarga', 'Family Law', array['perceraian', 'hak asuh', 'hukum keluarga']::text[], array['divorce', 'custody', 'family law']::text[], '{}'::text[], '{}'::text[], '[]'::jsonb, '[]'::jsonb, '/images/articles/artikel-hukum-keluarga.jpg', null, 'Tim Redaksi Raya Law Firm', 'Raya Law Firm Editorial Team', 'Perceraian dan Hak Asuh Anak | Raya Law Firm', 'Divorce and Child Custody | Raya Law Firm', 'Panduan prosedur perceraian, hak asuh anak, dan pembagian harta bersama agar proses hukum berjalan jelas dan terarah.', 'Guide to divorce procedure, child custody, and marital asset division so the legal process runs clearly and properly.', false, true, '2026-05-16T01:00:00.000Z'::timestamptz, '2026-05-16T01:00:00.000Z'::timestamptz, '2026-05-16T01:00:00.000Z'::timestamptz),
  ('due-diligence-bisnis-checklist-hukum-sebelum-akuisisi', 'Due Diligence Bisnis: Checklist Hukum Sebelum Akuisisi', 'Business Due Diligence: Legal Checklist Before Acquisition', 'Due diligence hukum membantu mengungkap risiko tersembunyi sebelum akuisisi. Pelajari tujuan, dokumen kunci, dan cara menegosiasikan temuan penting.', 'Legal due diligence helps reveal hidden risks before an acquisition. Learn the purpose, key documents, and how to negotiate important findings.', '## Tujuan Due Diligence Hukum
Due diligence hukum adalah proses menilai kondisi legal suatu perusahaan sebelum transaksi akuisisi atau investasi. Tujuannya bukan hanya memeriksa kelengkapan dokumen, tetapi juga mengidentifikasi risiko tersembunyi yang dapat memengaruhi valuasi dan struktur transaksi. Dengan due diligence, pihak pembeli dapat mengambil keputusan yang lebih tepat dan menegosiasikan perlindungan yang memadai.

Selain menilai risiko, due diligence membantu memastikan kepatuhan perusahaan terhadap regulasi. Ketidakpatuhan terhadap perizinan, ketenagakerjaan, atau perpajakan dapat berdampak pada nilai transaksi dan bahkan memicu sanksi. Karena itu, proses ini menjadi langkah strategis yang tidak boleh diabaikan.

## Checklist Dokumen Kunci
Dokumen korporasi menjadi titik awal, termasuk akta pendirian, perubahan anggaran dasar, struktur pemegang saham, dan keputusan RUPS. Periksa juga perizinan usaha, daftar aset utama, serta kontrak jangka panjang dengan pelanggan atau pemasok. Dokumen ini memberikan gambaran tentang legitimasi dan stabilitas bisnis.

Dokumen ketenagakerjaan seperti perjanjian kerja, PP atau PKB, serta data sengketa yang sedang berjalan juga harus ditelaah. Untuk perusahaan yang memiliki aset properti, verifikasi sertifikat dan status hukum tanah menjadi krusial. Jika terdapat kekayaan intelektual, pastikan pendaftarannya sah dan tidak sedang dalam sengketa.

Proses due diligence yang baik membutuhkan data room yang terstruktur dan timeline yang jelas. Menentukan batas materialitas membantu fokus pada isu yang benar-benar berdampak pada nilai transaksi, bukan sekadar temuan administratif. Dengan daftar pertanyaan yang rapi, tim dapat menghemat waktu sekaligus menjaga kualitas analisis.

Laporan due diligence sebaiknya ringkas namun tajam, memuat ringkasan risiko, rekomendasi mitigasi, dan daftar tindakan prioritas. Struktur laporan memudahkan pengambil keputusan memahami konsekuensi hukum secara cepat.

Setelah temuan disepakati, pastikan rencana perbaikan pasca transaksi tercatat, termasuk pembaruan izin, konsolidasi kontrak, atau perbaikan kebijakan internal. Post-closing covenant ini penting agar risiko yang teridentifikasi benar-benar ditangani dan tidak menimbulkan sengketa baru.

## Temuan Kritis dan Negosiasi
Temuan due diligence dapat diklasifikasikan sebagai risiko rendah, sedang, atau tinggi. Risiko tinggi biasanya terkait sengketa besar, pelanggaran izin, atau kewajiban yang belum dicatat. Temuan ini harus diterjemahkan menjadi syarat transaksi, seperti penyesuaian harga, pembayaran bertahap, atau kewajiban perbaikan sebelum closing.

Dalam negosiasi, klausul warranty dan indemnity menjadi alat perlindungan utama. Pembeli dapat meminta jaminan kebenaran atas data yang diberikan dan kompensasi jika temuan tersembunyi muncul setelah transaksi. Pengaturan escrow atau holdback sering digunakan untuk menahan sebagian pembayaran hingga risiko utama terselesaikan.

## Penutup
Due diligence hukum memberikan peta risiko yang realistis dan membantu memastikan akuisisi berjalan aman. Dengan checklist yang tepat dan analisis yang mendalam, Anda dapat menghindari kejutan yang merugikan pasca transaksi. Pendampingan profesional akan membantu menyusun strategi negosiasi dan struktur transaksi yang paling sesuai dengan kepentingan bisnis Anda.', '## Purpose of Legal Due Diligence
Legal due diligence is the process of assessing a company legal condition before an acquisition or investment transaction. The purpose is not only to check document completeness, but also to identify hidden risks that may affect valuation and transaction structure. With due diligence, a buyer can make more accurate decisions and negotiate adequate protection.

In addition to assessing risks, due diligence helps ensure the company complies with regulations. Non-compliance in licensing, employment, or taxation can affect transaction value and even trigger sanctions. Therefore, this process is a strategic step that should not be ignored.

## Key Document Checklist
Corporate documents are the starting point, including deed of establishment, amendments to articles of association, shareholder structure, and shareholders meeting resolutions. Review business licenses, lists of major assets, and long-term contracts with customers or suppliers. These documents provide a picture of business legitimacy and stability.

Employment documents such as employment agreements, company regulations or collective labor agreements, and ongoing dispute data must also be reviewed. For companies that own property assets, certificate verification and land legal status are crucial. If there is intellectual property, make sure it is validly registered and not under dispute.

A good due diligence process needs a structured data room and clear timeline. Setting materiality thresholds helps focus on issues that truly affect transaction value, not merely administrative findings. With a clear question list, the team can save time while preserving analysis quality.

The due diligence report should be concise but sharp, containing a risk summary, mitigation recommendations, and a list of priority actions. This structure helps decision makers quickly understand legal consequences.

After findings are agreed, ensure the post-transaction remediation plan is recorded, including license renewals, contract consolidation, or internal policy improvements. These post-closing covenants are important so identified risks are actually addressed and do not create new disputes.

## Critical Findings and Negotiation
Due diligence findings can be classified as low, medium, or high risk. High risks usually involve major disputes, licensing violations, or unrecorded liabilities. These findings should be translated into transaction conditions, such as price adjustment, staged payment, or obligations to remedy before closing.

In negotiation, warranty and indemnity clauses are key protection tools. Buyers may request assurances about the accuracy of disclosed data and compensation if hidden findings emerge after the transaction. Escrow or holdback arrangements are often used to retain part of the payment until major risks are resolved.

## Closing
Legal due diligence provides a realistic risk map and helps ensure an acquisition runs safely. With the right checklist and deep analysis, you can avoid costly surprises after the transaction. Professional assistance helps prepare negotiation strategies and transaction structures that best fit your business interests.', 'Hukum Bisnis', 'Business Law', array['due diligence', 'akuisisi', 'hukum bisnis']::text[], array['due diligence', 'acquisition', 'business law']::text[], '{}'::text[], '{}'::text[], '[]'::jsonb, '[]'::jsonb, '/images/articles/artikel-hukum-bisnis.jpg', null, 'Tim Redaksi Raya Law Firm', 'Raya Law Firm Editorial Team', 'Due Diligence Bisnis Sebelum Akuisisi | Raya Law Firm', 'Business Due Diligence Before Acquisition | Raya Law Firm', 'Panduan due diligence hukum untuk akuisisi, termasuk checklist dokumen, identifikasi risiko, dan strategi negosiasi.', 'Legal due diligence guide for acquisition, including document checklist, risk identification, and negotiation strategy.', true, true, '2026-05-18T01:00:00.000Z'::timestamptz, '2026-05-18T01:00:00.000Z'::timestamptz, '2026-05-18T01:00:00.000Z'::timestamptz)
on conflict (slug) do nothing;
