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
    name: 'Muh. Alif Maulana Akbar Paisal, S.H.',
    position: 'Managing Partner',
    specialization: 'Hukum Perdata, Hukum Pidana & Corporate Lawyer',
    expertise: [],
    achievements: [
      'Pelatihan Pendidikan Keterampilan Profesi Advokat (PKPA) 2023',
      'Anggota Advokat DPN Indonesia',
      'Sertifikasi Kelulusan Profesi Advokat',
    ],
    handledCases: [
      'Litigasi dan Hukum Perdata',
      'Hukum Pidana',
      'Corporate Lawyer',
      'Legal Risk Management',
    ],
    image: '/images/team/tim-alif-1.jpg',
    linkedin:
      'https://www.linkedin.com/search/results/people/?keywords=Alif%20Paisal',
    instagram: 'https://www.instagram.com/alifmaulana.paisal',
    facebook: '',
    phone: '6281335663379',
    email: 'info@rayalawfirm.com',
  },
  {
    slug: 'arham',
    name: 'Muhammad Arham Yusuf, S.H., M.H.',
    position: 'Partner / Advokat',
    specialization: 'Litigasi dan Hukum Perdata',
    expertise: ['Litigasi dan Hukum Perdata'],
    achievements: ['Anggota PERADI'],
    handledCases: [],
    image: '/images/team/tim-arham-1.jpg',
    linkedin: 'https://www.linkedin.com/in/arham-yusuf-952829278',
    instagram: 'https://www.instagram.com/arhamyusufk',
    facebook: '',
    phone: '6281242079060',
    email: 'info@rayalawfirm.com',
  },
  {
    slug: 'yuli',
    name: 'Yuliana Damayanti, S.H.',
    position: 'Partner / Advokat',
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
    email: 'info@rayalawfirm.com',
  },
  {
    slug: 'dimas',
    name: 'Ryan Aryan Dimas, S.H.',
    position: 'Partner / Advokat',
    specialization: 'Litigasi, Ketenagakerjaan, Perdata, Pidana',
    expertise: ['Litigasi', 'Ketenagakerjaan', 'Perdata', 'Pidana'],
    achievements: ['Mediasi'],
    handledCases: ['Litigasi', 'Ketenagakerjaan', 'Perdata', 'Sengketa Tanah', 'Hutang Piutang'],
    image: '/images/team/tim-dimas-1.jpg',
    linkedin: 'https://www.linkedin.com/in/ryan-a-dimas-93b9a6b7',
    instagram: 'https://www.instagram.com/r.a_dimas',
    facebook: 'https://www.facebook.com/dimas.ran.5',
    phone: '628111126103',
    email: 'info@rayalawfirm.com',
  },
];
