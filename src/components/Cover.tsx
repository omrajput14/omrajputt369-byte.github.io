import { categoryLabels, type Project } from '../lib/data';

// Designed cover tiles for projects without a clean screenshot — clearly a
// cover, not a fake UI. Palette rotates so a row of them reads as a set.
const palette = [
  'bg-fg text-bg',
  'bg-accent text-fg',
  'bg-accent3 text-fg',
  'bg-accent2 text-fg',
  'bg-accent4 text-bg',
];

function Motif({ seed }: { seed: number }) {
  const r = (seed * 37) % 3; // three variants
  return (
    <svg viewBox="0 0 320 200" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="absolute inset-0 h-full w-full opacity-[0.22]" aria-hidden="true">
      {r === 0 && (<>
        <rect x="24" y="78" width="64" height="44" rx="6" /><rect x="128" y="78" width="64" height="44" rx="6" />
        <path d="M232 84c0-6 12-10 28-10s28 4 28 10v32c0 6-12 10-28 10s-28-4-28-10z" /><path d="M232 84c0 6 12 10 28 10s28-4 28-10" />
        <path d="M88 100h40M192 100h40" /><path d="M160 78V40" strokeDasharray="4 5" /><circle cx="160" cy="30" r="10" />
      </>)}
      {r === 1 && (<>
        <circle cx="70" cy="60" r="12" /><circle cx="250" cy="60" r="12" /><circle cx="160" cy="140" r="12" /><circle cx="160" cy="60" r="16" />
        <path d="M82 60h62M176 60h62M160 76v52M82 66l66 66M238 66l-66 66" strokeDasharray="4 5" />
      </>)}
      {r === 2 && (<>
        <rect x="40" y="40" width="240" height="120" rx="10" /><path d="M40 72h240" />
        <path d="M64 100h60M64 120h100M64 140h80" /><path d="M200 96l24 22 40-44" />
      </>)}
    </svg>
  );
}

export function Cover({ project, index, className = '' }: { project: Project; index: number; className?: string }) {
  return (
    <div className={`relative flex aspect-[16/10] flex-col justify-between overflow-hidden p-5 sm:p-6 ${palette[index % palette.length]} ${className}`}>
      <Motif seed={index} />
      <div className="t-mono relative flex justify-between opacity-70">
        <span>0{index + 1}</span>
        <span>{categoryLabels[project.categories[0]]}</span>
      </div>
      <div className="relative">
        <p className="t-display text-[clamp(1.6rem,3.2vw,2.6rem)] leading-[0.9]">{project.name}</p>
        <p className="t-mono mt-2 opacity-70">{project.tagline}</p>
      </div>
    </div>
  );
}
