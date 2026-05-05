export interface Testimonial {
  id: number;
  name: string;
  position: string;
  company?: string;
  kasusType: string;
  rating: number;
  text: string;
  photo: string;
  date: string;
  featured: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Budi Santoso',
    position: 'Direktur Utama',
    company: 'PT Maju Bersama',
    kasusType: 'Sengketa Bisnis',
    rating: 5,
    text:
      'Raya Law Firm menangani sengketa kontrak bisnis kami dengan sangat terstruktur dan transparan. Timnya mampu menjelaskan setiap opsi hukum dengan jelas sehingga keputusan bisnis tetap aman. Hasil akhirnya memuaskan dan menjaga hubungan kami dengan mitra.',
    photo: '/images/testimonials/budi-santoso.jpg',
    date: '2024-02-10',
    featured: true,
  },
  {
    id: 2,
    name: 'Nia Lestari',
    position: 'Ibu Rumah Tangga',
    kasusType: 'Hukum Keluarga',
    rating: 5,
    text:
      'Pendampingan yang saya terima sangat empatik dan tetap profesional. Proses perceraian dan pengaturan hak asuh berjalan lebih jelas, dan saya selalu diberi pemahaman yang lengkap sebelum mengambil langkah. Saya merasa didampingi dengan penuh hormat.',
    photo: '/images/testimonials/nia-lestari.jpg',
    date: '2024-03-05',
    featured: true,
  },
  {
    id: 3,
    name: 'Andi Prabowo',
    position: 'Manajer Operasional',
    company: 'PT Sentra Karya',
    kasusType: 'Ketenagakerjaan',
    rating: 5,
    text:
      'Raya Law Firm membantu perusahaan kami menyelesaikan perselisihan hubungan industrial dengan prosedur yang tepat. Mereka menjaga komunikasi tetap kondusif dan hasil mediasi bisa diterima semua pihak. Prosesnya cepat dan rapi secara administrasi.',
    photo: '/images/testimonials/andi-prabowo.jpg',
    date: '2024-01-22',
    featured: false,
  },
  {
    id: 4,
    name: 'Rudi Hartono',
    position: 'Pemilik Usaha',
    kasusType: 'Hukum Perdata',
    rating: 5,
    text:
      'Sengketa wanprestasi yang kami alami ditangani dengan strategi yang jelas sejak awal. Tim memberikan analisis risiko yang realistis dan menyiapkan bukti dengan sangat teliti. Hasil putusan menguatkan posisi kami.',
    photo: '/images/testimonials/rudi-hartono.jpg',
    date: '2023-12-18',
    featured: false,
  },
  {
    id: 5,
    name: 'Dewi Anggraini',
    position: 'Pengusaha Properti',
    company: 'Anggraini Property',
    kasusType: 'Properti & Pertanahan',
    rating: 5,
    text:
      'Masalah sertifikat ganda yang kami hadapi berhasil diselesaikan dengan verifikasi dan negosiasi yang cermat. Saya mengapresiasi ketelitian tim dalam menelusuri dokumen dan berkoordinasi dengan instansi terkait. Aset kami akhirnya aman.',
    photo: '/images/testimonials/dewi-anggraini.jpg',
    date: '2024-04-14',
    featured: false,
  },
  {
    id: 6,
    name: 'Taufik Hidayat',
    position: 'Karyawan Swasta',
    kasusType: 'Hukum Pidana',
    rating: 5,
    text:
      'Pendampingan sejak pemeriksaan awal sangat membantu menjaga hak saya. Tim Raya Law Firm menjelaskan setiap tahap proses pidana dengan jelas dan menyiapkan strategi yang meyakinkan. Saya merasa tenang karena selalu didampingi.',
    photo: '/images/testimonials/taufik-hidayat.jpg',
    date: '2024-05-02',
    featured: false,
  },
];
