import { defaultLocale, type Locale } from './config';

export const dictionaries = {
  id: {
    common: {
      home: 'Beranda',
      about: 'Tentang',
      services: 'Layanan',
      team: 'Tim',
      articles: 'Artikel',
      consultation: 'Konsultasi',
      testimonials: 'Testimoni',
      contact: 'Kontak',
      privacyPolicy: 'Kebijakan Privasi',
      freeConsultation: 'Konsultasi Gratis',
      consultationNow: 'Konsultasi Sekarang',
      whatsappConsultation: 'Konsultasi via WhatsApp',
      consultationForm: 'Form Konsultasi',
      learnMore: 'Pelajari Lebih Lanjut',
      viewAllServices: 'Lihat Semua Layanan',
      viewProfile: 'Lihat Profil',
      contactUs: 'Hubungi Kami',
      contactNow: 'Hubungi Sekarang',
      readArticle: 'Baca Artikel',
      viewAll: 'Lihat Semua',
      previous: 'Sebelumnya',
      next: 'Berikutnya',
      closeMenu: 'Tutup menu',
      toggleMenu: 'Buka/tutup menu',
      languageLabel: 'Ubah bahasa',
      languageSwitchTo: 'Ganti ke bahasa Inggris',
      poweredBy: 'Powered by',
      copyright: 'Copyright 2026 Raya Law Firm. All rights reserved',
      phone: 'Telepon',
      email: 'Email',
      address: 'Alamat',
      operationalHours: 'Jam Operasional',
      mondayFriday: 'Senin - Jumat',
      saturday: 'Sabtu',
      locationIframeTitle: 'Lokasi Kantor Kami di Jakarta Selatan',
      dataSafe: 'Data aman dan rahasia',
      confidentialConsultation: 'Konsultasi rahasia',
      fastResponse: 'Respons cepat dalam 24 jam',
      noHiddenFees: 'Tanpa biaya tersembunyi',
      noConditions: 'Gratis tanpa syarat',
    },
    nav: {
      serviceLinks: {
        criminal: 'Hukum Pidana',
        civil: 'Hukum Perdata',
        business: 'Hukum Bisnis',
        family: 'Hukum Keluarga',
        property: 'Hukum Properti',
        employment: 'Ketenagakerjaan',
        administrative: 'Hukum PTUN',
      },
    },
    footer: {
      description:
        'Raya Law Firm adalah kantor hukum profesional yang menghadirkan layanan litigasi dan konsultasi strategis untuk individu maupun korporasi di Indonesia.',
      services: 'Layanan',
      company: 'Perusahaan',
      contact: 'Kontak',
      team: 'Tim Kami',
      operationalHours: 'Senin - Jumat, 08:00 - 17:00 WIB',
    },
    home: {
      metaTitle: 'Raya Law Firm | Kantor Hukum Profesional Indonesia',
      metaDescription:
        'Raya Law Firm adalah kantor hukum profesional di Indonesia dengan layanan pidana, perdata, bisnis, keluarga, properti, dan ketenagakerjaan. Konsultasi terpercaya untuk kebutuhan hukum Anda.',
      hero: {
        badge: 'Konsultasi Hukum Profesional',
        titleLine: 'Keadilan yang',
        titleHighlight: 'Dapat Anda Percaya',
        description:
          'Raya Law Firm hadir memberikan solusi hukum komprehensif dengan tim advokat berpengalaman. Kami mendampingi Anda di setiap langkah, dari konsultasi hingga penyelesaian perkara.',
        primaryCta: 'Konsultasi Gratis',
        secondaryCta: 'Lihat Layanan Kami',
        stats: [
          { num: '5+', label: 'Tahun Pengalaman' },
          { num: '30+', label: 'Kasus Diselesaikan' },
        ],
      },
      profile: {
        badge: 'Tentang Kami',
        title: 'Firma Hukum dengan Standar Internasional',
        description:
          'Raya Law Firm adalah kantor hukum yang fokus pada solusi komprehensif bagi klien individu maupun korporasi di Indonesia. Kami menggabungkan pengalaman litigasi, ketelitian analisis, dan pendekatan personal untuk memastikan setiap perkara ditangani dengan standar profesional tinggi. Dalam setiap pendampingan, kami menjaga komunikasi yang transparan agar klien memahami langkah dan risiko yang dihadapi. Komitmen kami adalah hasil yang terukur, etika, dan kepercayaan jangka panjang.',
        strengths: [
          'Pendekatan strategi litigasi dan non-litigasi yang terukur',
          'Tim advokat berpengalaman lintas bidang hukum',
          'Komunikasi transparan dan laporan perkembangan rutin',
          'Standar etika tinggi serta kerahasiaan klien terjaga',
        ],
        corporatePartners: '5+ Mitra Korporasi',
        longTermTrust: 'Kepercayaan jangka panjang',
        more: 'Selengkapnya',
        imageAlt: 'Kantor Raya Law Firm',
      },
      services: {
        badge: 'Layanan Hukum',
        title: 'Solusi Hukum Komprehensif',
        description:
          'Pendampingan strategis untuk kebutuhan individu maupun korporasi dengan pendekatan yang terukur dan berorientasi hasil.',
        viewAll: 'Lihat Semua Layanan',
      },
      visionMission: {
        quote:
          'Kami percaya bahwa keadilan lahir dari keberanian, integritas, dan dedikasi pada prinsip hukum yang benar.',
        visionTitle: 'Visi',
        visionText:
          'Menjadi kantor hukum terdepan di Indonesia yang menghadirkan keadilan, kejujuran, dan pelayanan hukum berkualitas tinggi bagi seluruh lapisan masyarakat.',
        missionTitle: 'Misi',
        missions: [
          'Memberikan layanan hukum profesional, integritas tinggi, dan berorientasi hasil.',
          'Mendampingi klien dengan pendekatan personal dan solusi strategis.',
          'Berkontribusi pada penegakan hukum dan keadilan di Indonesia.',
          'Membangun kepercayaan melalui transparansi dan komunikasi yang efektif.',
        ],
      },
      team: {
        badge: 'Tim Advokat',
        title: 'Profesional Berpengalaman dan Terpercaya',
        description:
          'Tim kami terdiri dari advokat dengan keahlian lintas bidang hukum dan rekam jejak menangani kasus kompleks secara strategis.',
        cta: 'Kenali Tim Kami',
      },
      testimonials: {
        badge: 'Testimoni Klien',
        title: 'Kepercayaan yang Terbukti',
        viewAll: 'Lihat Semua Testimoni',
        previousAria: 'Sebelumnya',
        nextAria: 'Berikutnya',
        goToAria: 'Pergi ke testimoni',
      },
      articles: {
        badge: 'Insight Hukum',
        title: 'Artikel dan Analisis Terkini',
        description:
          'Rangkuman topik penting untuk membantu Anda memahami risiko dan peluang hukum secara tepat.',
        readAll: 'Baca Semua Artikel',
      },
      consultation: {
        badge: 'Konsultasi Cepat',
        title: 'Konsultasi Hukum Praktis untuk Kebutuhan Mendesak',
        description:
          'Sampaikan ringkasan kasus Anda dan dapatkan arahan awal dari tim kami. Setiap konsultasi dijaga kerahasiaannya dan ditangani secara profesional.',
        reasons: [
          'Respons cepat dan pendampingan yang jelas',
          'Strategi hukum terukur untuk setiap kasus',
          'Kerahasiaan dan etika profesi terjaga',
          'Tim advokat berpengalaman lintas sektor',
        ],
        emergency: 'Kontak Darurat WhatsApp',
        twentyFourHours: '+62 813-3566-3379 (24 jam)',
        fields: {
          name: 'Nama Lengkap',
          phone: 'Nomor Telepon',
          lawField: 'Bidang Hukum',
          description: 'Deskripsi Singkat',
          namePlaceholder: 'Nama lengkap',
          phonePlaceholder: 'Contoh: 081234567890',
          lawFieldPlaceholder: 'Pilih bidang hukum',
          descriptionPlaceholder: 'Ceritakan kronologi singkat kasus Anda',
          submit: 'Konsultasi via WhatsApp',
        },
        options: [
          'Pidana',
          'Perdata',
          'Bisnis',
          'Keluarga',
          'Properti',
          'Ketenagakerjaan',
          'Lainnya',
        ],
        errors: {
          name: 'Nama wajib diisi.',
          phone: 'Nomor telepon wajib diisi.',
          lawField: 'Pilih bidang hukum.',
          description: 'Deskripsi singkat wajib diisi.',
        },
      },
      cta: {
        badge: 'Siap Memulai?',
        title: 'Siap Mendapatkan Solusi Hukum Terbaik?',
        description:
          'Jadwalkan konsultasi gratis dengan tim advokat kami sekarang. Kami merespons cepat dan menjaga kerahasiaan setiap informasi Anda.',
        whatsapp: 'Konsultasi Gratis via WhatsApp',
        contact: 'Hubungi Kami',
        badges: ['Respons 24 jam', 'Konsultasi rahasia', 'Tanpa biaya tersembunyi'],
      },
    },
    aboutPage: {
      metaTitle: 'Tentang Raya Law Firm',
      metaDescription:
        'Profil Raya Law Firm, sejarah perjalanan, nilai-nilai perusahaan, serta komitmen kami dalam memberikan layanan hukum profesional di Indonesia.',
      breadcrumb: 'Tentang Kami',
      heroTitle: 'RAYA LAW FIRM',
      heroDescription:
        'Berawal dari komitmen untuk menghadirkan keadilan yang aksesibel dan berkualitas, Raya Law Firm hadir sebagai mitra hukum yang berfokus pada ketepatan solusi.',
      profileBadge: 'Profil Singkat',
      profileTitle: 'Menyatukan Keahlian, Integritas, dan Dedikasi',
      backgroundTitle: 'Sejarah / Background',
      background:
        'Berawal dari komitmen untuk menghadirkan keadilan yang aksesibel dan berkualitas, Raya Law Firm hadir sebagai mitra hukum yang berfokus pada ketepatan solusi. Kami percaya bahwa setiap persoalan hukum memerlukan pendekatan yang personal dan strategis. Perjalanan kami dimulai dari visi untuk membangun firma hukum yang tidak hanya sekedar memberikan konsultasi, tetapi juga menjadi pendamping setia bagi klien dalam menghadapi dinamika hukum di Indonesia.',
      visionBadge: 'Visi dan Misi',
      visionTitle: 'VISI DAN MISI',
      visionText:
        'Visi: Menjadi firma hukum terdepan yang mengedepankan integritas, profesionalisme, dan inovasi dalam memberikan perlindungan hukum bagi masyarakat maupun entitas bisnis.',
      missionTitle: 'Misi',
      missions: [
        'Memberikan layanan hukum secara komprehensif dengan standar etika profesi yang tinggi.',
        'Menghadirkan strategi hukum yang efektif dan solutif bagi setiap permasalahan klien.',
        'Membangun hubungan jangka panjang yang didasarkan pada kepercayaan dan transparansi.',
      ],
      valuesBadge: 'Nilai-Nilai',
      valuesTitle: 'Prinsip yang Kami Pegang',
      valuesDescription: 'Nilai inti ini menjadi fondasi setiap layanan yang kami berikan.',
      values: [
        {
          title: 'Integritas',
          description:
            'Kami menjaga kejujuran dan kepatuhan pada etika profesi sebagai dasar setiap keputusan hukum, memastikan kepercayaan klien tetap terjaga.',
        },
        {
          title: 'Profesional',
          description:
            'Setiap layanan ditangani dengan standar kerja tinggi, analisis mendalam, dan komunikasi yang jelas agar solusi hukum tepat sasaran.',
        },
        {
          title: 'Empati',
          description:
            'Kami memahami setiap kasus memiliki konteks personal. Pendekatan empatik membantu kami menyusun strategi yang lebih manusiawi.',
        },
        {
          title: 'Inovatif',
          description:
            'Kami terus berinovasi dalam layanan, dari digitalisasi hingga penyusunan strategi litigasi modern agar klien selalu selangkah lebih siap.',
        },
      ],
      awardsBadge: 'Penghargaan',
      awardsTitle: 'Penghargaan dan Sertifikasi',
      awardsDescription: 'Pengakuan atas dedikasi kami terhadap kualitas layanan hukum.',
      awards: [
        {
          title: 'Indonesia Legal Excellence Awards',
          year: '2015',
          description:
            'Penghargaan atas kontribusi praktik litigasi dan penguatan akses bantuan hukum.',
        },
        {
          title: 'Top Corporate Legal Advisor',
          year: '2018',
          description:
            'Pengakuan atas pendampingan strategis untuk perusahaan nasional dan multinasional.',
        },
        {
          title: 'Best Client Service in Law Firm',
          year: '2021',
          description:
            'Apresiasi atas kualitas layanan klien, transparansi, dan respons cepat.',
        },
        {
          title: 'National Law Firm Leadership',
          year: '2024',
          description:
            'Penghargaan atas ekspansi nasional dan konsistensi menjaga standar profesional.',
        },
      ],
      imageAlt: 'Tim Raya Law Firm',
      finalTitle: 'Siap Mendiskusikan Kebutuhan Hukum Anda?',
      finalDescription:
        'Tim kami siap memberikan konsultasi awal dan pendampingan strategis sesuai kebutuhan Anda.',
      finalCta: 'Konsultasi Sekarang',
    },
    servicesPage: {
      metaTitle: 'Layanan Hukum Raya Law Firm',
      metaDescription:
        'Raya Law Firm menyediakan layanan hukum pidana, perdata, bisnis, keluarga, properti, dan ketenagakerjaan dengan pendekatan strategis dan profesional.',
      breadcrumb: 'Layanan Hukum',
      title: 'Layanan Hukum Kami',
      description:
        'Pendampingan hukum terintegrasi untuk kebutuhan pribadi dan korporasi dengan strategi yang terukur dan berorientasi hasil.',
      commitmentTitle: 'Komitmen Layanan Hukum Komprehensif',
      commitmentDescription:
        'Kami menyiapkan strategi hukum yang jelas sejak awal, memastikan seluruh tahapan berjalan sesuai prosedur, serta menjaga komunikasi transparan agar klien memahami setiap langkah pendampingan.',
      notFoundTitle: 'Tidak menemukan layanan yang sesuai?',
      notFoundDescription:
        'Sampaikan kebutuhan Anda dan kami akan menyiapkan strategi pendampingan yang paling relevan.',
    },
    serviceDetail: {
      notFoundTitle: 'Layanan Tidak Ditemukan',
      notFoundDescription: 'Layanan yang Anda cari tidak tersedia.',
      fullExplanation: 'Penjelasan Lengkap',
      process: 'Proses Penanganan',
      faq: 'Pertanyaan Umum',
      consultNow: 'Konsultasi Sekarang',
      contactFor: 'Hubungi tim kami untuk pendampingan layanan',
      phone: 'Telepon',
      otherServices: 'Layanan Lainnya',
      whyChoose: 'Mengapa Memilih Kami',
      reasons: [
        'Analisis kasus mendalam dan strategi terukur.',
        'Tim advokat berpengalaman lintas bidang.',
        'Komunikasi transparan dan respons cepat.',
      ],
      needHelpPrefix: 'Butuh bantuan layanan',
      needHelpSuffix: '?',
      needHelpDescription:
        'Hubungi tim kami sekarang untuk mendapatkan arahan hukum yang tepat.',
      waMessagePrefix:
        'Halo Raya Law Firm, saya ingin konsultasi terkait layanan',
    },
    teamPage: {
      metaTitle: 'Tim Advokat Raya Law Firm',
      metaDescription:
        'Kenali tim advokat Raya Law Firm dengan keahlian lintas bidang hukum dan komitmen layanan profesional untuk setiap klien.',
      breadcrumb: 'Tim Advokat',
      title: 'Tim Advokat Kami',
      description:
        'Profesional hukum dengan keahlian mendalam dan integritas tinggi untuk mendampingi setiap langkah klien.',
      expertiseTitle: 'Keahlian yang Teruji dan Komitmen Jangka Panjang',
      expertiseDescription:
        'Tim kami terdiri dari advokat dengan pengalaman lintas sektor. Setiap anggota berfokus pada komunikasi yang transparan, strategi yang terukur, dan penyelesaian perkara yang berorientasi hasil.',
      finalTitle: 'Butuh konsultasi langsung?',
      finalDescription:
        'Jadwalkan konsultasi dengan tim kami untuk mendapatkan arahan hukum yang tepat sesuai kebutuhan Anda.',
    },
    lawyerDetail: {
      notFoundTitle: 'Profil Tidak Ditemukan',
      notFoundDescription: 'Profil advokat yang Anda cari tidak tersedia.',
      metadataDescriptionPrefix: 'Profil',
      metadataDescriptionMiddle: 'di Raya Law Firm dengan spesialisasi',
      backToTeam: 'Kembali ke Halaman Tim',
      profileTitle: 'Profil dan Keahlian',
      directConsultationPrefix: 'Konsultasi Langsung dengan',
      directConsultationDescription:
        'Jadwalkan konsultasi pribadi untuk mendapatkan arahan hukum yang tepat dan strategis.',
      otherTeam: 'Tim Kami Lainnya',
      contact: 'Kontak',
      expertise: 'Keahlian',
      achievements: 'Pencapaian',
      handledCases: 'Kasus yang ditangani',
      waMessagePrefix:
        'Halo Raya Law Firm, saya ingin konsultasi langsung dengan',
    },
    articlePage: {
      metaTitle: 'Artikel & Wawasan Hukum | Raya Law Firm',
      metaDescription:
        'Kumpulan artikel dan wawasan hukum Raya Law Firm untuk membantu Anda memahami isu legal secara praktis dan strategis.',
      breadcrumb: 'Artikel',
      title: 'Artikel dan Wawasan Hukum',
      description:
        'Insight hukum terkini yang dirangkum secara jelas untuk membantu Anda memahami risiko dan peluang secara tepat.',
      allFilter: 'Semua',
      searchTitle: 'Pencarian',
      searchPlaceholder: 'Cari artikel...',
      popularArticles: 'Artikel Populer',
      categories: 'Kategori',
      readArticle: 'Baca Artikel',
    },
    articleDetail: {
      notFoundTitle: 'Artikel Tidak Ditemukan',
      notFoundDescription: 'Artikel yang Anda cari tidak tersedia.',
      authorRole: 'Admin Raya Law Firm',
      authorBio:
        'Tim editorial Raya Law Firm merangkum artikel ini untuk memberikan panduan hukum yang ringkas, akurat, dan mudah dipahami.',
      shareArticle: 'Bagikan Artikel',
      previousArticle: 'Artikel Sebelumnya',
      nextArticle: 'Artikel Berikutnya',
      consultNow: 'Konsultasi Sekarang',
      consultDescription: 'Dapatkan arahan hukum dari tim advokat kami.',
      relatedArticles: 'Artikel Terkait',
      relatedServices: 'Layanan Terkait',
      otherArticles: 'Artikel Lainnya',
      waMessage:
        'Halo Raya Law Firm, saya ingin konsultasi mengenai artikel ini.',
      copyLink: 'Copy Link',
      copySuccess: 'Tautan berhasil disalin.',
      copyError: 'Gagal menyalin tautan.',
    },
    consultationPage: {
      metaTitle: 'Konsultasi Hukum Gratis | Raya Law Firm',
      metaDescription:
        'Ajukan konsultasi hukum gratis bersama tim advokat Raya Law Firm. Isi formulir singkat dan lanjutkan konsultasi melalui WhatsApp.',
      breadcrumb: 'Konsultasi',
      title: 'Ceritakan Masalah Hukum Anda',
      description:
        'Sampaikan kebutuhan hukum Anda secara singkat. Tim kami akan meninjau informasi dan mengarahkan konsultasi lanjutan melalui WhatsApp secara profesional dan terstruktur.',
      steps: [
        {
          title: 'Isi Form',
          description: 'Lengkapi data diri dan ringkasan kasus secara singkat.',
        },
        {
          title: 'Hubungi via WhatsApp',
          description:
            'Kami akan mengarahkan Anda ke WhatsApp dengan pesan otomatis.',
        },
        {
          title: 'Konsultasi dengan Lawyer',
          description:
            'Tim kami meninjau kasus dan menjadwalkan konsultasi lanjutan.',
        },
      ],
      privacyNote:
        'Informasi Anda aman dan dijaga kerahasiaannya. Kami menerapkan standar privasi untuk setiap konsultasi yang masuk.',
      operationalHours: 'Jam Operasional',
      weekdayHours: 'Senin - Jumat 08:00 - 17:00 WIB',
      saturdayHours: 'Sabtu 09:00 - 13:00 WIB',
      alternativeContact: 'Kontak Alternatif',
      formLabel: 'Form Konsultasi',
      formTitle: 'Formulir Konsultasi Gratis',
      formDescription:
        'Isi data di bawah dengan lengkap untuk mempercepat proses pendampingan hukum Anda.',
    },
    consultationForm: {
      personalData: 'Data Diri',
      caseDetails: 'Detail Kasus',
      additionalInfo: 'Informasi Tambahan',
      fields: {
        name: 'Nama Lengkap',
        phone: 'No. WhatsApp atau Telepon',
        email: 'Email',
        city: 'Kota Domisili',
        gender: 'Jenis Kelamin',
        lawField: 'Bidang Hukum',
        caseStatus: 'Status Kasus',
        consultationTime: 'Waktu Konsultasi',
        caseDescription: 'Deskripsi Singkat Kasus',
        source: 'Dari mana tahu Raya Law Firm',
      },
      placeholders: {
        name: 'Nama lengkap',
        phone: '08xx',
        email: 'email@gmail.com',
        city: 'Kota domisili',
        lawField: 'Pilih bidang hukum',
        caseDescription: 'Tuliskan kronologi singkat kasus Anda',
        source: 'Pilih sumber informasi',
      },
      options: {
        lawFields: [
          'Hukum Pidana',
          'Hukum Perdata',
          'Hukum Bisnis',
          'Hukum Keluarga',
          'Hukum Properti',
          'Hukum Ketenagakerjaan',
          'Hukum Administrasi',
          'Lainnya',
        ],
        sources: ['Google', 'Media Sosial', 'Referensi Teman', 'Lainnya'],
        genders: ['Laki-laki', 'Perempuan'],
        caseStatuses: ['Baru', 'Sudah Berjalan', 'Naik Banding'],
        consultationTimes: ['Segera', 'Minggu Ini', 'Fleksibel'],
      },
      errors: {
        name: 'Nama lengkap wajib diisi.',
        phone: 'Nomor telepon wajib diisi.',
        phoneNumber: 'Nomor telepon harus berupa angka.',
        email: 'Email wajib diisi.',
        emailFormat: 'Format email tidak valid.',
        gender: 'Pilih jenis kelamin.',
        city: 'Kota domisili wajib diisi.',
        lawField: 'Pilih bidang hukum.',
        caseStatus: 'Pilih status kasus.',
        consultationTime: 'Pilih waktu konsultasi.',
        caseDescription: 'Deskripsi singkat wajib diisi.',
      },
      sourceFallback: 'Tidak disebutkan',
      submit: 'Konsultasi via WhatsApp',
      processing: 'Memproses...',
    },
    contactPage: {
      metaTitle: 'Kontak & Lokasi | Raya Law Firm',
      metaDescription:
        'Hubungi Raya Law Firm untuk konsultasi hukum, jadwal pertemuan, dan kebutuhan pendampingan hukum profesional.',
      breadcrumb: 'Kontak',
      title: 'Kontak dan Lokasi',
      description:
        'Kami siap membantu kebutuhan hukum Anda. Hubungi tim Raya Law Firm melalui kanal komunikasi resmi.',
      officeInfo: 'Informasi Kantor',
      officeTitle: 'Kantor Raya Law Firm',
      officeHoursValue: 'Senin-Jumat 08:00-17:00, Sabtu 09:00-13:00',
      mapNote:
        'Lokasi berada di pusat bisnis DKI Jakarta dengan akses mudah ke transportasi umum dan parkir yang memadai.',
      contactMethod: 'Cara Menghubungi',
      chooseChannel: 'Pilih Kanal Komunikasi',
      cards: [
        {
          title: 'WhatsApp',
          detail: '0813 3566 3379',
          description: 'Hubungi tim kami untuk respons cepat.',
        },
        {
          title: 'Telepon',
          detail: '0813 3566 3379',
          description: 'Diskusi cepat untuk kebutuhan segera.',
        },
        {
          title: 'Email',
          detail: 'info@rayalawfirm.com',
          description: 'Kirim dokumen atau pertanyaan tertulis.',
        },
      ],
      formBadge: 'Form Kontak',
      formTitle: 'Kirim Pesan Anda',
      formDescription:
        'Sampaikan pertanyaan atau kebutuhan pendampingan hukum melalui formulir ini. Tim kami akan menindaklanjuti secepatnya.',
      fields: {
        name: 'Nama Lengkap',
        email: 'Email',
        subject: 'Subjek',
        message: 'Pesan',
      },
      placeholders: {
        name: 'Nama lengkap',
        email: 'email@gmail.com',
        subject: 'Topik yang ingin dibahas',
        message: 'Tuliskan pesan Anda',
      },
      submit: 'Kirim Pesan',
      mailNote: 'Form ini akan membuka aplikasi email Anda untuk mengirim pesan.',
      waMessage: 'Halo Raya Law Firm, saya ingin konsultasi.',
    },
    testimonialsPage: {
      metaTitle: 'Testimoni Klien | Raya Law Firm',
      metaDescription:
        'Testimoni klien Raya Law Firm dari berbagai bidang hukum yang menunjukkan kualitas layanan profesional dan terpercaya.',
      breadcrumb: 'Testimoni',
      title: 'Apa Kata Klien Kami',
      description: 'Kepercayaan klien adalah indikator utama kualitas layanan kami.',
      averageRating: 'Rata-rata Penilaian',
      ratingText: '4.9/5.0 dari 150+ klien',
      allFilter: 'Semua',
      cta: 'Jadilah Klien Berikutnya',
    },
    privacyPage: {
      metaTitle: 'Kebijakan Privasi | Raya Law Firm',
      metaDescription:
        'Kebijakan privasi Raya Law Firm mengenai pengumpulan, penggunaan, dan perlindungan data pribadi klien dan pengunjung website.',
      breadcrumb: 'Kebijakan Privasi',
      title: 'Kebijakan Privasi',
      description:
        'Komitmen kami dalam menjaga kerahasiaan dan perlindungan data pribadi klien serta pengunjung website.',
      sections: [
        {
          title: '1. PENDAHULUAN',
          body: `Raya Law Firm berkomitmen menjaga kerahasiaan dan keamanan data pribadi Anda. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi yang Anda berikan melalui website dan layanan konsultasi kami. Dengan menggunakan layanan kami, Anda menyetujui kebijakan ini.`,
        },
        {
          title: '2. INFORMASI YANG KAMI KUMPULKAN',
          body: `a. Data yang Anda berikan secara langsung:
- Nama lengkap dan informasi identitas
- Nomor telepon/WhatsApp dan alamat email
- Informasi domisili dan wilayah hukum
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
      ],
    },
    whatsapp: {
      defaultMessage: 'Halo Raya Law Firm, saya ingin konsultasi.',
      furtherConsultation:
        'Halo Raya Law Firm, saya ingin konsultasi lebih lanjut.',
      sentFromWebsite: 'Pesan ini dikirim dari website Raya Law Firm',
      title: 'KONSULTASI RAYA LAW FIRM',
      applicantData: 'DATA PEMOHON:',
      caseDetails: 'DETAIL KASUS:',
      caseDescription: 'DESKRIPSI KASUS:',
      labels: {
        name: 'Nama',
        phone: 'Telepon',
        email: 'Email',
        gender: 'Jenis Kelamin',
        city: 'Kota',
        lawField: 'Bidang Hukum',
        caseStatus: 'Status Kasus',
        consultationTime: 'Waktu Konsultasi',
        source: 'Sumber Informasi',
      },
    },
  },
  en: {
    common: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      team: 'Team',
      articles: 'Articles',
      consultation: 'Consultation',
      testimonials: 'Testimonials',
      contact: 'Contact',
      privacyPolicy: 'Privacy Policy',
      freeConsultation: 'Free Consultation',
      consultationNow: 'Book a Consultation',
      whatsappConsultation: 'Consult via WhatsApp',
      consultationForm: 'Consultation Form',
      learnMore: 'Learn More',
      viewAllServices: 'View All Services',
      viewProfile: 'View Profile',
      contactUs: 'Contact Us',
      contactNow: 'Contact Now',
      readArticle: 'Read Article',
      viewAll: 'View All',
      previous: 'Previous',
      next: 'Next',
      closeMenu: 'Close menu',
      toggleMenu: 'Toggle menu',
      languageLabel: 'Change language',
      languageSwitchTo: 'Switch to Indonesian',
      poweredBy: 'Powered by',
      copyright: 'Copyright 2026 Raya Law Firm. All rights reserved',
      phone: 'Phone',
      email: 'Email',
      address: 'Address',
      operationalHours: 'Office Hours',
      mondayFriday: 'Monday - Friday',
      saturday: 'Saturday',
      locationIframeTitle: 'Our Office Location in South Jakarta',
      dataSafe: 'Secure and confidential data',
      confidentialConsultation: 'Confidential consultation',
      fastResponse: 'Fast response within 24 hours',
      noHiddenFees: 'No hidden fees',
      noConditions: 'Free with no conditions',
    },
    nav: {
      serviceLinks: {
        criminal: 'Criminal Law',
        civil: 'Civil Law',
        business: 'Business Law',
        family: 'Family Law',
        property: 'Property Law',
        employment: 'Employment Law',
        administrative: 'Administrative Court Law',
      },
    },
    footer: {
      description:
        'Raya Law Firm is a professional law office providing litigation and strategic advisory services for individuals and corporations in Indonesia.',
      services: 'Services',
      company: 'Company',
      contact: 'Contact',
      team: 'Our Team',
      operationalHours: 'Monday - Friday, 08:00 - 17:00 WIB',
    },
    home: {
      metaTitle: 'Raya Law Firm | Professional Law Firm in Indonesia',
      metaDescription:
        'Raya Law Firm is a professional law firm in Indonesia offering criminal, civil, business, family, property, and employment legal services with trusted consultation for your legal needs.',
      hero: {
        badge: 'Professional Legal Consultation',
        titleLine: 'Justice You',
        titleHighlight: 'Can Trust',
        description:
          'Raya Law Firm delivers comprehensive legal solutions through an experienced team of advocates. We guide you at every step, from consultation to case resolution.',
        primaryCta: 'Free Consultation',
        secondaryCta: 'View Our Services',
        stats: [
          { num: '5+', label: 'Years of Experience' },
          { num: '30+', label: 'Cases Resolved' },
        ],
      },
      profile: {
        badge: 'About Us',
        title: 'A Law Firm with International Standards',
        description:
          'Raya Law Firm focuses on comprehensive legal solutions for individuals and corporations in Indonesia. We combine litigation experience, meticulous analysis, and a personal approach to ensure every matter is handled with high professional standards. In every engagement, we maintain transparent communication so clients understand the steps and risks ahead. Our commitment is measured outcomes, ethics, and long-term trust.',
        strengths: [
          'Measured litigation and non-litigation strategies',
          'Experienced advocates across multiple legal fields',
          'Transparent communication and regular progress reports',
          'High ethical standards and protected client confidentiality',
        ],
        corporatePartners: '5+ Corporate Partners',
        longTermTrust: 'Long-term trust',
        more: 'Read More',
        imageAlt: 'Raya Law Firm Office',
      },
      services: {
        badge: 'Legal Services',
        title: 'Comprehensive Legal Solutions',
        description:
          'Strategic assistance for individuals and corporations with a measured, results-oriented approach.',
        viewAll: 'View All Services',
      },
      visionMission: {
        quote:
          'We believe justice is born from courage, integrity, and dedication to sound legal principles.',
        visionTitle: 'Vision',
        visionText:
          'To become a leading law firm in Indonesia that delivers justice, honesty, and high-quality legal services for every layer of society.',
        missionTitle: 'Mission',
        missions: [
          'Provide professional legal services with high integrity and a results-oriented mindset.',
          'Assist clients through a personal approach and strategic solutions.',
          'Contribute to the enforcement of law and justice in Indonesia.',
          'Build trust through transparency and effective communication.',
        ],
      },
      team: {
        badge: 'Advocate Team',
        title: 'Experienced and Trusted Professionals',
        description:
          'Our team consists of advocates with cross-disciplinary legal expertise and a track record of handling complex cases strategically.',
        cta: 'Meet Our Team',
      },
      testimonials: {
        badge: 'Client Testimonials',
        title: 'Trust Proven by Clients',
        viewAll: 'View All Testimonials',
        previousAria: 'Previous',
        nextAria: 'Next',
        goToAria: 'Go to testimonial',
      },
      articles: {
        badge: 'Legal Insights',
        title: 'Latest Articles and Analysis',
        description:
          'Clear summaries of important topics to help you understand legal risks and opportunities accurately.',
        readAll: 'Read All Articles',
      },
      consultation: {
        badge: 'Quick Consultation',
        title: 'Practical Legal Consultation for Urgent Needs',
        description:
          'Share a brief summary of your case and receive initial guidance from our team. Every consultation is kept confidential and handled professionally.',
        reasons: [
          'Fast response and clear assistance',
          'Measured legal strategy for every case',
          'Protected confidentiality and professional ethics',
          'Experienced advocates across sectors',
        ],
        emergency: 'Emergency WhatsApp Contact',
        twentyFourHours: '+62 813-3566-3379 (24 hours)',
        fields: {
          name: 'Full Name',
          phone: 'Phone Number',
          lawField: 'Legal Field',
          description: 'Brief Description',
          namePlaceholder: 'Full name',
          phonePlaceholder: 'Example: 081234567890',
          lawFieldPlaceholder: 'Select a legal field',
          descriptionPlaceholder: 'Briefly describe your case chronology',
          submit: 'Consult via WhatsApp',
        },
        options: [
          'Criminal',
          'Civil',
          'Business',
          'Family',
          'Property',
          'Employment',
          'Other',
        ],
        errors: {
          name: 'Name is required.',
          phone: 'Phone number is required.',
          lawField: 'Please select a legal field.',
          description: 'Brief description is required.',
        },
      },
      cta: {
        badge: 'Ready to Start?',
        title: 'Ready to Get the Right Legal Solution?',
        description:
          'Schedule a free consultation with our advocates today. We respond quickly and keep every piece of information confidential.',
        whatsapp: 'Free Consultation via WhatsApp',
        contact: 'Contact Us',
        badges: ['24-hour response', 'Confidential consultation', 'No hidden fees'],
      },
    },
    aboutPage: {
      metaTitle: 'About Raya Law Firm',
      metaDescription:
        'Raya Law Firm profile, history, values, and our commitment to delivering professional legal services in Indonesia.',
      breadcrumb: 'About Us',
      heroTitle: 'RAYA LAW FIRM',
      heroDescription:
        'Founded on a commitment to accessible and high-quality justice, Raya Law Firm is a legal partner focused on precise solutions.',
      profileBadge: 'Brief Profile',
      profileTitle: 'Uniting Expertise, Integrity, and Dedication',
      backgroundTitle: 'History / Background',
      background:
        'Founded on a commitment to accessible and high-quality justice, Raya Law Firm is a legal partner focused on precise solutions. We believe every legal issue requires a personal and strategic approach. Our journey began with a vision to build a law firm that does more than provide consultation, becoming a reliable companion for clients navigating Indonesia legal dynamics.',
      visionBadge: 'Vision and Mission',
      visionTitle: 'VISION AND MISSION',
      visionText:
        'Vision: To become a leading law firm that prioritizes integrity, professionalism, and innovation in providing legal protection for the public and business entities.',
      missionTitle: 'Mission',
      missions: [
        'Provide comprehensive legal services with high professional ethical standards.',
        'Deliver effective and solution-oriented legal strategies for every client matter.',
        'Build long-term relationships based on trust and transparency.',
      ],
      valuesBadge: 'Values',
      valuesTitle: 'Principles We Uphold',
      valuesDescription: 'These core values are the foundation of every service we provide.',
      values: [
        {
          title: 'Integrity',
          description:
            'We uphold honesty and professional ethics as the basis of every legal decision, ensuring client trust remains protected.',
        },
        {
          title: 'Professionalism',
          description:
            'Every service is handled with high work standards, deep analysis, and clear communication so legal solutions are well targeted.',
        },
        {
          title: 'Empathy',
          description:
            'We understand that every case has personal context. An empathetic approach helps us build more humane strategies.',
        },
        {
          title: 'Innovation',
          description:
            'We continue to innovate in service delivery, from digitalization to modern litigation strategy, so clients stay one step prepared.',
        },
      ],
      awardsBadge: 'Recognition',
      awardsTitle: 'Awards and Certifications',
      awardsDescription: 'Recognition of our dedication to quality legal services.',
      awards: [
        {
          title: 'Indonesia Legal Excellence Awards',
          year: '2015',
          description:
            'Recognition for contributions to litigation practice and broader access to legal assistance.',
        },
        {
          title: 'Top Corporate Legal Advisor',
          year: '2018',
          description:
            'Recognition for strategic assistance to national and multinational companies.',
        },
        {
          title: 'Best Client Service in Law Firm',
          year: '2021',
          description:
            'Appreciation for client service quality, transparency, and fast response.',
        },
        {
          title: 'National Law Firm Leadership',
          year: '2024',
          description:
            'Recognition for national expansion and consistent professional standards.',
        },
      ],
      imageAlt: 'Raya Law Firm Team',
      finalTitle: 'Ready to Discuss Your Legal Needs?',
      finalDescription:
        'Our team is ready to provide initial consultation and strategic assistance according to your needs.',
      finalCta: 'Book a Consultation',
    },
    servicesPage: {
      metaTitle: 'Raya Law Firm Legal Services',
      metaDescription:
        'Raya Law Firm provides criminal, civil, business, family, property, and employment legal services with a strategic and professional approach.',
      breadcrumb: 'Legal Services',
      title: 'Our Legal Services',
      description:
        'Integrated legal assistance for personal and corporate needs with a measured, results-oriented strategy.',
      commitmentTitle: 'A Commitment to Comprehensive Legal Services',
      commitmentDescription:
        'We prepare a clear legal strategy from the beginning, ensure every stage follows proper procedure, and maintain transparent communication so clients understand each step of the engagement.',
      notFoundTitle: 'Cannot find the right service?',
      notFoundDescription:
        'Share your needs with us and we will prepare the most relevant assistance strategy.',
    },
    serviceDetail: {
      notFoundTitle: 'Service Not Found',
      notFoundDescription: 'The service you are looking for is not available.',
      fullExplanation: 'Detailed Explanation',
      process: 'Handling Process',
      faq: 'Frequently Asked Questions',
      consultNow: 'Book a Consultation',
      contactFor: 'Contact our team for assistance with',
      phone: 'Phone',
      otherServices: 'Other Services',
      whyChoose: 'Why Choose Us',
      reasons: [
        'In-depth case analysis and measured strategy.',
        'Experienced advocates across legal fields.',
        'Transparent communication and fast response.',
      ],
      needHelpPrefix: 'Need assistance with',
      needHelpSuffix: '?',
      needHelpDescription:
        'Contact our team today to receive the right legal guidance.',
      waMessagePrefix:
        'Hello Raya Law Firm, I would like to consult about your',
    },
    teamPage: {
      metaTitle: 'Raya Law Firm Advocate Team',
      metaDescription:
        'Meet Raya Law Firm advocates with cross-disciplinary expertise and a commitment to professional service for every client.',
      breadcrumb: 'Advocate Team',
      title: 'Our Advocate Team',
      description:
        'Legal professionals with deep expertise and strong integrity to assist every step of your journey.',
      expertiseTitle: 'Proven Expertise and Long-Term Commitment',
      expertiseDescription:
        'Our team consists of advocates with experience across sectors. Each member focuses on transparent communication, measured strategy, and results-oriented case resolution.',
      finalTitle: 'Need a direct consultation?',
      finalDescription:
        'Schedule a consultation with our team to receive legal guidance tailored to your needs.',
    },
    lawyerDetail: {
      notFoundTitle: 'Profile Not Found',
      notFoundDescription: 'The advocate profile you are looking for is not available.',
      metadataDescriptionPrefix: 'Profile of',
      metadataDescriptionMiddle: 'at Raya Law Firm with specialization in',
      backToTeam: 'Back to Team Page',
      profileTitle: 'Profile and Expertise',
      directConsultationPrefix: 'Direct Consultation with',
      directConsultationDescription:
        'Schedule a private consultation to receive precise and strategic legal guidance.',
      otherTeam: 'Other Team Members',
      contact: 'Contact',
      expertise: 'Expertise',
      achievements: 'Achievements',
      handledCases: 'Handled Cases',
      waMessagePrefix:
        'Hello Raya Law Firm, I would like a direct consultation with',
    },
    articlePage: {
      metaTitle: 'Legal Articles & Insights | Raya Law Firm',
      metaDescription:
        'A collection of Raya Law Firm articles and legal insights to help you understand legal issues practically and strategically.',
      breadcrumb: 'Articles',
      title: 'Legal Articles and Insights',
      description:
        'Current legal insights summarized clearly to help you understand risks and opportunities accurately.',
      allFilter: 'All',
      searchTitle: 'Search',
      searchPlaceholder: 'Search articles...',
      popularArticles: 'Popular Articles',
      categories: 'Categories',
      readArticle: 'Read Article',
    },
    articleDetail: {
      notFoundTitle: 'Article Not Found',
      notFoundDescription: 'The article you are looking for is not available.',
      authorRole: 'Raya Law Firm Admin',
      authorBio:
        'The Raya Law Firm editorial team prepared this article to provide concise, accurate, and accessible legal guidance.',
      shareArticle: 'Share Article',
      previousArticle: 'Previous Article',
      nextArticle: 'Next Article',
      consultNow: 'Book a Consultation',
      consultDescription: 'Get legal guidance from our advocate team.',
      relatedArticles: 'Related Articles',
      relatedServices: 'Related Services',
      otherArticles: 'Other Articles',
      waMessage:
        'Hello Raya Law Firm, I would like to consult about this article.',
      copyLink: 'Copy Link',
      copySuccess: 'Link copied successfully.',
      copyError: 'Failed to copy link.',
    },
    consultationPage: {
      metaTitle: 'Free Legal Consultation | Raya Law Firm',
      metaDescription:
        'Submit a free legal consultation with Raya Law Firm advocates. Fill out a short form and continue the consultation via WhatsApp.',
      breadcrumb: 'Consultation',
      title: 'Tell Us About Your Legal Issue',
      description:
        'Share your legal needs briefly. Our team will review the information and guide the next consultation through WhatsApp in a professional and structured way.',
      steps: [
        {
          title: 'Complete the Form',
          description: 'Fill in your personal data and a brief case summary.',
        },
        {
          title: 'Contact via WhatsApp',
          description:
            'We will direct you to WhatsApp with an automatic message.',
        },
        {
          title: 'Consult with a Lawyer',
          description:
            'Our team reviews the case and schedules the next consultation.',
        },
      ],
      privacyNote:
        'Your information is secure and kept confidential. We apply privacy standards to every consultation request.',
      operationalHours: 'Office Hours',
      weekdayHours: 'Monday - Friday 08:00 - 17:00 WIB',
      saturdayHours: 'Saturday 09:00 - 13:00 WIB',
      alternativeContact: 'Alternative Contact',
      formLabel: 'Consultation Form',
      formTitle: 'Free Consultation Form',
      formDescription:
        'Complete the data below to speed up your legal assistance process.',
    },
    consultationForm: {
      personalData: 'Personal Data',
      caseDetails: 'Case Details',
      additionalInfo: 'Additional Information',
      fields: {
        name: 'Full Name',
        phone: 'WhatsApp or Phone Number',
        email: 'Email',
        city: 'City of Residence',
        gender: 'Gender',
        lawField: 'Legal Field',
        caseStatus: 'Case Status',
        consultationTime: 'Consultation Time',
        caseDescription: 'Brief Case Description',
        source: 'How did you find Raya Law Firm?',
      },
      placeholders: {
        name: 'Full name',
        phone: '08xx',
        email: 'email@gmail.com',
        city: 'City of residence',
        lawField: 'Select a legal field',
        caseDescription: 'Write a brief chronology of your case',
        source: 'Select information source',
      },
      options: {
        lawFields: [
          'Criminal Law',
          'Civil Law',
          'Business Law',
          'Family Law',
          'Property Law',
          'Employment Law',
          'Administrative Law',
          'Other',
        ],
        sources: ['Google', 'Social Media', 'Friend Referral', 'Other'],
        genders: ['Male', 'Female'],
        caseStatuses: ['New', 'Ongoing', 'Appeal'],
        consultationTimes: ['As Soon As Possible', 'This Week', 'Flexible'],
      },
      errors: {
        name: 'Full name is required.',
        phone: 'Phone number is required.',
        phoneNumber: 'Phone number must contain numbers only.',
        email: 'Email is required.',
        emailFormat: 'Invalid email format.',
        gender: 'Please select gender.',
        city: 'City of residence is required.',
        lawField: 'Please select a legal field.',
        caseStatus: 'Please select case status.',
        consultationTime: 'Please select consultation time.',
        caseDescription: 'Brief description is required.',
      },
      sourceFallback: 'Not specified',
      submit: 'Consult via WhatsApp',
      processing: 'Processing...',
    },
    contactPage: {
      metaTitle: 'Contact & Location | Raya Law Firm',
      metaDescription:
        'Contact Raya Law Firm for legal consultation, meeting schedules, and professional legal assistance needs.',
      breadcrumb: 'Contact',
      title: 'Contact and Location',
      description:
        'We are ready to support your legal needs. Contact the Raya Law Firm team through our official communication channels.',
      officeInfo: 'Office Information',
      officeTitle: 'Raya Law Firm Office',
      officeHoursValue: 'Monday-Friday 08:00-17:00, Saturday 09:00-13:00',
      mapNote:
        'The office is located in DKI Jakarta business area with easy access to public transport and adequate parking.',
      contactMethod: 'How to Contact Us',
      chooseChannel: 'Choose a Communication Channel',
      cards: [
        {
          title: 'WhatsApp',
          detail: '0813 3566 3379',
          description: 'Contact our team for a fast response.',
        },
        {
          title: 'Phone',
          detail: '0813 3566 3379',
          description: 'Quick discussion for urgent needs.',
        },
        {
          title: 'Email',
          detail: 'info@rayalawfirm.com',
          description: 'Send documents or written questions.',
        },
      ],
      formBadge: 'Contact Form',
      formTitle: 'Send Your Message',
      formDescription:
        'Share your questions or legal assistance needs through this form. Our team will follow up as soon as possible.',
      fields: {
        name: 'Full Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Message',
      },
      placeholders: {
        name: 'Full name',
        email: 'email@gmail.com',
        subject: 'Topic to discuss',
        message: 'Write your message',
      },
      submit: 'Send Message',
      mailNote: 'This form will open your email app to send the message.',
      waMessage: 'Hello Raya Law Firm, I would like to consult.',
    },
    testimonialsPage: {
      metaTitle: 'Client Testimonials | Raya Law Firm',
      metaDescription:
        'Raya Law Firm client testimonials across legal fields showing professional and trusted service quality.',
      breadcrumb: 'Testimonials',
      title: 'What Our Clients Say',
      description: 'Client trust is the primary indicator of our service quality.',
      averageRating: 'Average Rating',
      ratingText: '4.9/5.0 from 150+ clients',
      allFilter: 'All',
      cta: 'Become Our Next Client',
    },
    privacyPage: {
      metaTitle: 'Privacy Policy | Raya Law Firm',
      metaDescription:
        'Raya Law Firm privacy policy on the collection, use, and protection of client and website visitor personal data.',
      breadcrumb: 'Privacy Policy',
      title: 'Privacy Policy',
      description:
        'Our commitment to maintaining confidentiality and protecting personal data of clients and website visitors.',
      sections: [
        {
          title: '1. INTRODUCTION',
          body: `Raya Law Firm is committed to protecting the confidentiality and security of your personal data. This policy explains how we collect, use, and protect information you provide through our website and consultation services. By using our services, you agree to this policy.`,
        },
        {
          title: '2. INFORMATION WE COLLECT',
          body: `a. Data you provide directly:
- Full name and identity information
- Phone/WhatsApp number and email address
- Domicile and jurisdiction information
- Case chronology and statements you provide
- Documents or evidence submitted for consultation purposes

b. Data collected automatically:
- IP address and device data
- Pages visited and visit duration
- Referral source (how you found our website)
- Cookie data for a better user experience`,
        },
        {
          title: '3. CLIENT CONFIDENTIALITY (ATTORNEY-CLIENT PRIVILEGE)',
          body: `All information you provide in the context of consultation and legal representation is protected by attorney-client confidentiality in accordance with Law Number 18 of 2003 concerning Advocates and the Indonesian Advocates Code of Ethics. We will not disclose your information to third parties without your written permission, except when required by law.`,
        },
        {
          title: '4. USE OF INFORMATION',
          body: `We use your information to:
- Provide consultation and legal assistance services
- Contact you regarding case developments
- Send relevant legal service information (if you consent)
- Improve the quality of our services and website
- Fulfill applicable legal obligations`,
        },
        {
          title: '5. SHARING INFORMATION WITH THIRD PARTIES',
          body: `We DO NOT sell, rent, or trade your personal data. We may only share information in the following circumstances:
- Legal colleagues or experts appointed for your case handling (with your consent)
- Technology service providers supporting website operations (under confidentiality agreements)
- Legal obligations based on court orders or statutory regulations`,
        },
        {
          title: '6. DATA SECURITY',
          body: `We implement reasonable technical and organizational security measures to protect your data, including data encryption, restricted access for authorized personnel only, and regular security monitoring. However, no internet security system is entirely risk-free.`,
        },
        {
          title: '7. DATA RETENTION',
          body: `Consultation and case data are retained during the legal relationship and for at least 5 (five) years after case completion, in line with applicable legal requirements and professional documentation needs. Website data (analytics) is retained for a maximum of 2 years.`,
        },
        {
          title: '8. YOUR RIGHTS',
          body: `Under applicable data protection regulations in Indonesia, you have the right to:
- Access the personal data we store about you
- Request correction of inaccurate data
- Request deletion of data (subject to our legal obligations)
- Withdraw consent for data processing at any time
- File a complaint with the authorized authority`,
        },
        {
          title: '9. COOKIES',
          body: `Our website uses functional cookies to improve user experience. You can adjust cookie settings through your browser. Disabling certain cookies may affect website functionality.`,
        },
        {
          title: '10. COMMUNICATION THROUGH WHATSAPP',
          body: `When you contact us through WhatsApp, the communication is subject to WhatsApp (Meta) privacy policy. We recommend that you avoid sharing highly sensitive information through third-party applications before a formal confidentiality agreement is in place.`,
        },
        {
          title: '11. CHANGES TO THIS POLICY',
          body: `We may update this privacy policy from time to time. Material changes will be announced through the website or email. The last updated date is listed below this document.`,
        },
        {
          title: '12. CONTACT US',
          body: `For questions about this privacy policy or to exercise your rights:
Email: info@rayalawfirm.com
Phone: +62 813 3566 3379
Address: Jl. Tebet Barat Dalam IV No. 10, Jakarta.

Last updated: May 10, 2026`,
        },
      ],
    },
    whatsapp: {
      defaultMessage: 'Hello Raya Law Firm, I would like to consult.',
      furtherConsultation:
        'Hello Raya Law Firm, I would like to discuss a consultation further.',
      sentFromWebsite: 'This message was sent from the Raya Law Firm website',
      title: 'RAYA LAW FIRM CONSULTATION',
      applicantData: 'APPLICANT DATA:',
      caseDetails: 'CASE DETAILS:',
      caseDescription: 'CASE DESCRIPTION:',
      labels: {
        name: 'Name',
        phone: 'Phone',
        email: 'Email',
        gender: 'Gender',
        city: 'City',
        lawField: 'Legal Field',
        caseStatus: 'Case Status',
        consultationTime: 'Consultation Time',
        source: 'Information Source',
      },
    },
  },
};

export function getDictionary(locale: Locale = defaultLocale) {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}
