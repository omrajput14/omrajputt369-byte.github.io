// Single source of truth for real, verifiable content — every link, stat and
// stack entry here traces back to the live repos/site. Nothing invented.

export type Category = 'agritech' | 'civictech' | 'healthcare' | 'backend' | 'ai' | 'iot';

export const categoryLabels: Record<Category, string> = {
  agritech: 'AgriTech',
  civictech: 'CivicTech',
  healthcare: 'Healthcare',
  backend: 'Backend',
  ai: 'AI',
  iot: 'IoT',
};

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  categories: Category[];
  stack: string[];
  github?: string;
  live?: string;
  extraLink?: { label: string; href: string };
  /** Showcase image; generated project covers are illustrative rather than product screenshots. */
  image?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'vetra',
    name: 'VETRA',
    tagline: 'Veterinary Operating System',
    description:
      'A mobile-first platform to manage animal health records, connect farmers with veterinarians, and enable early disease detection with GPS-based surveillance.',
    categories: ['healthcare', 'backend', 'ai'],
    stack: [
      'Flutter', 'Dart', 'Java', 'Spring Boot', 'REST APIs', 'PostgreSQL', 'PostGIS',
      'Redis', 'SQLite', 'Gemini API', 'Open-Meteo', 'Firebase Cloud Messaging',
      'Leaflet', 'Docker', 'Nginx', 'GitHub Actions', 'Microsoft Azure',
    ],
    github: 'https://github.com/omrajput14/pashu-sathii',
    extraLink: { label: 'vetra.co.in', href: 'https://vetra.co.in' },
    image: '/images/showcase/vetra.jpg',
    featured: true,
  },
  {
    id: 'pashu-sathi',
    name: 'Pashu Sathi',
    tagline: 'Government Livestock Health Dashboard',
    description:
      'A government dashboard for real-time monitoring of livestock disease cases, field reports, and veterinary response across Maharashtra.',
    categories: ['healthcare', 'civictech', 'backend'],
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'PostGIS', 'JWT', 'Open-Meteo'],
    github: 'https://github.com/omrajput14/pashu-sathi',
    image: '/images/showcase/pashu-sathi.jpg',
    featured: true,
  },
  {
    id: 'agriflow',
    name: 'AgriFlow',
    tagline: 'Export Intelligence Platform',
    description:
      'Helps farmers sell crops to global buyers — tracking harvest batches, quality grades, cold-storage slots and export paperwork in one place.',
    categories: ['agritech', 'backend'],
    stack: ['React', 'FastAPI', 'PostgreSQL', 'Three.js', 'Tailwind CSS', 'Supabase'],
    github: 'https://github.com/omrajput14/agriflow',
    live: 'https://agriflow-ten.vercel.app/login',
    image: '/images/showcase/agriflow.jpg',
  },
  {
    id: 'ecoirrigate',
    name: 'EcoIrrigate',
    tagline: 'Smart Irrigation Telemetry',
    description:
      'Connects physical soil sensors to a live dashboard — soil moisture, battery levels and valve state, so farmers can monitor fields remotely.',
    categories: ['agritech', 'iot'],
    stack: ['React', 'FastAPI', 'Supabase', 'ESP8266', 'Blynk'],
    github: 'https://github.com/omrajput14/Smart-irrigation-system-',
    live: 'https://ecoirrigate.vercel.app/',
    image: '/images/showcase/ecoirrigate.jpg',
  },
  {
    id: 'digital-panchayat',
    name: 'Digital Panchayat',
    tagline: 'Civic Operations & Governance',
    description:
      'Desktop software for village governance offices — built on Java and SQLite so it keeps working without a reliable internet connection. Structured complaint records, meeting scheduling and audit-ready PDF reports.',
    categories: ['civictech', 'backend'],
    stack: ['Java', 'Swing', 'SQLite', 'JDBC', 'RBAC'],
    github: 'https://github.com/omrajput14/Digital-Panchayat-Management-System',
    image: '/images/showcase/digital-panchayat.jpg',
  },
];

export const vetra = projects[0];

/** Real project covers, cycled in the hero. */
export const heroScreens = projects.map((p) => p.image!).filter(Boolean);



export interface SystemCategory {
  title: string;
  description: string;
  items: string[];
}

export const engineering: SystemCategory[] = [
  { title: 'Backend', description: '', items: ['Java', 'Spring Boot', 'FastAPI', 'REST APIs', 'JWT'] },
  { title: 'Data', description: '', items: ['PostgreSQL', 'PostGIS', 'MongoDB', 'Redis', 'SQLite'] },
  { title: 'Frontend', description: '', items: ['React', 'Flutter', 'Dart', 'Tailwind CSS'] },
  { title: 'Infrastructure', description: '', items: ['Docker', 'Nginx', 'GitHub Actions', 'Microsoft Azure', 'Supabase'] },
  { title: 'AI / Data', description: '', items: ['Gemini API', 'scikit-learn', 'Open-Meteo'] },
];

export interface Metric {
  value: string;
  label: string;
  numeric?: number;
  suffix?: string;
}

export const metrics: Metric[] = [
  { value: '1700', numeric: 1700, suffix: '+', label: 'GitHub Commits' },
  { value: '5', numeric: 5, suffix: '', label: 'Systems Built' },
  { value: '3', numeric: 3, suffix: '', label: 'Domains' },
];

export interface BuildLogEntry {
  title: string;
  tag: string;
  description: string;
}

export const buildLog: BuildLogEntry[] = [
  {
    title: 'Digital Panchayat',
    tag: 'First system',
    description: 'Java + SQLite desktop app for local villagers to file complaints and generate report PDFs.',
  },
  {
    title: 'EcoIrrigate',
    tag: 'First hardware system',
    description: 'ESP8266 soil-moisture sensors reporting to a live web dashboard — first hardware + software integration.',
  },
  {
    title: 'AgroShield',
    tag: 'AI/ML experiments',
    description: 'A weather-risk forecasting model for crops, plus an early Gemini-AI livestock health checker.',
  },
  {
    title: 'JalSetu',
    tag: 'End-to-end civic platform',
    description: 'Water distribution scheduling, citizen complaints and online bill payments in one dashboard.',
  },
  {
    title: 'AgriFlow',
    tag: 'Flagship web platform',
    description: 'Export intelligence platform connecting farmers to global buyers, with a 3D shipment-tracking map.',
  },
  {
    title: 'VETRA',
    tag: 'Systems engineering',
    description: 'Flutter app + Spring Boot backend + PostGIS spatial disease surveillance for vets, farmers and government dashboards.',
  },
];

export const social = {
  github: 'https://github.com/omrajput14',
  linkedin: 'https://www.linkedin.com/in/omrajput14',
  discord: 'https://discord.com/users/1069567515342159872',
  twitter: 'https://x.com/k4bir17?s=21',
  instagram: 'https://www.instagram.com/omrajput.14',
  whatsapp: 'https://wa.me/919021961058',
  email: 'omrajputt369@gmail.com',
  phone: '+91 9021961058',
  location: 'Nashik, Maharashtra',
};

export const emailjs = {
  publicKey: 'blH9IJ0N0xqtRam9j',
  serviceId: 'service_vz5bpbf',
  templateId: 'n37u0up',
};

export const nav = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#work' },
  { label: 'Engineering', href: '#engineering' },
  { label: 'About', href: '#about' },
  { label: 'Build Log', href: '#buildlog' },
  { label: 'Contact', href: '#contact' },
];
