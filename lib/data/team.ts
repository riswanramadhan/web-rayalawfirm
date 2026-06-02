export interface Lawyer {
  slug: string;
  name: string;
  position: string;
  specialization: string;
  expertise: string[];
  achievements: string[];
  handledCases: string[];
  image: string;
  linkedin: string;
  instagram: string;
  facebook: string;
  phone: string;
  email: string;
}

export const lawyers: Lawyer[] = [
  {
    slug: 'alif',
    name: 'MUH. ALIF MAULANA AKBAR PAISAL',
    position: 'Managing Partner',
    specialization: 'Analisis Kontrak & Legal Drafting',
    expertise: [],
    achievements: [
      'Pelatihan Pendidikan Keterampilan Profesi Advokat (PKPA) 2023',
      'Anggota Advokat DPN Indonesia',
      'Sertifikasi Kelulusan Profesi Advokat',
    ],
    handledCases: [
      'Analisis Kontrak & Persetujuan Kerja',
      'Legal Drafting',
      'Legal Risk Management',
      'Litigasi dan Hukum Perdata',
      'Hukum Pidana',
    ],
    image: '/images/team/tim-alif-1.jpg',
    linkedin:
      'https://www.linkedin.com/search/results/people/?keywords=Alif%20Paisal',
    instagram: 'https://www.instagram.com/alifmaulana.paisal',
    facebook: '',
    phone: '6281335663379',
    email: 'rayaraya.lfadm@gmail.com',
  },
  {
    slug: 'arham',
    name: 'MUHAMMAD ARHAM YUSUF',
    position: 'Partner 1 / Advokat',
    specialization: 'Litigasi dan Hukum Perdata',
    expertise: ['Litigasi dan Hukum Perdata'],
    achievements: ['Anggota PERADI'],
    handledCases: [],
    image: '/images/team/tim-arham-1.jpg',
    linkedin: 'https://www.linkedin.com/in/arham-yusuf-952829278',
    instagram: 'https://www.instagram.com/arhamyusufk',
    facebook: '',
    phone: '6281242079060',
    email: 'rayaraya.lfadm@gmail.com',
  },
  {
    slug: 'yuli',
    name: 'YULIANA DAMAYANTI',
    position: 'Partner 2 / Advokat',
    specialization: 'Legal Risk Management & Legal Drafting',
    expertise: [
      'Identifikasi dan Mitigasi Risiko Hukum',
      'Contract & Agreement Analysis',
      'Legal Drafting & Writing',
      'Legal Risk Management',
      'Legal Documentation & Administration Management',
    ],
    achievements: [
      'Pendidikan Khusus Profesi Advokat (PKPA)',
      'Sertifikasi Kelulusan Profesi Advokat',
    ],
    handledCases: [
      'Perkara pidana',
      'Perdata',
      'Hukum ketenagakerjaan',
    ],
    image: '/images/team/tim-yuli-1.jpg',
    linkedin:
      'https://www.linkedin.com/search/results/people/?keywords=Yuliana%20Damayanti',
    instagram: 'https://www.instagram.com/yuliana.dmynt',
    facebook: '',
    phone: '6285345108869',
    email: 'rayaraya.lfadm@gmail.com',
  },
  {
    slug: 'dimas',
    name: 'RYAN ARYA DIMAS',
    position: 'Partner 3 / Advokat',
    specialization: 'Litigasi, Ketenagakerjaan, Perdata, Pidana',
    expertise: ['Litigasi', 'Ketenagakerjaan', 'Perdata', 'Pidana'],
    achievements: ['Mediasi'],
    handledCases: ['Litigasi', 'Ketenagakerjaan', 'Perdata', 'Sengketa Tanah Utang-Piutang'],
    image: '/images/team/tim-dimas-1.jpg',
    linkedin: 'https://www.linkedin.com/in/ryan-a-dimas-93b9a6b7',
    instagram: 'https://www.instagram.com/r.a_dimas',
    facebook: 'https://www.facebook.com/dimas.ran.5',
    phone: '628111126103',
    email: 'rayaraya.lfadm@gmail.com',
  },
];
