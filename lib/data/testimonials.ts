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
    name: 'CV. Mandiri Technology Sejahtera',
    position: 'Klien Perusahaan',
    kasusType: 'Mediasi Perkara Bisnis',
    rating: 5,
    text:
      'Terima kasih kepada Raya Law Firm telah membantu menyelesaikan perkara dengan cara mediasi antara saya dengan klien saya. Raya Law Firm memberikan arahan serta langkah hukum yang sangat tepat pada perkara yang saya hadapi. Terima kasih Team Raya Law Firm, sukses selalu.',
    photo: '/images/logo-rayalawfirm.png',
    date: '2026-06-01',
    featured: true,
  },
  {
    id: 2,
    name: 'Direktur PT. An*** Tiga P***',
    position: 'Pelaku Usaha',
    kasusType: 'Perselisihan Hubungan Industrial',
    rating: 5,
    text:
      'Sebagai pelaku usaha, perselisihan hubungan industrial adalah hal yang sangat sensitif bagi stabilitas perusahaan. RAYA Law Firm membantu kami menyelesaikan dinamika ketenagakerjaan ini dengan pendekatan yang sangat profesional, objektif, dan tetap menjaga hubungan baik antar pihak. Solusi strategis yang mereka berikan berhasil menyelaraskan regulasi hukum dengan kelangsungan bisnis kami. Sangat andal!',
    photo: '/images/logo-rayalawfirm.png',
    date: '2026-06-02',
    featured: true,
  },
  {
    id: 3,
    name: 'Dwi Rifka',
    position: 'Ibu Rumah Tangga',
    kasusType: 'Hak Asuh Anak',
    rating: 5,
    text:
      'Menghadapi proses persidangan Hak Asuh Anak adalah masa-masa terberat dalam hidup saya. Namun, tim pengacara RAYA Law Firm tidak hanya bekerja sebagai penasihat hukum, tetapi juga menjadi sandaran emosional yang luar biasa. Mereka berjuang dengan penuh empati dan kegigihan demi kepentingan terbaik anak saya. Terima kasih atas dedikasi dan hasil akhir yang luar biasa ini.',
    photo: '/images/logo-rayalawfirm.png',
    date: '2026-06-03',
    featured: false,
  },
  {
    id: 4,
    name: 'Eka Sapri',
    position: 'Wiraswasta',
    kasusType: 'Sengketa Tanah',
    rating: 5,
    text:
      'Aset properti adalah modal krusial bagi seorang wiraswasta, dan saat tanah saya terlibat sengketa klaim sepihak, saya sempat khawatir. Untungnya, RAYA Law Firm bergerak cepat. Analisis bukti-bukti hukum mereka sangat jeli, taktik di persidangan sangat matang, hingga akhirnya hak milik saya berhasil dipertahankan secara mutlak. Pendampingan yang sangat berkelas!',
    photo: '/images/logo-rayalawfirm.png',
    date: '2026-06-04',
    featured: false,
  },
  {
    id: 5,
    name: 'UD. Ana',
    position: 'Pemilik Usaha Dagang',
    kasusType: 'Perselisihan Hubungan Industrial',
    rating: 5,
    text:
      'Sebagai pemilik usaha dagang, kami sempat kebingungan saat menghadapi perselisihan hubungan industrial dengan mantan pekerja. RAYA Law Firm hadir mendampingi kami dari tahap bipartit hingga mediasi dengan sangat sabar. Mereka membantu kami memahami hak dan kewajiban secara transparan, sehingga masalah bisa selesai dengan adil tanpa mengganggu operasional usaha harian kami.',
    photo: '/images/logo-rayalawfirm.png',
    date: '2026-06-05',
    featured: false,
  },
  {
    id: 6,
    name: 'Syahrul',
    position: 'Aparatur Negara',
    kasusType: 'Wanprestasi',
    rating: 5,
    text:
      'Integritas adalah hal utama bagi saya. Ketika rekan bisnis melakukan wanprestasi atas perjanjian yang sudah disepakati, RAYA Law Firm memberikan legal audit dan langkah somasi yang sangat terukur. Pendekatan hukum mereka yang tegas dan sesuai koridor legal berhasil memaksa pihak lawan untuk menyelesaikan kewajibannya tanpa perlu berlarut-larut. Sangat profesional.',
    photo: '/images/logo-rayalawfirm.png',
    date: '2026-06-06',
    featured: false,
  },
  {
    id: 7,
    name: 'Abd. Rahman',
    position: 'Pekerja Buruh',
    kasusType: 'Wanprestasi',
    rating: 5,
    text:
      'Saya merasa sangat buntu ketika hak-hak keuangan saya dalam sebuah perjanjian kerja sama tidak dipenuhi atau wanprestasi oleh pihak lain. RAYA Law Firm membuktikan bahwa mereka peduli pada keadilan bagi semua kalangan. Mereka membela hak saya dengan gigih tanpa memandang status sosial saya. Terima kasih sudah mengembalikan hak yang seharusnya menjadi milik saya.',
    photo: '/images/logo-rayalawfirm.png',
    date: '2026-06-07',
    featured: false,
  },
];
