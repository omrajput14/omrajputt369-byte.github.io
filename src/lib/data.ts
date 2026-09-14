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

export type ProjectIcon = 'vetra' | 'website' | 'landmark' | 'dashboard';

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  categories: Category[];
  stack: string[];
  github?: string;
  live?: string;
  icon: ProjectIcon;
  featured?: boolean;
}

export const vetra: Project = {
  id: 'vetra',
  name: 'VETRA',
  tagline: 'Veterinary Operating System',
  description:
    'Digital infrastructure connecting farmers, veterinarians and a government dashboard for disease surveillance — longitudinal animal records, veterinary workflows and spatial outbreak intelligence.',
  categories: ['healthcare', 'civictech', 'backend', 'ai'],
  stack: [
    'Flutter', 'Dart', 'Java', 'Spring Boot', 'REST APIs',
    'PostgreSQL', 'PostGIS', 'Redis', 'SQLite', 'Gemini API', 'Open-Meteo',
    'Firebase Cloud Messaging', 'Leaflet', 'Docker', 'Nginx', 'GitHub Actions', 'Microsoft Azure',
  ],
  github: 'https://github.com/omrajput14/pashu-sathii',
  icon: 'vetra',
  featured: true,
};

export interface Screen {
  src: string;
  caption: string;
}

// Real app screens, farmer/vet/gov sides. Drop files at these exact paths
// under public/images/vetra-app/ — see README for the full list.
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

export const projects: Project[] = [
  {
    id: 'vetra-gov-dashboard',
    name: 'VETRA — GOVERNMENT DASHBOARD',
    tagline: 'Statewide Epidemiological Surveillance Command Center',
    description:
      'The government-facing side of VETRA — live PostGIS outbreak mapping, a weighted multi-signal risk engine, vaccination coverage tracking, lab/vet diagnostic verification pipelines and a statewide biosecurity protocol registry.',
    categories: ['healthcare', 'civictech', 'backend'],
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'PostGIS', 'JWT', 'Open-Meteo'],
    github: 'https://github.com/omrajput14/pashu-sathi',
    icon: 'dashboard',
  },
  {
    id: 'vetra-website',
    name: 'VETRA — WEBSITE',
    tagline: 'Product site for VETRA',
    description:
      "The public face of VETRA — where farmers, veterinarians and government partners first meet the platform, ahead of rollout.",
    categories: ['healthcare'],
    stack: [],
    github: 'https://github.com/omrajput14/Vetra-website',
    live: 'https://vetra.co.in',
    icon: 'website',
  },
  {
    id: 'digital-panchayat',
    name: 'DIGITAL PANCHAYAT',
    tagline: 'Civic Operations & Governance Platform',
    description:
      'Desktop software for village governance offices — built on Java and SQLite, so it keeps working without a reliable internet connection. Structured complaint records, meeting scheduling and audit-ready PDF reports.',
    categories: ['civictech', 'backend'],
    stack: ['Java', 'Swing', 'SQLite', 'JDBC', 'RBAC'],
    github: 'https://github.com/omrajput14/Digital-Panchayat-Management-System',
    icon: 'landmark',
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

// Sourced from the previous site's own stat counters — not invented.
export const metrics: Metric[] = [
  { value: '1700', numeric: 1700, suffix: '+', label: 'GitHub Commits' },
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
  { label: 'Systems', href: '#systems' },
  { label: 'Engineering', href: '#engineering' },
  { label: 'About', href: '#about' },
  { label: 'Build Log', href: '#buildlog' },
  { label: 'Contact', href: '#contact' },
];
