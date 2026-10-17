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
      mainNavigation: 'Navigasi utama',
      mobileNavigation: 'Menu navigasi',
      openMenu: 'Buka menu',
      servicesMenu: 'Tampilkan submenu layanan',
      skipToContent: 'Lewati ke konten utama',
      logoHomeLabel: 'Raya Law Firm, kembali ke beranda',
      logoAlt: 'Logo Raya Law Firm',
      whatsappFab: 'Chat WhatsApp dengan Raya Law Firm (membuka tab baru)',
      opensInNewTab: '(membuka tab baru)',
      required: 'wajib diisi',
      directions: 'Petunjuk arah di Google Maps',
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
      areasServed: 'Melayani klien di Jakarta, Makassar, dan seluruh Indonesia.',
      followUs: 'Ikuti kami',
      whatsapp: 'WhatsApp',
      legal: 'Legal',
    },
    home: {
      metaTitle: 'Raya Law Firm | Kantor Hukum & Konsultan Hukum di Jakarta',
      metaDescription:
        'Raya Law Firm, kantor hukum di Tebet, Jakarta Selatan. Konsultasi & pendampingan perkara pidana, perdata, bisnis, keluarga, pertanahan, dan ketenagakerjaan.',
      hero: {
        badge: 'Raya Law Firm · Jakarta Selatan',
        titleLine: 'Kantor Hukum & Konsultan Hukum',
        titleHighlight: 'Profesional di Jakarta',
        description:
          'Raya Law Firm mendampingi individu dan korporasi dalam perkara pidana, perdata, bisnis, keluarga, pertanahan, hingga ketenagakerjaan, dari konsultasi awal sampai penyelesaian perkara di Jakarta, Makassar, dan seluruh Indonesia.',
        primaryCta: 'Konsultasi Gratis',
        secondaryCta: 'Lihat Layanan Kami',
        stats: [
          { num: '5+', label: 'Tahun Pengalaman' },
          { num: '30+', label: 'Kasus Diselesaikan' },
          { num: '7', label: 'Bidang Praktik' },
        ],
        imageAlt: 'Patung Dewi Keadilan memegang timbangan, simbol layanan hukum Raya Law Firm',
      },
      profile: {
        badge: 'Tentang Kami',
        title: 'Firma Hukum dengan Standar Internasional',
        description:
          'Di Raya Law Firm, kami meyakini bahwa hukum bukan sekadar instrumen penyelesaian sengketa, melainkan fondasi perlindungan hak, pengelolaan risiko, dan penciptaan nilai bagi individu maupun dunia usaha. Kami berkomitmen menghadirkan layanan hukum yang strategis, responsif, dan berorientasi pada hasil, sehingga setiap klien memperoleh perlindungan hukum yang kuat dan solusi yang efektif untuk mencapai tujuan mereka.',
        strengths: [
          'Pendekatan strategi litigasi dan non-litigasi yang terukur',
          'Tim advokat berpengalaman lintas bidang hukum',
          'Komunikasi transparan dan laporan perkembangan rutin',
          'Standar etika tinggi serta kerahasiaan klien terjaga',
        ],
        corporatePartners: 'Mitra Korporasi',
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
        quote: 'Legal Excellence. Strategic Advocacy. Trusted Results.',
        heading: 'Visi dan Misi Raya Law Firm',
        visionTitle: 'Visi',
        visionText:
          'Menjadi firma hukum terkemuka dengan menghadirkan solusi hukum strategis yang melindungi kepentingan klien, menciptakan kepastian hukum, dan mendukung keberlanjutan bisnis di era global.',
        missionTitle: 'Misi',
        missions: [
          'Memberikan layanan hukum yang unggul, profesional, dan berorientasi pada hasil, dengan mengedepankan integritas, ketelitian, dan standar etika tertinggi dalam setiap penugasan.',
          'Melindungi kepentingan hukum klien secara efektif dan strategis, baik melalui litigasi maupun penyelesaian sengketa alternatif, dengan pendekatan yang terukur dan berbasis risiko.',
          'Menjadi mitra hukum terpercaya bagi pelaku usaha, investor, profesional, dan individu, dalam menghadapi tantangan hukum yang kompleks di tingkat nasional maupun internasional.',
          'Menyediakan layanan hukum yang komprehensif dan bernilai tambah, mencakup aspek korporasi, ketenagakerjaan, hubungan industrial, energi, pertambangan, investasi, dan bidang hukum lainnya.',
          'Membangun hubungan jangka panjang dengan klien berdasarkan kepercayaan, kerahasiaan, responsivitas, dan kualitas layanan yang konsisten.',
          'Mendorong kepastian hukum dan tata kelola yang baik, melalui pemberian nasihat hukum yang strategis, praktis, dan berorientasi pada keberhasilan klien.',
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
        pauseAria: 'Jeda putar otomatis testimoni',
        playAria: 'Putar otomatis testimoni',
        carouselLabel: 'Testimoni klien Raya Law Firm',
        slideLabel: 'Testimoni {current} dari {total}',
        ratingLabel: 'Penilaian {rating} dari 5',
        swipeHint: 'Geser untuk melihat testimoni lainnya',
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
        fields: {
          name: 'Nama',
          phone: 'Nomor',
          email: 'Email',
          story: 'Ceritakan',
          namePlaceholder: 'Nama lengkap',
          phonePlaceholder: 'Contoh: 081234567890',
          emailPlaceholder: 'email@gmail.com',
          storyPlaceholder: 'Ceritakan kebutuhan atau masalah Anda',
          submit: 'Kirim',
        },
        errors: {
          name: 'Nama wajib diisi.',
          phone: 'Nomor telepon wajib diisi.',
          email: 'Email wajib diisi.',
          emailFormat: 'Format email tidak valid.',
          story: 'Ceritakan kebutuhan atau masalah Anda.',
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
      faq: {
        badge: 'Pertanyaan Umum',
        title: 'Pertanyaan Sebelum Menggunakan Jasa Pengacara',
        description:
          'Jawaban singkat atas hal-hal yang paling sering ditanyakan calon klien sebelum berkonsultasi dengan Raya Law Firm.',
        moreQuestions: 'Masih punya pertanyaan lain?',
        items: [
          {
            question: 'Layanan hukum apa saja yang ditangani Raya Law Firm?',
            answer:
              'Raya Law Firm menangani hukum pidana, hukum perdata, hukum bisnis & korporat, hukum keluarga, hukum properti & pertanahan, hukum ketenagakerjaan, serta sengketa tata usaha negara (PTUN). Kami mendampingi individu maupun korporasi melalui jalur litigasi dan non-litigasi, termasuk negosiasi dan mediasi.',
          },
          {
            question: 'Bagaimana cara mengajukan konsultasi hukum di Raya Law Firm?',
            answer:
              'Isi formulir di halaman Konsultasi atau kirim pesan langsung melalui WhatsApp ke 0813 3566 3379. Formulir akan mengarahkan Anda ke WhatsApp dengan ringkasan kasus yang sudah tersusun, lalu tim kami meninjau kasus dan menjadwalkan konsultasi lanjutan. Konsultasi awal tidak dipungut biaya.',
          },
          {
            question: 'Di mana alamat kantor Raya Law Firm?',
            answer:
              'Kantor Raya Law Firm berada di Jl. Tebet Barat Dalam IV No. 10, Tebet Barat, Jakarta Selatan 12810. Agar pertemuan berjalan efektif, jadwalkan kunjungan terlebih dahulu melalui WhatsApp atau telepon.',
          },
          {
            question: 'Kapan jam operasional Raya Law Firm?',
            answer:
              'Kantor kami buka Senin sampai Jumat pukul 08:00 - 17:00 WIB dan Sabtu pukul 09:00 - 13:00 WIB. Di luar jam tersebut, Anda tetap dapat mengirim ringkasan kasus melalui WhatsApp atau formulir konsultasi untuk ditindaklanjuti tim kami.',
          },
          {
            question: 'Apakah Raya Law Firm melayani klien di luar Jakarta?',
            answer:
              'Ya. Selain Jakarta, kami melayani klien di Makassar dan seluruh Indonesia. Konsultasi awal dapat dilakukan secara online melalui WhatsApp, dan layanan tersedia dalam Bahasa Indonesia maupun Bahasa Inggris.',
          },
          {
            question: 'Apakah informasi yang saya sampaikan dijaga kerahasiaannya?',
            answer:
              'Ya. Informasi yang Anda sampaikan dalam konsultasi dan pendampingan hukum dijaga kerahasiaannya sesuai prinsip kerahasiaan advokat-klien dalam Undang-Undang Nomor 18 Tahun 2003 tentang Advokat dan Kode Etik Advokat Indonesia, sebagaimana dijelaskan dalam Kebijakan Privasi kami.',
          },
        ],
      },
    },
    aboutPage: {
      metaTitle: 'Tentang Raya Law Firm',
      metaDescription:
        'Profil Raya Law Firm, kantor hukum di Tebet, Jakarta Selatan: bidang praktik, tim advokat, visi & misi, dan nilai yang kami pegang dalam layanan hukum profesional.',
      breadcrumb: 'Tentang Kami',
      heroEyebrow: 'Kantor Hukum di Jakarta Selatan',
      heroTitle: 'Tentang Raya Law Firm',
      heroDescription:
        'Berawal dari komitmen untuk menghadirkan keadilan yang aksesibel dan berkualitas, Raya Law Firm hadir sebagai mitra hukum yang berfokus pada ketepatan solusi.',
      profileBadge: 'Profil Singkat',
      profileTitle: 'Menyatukan Keahlian, Integritas, dan Dedikasi',
      backgroundTitle: 'Siapa Kami',
      commitmentsTitle: 'Komitmen kami kepada setiap klien',
      factsLabel: 'Raya Law Firm dalam angka',
      bilingualStat: { num: 'ID & EN', label: 'Layanan Dua Bahasa' },
      practiceBadge: 'Bidang Praktik',
      practiceTitle: 'Bidang Hukum yang Kami Tangani',
      practiceDescription:
        'Kami mendampingi individu dan korporasi melalui jalur litigasi maupun non-litigasi di tujuh bidang hukum berikut.',
      approachBadge: 'Cara Kami Bekerja',
      approachTitle: 'Alur Pendampingan yang Jelas Sejak Awal',
      approachDescription:
        'Setiap perkara dimulai dari pemahaman kebutuhan Anda, dilanjutkan strategi yang terukur, dan komunikasi yang transparan di setiap tahap.',
      teamBadge: 'Tim Advokat',
      teamTitle: 'Advokat yang Mendampingi Perkara Anda',
      teamDescription:
        'Kenali advokat Raya Law Firm beserta posisi dan bidang keahlian masing-masing sebelum Anda berkonsultasi.',
      teamCta: 'Lihat Semua Profil Tim',
      officeBadge: 'Kantor & Jangkauan',
      officeTitle: 'Berkantor di Jakarta Selatan, Melayani Seluruh Indonesia',
      officeDescription:
        'Kantor kami berada di Tebet, Jakarta Selatan. Selain Jakarta, kami melayani klien di Makassar dan seluruh Indonesia. Konsultasi awal dapat dilakukan secara online melalui WhatsApp, dan layanan tersedia dalam Bahasa Indonesia maupun Bahasa Inggris.',
      areasLabel: 'Wilayah layanan',
      areas: ['Jakarta', 'Makassar', 'Seluruh Indonesia'],
      languagesLabel: 'Bahasa layanan',
      languages: 'Bahasa Indonesia & Bahasa Inggris',
      background:
        'Di Raya Law Firm, kami meyakini bahwa hukum bukan sekadar instrumen penyelesaian sengketa, melainkan fondasi perlindungan hak, pengelolaan risiko, dan penciptaan nilai bagi individu maupun dunia usaha. Kami berkomitmen menghadirkan layanan hukum yang strategis, responsif, dan berorientasi pada hasil, sehingga setiap klien memperoleh perlindungan hukum yang kuat dan solusi yang efektif untuk mencapai tujuan mereka.',
      visionBadge: 'Visi dan Misi',
      visionTitle: 'Visi dan Misi',
      visionText:
        'Menjadi firma hukum terkemuka dengan menghadirkan solusi hukum strategis yang melindungi kepentingan klien, menciptakan kepastian hukum, dan mendukung keberlanjutan bisnis di era global.',
      missionTitle: 'Misi',
      missions: [
        'Memberikan layanan hukum yang unggul, profesional, dan berorientasi pada hasil, dengan mengedepankan integritas, ketelitian, dan standar etika tertinggi dalam setiap penugasan.',
        'Melindungi kepentingan hukum klien secara efektif dan strategis, baik melalui litigasi maupun penyelesaian sengketa alternatif, dengan pendekatan yang terukur dan berbasis risiko.',
        'Menjadi mitra hukum terpercaya bagi pelaku usaha, investor, profesional, dan individu, dalam menghadapi tantangan hukum yang kompleks di tingkat nasional maupun internasional.',
        'Menyediakan layanan hukum yang komprehensif dan bernilai tambah, mencakup aspek korporasi, ketenagakerjaan, hubungan industrial, energi, pertambangan, investasi, dan bidang hukum lainnya.',
        'Membangun hubungan jangka panjang dengan klien berdasarkan kepercayaan, kerahasiaan, responsivitas, dan kualitas layanan yang konsisten.',
        'Mendorong kepastian hukum dan tata kelola yang baik, melalui pemberian nasihat hukum yang strategis, praktis, dan berorientasi pada keberhasilan klien.',
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
      imageAlt: 'Tim Raya Law Firm',
      finalTitle: 'Siap Mendiskusikan Kebutuhan Hukum Anda?',
      finalDescription:
        'Tim kami siap memberikan konsultasi awal dan pendampingan strategis sesuai kebutuhan Anda.',
      finalCta: 'Konsultasi Sekarang',
    },
    servicesPage: {
      metaTitle: 'Layanan Konsultan Hukum | Raya Law Firm',
      metaDescription:
        'Layanan konsultan hukum profesional untuk pidana, perdata, bisnis, pertanahan, keluarga, dan ketenagakerjaan di Makassar, Jakarta, dan seluruh Indonesia.',
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
      metaTitle: 'Konsultasi Hukum Profesional | Raya Law Firm',
      metaDescription:
        'Ajukan konsultasi hukum bersama Raya Law Firm untuk mendapatkan arahan dari tim advokat berpengalaman dan pendampingan perkara yang profesional.',
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
      caseDetails: 'Ringkasan Kasus',
      fields: {
        name: 'Nama lengkap',
        phone: 'Nomor WhatsApp / telepon',
        email: 'Email',
        story: 'Ceritakan kasus Anda',
      },
      placeholders: {
        name: 'Nama sesuai identitas',
        phone: 'Contoh: 081234567890',
        email: 'nama@email.com',
        story: 'Ceritakan kronologi singkat, pihak yang terlibat, dan bantuan yang Anda butuhkan',
      },
      hints: {
        phone: 'Tim kami akan menghubungi Anda melalui nomor ini.',
        story: 'Cukup ringkas, maksimal 500 karakter.',
      },
      errors: {
        name: 'Nama wajib diisi.',
        phone: 'Nomor telepon wajib diisi.',
        phoneFormat: 'Nomor telepon minimal 9 digit dan hanya berisi angka.',
        email: 'Email wajib diisi.',
        emailFormat: 'Format email tidak valid.',
        story: 'Ceritakan kebutuhan atau masalah Anda.',
      },
      errorSummary: 'Mohon lengkapi data yang ditandai.',
      submit: 'Kirim via WhatsApp',
      processing: 'Memproses...',
      successTitle: 'Ringkasan kasus siap dikirim',
      successDescription:
        'WhatsApp dibuka di tab baru dengan ringkasan kasus Anda. Jika tidak terbuka, gunakan tombol berikut.',
      openWhatsApp: 'Buka WhatsApp',
      privacyPrefix: 'Data Anda dijaga kerahasiaannya sesuai',
    },
    contactPage: {
      metaTitle: 'Kontak Konsultan Hukum | Raya Law Firm',
      metaDescription:
        'Hubungi Raya Law Firm untuk konsultasi hukum, jadwal pertemuan, dan kebutuhan pendampingan hukum profesional di Indonesia.',
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
          detail: '0813 3566 3379 / 0853 4510 8869',
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
        name: 'Nama lengkap',
        phone: 'Nomor telepon',
        email: 'Email',
        story: 'Pesan Anda',
      },
      placeholders: {
        name: 'Nama sesuai identitas',
        phone: 'Contoh: 081234567890',
        email: 'nama@email.com',
        story: 'Tuliskan pertanyaan atau kebutuhan pendampingan hukum Anda',
      },
      submit: 'Kirim lewat Email',
      mailNote: 'Form ini akan membuka aplikasi email Anda untuk mengirim pesan.',
      waMessage: 'Halo Raya Law Firm, saya ingin konsultasi.',
      mailSubject: 'Pesan dari website Raya Law Firm',
      whatsappLabel: 'WhatsApp',
      mapTitle: 'Peta Lokasi',
      openMap: 'Buka di Google Maps',
      appointmentNote: 'Kunjungan kantor sebaiknya dijadwalkan terlebih dahulu melalui WhatsApp atau telepon.',
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
      filterLabel: 'Filter testimoni berdasarkan jenis perkara',
      listTitle: 'Testimoni berdasarkan jenis perkara',
      ctaTitle: 'Butuh pendampingan untuk perkara Anda?',
      ctaDescription:
        'Ceritakan kebutuhan hukum Anda dan tim advokat kami akan memberikan arahan awal secara rahasia.',
    },
    notFoundPage: {
      eyebrow: 'Error 404',
      title: 'Halaman tidak ditemukan',
      description:
        'Maaf, halaman yang Anda cari mungkin sudah dipindahkan, diganti namanya, atau tidak tersedia. Gunakan tautan berikut untuk melanjutkan.',
      backHome: 'Kembali ke Beranda',
      linksTitle: 'Halaman yang mungkin Anda cari',
      links: {
        services: 'Tujuh bidang layanan hukum kami',
        articles: 'Wawasan dan analisis hukum terbaru',
        consultation: 'Ceritakan masalah hukum Anda secara gratis',
        contact: 'Alamat kantor, telepon, dan WhatsApp',
      },
    },
    privacyPage: {
      metaTitle: 'Kebijakan Privasi | Raya Law Firm',
      metaDescription:
        'Kebijakan privasi Raya Law Firm mengenai pengumpulan, penggunaan, dan perlindungan data pribadi klien dan pengunjung website.',
      breadcrumb: 'Kebijakan Privasi',
      title: 'Kebijakan Privasi',
      description:
        'Komitmen kami dalam menjaga kerahasiaan dan perlindungan data pribadi klien serta pengunjung website.',
      tocTitle: 'Daftar Isi',
      sections: [
        {
          title: '1. Pendahuluan',
          body: `Raya Law Firm berkomitmen menjaga kerahasiaan dan keamanan data pribadi Anda. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi yang Anda berikan melalui website dan layanan konsultasi kami. Dengan menggunakan layanan kami, Anda menyetujui kebijakan ini.`,
        },
        {
          title: '2. Informasi yang Kami Kumpulkan',
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
          title: '3. Kerahasiaan Informasi Klien (Attorney-Client Privilege)',
          body: `Seluruh informasi yang Anda sampaikan dalam konteks konsultasi dan perwakilan hukum dilindungi oleh prinsip kerahasiaan advokat-klien (attorney-client privilege) sesuai dengan Undang-Undang Nomor 18 Tahun 2003 tentang Advokat dan Kode Etik Advokat Indonesia. Kami tidak akan mengungkapkan informasi Anda kepada pihak ketiga tanpa izin tertulis Anda, kecuali diwajibkan oleh hukum.`,
        },
        {
          title: '4. Penggunaan Informasi',
          body: `Kami menggunakan informasi Anda untuk:
- Memberikan layanan konsultasi dan pendampingan hukum
- Menghubungi Anda terkait perkembangan kasus
- Mengirimkan informasi terkait layanan hukum yang relevan (jika Anda menyetujui)
- Meningkatkan kualitas layanan dan website kami
- Memenuhi kewajiban hukum yang berlaku`,
        },
        {
          title: '5. Berbagi Informasi dengan Pihak Ketiga',
          body: `Kami TIDAK menjual, menyewakan, atau memperdagangkan data pribadi Anda. Kami hanya dapat berbagi informasi dalam kondisi berikut:
- Rekan hukum atau ahli yang ditunjuk dalam penanganan kasus Anda (dengan persetujuan Anda)
- Penyedia layanan teknologi yang membantu operasional website (dengan perjanjian kerahasiaan)
- Kewajiban hukum berdasarkan putusan pengadilan atau peraturan perundang-undangan`,
        },
        {
          title: '6. Keamanan Data',
          body: `Kami menerapkan langkah-langkah keamanan teknis dan organisasional yang wajar untuk melindungi data Anda, termasuk enkripsi data, akses terbatas hanya bagi personel berwenang, dan pemantauan keamanan secara berkala. Namun, tidak ada sistem keamanan yang sepenuhnya bebas risiko di internet.`,
        },
        {
          title: '7. Penyimpanan Data',
          body: `Data konsultasi dan kasus disimpan selama hubungan hukum berlangsung dan minimal 5 (lima) tahun setelah penyelesaian kasus, sesuai ketentuan hukum yang berlaku dan keperluan dokumentasi profesional. Data website (analytics) disimpan maksimal 2 tahun.`,
        },
        {
          title: '8. Hak-Hak Anda',
          body: `Sesuai peraturan perlindungan data yang berlaku di Indonesia, Anda berhak untuk:
- Mengakses data pribadi yang kami simpan tentang Anda
- Meminta koreksi data yang tidak akurat
- Meminta penghapusan data (dengan mempertimbangkan kewajiban hukum kami)
- Menarik persetujuan pemrosesan data kapan saja
- Mengajukan pengaduan kepada otoritas yang berwenang`,
        },
        {
          title: '9. Cookies',
          body: `Website kami menggunakan cookies fungsional untuk meningkatkan pengalaman pengguna. Anda dapat mengatur pengaturan cookies melalui browser Anda. Menonaktifkan cookies tertentu dapat mempengaruhi fungsi website.`,
        },
        {
          title: '10. Komunikasi melalui WhatsApp',
          body: `Ketika Anda menghubungi kami melalui WhatsApp, komunikasi tunduk pada kebijakan privasi WhatsApp (Meta). Kami menyarankan Anda untuk tidak berbagi informasi sangat sensitif melalui aplikasi pihak ketiga sebelum ada kesepakatan kerahasiaan formal.`,
        },
        {
          title: '11. Perubahan Kebijakan Ini',
          body: `Kami dapat memperbarui kebijakan privasi ini sewaktu-waktu. Perubahan material akan diberitahukan melalui website atau email. Tanggal pembaruan terakhir tercantum di bawah dokumen ini.`,
        },
        {
          title: '12. Hubungi Kami',
          body: `Untuk pertanyaan mengenai kebijakan privasi ini atau untuk menggunakan hak-hak Anda:
Email: info@rayalawfirm.com
Telepon: +62 813 3566 3379
Alamat: Jl. Tebet Barat Dalam IV No. 10, Tebet Barat, Jakarta Selatan 12810

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
      tellUs: 'CERITAKAN:',
      labels: {
        name: 'Nama',
        phone: 'Telepon',
        email: 'Email',
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
      mainNavigation: 'Main navigation',
      mobileNavigation: 'Navigation menu',
      openMenu: 'Open menu',
      servicesMenu: 'Show services submenu',
      skipToContent: 'Skip to main content',
      logoHomeLabel: 'Raya Law Firm, back to home',
      logoAlt: 'Raya Law Firm logo',
      whatsappFab: 'Chat with Raya Law Firm on WhatsApp (opens in a new tab)',
      opensInNewTab: '(opens in a new tab)',
      required: 'required',
      directions: 'Get directions on Google Maps',
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
      areasServed: 'Serving clients in Jakarta, Makassar, and throughout Indonesia.',
      followUs: 'Follow us',
      whatsapp: 'WhatsApp',
      legal: 'Legal',
    },
    home: {
      metaTitle: 'Raya Law Firm | Law Firm & Legal Consultants in Jakarta',
      metaDescription:
        'Raya Law Firm, a law office in Tebet, South Jakarta. Legal consultation and representation for criminal, civil, business, family, land, and employment matters.',
      hero: {
        badge: 'Raya Law Firm · South Jakarta',
        titleLine: 'Professional Law Firm &',
        titleHighlight: 'Legal Consultants in Jakarta',
        description:
          'Raya Law Firm represents individuals and corporations in criminal, civil, business, family, land, and employment matters, from the first consultation to case resolution in Jakarta, Makassar, and throughout Indonesia.',
        primaryCta: 'Free Consultation',
        secondaryCta: 'View Our Services',
        stats: [
          { num: '5+', label: 'Years of Experience' },
          { num: '30+', label: 'Cases Resolved' },
          { num: '7', label: 'Practice Areas' },
        ],
        imageAlt: 'Lady Justice statue holding scales, a symbol of Raya Law Firm legal services',
      },
      profile: {
        badge: 'About Us',
        title: 'A Law Firm with International Standards',
        description:
          'At Raya Law Firm, we believe that the law is not merely a mechanism for resolving disputes, but a foundation for protecting rights, managing risks, and creating value for individuals and businesses. We are committed to delivering strategic, responsive, and results-oriented legal services, ensuring that every client receives strong legal protection and effective solutions to achieve their objectives.',
        strengths: [
          'Measured litigation and non-litigation strategies',
          'Experienced advocates across multiple legal fields',
          'Transparent communication and regular progress reports',
          'High ethical standards and protected client confidentiality',
        ],
        corporatePartners: 'Corporate Partners',
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
        quote: 'Legal Excellence. Strategic Advocacy. Trusted Results.',
        heading: 'Raya Law Firm Vision and Mission',
        visionTitle: 'Vision',
        visionText:
          'To be a leading law firm recognized for delivering strategic legal solutions that safeguard clients\' interests, foster legal certainty, and support sustainable business growth in an increasingly interconnected global environment.',
        missionTitle: 'Mission',
        missions: [
          'To provide exceptional, professional, and results-driven legal services, guided by integrity, precision, and the highest ethical standards.',
          'To safeguard clients\' legal interests effectively and strategically, through litigation, dispute resolution, and risk-based legal strategies.',
          'To serve as a trusted legal partner for business owners, investors, professionals, and individuals, addressing complex legal challenges across domestic and international landscapes.',
          'To deliver comprehensive and value-added legal services, covering corporate matters, employment and industrial relations, mining and energy, investments, and other areas of law.',
          'To cultivate long-term client relationships built on trust, confidentiality, responsiveness, and consistent excellence.',
          'To promote legal certainty and sound governance, by providing strategic, practical, and business-oriented legal counsel that contributes to clients\' success.',
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
        pauseAria: 'Pause testimonial autoplay',
        playAria: 'Play testimonial autoplay',
        carouselLabel: 'Raya Law Firm client testimonials',
        slideLabel: 'Testimonial {current} of {total}',
        ratingLabel: 'Rated {rating} out of 5',
        swipeHint: 'Swipe to see more testimonials',
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
        fields: {
          name: 'Name',
          phone: 'Number',
          email: 'Email',
          story: 'Tell Us',
          namePlaceholder: 'Full name',
          phonePlaceholder: 'Example: 081234567890',
          emailPlaceholder: 'email@gmail.com',
          storyPlaceholder: 'Tell us about your needs or concerns',
          submit: 'Send',
        },
        errors: {
          name: 'Name is required.',
          phone: 'Phone number is required.',
          email: 'Email is required.',
          emailFormat: 'Invalid email format.',
          story: 'Tell us about your needs or concerns.',
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
      faq: {
        badge: 'FAQ',
        title: 'Questions to Ask Before Hiring a Lawyer',
        description:
          'Short answers to the questions prospective clients ask most often before consulting with Raya Law Firm.',
        moreQuestions: 'Still have other questions?',
        items: [
          {
            question: 'What legal services does Raya Law Firm handle?',
            answer:
              'Raya Law Firm handles criminal law, civil law, business & corporate law, family law, property & land law, employment law, and state administrative disputes (PTUN). We represent individuals and corporations through litigation and non-litigation channels, including negotiation and mediation.',
          },
          {
            question: 'How do I request a legal consultation with Raya Law Firm?',
            answer:
              'Fill in the form on the Consultation page or message us directly on WhatsApp at +62 813 3566 3379. The form takes you to WhatsApp with a structured case summary, then our team reviews your case and schedules a follow-up consultation. The initial consultation is free of charge.',
          },
          {
            question: 'Where is the Raya Law Firm office?',
            answer:
              'The Raya Law Firm office is located at Jl. Tebet Barat Dalam IV No. 10, Tebet Barat, Jakarta Selatan 12810, Indonesia. To make the meeting effective, please schedule your visit in advance via WhatsApp or phone.',
          },
          {
            question: 'What are Raya Law Firm office hours?',
            answer:
              'Our office is open Monday to Friday from 08:00 to 17:00 WIB and Saturday from 09:00 to 13:00 WIB. Outside these hours, you can still send your case summary via WhatsApp or the consultation form for our team to follow up.',
          },
          {
            question: 'Does Raya Law Firm serve clients outside Jakarta?',
            answer:
              'Yes. Besides Jakarta, we serve clients in Makassar and throughout Indonesia. The initial consultation can be done online via WhatsApp, and our services are available in both Indonesian and English.',
          },
          {
            question: 'Is the information I share kept confidential?',
            answer:
              'Yes. Information you share during consultation and legal representation is kept confidential under the attorney-client privilege set out in Law Number 18 of 2003 concerning Advocates and the Indonesian Advocates Code of Ethics, as explained in our Privacy Policy.',
          },
        ],
      },
    },
    aboutPage: {
      metaTitle: 'About Raya Law Firm',
      metaDescription:
        'Raya Law Firm profile, a law office in Tebet, South Jakarta: practice areas, advocate team, vision & mission, and the values behind our professional legal services.',
      breadcrumb: 'About Us',
      heroEyebrow: 'Law Firm in South Jakarta',
      heroTitle: 'About Raya Law Firm',
      heroDescription:
        'Founded on a commitment to accessible and high-quality justice, Raya Law Firm is a legal partner focused on precise solutions.',
      profileBadge: 'Brief Profile',
      profileTitle: 'Uniting Expertise, Integrity, and Dedication',
      backgroundTitle: 'Who We Are',
      commitmentsTitle: 'Our commitment to every client',
      factsLabel: 'Raya Law Firm in numbers',
      bilingualStat: { num: 'ID & EN', label: 'Bilingual Service' },
      practiceBadge: 'Practice Areas',
      practiceTitle: 'Areas of Law We Handle',
      practiceDescription:
        'We represent individuals and corporations through litigation and non-litigation channels across the following seven areas of law.',
      approachBadge: 'How We Work',
      approachTitle: 'A Clear Engagement Process from Day One',
      approachDescription:
        'Every matter starts with understanding your needs, followed by a measured strategy and transparent communication at every stage.',
      teamBadge: 'Advocate Team',
      teamTitle: 'The Advocates Behind Your Case',
      teamDescription:
        'Get to know Raya Law Firm advocates, their positions, and their areas of expertise before you consult.',
      teamCta: 'View All Team Profiles',
      officeBadge: 'Office & Reach',
      officeTitle: 'Based in South Jakarta, Serving All of Indonesia',
      officeDescription:
        'Our office is located in Tebet, South Jakarta. Besides Jakarta, we serve clients in Makassar and throughout Indonesia. The initial consultation can be done online via WhatsApp, and our services are available in both Indonesian and English.',
      areasLabel: 'Areas served',
      areas: ['Jakarta', 'Makassar', 'Throughout Indonesia'],
      languagesLabel: 'Service languages',
      languages: 'Indonesian & English',
      background:
        'At Raya Law Firm, we believe that the law is not merely a mechanism for resolving disputes, but a foundation for protecting rights, managing risks, and creating value for individuals and businesses. We are committed to delivering strategic, responsive, and results-oriented legal services, ensuring that every client receives strong legal protection and effective solutions to achieve their objectives.',
      visionBadge: 'Vision and Mission',
      visionTitle: 'Vision and Mission',
      visionText:
        'To be a leading law firm recognized for delivering strategic legal solutions that safeguard clients\' interests, foster legal certainty, and support sustainable business growth in an increasingly interconnected global environment.',
      missionTitle: 'Mission',
      missions: [
        'To provide exceptional, professional, and results-driven legal services, guided by integrity, precision, and the highest ethical standards.',
        'To safeguard clients\' legal interests effectively and strategically, through litigation, dispute resolution, and risk-based legal strategies.',
        'To serve as a trusted legal partner for business owners, investors, professionals, and individuals, addressing complex legal challenges across domestic and international landscapes.',
        'To deliver comprehensive and value-added legal services, covering corporate matters, employment and industrial relations, mining and energy, investments, and other areas of law.',
        'To cultivate long-term client relationships built on trust, confidentiality, responsiveness, and consistent excellence.',
        'To promote legal certainty and sound governance, by providing strategic, practical, and business-oriented legal counsel that contributes to clients\' success.',
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
      imageAlt: 'Raya Law Firm Team',
      finalTitle: 'Ready to Discuss Your Legal Needs?',
      finalDescription:
        'Our team is ready to provide initial consultation and strategic assistance according to your needs.',
      finalCta: 'Book a Consultation',
    },
    servicesPage: {
      metaTitle: 'Legal Consultant Services | Raya Law Firm',
      metaDescription:
        'Professional legal consultant services for criminal, civil, business, land, family, and employment matters in Makassar, Jakarta, and across Indonesia.',
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
      metaTitle: 'Professional Legal Consultation | Raya Law Firm',
      metaDescription:
        'Request legal consultation with Raya Law Firm and receive guidance from experienced advocates for professional case assistance.',
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
      caseDetails: 'Case Summary',
      fields: {
        name: 'Full name',
        phone: 'WhatsApp / phone number',
        email: 'Email',
        story: 'Tell us about your case',
      },
      placeholders: {
        name: 'Name as on your ID',
        phone: 'Example: 081234567890',
        email: 'name@email.com',
        story: 'Briefly describe the timeline, parties involved, and the help you need',
      },
      hints: {
        phone: 'Our team will contact you on this number.',
        story: 'Keep it short, up to 500 characters.',
      },
      errors: {
        name: 'Name is required.',
        phone: 'Phone number is required.',
        phoneFormat: 'Phone number must have at least 9 digits and contain numbers only.',
        email: 'Email is required.',
        emailFormat: 'Invalid email format.',
        story: 'Tell us about your needs or concerns.',
      },
      errorSummary: 'Please complete the highlighted fields.',
      submit: 'Send via WhatsApp',
      processing: 'Processing...',
      successTitle: 'Your case summary is ready to send',
      successDescription:
        'WhatsApp opened in a new tab with your case summary. If it did not open, use the button below.',
      openWhatsApp: 'Open WhatsApp',
      privacyPrefix: 'Your data is kept confidential in line with our',
    },
    contactPage: {
      metaTitle: 'Contact Legal Consultant | Raya Law Firm',
      metaDescription:
        'Contact Raya Law Firm for legal consultation, appointment scheduling, and professional legal assistance needs in Indonesia.',
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
          detail: '0813 3566 3379 / 0853 4510 8869',
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
        name: 'Full name',
        phone: 'Phone number',
        email: 'Email',
        story: 'Your message',
      },
      placeholders: {
        name: 'Name as on your ID',
        phone: 'Example: 081234567890',
        email: 'name@email.com',
        story: 'Write your question or legal assistance needs',
      },
      submit: 'Send by Email',
      mailNote: 'This form will open your email app to send the message.',
      waMessage: 'Hello Raya Law Firm, I would like to consult.',
      mailSubject: 'Message from the Raya Law Firm website',
      whatsappLabel: 'WhatsApp',
      mapTitle: 'Location Map',
      openMap: 'Open in Google Maps',
      appointmentNote: 'Please schedule office visits in advance via WhatsApp or phone.',
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
      filterLabel: 'Filter testimonials by case type',
      listTitle: 'Testimonials by case type',
      ctaTitle: 'Need representation for your case?',
      ctaDescription:
        'Tell us about your legal needs and our advocates will give you confidential initial guidance.',
    },
    notFoundPage: {
      eyebrow: 'Error 404',
      title: 'Page not found',
      description:
        'Sorry, the page you are looking for may have been moved, renamed, or is no longer available. Use the links below to continue.',
      backHome: 'Back to Home',
      linksTitle: 'Pages you may be looking for',
      links: {
        services: 'Our seven legal practice areas',
        articles: 'The latest legal insights and analysis',
        consultation: 'Tell us about your legal issue for free',
        contact: 'Office address, phone, and WhatsApp',
      },
    },
    privacyPage: {
      metaTitle: 'Privacy Policy | Raya Law Firm',
      metaDescription:
        'Raya Law Firm privacy policy on the collection, use, and protection of client and website visitor personal data.',
      breadcrumb: 'Privacy Policy',
      title: 'Privacy Policy',
      description:
        'Our commitment to maintaining confidentiality and protecting personal data of clients and website visitors.',
      tocTitle: 'Contents',
      sections: [
        {
          title: '1. Introduction',
          body: `Raya Law Firm is committed to protecting the confidentiality and security of your personal data. This policy explains how we collect, use, and protect information you provide through our website and consultation services. By using our services, you agree to this policy.`,
        },
        {
          title: '2. Information We Collect',
          body: `a. Data you provide directly:
- Full name and identity information
- Phone/WhatsApp number and email address
- Case chronology and statements you provide
- Documents or evidence submitted for consultation purposes

b. Data collected automatically:
- IP address and device data
- Pages visited and visit duration
- Referral source (how you found our website)
- Cookie data for a better user experience`,
        },
        {
          title: '3. Client Confidentiality (Attorney-Client Privilege)',
          body: `All information you provide in the context of consultation and legal representation is protected by attorney-client confidentiality in accordance with Law Number 18 of 2003 concerning Advocates and the Indonesian Advocates Code of Ethics. We will not disclose your information to third parties without your written permission, except when required by law.`,
        },
        {
          title: '4. Use of Information',
          body: `We use your information to:
- Provide consultation and legal assistance services
- Contact you regarding case developments
- Send relevant legal service information (if you consent)
- Improve the quality of our services and website
- Fulfill applicable legal obligations`,
        },
        {
          title: '5. Sharing Information with Third Parties',
          body: `We DO NOT sell, rent, or trade your personal data. We may only share information in the following circumstances:
- Legal colleagues or experts appointed for your case handling (with your consent)
- Technology service providers supporting website operations (under confidentiality agreements)
- Legal obligations based on court orders or statutory regulations`,
        },
        {
          title: '6. Data Security',
          body: `We implement reasonable technical and organizational security measures to protect your data, including data encryption, restricted access for authorized personnel only, and regular security monitoring. However, no internet security system is entirely risk-free.`,
        },
        {
          title: '7. Data Retention',
          body: `Consultation and case data are retained during the legal relationship and for at least 5 (five) years after case completion, in line with applicable legal requirements and professional documentation needs. Website data (analytics) is retained for a maximum of 2 years.`,
        },
        {
          title: '8. Your Rights',
          body: `Under applicable data protection regulations in Indonesia, you have the right to:
- Access the personal data we store about you
- Request correction of inaccurate data
- Request deletion of data (subject to our legal obligations)
- Withdraw consent for data processing at any time
- File a complaint with the authorized authority`,
        },
        {
          title: '9. Cookies',
          body: `Our website uses functional cookies to improve user experience. You can adjust cookie settings through your browser. Disabling certain cookies may affect website functionality.`,
        },
        {
          title: '10. Communication through WhatsApp',
          body: `When you contact us through WhatsApp, the communication is subject to WhatsApp (Meta) privacy policy. We recommend that you avoid sharing highly sensitive information through third-party applications before a formal confidentiality agreement is in place.`,
        },
        {
          title: '11. Changes to This Policy',
          body: `We may update this privacy policy from time to time. Material changes will be announced through the website or email. The last updated date is listed below this document.`,
        },
        {
          title: '12. Contact Us',
          body: `For questions about this privacy policy or to exercise your rights:
Email: info@rayalawfirm.com
Phone: +62 813 3566 3379
Address: Jl. Tebet Barat Dalam IV No. 10, Tebet Barat, Jakarta Selatan 12810, Indonesia

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
      tellUs: 'TELL US:',
      labels: {
        name: 'Name',
        phone: 'Phone',
        email: 'Email',
      },
    },
  },
};

export function getDictionary(locale: Locale = defaultLocale) {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}
