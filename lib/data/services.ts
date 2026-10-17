export interface ServiceProcessStep {
  title: string;
  desc: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: 'pidana' | 'perdata' | 'bisnis' | 'keluarga' | 'properti' | 'ketenagakerjaan' | 'ptun';
  highlights: string[];
  process: ServiceProcessStep[];
  faq: ServiceFaq[];
  metaTitle: string;
  metaDesc: string;
}

export const services: Service[] = [
  {
    slug: 'hukum-pidana',
    title: 'Hukum Pidana',
    shortDesc:
      'Pendampingan pidana menyeluruh dari penyelidikan hingga persidangan dengan strategi pembelaan terukur.',
    fullDesc: `Pendampingan pidana menuntut ketepatan langkah sejak tahap penyelidikan. Kami memastikan hak klien terlindungi, memeriksa legalitas tindakan penyidik, dan menyiapkan respons awal agar posisi hukum tetap kuat. Setiap tindakan di tahap awal akan berdampak pada jalannya proses berikutnya.

Tim kami menyusun strategi pembelaan berbasis fakta, bukti, dan analisis yuridis. Kami mendampingi pemeriksaan saksi dan tersangka, menyusun eksepsi, menguji alat bukti, hingga mengajukan upaya hukum banding, kasasi, dan peninjauan kembali.

Selain pembelaan, kami memberikan advis kepatuhan dan mitigasi risiko bagi individu maupun korporasi agar potensi perkara pidana dapat dicegah lebih dini.`,
    icon: 'pidana',
    highlights: [
      'Pendampingan sejak tahap penyelidikan dan penyidikan',
      'Strategi pembelaan berbasis analisis bukti',
      'Pendampingan pemeriksaan saksi dan tersangka',
      'Upaya hukum banding, kasasi, dan PK',
      'Mitigasi risiko pidana korporasi',
    ],
    process: [
      {
        title: 'Konsultasi Awal',
        desc: 'Memetakan kronologi perkara, status proses, dan kebutuhan mendesak klien.',
      },
      {
        title: 'Telaah Berkas',
        desc: 'Mengkaji BAP, surat panggilan, alat bukti, dan posisi hukum para pihak.',
      },
      {
        title: 'Strategi Pembelaan',
        desc: 'Menentukan pendekatan litigasi, daftar saksi, dan argumen hukum utama.',
      },
      {
        title: 'Pendampingan Proses',
        desc: 'Mendampingi pemeriksaan, persidangan, serta koordinasi ahli yang diperlukan.',
      },
      {
        title: 'Evaluasi Putusan',
        desc: 'Menilai putusan dan menyiapkan upaya hukum lanjutan bila dibutuhkan.',
      },
    ],
    faq: [
      {
        question: 'Kapan sebaiknya menghubungi pengacara pidana?',
        answer:
          'Sejak ada panggilan resmi, indikasi pemeriksaan, atau laporan polisi, karena pendampingan dini membantu menjaga hak dan strategi pembelaan.',
      },
      {
        question: 'Apakah pendampingan bisa dilakukan sejak penyelidikan?',
        answer:
          'Bisa. Kami dapat hadir pada tahap penyelidikan untuk memastikan prosedur berjalan sesuai hukum dan melindungi posisi klien.',
      },
      {
        question: 'Bagaimana penentuan biaya pendampingan pidana?',
        answer:
          'Biaya ditentukan berdasarkan kompleksitas perkara, tahap proses, dan kebutuhan pendampingan. Kami menyusun skema transparan sejak awal.',
      },
      {
        question: 'Apakah menangani perkara pidana korporasi?',
        answer:
          'Ya. Kami menangani perkara pidana yang melibatkan entitas bisnis, termasuk koordinasi internal, kepatuhan, dan komunikasi strategis.',
      },
    ],
    metaTitle: 'Pengacara Pidana Jakarta & Pembelaan Perkara | Raya Law Firm',
    metaDesc:
      'Pengacara pidana di Jakarta untuk pendampingan sejak penyelidikan, penyidikan, hingga persidangan dan upaya hukum. Konsultasi cepat via WhatsApp.',
  },
  {
    slug: 'hukum-perdata',
    title: 'Hukum Perdata',
    shortDesc:
      'Penyelesaian sengketa perdata, kontrak, dan ganti rugi dengan pendekatan litigasi dan negosiasi yang seimbang.',
    fullDesc: `Sengketa perdata sering berakar dari kontrak, perjanjian kerja sama, atau hubungan bisnis yang tidak berjalan semestinya. Kami membantu klien merumuskan posisi hukum yang jelas, menilai kekuatan bukti, dan menyusun strategi penyelesaian yang realistis.

Pendekatan kami mengutamakan efisiensi melalui negosiasi dan mediasi, namun tetap siap melakukan litigasi bila dibutuhkan. Kami menangani gugatan wanprestasi, perbuatan melawan hukum, sengketa perikatan, dan klaim ganti rugi secara komprehensif.

Kami juga membantu penyusunan dan review kontrak agar risiko sengketa dapat diminimalkan sejak awal serta memberikan kepastian hukum bagi klien.`,
    icon: 'perdata',
    highlights: [
      'Gugatan wanprestasi dan perbuatan melawan hukum',
      'Penyusunan dan review kontrak bisnis',
      'Negosiasi, mediasi, dan arbitrase',
      'Strategi pembuktian dan penguatan dokumen',
      'Penyelesaian sengketa dengan efisiensi waktu',
    ],
    process: [
      {
        title: 'Asesmen Awal',
        desc: 'Mengidentifikasi akar sengketa, posisi para pihak, dan tujuan klien.',
      },
      {
        title: 'Analisis Dokumen',
        desc: 'Menelaah perjanjian, korespondensi, dan bukti transaksi secara detail.',
      },
      {
        title: 'Opsi Penyelesaian',
        desc: 'Menyusun rute negosiasi, mediasi, atau litigasi yang paling efektif.',
      },
      {
        title: 'Implementasi Strategi',
        desc: 'Menjalankan langkah penyelesaian, termasuk penyusunan gugatan bila perlu.',
      },
      {
        title: 'Evaluasi Hasil',
        desc: 'Menilai hasil akhir dan mengamankan pelaksanaan putusan atau kesepakatan.',
      },
    ],
    faq: [
      {
        question: 'Apakah sengketa perdata selalu harus ke pengadilan?',
        answer:
          'Tidak. Banyak sengketa dapat diselesaikan melalui negosiasi atau mediasi bila para pihak terbuka untuk solusi yang adil.',
      },
      {
        question: 'Dokumen apa yang perlu disiapkan?',
        answer:
          'Kontrak, bukti pembayaran, korespondensi, dan dokumen pendukung lainnya yang relevan dengan hubungan hukum para pihak.',
      },
      {
        question: 'Berapa lama proses gugatan perdata?',
        answer:
          'Durasi bervariasi tergantung kompleksitas perkara, jumlah pihak, dan proses pembuktian di persidangan.',
      },
      {
        question: 'Apakah bisa menagih ganti rugi immateriil?',
        answer:
          'Bisa, selama ada dasar hukum dan bukti kerugian yang dapat dipertanggungjawabkan di persidangan.',
      },
    ],
    metaTitle: 'Pengacara Perdata Jakarta & Sengketa Kontrak | Raya Law Firm',
    metaDesc:
      'Pengacara perdata di Jakarta untuk gugatan wanprestasi, perbuatan melawan hukum, hutang piutang, dan sengketa kontrak melalui negosiasi, mediasi, atau litigasi.',
  },
  {
    slug: 'hukum-bisnis',
    title: 'Hukum Bisnis & Korporat',
    shortDesc:
      'Pendampingan hukum korporasi dari pendirian usaha, kepatuhan, hingga transaksi bisnis strategis.',
    fullDesc: `Kami mendampingi korporasi dalam membangun fondasi hukum yang sehat, mulai dari pendirian badan usaha, penyusunan struktur permodalan, hingga penyelarasan tata kelola. Setiap keputusan bisnis memiliki konsekuensi hukum yang perlu dipetakan sejak awal.

Tim kami berpengalaman dalam due diligence, drafting kontrak komersial, serta pendampingan transaksi seperti investasi, akuisisi, dan kerja sama strategis. Pendekatan kami menyeimbangkan kebutuhan bisnis dengan kepatuhan hukum yang ketat.

Dengan pemahaman industri yang kuat, kami membantu klien mengelola risiko, menjaga kepatuhan, serta memastikan setiap transaksi terlindungi secara hukum.`,
    icon: 'bisnis',
    highlights: [
      'Pendirian PT, CV, dan perubahan anggaran dasar',
      'Due diligence untuk investasi dan akuisisi',
      'Kontrak bisnis, MoU, dan perjanjian vendor',
      'Kepatuhan korporasi dan tata kelola',
      'Pendampingan negosiasi transaksi strategis',
    ],
    process: [
      {
        title: 'Pemahaman Kebutuhan Bisnis',
        desc: 'Menggali model usaha, tujuan transaksi, dan risiko yang dihadapi.',
      },
      {
        title: 'Audit Legal',
        desc: 'Memeriksa dokumen korporasi, izin, dan kepatuhan internal perusahaan.',
      },
      {
        title: 'Strukturisasi & Drafting',
        desc: 'Menyusun struktur transaksi serta dokumen kontraktual yang aman.',
      },
      {
        title: 'Negosiasi & Implementasi',
        desc: 'Mendampingi negosiasi dan memastikan pelaksanaan sesuai kesepakatan.',
      },
      {
        title: 'Monitoring Kepatuhan',
        desc: 'Meninjau kepatuhan pasca-transaksi dan pembaruan dokumen legal.',
      },
    ],
    faq: [
      {
        question: 'Apakah perlu due diligence untuk investasi minoritas?',
        answer:
          'Tetap disarankan, karena hak minoritas, kewajiban tersembunyi, dan risiko hukum bisa berdampak pada nilai investasi.',
      },
      {
        question: 'Berapa lama proses pendirian PT?',
        answer:
          'Bergantung pada kesiapan dokumen dan perizinan, namun kami mempercepat proses dengan alur yang terstruktur.',
      },
      {
        question: 'Apakah membantu penyusunan SOP kepatuhan?',
        answer:
          'Ya. Kami membantu merancang SOP, kebijakan internal, dan pelatihan kepatuhan untuk tim klien.',
      },
      {
        question: 'Bisakah mendampingi negosiasi kontrak vendor?',
        answer:
          'Bisa. Kami menilai risiko, menyusun posisi tawar, dan memastikan klausul utama melindungi klien.',
      },
    ],
    metaTitle: 'Konsultan Hukum Bisnis & Korporat Jakarta | Raya Law Firm',
    metaDesc:
      'Konsultan hukum bisnis di Jakarta: pendirian PT, due diligence, kontrak komersial, kepatuhan korporasi, serta pendampingan investasi dan akuisisi.',
  },
  {
    slug: 'hukum-keluarga',
    title: 'Hukum Keluarga',
    shortDesc:
      'Pendampingan sensitif dan profesional dalam perkara perceraian, hak asuh, waris, dan hibah.',
    fullDesc: `Perkara keluarga membutuhkan pendekatan yang tegas namun tetap empatik. Kami membantu klien menavigasi proses perceraian, pembagian harta bersama, hingga sengketa hak asuh anak dengan mengutamakan kepastian hukum dan perlindungan kepentingan terbaik.

Kami juga menangani sengketa waris dan hibah, termasuk perencanaan pembagian aset keluarga agar tidak menimbulkan konflik di kemudian hari. Setiap langkah kami rancang secara terukur agar proses berjalan efektif dan bermartabat.

Pendekatan kami menempatkan komunikasi yang jelas sebagai prioritas, sehingga klien memahami hak dan kewajiban hukumnya di setiap tahap.`,
    icon: 'keluarga',
    highlights: [
      'Perceraian dan pembagian harta bersama',
      'Hak asuh anak dan nafkah',
      'Sengketa waris dan hibah keluarga',
      'Perjanjian pranikah dan pascanikah',
      'Mediasi keluarga dengan pendekatan empatik',
    ],
    process: [
      {
        title: 'Konsultasi Rahasia',
        desc: 'Mendengarkan masalah keluarga secara aman dan rahasia.',
      },
      {
        title: 'Pemetaan Hak & Kewajiban',
        desc: 'Menjelaskan posisi hukum terkait harta bersama, hak asuh, dan nafkah.',
      },
      {
        title: 'Rencana Penyelesaian',
        desc: 'Menyusun strategi mediasi atau litigasi sesuai kebutuhan klien.',
      },
      {
        title: 'Pendampingan Proses',
        desc: 'Mendampingi sidang, mediasi, serta penyusunan kesepakatan.',
      },
      {
        title: 'Finalisasi & Implementasi',
        desc: 'Mengawal pelaksanaan putusan dan pengurusan administrasi terkait.',
      },
    ],
    faq: [
      {
        question: 'Apakah perceraian harus selalu melalui pengadilan?',
        answer:
          'Ya, perceraian di Indonesia diputus oleh pengadilan sesuai agama dan peraturan yang berlaku.',
      },
      {
        question: 'Bagaimana menentukan hak asuh anak?',
        answer:
          'Hak asuh diputus berdasarkan kepentingan terbaik anak dengan mempertimbangkan kondisi orang tua dan anak.',
      },
      {
        question: 'Bisakah membuat perjanjian pranikah setelah menikah?',
        answer:
          'Bisa melalui perjanjian pascanikah yang disahkan sesuai prosedur hukum.',
      },
      {
        question: 'Apakah kami dapat membantu mediasi keluarga?',
        answer:
          'Ya. Kami menyediakan pendampingan mediasi untuk mencapai kesepakatan yang adil dan berkelanjutan.',
      },
    ],
    metaTitle: 'Pengacara Perceraian & Hukum Keluarga Jakarta | Raya Law Firm',
    metaDesc:
      'Pengacara keluarga di Jakarta untuk perceraian, harta bersama, hak asuh anak, waris, hibah, dan perjanjian pranikah dengan pendekatan empatik dan rahasia.',
  },
  {
    slug: 'hukum-properti',
    title: 'Hukum Properti & Pertanahan',
    shortDesc:
      'Pendampingan transaksi dan sengketa properti serta pertanahan dengan verifikasi dokumen menyeluruh.',
    fullDesc: `Sengketa properti dan pertanahan seringkali kompleks karena melibatkan riwayat kepemilikan, data di BPN, dan transaksi berlapis. Kami membantu klien melakukan verifikasi dokumen, memastikan status hak, serta menghindari risiko sertifikat ganda.

Dalam transaksi, kami menyiapkan perjanjian jual beli, AJB, dan dokumen pendukung agar proses berjalan aman. Kami juga menangani sengketa batas tanah, pembatalan sertifikat, dan perlindungan aset properti.

Pendekatan kami mengutamakan kejelasan status hukum aset serta penyelesaian yang efisien agar nilai properti klien tetap terjaga.`,
    icon: 'properti',
    highlights: [
      'Due diligence dokumen pertanahan',
      'Penyelesaian sengketa batas dan kepemilikan',
      'Pendampingan AJB dan transaksi properti',
      'Pengurusan pembatalan sertifikat bermasalah',
      'Perlindungan aset dan negosiasi kompensasi',
    ],
    process: [
      {
        title: 'Pemeriksaan Awal',
        desc: 'Mengidentifikasi objek tanah, riwayat kepemilikan, dan risiko sengketa.',
      },
      {
        title: 'Verifikasi Dokumen',
        desc: 'Memastikan keabsahan sertifikat, peta bidang, dan dokumen pendukung.',
      },
      {
        title: 'Strategi Penyelesaian',
        desc: 'Menyusun langkah mediasi, negosiasi, atau litigasi sesuai kasus.',
      },
      {
        title: 'Pendampingan Proses',
        desc: 'Mendampingi transaksi atau persidangan hingga sengketa terselesaikan.',
      },
      {
        title: 'Pengamanan Aset',
        desc: 'Memastikan hak klien terlindungi dan dokumen terbarukan.',
      },
    ],
    faq: [
      {
        question: 'Bagaimana memastikan sertifikat tidak bermasalah?',
        answer:
          'Melalui pengecekan ke BPN, verifikasi peta bidang, dan penelusuran riwayat hak secara menyeluruh.',
      },
      {
        question: 'Apakah sengketa tanah bisa diselesaikan di luar pengadilan?',
        answer:
          'Bisa melalui mediasi atau musyawarah. Namun jika tidak tercapai, litigasi menjadi opsi terakhir.',
      },
      {
        question: 'Apakah kami membantu transaksi properti komersial?',
        answer:
          'Ya. Kami mendampingi transaksi properti residensial maupun komersial, termasuk review kontrak.',
      },
      {
        question: 'Apakah bisa mengurus pembatalan sertifikat?',
        answer:
          'Bisa, dengan dasar yang kuat dan prosedur sesuai aturan pertanahan dan peradilan tata usaha.',
      },
    ],
    metaTitle: 'Pengacara Sengketa Tanah & Properti Jakarta | Raya Law Firm',
    metaDesc:
      'Pengacara sengketa tanah dan properti di Jakarta: verifikasi sertifikat, sertifikat ganda, sengketa batas, pembatalan sertifikat, serta pendampingan AJB.',
  },
  {
    slug: 'hukum-ketenagakerjaan',
    title: 'Hukum Ketenagakerjaan',
    shortDesc:
      'Advokasi hubungan industrial, penyusunan perjanjian kerja, hingga penanganan PHK secara berimbang.',
    fullDesc: `Hubungan industrial yang sehat memerlukan kepastian hukum bagi perusahaan dan pekerja. Kami membantu menyusun perjanjian kerja, peraturan perusahaan, hingga kebijakan internal yang sesuai dengan regulasi ketenagakerjaan.

Dalam sengketa, kami mendampingi proses bipartit, mediasi, hingga persidangan di Pengadilan Hubungan Industrial. Pendekatan kami menyeimbangkan kepentingan bisnis dengan perlindungan hak pekerja.

Kami juga menangani aspek kepatuhan, audit ketenagakerjaan, dan mitigasi risiko agar keputusan manajemen dapat dipertanggungjawabkan secara hukum.`,
    icon: 'ketenagakerjaan',
    highlights: [
      'Penyusunan perjanjian kerja dan PP/PKB',
      'Pendampingan bipartit dan mediasi',
      'Strategi penanganan PHK dan pesangon',
      'Audit kepatuhan ketenagakerjaan',
      'Advokasi di Pengadilan Hubungan Industrial',
    ],
    process: [
      {
        title: 'Audit Ketenagakerjaan',
        desc: 'Menilai kepatuhan perusahaan terhadap regulasi dan kontrak kerja.',
      },
      {
        title: 'Penyusunan Dokumen',
        desc: 'Menyusun atau memperbarui peraturan perusahaan dan PKB.',
      },
      {
        title: 'Manajemen Sengketa',
        desc: 'Menangani bipartit, mediasi, hingga persidangan bila diperlukan.',
      },
      {
        title: 'Pendampingan Implementasi',
        desc: 'Mengarahkan eksekusi keputusan manajemen sesuai prosedur hukum.',
      },
      {
        title: 'Evaluasi & Perbaikan',
        desc: 'Menyusun perbaikan kebijakan untuk mencegah sengketa berulang.',
      },
    ],
    faq: [
      {
        question: 'Apakah perusahaan wajib memiliki peraturan perusahaan?',
        answer:
          'Ya, perusahaan dengan jumlah pekerja tertentu wajib memiliki PP atau PKB yang disahkan sesuai ketentuan.',
      },
      {
        question: 'Apa langkah pertama saat sengketa ketenagakerjaan?',
        answer:
          'Langkah awal adalah perundingan bipartit untuk mencari solusi tanpa litigasi.',
      },
      {
        question: 'Bagaimana menghitung pesangon?',
        answer:
          'Pesangon dihitung berdasarkan masa kerja dan komponen hak sesuai regulasi yang berlaku.',
      },
      {
        question: 'Apakah pekerja bisa menggugat PHK sepihak?',
        answer:
          'Bisa. Pekerja dapat mengajukan gugatan ke Pengadilan Hubungan Industrial jika prosedur tidak dipenuhi.',
      },
    ],
    metaTitle: 'Pengacara Ketenagakerjaan & PHK Jakarta | Raya Law Firm',
    metaDesc:
      'Pengacara ketenagakerjaan di Jakarta untuk perusahaan dan pekerja: PHK, pesangon, perjanjian kerja, PP/PKB, bipartit, hingga Pengadilan Hubungan Industrial.',
  },
  {
    slug: 'hukum-ptun',
    title: 'Hukum Peradilan Tata Usaha Negara (PTUN)',
    shortDesc:
      'Pendampingan hukum untuk pengujian dan pembatalan Keputusan Tata Usaha Negara (KTUN) yang merugikan.',
    fullDesc: `Sengketa Tata Usaha Negara (TUN) terjadi ketika keputusan pejabat atau badan publik merugikan kepentingan individu maupun badan hukum. Kami mendampingi klien dalam menguji keabsahan Keputusan Tata Usaha Negara (KTUN) agar keadilan administratif dapat ditegakkan.

Tim kami berpengalaman dalam menyusun gugatan pembatalan keputusan pejabat pemerintah, sengketa kepegawaian (seperti sengketa ASN), perizinan, hingga sengketa pertanahan yang masuk ranah PTUN. Kami menganalisis secara mendalam apakah suatu keputusan bertentangan dengan peraturan perundang-undangan atau melanggar Asas-Asas Umum Pemerintahan yang Baik (AUPB).

Dengan pendekatan yang teliti dan argumentasi hukum yang kuat, kami memastikan hak klien sebagai warga negara atau pelaku usaha tetap terlindungi dari penyalahgunaan wewenang administrasi.`,
    icon: 'ptun',
    highlights: [
      'Gugatan pembatalan Keputusan Tata Usaha Negara (KTUN)',
      'Penanganan sengketa kepegawaian (PNS/ASN)',
      'Sengketa pencabutan atau penolakan perizinan usaha',
      'Pengujian Asas-Asas Umum Pemerintahan yang Baik (AUPB)',
      'Sengketa administratif terkait hak atas tanah',
    ],
    process: [
      {
        title: 'Asesmen Kasus & Legal Standing',
        desc: 'Mengkaji Keputusan TUN yang disengketakan serta memastikan klien memiliki kedudukan hukum untuk menggugat.',
      },
      {
        title: 'Upaya Administratif',
        desc: 'Mendampingi proses pengajuan keberatan atau banding administratif ke atasan instansi sebelum melangkah ke pengadilan.',
      },
      {
        title: 'Penyusunan Gugatan',
        desc: 'Merumuskan dalil gugatan secara presisi berdasarkan cacat wewenang, prosedur, maupun substansi.',
      },
      {
        title: 'Proses Persidangan',
        desc: 'Mewakili klien dalam pembuktian, pemeriksaan saksi, hingga pengajuan kesimpulan di sidang PTUN.',
      },
      {
        title: 'Pengawalan Eksekusi',
        desc: 'Memastikan putusan pembatalan atau pencabutan KTUN dilaksanakan oleh Pejabat Tata Usaha Negara terkait.',
      },
    ],
    faq: [
      {
        question: 'Apa yang dimaksud dengan Keputusan Tata Usaha Negara (KTUN)?',
        answer:
          'KTUN adalah penetapan tertulis oleh pejabat administrasi negara yang bersifat konkret, individual, dan final, serta menimbulkan akibat hukum.',
      },
      {
        question: 'Apakah ada batas waktu untuk mengajukan gugatan ke PTUN?',
        answer:
          'Ya, gugatan harus diajukan dalam tenggang waktu 90 hari sejak diterimanya atau diumumkannya KTUN tersebut.',
      },
      {
        question: 'Apakah saya bisa langsung menggugat ke PTUN tanpa lapor ke instansi terkait?',
        answer:
          'Tergantung aturannya. Untuk banyak jenis sengketa, undang-undang mewajibkan penempuhan upaya administratif (keberatan/banding) terlebih dahulu sebelum mendaftar gugatan ke PTUN.',
      },
      {
        question: 'Apakah PTUN berwenang mengadili sengketa kontrak kerja sama dengan pemerintah?',
        answer:
          'Tidak selalu. Jika sengketanya murni keperdataan (wanprestasi kontrak), hal tersebut masuk yurisdiksi Pengadilan Negeri. PTUN hanya mengadili keputusan yang bersifat administratif sebelah pihak (sepihak).',
      },
    ],
    metaTitle: 'Pengacara PTUN Jakarta & Gugatan KTUN | Raya Law Firm',
    metaDesc:
      'Pengacara PTUN di Jakarta untuk gugatan pembatalan KTUN, sengketa perizinan, sengketa kepegawaian ASN, serta upaya administratif sebelum ke pengadilan.',
  },
];

/**
 * Data SEO per layanan (tidak ikut diterjemahkan, sehingga Service tetap kompatibel).
 * - keywords     : kata kunci meta (Bahasa Indonesia, sesuai pola pencarian Google).
 * - practitioner : sebutan praktisi untuk label halaman.
 * - serviceType  : nilai schema.org Service.serviceType.
 * - matchTerms   : kata pencocok (huruf kecil, tanpa diakritik) untuk artikel & advokat terkait.
 */
export interface ServiceSeo {
  keywords: string[];
  practitioner: { id: string; en: string };
  serviceType: string;
  matchTerms: string[];
}

export const serviceSeo: Record<string, ServiceSeo> = {
  'hukum-pidana': {
    keywords: [
      'pengacara pidana jakarta',
      'pengacara pidana',
      'advokat pidana jakarta',
      'konsultan hukum pidana',
      'pendampingan kasus pidana',
      'konsultasi hukum pidana online',
    ],
    practitioner: { id: 'Pengacara Pidana', en: 'Criminal Defense Lawyer' },
    serviceType: 'Pendampingan hukum pidana',
    matchTerms: ['pidana', 'criminal', 'kriminal', 'penyidikan', 'penyelidikan'],
  },
  'hukum-perdata': {
    keywords: [
      'pengacara perdata jakarta',
      'pengacara perdata',
      'konsultan hukum perdata',
      'pengacara wanprestasi',
      'pengacara hutang piutang',
      'gugatan perdata',
    ],
    practitioner: { id: 'Pengacara Perdata', en: 'Civil Litigation Lawyer' },
    serviceType: 'Penyelesaian sengketa perdata',
    matchTerms: [
      'perdata',
      'civil',
      'litigasi',
      'litigation',
      'wanprestasi',
      'kontrak',
      'contract',
      'perjanjian',
      'agreement',
      'hutang',
      'utang',
      'piutang',
      'debt',
      'ganti rugi',
    ],
  },
  'hukum-bisnis': {
    keywords: [
      'konsultan hukum bisnis jakarta',
      'pengacara bisnis jakarta',
      'corporate lawyer jakarta',
      'konsultan hukum perusahaan',
      'legal due diligence',
      'jasa pendirian pt',
    ],
    practitioner: { id: 'Konsultan Hukum Bisnis', en: 'Corporate Lawyer' },
    serviceType: 'Konsultasi hukum bisnis dan korporasi',
    matchTerms: [
      'bisnis',
      'business',
      'korporat',
      'korporasi',
      'corporate',
      'perusahaan',
      'company',
      'due diligence',
      'akuisisi',
      'acquisition',
      'legal drafting',
      'legal risk',
      'kontrak',
      'contract',
      'kepatuhan',
      'compliance',
    ],
  },
  'hukum-keluarga': {
    keywords: [
      'pengacara perceraian jakarta',
      'pengacara keluarga jakarta',
      'pengacara hak asuh anak',
      'pengacara waris',
      'konsultan hukum keluarga',
      'gugatan cerai',
    ],
    practitioner: { id: 'Pengacara Keluarga & Perceraian', en: 'Family & Divorce Lawyer' },
    serviceType: 'Pendampingan hukum keluarga',
    matchTerms: [
      'keluarga',
      'family',
      'perceraian',
      'cerai',
      'divorce',
      'hak asuh',
      'custody',
      'waris',
      'inheritance',
      'hibah',
      'pranikah',
      'prenuptial',
      'nafkah',
    ],
  },
  'hukum-properti': {
    keywords: [
      'pengacara sengketa tanah jakarta',
      'pengacara sengketa tanah',
      'pengacara properti jakarta',
      'pengacara pertanahan',
      'konsultan hukum properti',
      'sengketa sertifikat ganda',
    ],
    practitioner: { id: 'Pengacara Sengketa Tanah & Properti', en: 'Land & Property Lawyer' },
    serviceType: 'Pendampingan hukum properti dan pertanahan',
    matchTerms: [
      'properti',
      'property',
      'pertanahan',
      'tanah',
      'land',
      'sertifikat',
      'certificate',
      'bpn',
      'agraria',
      'real estate',
    ],
  },
  'hukum-ketenagakerjaan': {
    keywords: [
      'pengacara ketenagakerjaan jakarta',
      'pengacara ketenagakerjaan',
      'pengacara phk',
      'konsultan hukum ketenagakerjaan',
      'pengacara hubungan industrial',
      'konsultasi pesangon',
    ],
    practitioner: { id: 'Pengacara Ketenagakerjaan', en: 'Employment Lawyer' },
    serviceType: 'Pendampingan hukum ketenagakerjaan',
    matchTerms: [
      'ketenagakerjaan',
      'tenaga kerja',
      'employment',
      'labor',
      'labour',
      'phk',
      'pekerja',
      'employee',
      'hubungan industrial',
      'industrial relations',
      'pesangon',
      'severance',
      'termination',
    ],
  },
  'hukum-ptun': {
    keywords: [
      'pengacara ptun jakarta',
      'pengacara ptun',
      'gugatan ptun',
      'pembatalan ktun',
      'sengketa tata usaha negara',
      'pengacara sengketa asn',
    ],
    practitioner: { id: 'Pengacara PTUN', en: 'Administrative Court Lawyer' },
    serviceType: 'Pendampingan sengketa tata usaha negara',
    matchTerms: [
      'ptun',
      'tata usaha negara',
      'ktun',
      'administrative',
      'administrasi negara',
      'asn',
      'kepegawaian',
      'perizinan',
      'licensing',
    ],
  },
};

export function getServiceSeo(slug: string): ServiceSeo | undefined {
  return serviceSeo[slug];
}
