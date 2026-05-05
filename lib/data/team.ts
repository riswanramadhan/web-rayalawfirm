export interface Lawyer {
  slug: string;
  name: string;
  position: string;
  specialization: string;
  experience: string;
  education: string[];
  bio: string;
  achievements: string[];
  image: string;
  linkedin: string;
  phone: string;
  email: string;
}

export const lawyers: Lawyer[] = [
  {
    slug: 'muh-alif-maulana-akbar-paisal',
    name: 'Muh. Alif Maulana Akbar Paisal, S.H.',
    position: 'Advokat',
    specialization: 'Litigasi & Penyelesaian Sengketa',
    experience: '—',
    education: [],
    bio: '',
    achievements: [],
    image: '/images/team/muh-alif-maulana-akbar-paisal.jpg',
    linkedin: '',
    phone: '',
    email: '',
  },
  {
    slug: 'muh-arham-yusuf',
    name: 'Muh. Arham Yusuf, S.H., M.H.',
    position: 'Advokat',
    specialization: 'Hukum Bisnis & Korporat',
    experience: '—',
    education: [],
    bio: '',
    achievements: [],
    image: '/images/team/muh-arham-yusuf.jpg',
    linkedin: '',
    phone: '',
    email: '',
  },
  {
    slug: 'ryan-arya-dimas',
    name: 'Ryan Arya Dimas, S.H.',
    position: 'Advokat',
    specialization: 'Hukum Perdata & Keluarga',
    experience: '—',
    education: [],
    bio: '',
    achievements: [],
    image: '/images/team/ryan-arya-dimas.jpg',
    linkedin: '',
    phone: '',
    email: '',
  },
  {
    slug: 'yuliana-damayanti',
    name: 'Yuliana Damayanti, S.H.',
    position: 'Advokat',
    specialization: 'Keluarga & Waris',
    experience: '—',
    education: [],
    bio: '',
    achievements: [],
    image: '/images/team/yuliana-damayanti.jpg',
    linkedin: '',
    phone: '',
    email: '',
  },
];
