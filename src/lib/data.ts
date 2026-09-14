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
  image?: string;
  featured?: boolean;
}

export const vetra: Project = {
  id: 'vetra',
  name: 'VETRA',
  tagline: 'Veterinary Operating System',
  description:
    'Digital infrastructure connecting farmers, veterinarians and government disease surveillance through longitudinal animal records, veterinary workflows and spatial outbreak intelligence.',
  categories: ['healthcare', 'backend', 'ai'],
  stack: [
    'Flutter', 'Dart', 'React', 'TypeScript', 'Java', 'Spring Boot', 'REST APIs',
    'PostgreSQL', 'PostGIS', 'Redis', 'SQLite', 'Gemini API', 'Open-Meteo',
    'Firebase Cloud Messaging', 'Leaflet', 'Docker', 'Nginx', 'GitHub Actions', 'Microsoft Azure',
  ],
  github: 'https://github.com/omrajput14/pashu-sathii',
  live: 'https://vetra.co.in',
  extraLink: { label: 'Website source', href: 'https://github.com/omrajput14/Vetra-website' },
  featured: true,
};

export const projects: Project[] = [
  {
    id: 'agriflow',
    name: 'AGRIFLOW',
    tagline: 'Export Intelligence Platform',
    description:
      "Helps farmers sell crops to global buyers — tracking harvest batches, quality grades, cold-storage slots and export paperwork in one place.",
    categories: ['agritech'],
    stack: ['React', 'FastAPI', 'PostgreSQL', 'Three.js', 'Tailwind', 'Supabase'],
    github: 'https://github.com/omrajput14/agriflow',
    live: 'https://agriflow-ten.vercel.app/login',
    image: 'images/agriflow.png',
  },
  {
    id: 'jalsetu',
    name: 'JALSETU',
    tagline: 'Municipal Water Distribution System',
    description:
      "A civic dashboard for a city's water supply — reservoir levels, distribution scheduling, citizen complaints and online bill payments.",
    categories: ['civictech', 'backend'],
    stack: ['React', 'FastAPI', 'PostgreSQL', 'Tailwind', 'Supabase', 'Razorpay'],
    github: 'https://github.com/omrajput14/jalsetu',
    live: 'https://jalsetu.vercel.app',
    image: 'images/jalsetu.png',
  },
  {
    id: 'agroshield',
    name: 'AGROSHIELD',
    tagline: 'Crop Protection & Weather Alert System',
    description:
      'Reads local weather telemetry and uses machine learning to forecast environmental risk to crops, sending alerts and triggering physical windbreak controls.',
    categories: ['agritech', 'ai'],
    stack: ['React', 'FastAPI', 'scikit-learn', 'SQLAlchemy', 'Twilio', 'Tailwind'],
    github: 'https://github.com/omrajput14/agroshield',
    live: 'https://agroshield10.vercel.app/',
    image: 'images/agroshield.png',
  },
  {
    id: 'ecoirrigate',
    name: 'ECOIRRIGATE',
    tagline: 'Smart Irrigation Telemetry Platform',
    description:
      "Connects physical soil sensors to a live dashboard — soil moisture, battery levels and valve state, so farmers can monitor fields remotely.",
    categories: ['agritech', 'iot'],
    stack: ['React', 'FastAPI', 'Supabase', 'ESP8266', 'Blynk'],
    github: 'https://github.com/omrajput14/Smart-irrigation-system-',
    live: 'https://ecoirrigate.vercel.app/',
    image: 'images/ecoirrigate.png',
  },
  {
    id: 'digital-panchayat',
    name: 'DIGITAL PANCHAYAT',
    tagline: 'Civic Operations & Governance Platform',
    description:
      'A desktop application for local village offices — citizen complaint tracking, community meeting scheduling and clean PDF activity reports.',
    categories: ['civictech', 'backend'],
    stack: ['Java', 'Swing', 'SQLite', 'JDBC', 'RBAC'],
    github: 'https://github.com/omrajput14/Digital-Panchayat-Management-System',
    image: 'images/panchayat.png',
  },
];

export const allProjects = [vetra, ...projects];

export interface SystemCategory {
  title: string;
  description: string;
  items: string[];
}

export const systems: SystemCategory[] = [
  {
    title: 'Backend Systems',
    description: 'REST APIs, authentication and modular service architecture.',
    items: ['FastAPI', 'Spring Boot', 'REST APIs', 'JWT Auth', 'Node.js', 'Express'],
  },
  {
    title: 'Data Systems',
    description: 'Relational, spatial and in-memory data layers.',
    items: ['PostgreSQL', 'PostGIS', 'MongoDB', 'Redis', 'SQLite'],
  },
  {
    title: 'Mobile Systems',
    description: 'Offline-first apps with location and push messaging.',
    items: ['Flutter', 'Dart', 'Firebase Cloud Messaging', 'Leaflet', 'GPS'],
  },
  {
    title: 'Intelligent Systems',
    description: 'AI-assisted workflows and forecasting models.',
    items: ['Gemini API', 'scikit-learn', 'Open-Meteo', 'Risk scoring'],
  },
  {
    title: 'Infrastructure',
    description: 'Deployment, CI and cloud hosting.',
    items: ['Docker', 'Nginx', 'GitHub Actions', 'Microsoft Azure', 'Supabase', 'Vercel'],
  },
];

export const engineering: SystemCategory[] = [
  { title: 'Backend', description: '', items: ['Java', 'Spring Boot', 'Python', 'FastAPI', 'REST APIs', 'JWT'] },
  { title: 'Data', description: '', items: ['PostgreSQL', 'PostGIS', 'MongoDB', 'Redis', 'SQLite'] },
  { title: 'Frontend', description: '', items: ['React', 'TypeScript', 'Flutter', 'Dart', 'Tailwind CSS'] },
  { title: 'Infrastructure', description: '', items: ['Docker', 'Nginx', 'GitHub Actions', 'Microsoft Azure', 'Supabase'] },
  { title: 'AI / Data', description: '', items: ['Python', 'Gemini API', 'scikit-learn', 'Open-Meteo'] },
];

export interface Metric {
  value: string;
  label: string;
  numeric?: number;
  suffix?: string;
}

// Sourced from the previous site's own stat counters — not invented.
export const metrics: Metric[] = [
  { value: '500', numeric: 500, suffix: '+', label: 'GitHub Commits' },
  { value: '6', numeric: 6, suffix: '+', label: 'Systems Built' },
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

export interface Note {
  title: string;
  description: string;
  readTime: string;
  tag: string;
  href: string;
}

// Real, existing write-ups — kept as-is rather than inventing new essays.
export const notes: Note[] = [
  {
    title: 'How I Built AgriFlow from Scratch',
    description: 'Architecture decisions, tech trade-offs and lessons learned building a full export management platform.',
    readTime: '10 min read',
    tag: 'AgriTech',
    href: '/legacy/blog-agriflow.html',
  },
  {
    title: 'IoT + Farming: Building EcoIrrigate',
    description: 'Connecting ESP8266 hardware to a React dashboard for real-time precision irrigation.',
    readTime: '8 min read',
    tag: 'IoT',
    href: '/legacy/blog-ecoirrigate.html',
  },
  {
    title: 'Why I Build for Rural India',
    description: 'The motivation behind every project — growing up in Nashik and using code to bridge the agriculture tech gap.',
    readTime: '6 min read',
    tag: 'Context',
    href: '/legacy/blog-rural-india.html',
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
  { label: 'Systems', href: '#systems' },
  { label: 'Engineering', href: '#engineering' },
  { label: 'About', href: '#about' },
  { label: 'Build Log', href: '#buildlog' },
  { label: 'Contact', href: '#contact' },
];
