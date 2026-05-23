export interface Lawyer {
  slug: string;
  name: string;
  position: string;
  specialization: string;
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
    slug: 'arham',
    name: 'Arham Yusuf',
    position: 'Advokat',
    specialization: 'Litigasi dan Hukum Perdata',
    achievements: ['Anggota PERADI'],
    handledCases: [],
    image: '/images/team/tim-arham-1.jpg',
    linkedin: 'https://www.linkedin.com/in/arham-yusuf-952829278',
    instagram: 'https://www.instagram.com/arhamyusufk',
    facebook: '',
    phone: '6281242079060',
    email: 'arhamarhamyusuf@gmail.com',
  },
  {
    slug: 'dimas',
    name: 'Ryan A. Dimas',
    position: 'Advokat',
    specialization: 'Litigasi, Ketenagakerjaan, Perdata, Pidana',
    achievements: ['Mediasi'],
    handledCases: ['Litigasi', 'Ketenagakerjaan', 'Perdata', 'Sengketa Tanah Utang-Piutang'],
    image: '/images/team/tim-dimas-1.jpg',
    linkedin: 'https://www.linkedin.com/in/ryan-a-dimas-93b9a6b7',
    instagram: 'https://www.instagram.com/r.a_dimas',
    facebook: 'https://www.facebook.com/dimas.ran.5',
    phone: '628111126103',
    email: 'radmsradms@gmail.com',
  },
  {
    slug: 'yuli',
    name: 'Yuli',
    position: 'Advokat',
    specialization: 'Hukum Bisnis & Korporat',
    achievements: [],
    handledCases: [],
    image: '/images/team/tim-yuli-1.jpg',
    linkedin: '',
    instagram: '',
    facebook: '',
    phone: '62895334909799',
    email: '',
  },
  {
    slug: 'alif',
    name: 'Alif',
    position: 'Advokat',
    specialization: 'Hukum Perdata & Keluarga',
    achievements: [],
    handledCases: [],
    image: '/images/team/tim-alif-1.jpg',
    linkedin: '',
    instagram: '',
    facebook: '',
    phone: '',
    email: '',
  },
];
