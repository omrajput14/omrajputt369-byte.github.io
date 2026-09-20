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
  /** Real screenshot on disk, when one exists. Never invented. */
  image?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'vetra',
    name: 'VETRA',
    tagline: 'Veterinary Operating System',
    description:
      'Digital infrastructure connecting farmers, veterinarians and government disease surveillance — longitudinal animal records, veterinary workflows and spatial outbreak intelligence.',
    categories: ['healthcare', 'backend', 'ai'],
    stack: [
      'Flutter', 'Dart', 'Java', 'Spring Boot', 'REST APIs', 'PostgreSQL', 'PostGIS',
      'Redis', 'SQLite', 'Gemini API', 'Open-Meteo', 'Firebase Cloud Messaging',
      'Leaflet', 'Docker', 'Nginx', 'GitHub Actions', 'Microsoft Azure',
    ],
    github: 'https://github.com/omrajput14/pashu-sathii',
    extraLink: { label: 'vetra.co.in', href: 'https://vetra.co.in' },
    featured: true,
  },
  {
    id: 'vetra-gov',
    name: 'VETRA — Government Dashboard',
    tagline: 'Statewide Epidemiological Surveillance',
    description:
      'The government-facing side of VETRA — live PostGIS outbreak mapping, a weighted multi-signal risk engine, vaccination coverage tracking, lab/vet diagnostic verification pipelines and a biosecurity protocol registry.',
    categories: ['healthcare', 'civictech', 'backend'],
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'PostGIS', 'JWT', 'Open-Meteo'],
    github: 'https://github.com/omrajput14/pashu-sathi',
    featured: true,
  },
  {
    id: 'agriflow',
    image: '/images/agriflow.png',
    name: 'AgriFlow',
    tagline: 'Export Intelligence Platform',
    description:
      'Helps farmers sell crops to global buyers — tracking harvest batches, quality grades, cold-storage slots and export paperwork in one place, with a 3D shipment-tracking map.',
    categories: ['agritech', 'backend'],
    stack: ['React', 'FastAPI', 'PostgreSQL', 'Three.js', 'Tailwind CSS', 'Supabase'],
    github: 'https://github.com/omrajput14/agriflow',
    live: 'https://agriflow-ten.vercel.app/login',
  },
  {
    id: 'jalsetu',
    image: '/images/jalsetu.png',
    name: 'JalSetu',
    tagline: 'Municipal Water Distribution',
    description:
      "A civic dashboard for a city's water supply — reservoir levels, distribution scheduling, citizen complaints and online bill payments.",
    categories: ['civictech', 'backend'],
    stack: ['React', 'FastAPI', 'PostgreSQL', 'Tailwind CSS', 'Supabase', 'Razorpay'],
    github: 'https://github.com/omrajput14/jalsetu',
    live: 'https://jalsetu.vercel.app',
  },
  {
    id: 'agroshield',
    image: '/images/agroshield.png',
    name: 'AgroShield',
    tagline: 'Crop Protection & Weather Alerts',
    description:
      'Reads local weather telemetry and uses machine learning to forecast environmental risk to crops, sending alerts and triggering physical windbreak controls.',
    categories: ['agritech', 'ai'],
    stack: ['React', 'FastAPI', 'scikit-learn', 'SQLAlchemy', 'Twilio', 'Tailwind CSS'],
    github: 'https://github.com/omrajput14/agroshield',
    live: 'https://agroshield10.vercel.app/',
  },
  {
    id: 'ecoirrigate',
    image: '/images/ecoirrigate.png',
    name: 'EcoIrrigate',
    tagline: 'Smart Irrigation Telemetry',
    description:
      'Connects physical soil sensors to a live dashboard — soil moisture, battery levels and valve state, so farmers can monitor fields remotely.',
    categories: ['agritech', 'iot'],
    stack: ['React', 'FastAPI', 'Supabase', 'ESP8266', 'Blynk'],
    github: 'https://github.com/omrajput14/Smart-irrigation-system-',
    live: 'https://ecoirrigate.vercel.app/',
  },
  {
    id: 'digital-panchayat',
    image: '/images/panchayat.png',
    name: 'Digital Panchayat',
    tagline: 'Civic Operations & Governance',
    description:
      'Desktop software for village governance offices — built on Java and SQLite so it keeps working without a reliable internet connection. Structured complaint records, meeting scheduling and audit-ready PDF reports.',
    categories: ['civictech', 'backend'],
    stack: ['Java', 'Swing', 'SQLite', 'JDBC', 'RBAC'],
    github: 'https://github.com/omrajput14/Digital-Panchayat-Management-System',
  },
];

export const vetra = projects[0];

/** Real screenshots used for the hero cycle and the flying work cards. */
export const workImages = projects.filter((p) => p.image).map((p) => p.image!);


export interface Screen {
  src: string;
  caption: string;
}

// Real app screens. Drop files at these exact paths under
// public/images/vetra-app/ — see README for the full list.
export const vetraScreens: { farmer: Screen[]; vet: Screen[]; gov: Screen[] } = {
  farmer: [
    { src: '/images/vetra-app/farmer-1-home.png', caption: 'Home — savings from early detection' },
    { src: '/images/vetra-app/farmer-2-animals.png', caption: 'My Animals' },
    { src: '/images/vetra-app/farmer-3-alerts.png', caption: 'Health Alerts' },
    { src: '/images/vetra-app/farmer-4-vets.png', caption: 'Nearby Vets Directory' },
    { src: '/images/vetra-app/farmer-5-outbreak-map.png', caption: 'Outbreak Surveillance Map' },
    { src: '/images/vetra-app/farmer-6-profile.png', caption: 'Farmer Profile' },
  ],
  vet: [
    { src: '/images/vetra-app/vet-1-dashboard.png', caption: 'Vet Dashboard' },
    { src: '/images/vetra-app/vet-2-requests.png', caption: 'Incoming Clinical Requests' },
    { src: '/images/vetra-app/vet-3-requests-completed.png', caption: 'Completed Requests' },
    { src: '/images/vetra-app/vet-4-outbreak-map.png', caption: 'Outbreak Surveillance Map' },
    { src: '/images/vetra-app/vet-5-profile.png', caption: 'Veterinarian Profile' },
  ],
  gov: [
    { src: '/images/vetra-app/gov-1-overview.png', caption: 'Command Overview' },
    { src: '/images/vetra-app/gov-2-surveillance-map.png', caption: 'Live GIS Surveillance Map' },
    { src: '/images/vetra-app/gov-3-outbreaks.png', caption: 'Outbreak Intelligence' },
    { src: '/images/vetra-app/gov-4-analytics.png', caption: 'Epidemiological Analytics' },
    { src: '/images/vetra-app/gov-5-reports.png', caption: 'Field Surveillance Reports' },
    { src: '/images/vetra-app/gov-6-vaccination.png', caption: 'Vaccination Intelligence' },
    { src: '/images/vetra-app/gov-7-labs.png', caption: 'Laboratory Surveillance' },
    { src: '/images/vetra-app/gov-8-protocols.png', caption: 'Biosecurity Protocols' },
    { src: '/images/vetra-app/gov-9-settings.png', caption: 'System Configuration' },
  ],
};

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
  { value: '7', numeric: 7, suffix: '', label: 'Systems Built' },
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
