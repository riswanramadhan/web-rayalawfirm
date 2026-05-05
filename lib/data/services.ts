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
  icon: 'pidana' | 'perdata' | 'bisnis' | 'keluarga' | 'properti' | 'ketenagakerjaan';
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
    metaTitle: 'Hukum Pidana | Raya Law Firm',
    metaDesc:
      'Pendampingan hukum pidana profesional dari penyelidikan hingga persidangan dengan strategi pembelaan terukur oleh Raya Law Firm.',
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
    metaTitle: 'Hukum Perdata | Raya Law Firm',
    metaDesc:
      'Solusi sengketa perdata, kontrak, dan ganti rugi dengan strategi negosiasi serta litigasi yang efektif dari Raya Law Firm.',
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
    metaTitle: 'Hukum Bisnis & Korporat | Raya Law Firm',
    metaDesc:
      'Pendampingan hukum korporasi, due diligence, dan transaksi bisnis strategis dengan fokus kepatuhan dan perlindungan risiko.',
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
    metaTitle: 'Hukum Keluarga | Raya Law Firm',
    metaDesc:
      'Pendampingan perkara keluarga yang sensitif dan profesional untuk perceraian, hak asuh, waris, dan hibah.',
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
    metaTitle: 'Hukum Properti & Pertanahan | Raya Law Firm',
    metaDesc:
      'Solusi hukum properti dan pertanahan untuk transaksi aman, verifikasi sertifikat, serta penyelesaian sengketa.',
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
    metaTitle: 'Hukum Ketenagakerjaan | Raya Law Firm',
    metaDesc:
      'Pendampingan hukum ketenagakerjaan untuk perusahaan dan pekerja, dari kepatuhan hingga penyelesaian sengketa.',
  },
];
