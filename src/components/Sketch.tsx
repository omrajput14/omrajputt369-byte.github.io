// Line-art illustrations for the service cards — the reference uses doodles;
// these are the technical equivalent, drawn in the card's own ink colour.
export type SketchKind = 'backend' | 'data' | 'mobile' | 'cloud';

export function Sketch({ kind }: { kind: SketchKind }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 3.5, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
  return (
    <svg viewBox="0 0 300 360" className="h-full w-full" aria-hidden="true" {...common}>
      {kind === 'backend' && (<>
        <rect x="40" y="40" width="220" height="60" rx="12" /><rect x="40" y="130" width="220" height="60" rx="12" /><rect x="40" y="220" width="220" height="60" rx="12" />
        <path d="M150 100v30M150 190v30" /><path d="M20 70h20M20 160h20M20 250h20M260 70h20M260 160h20M260 250h20" />
        <circle cx="70" cy="70" r="6" /><circle cx="70" cy="160" r="6" /><circle cx="70" cy="250" r="6" />
        <path d="M110 70h100M110 160h60M110 250h120" strokeDasharray="6 8" />
        <rect x="200" y="300" width="60" height="40" rx="8" /><path d="M215 300v-12a15 15 0 0 1 30 0v12" />
      </>)}
      {kind === 'data' && (<>
        <path d="M60 60c0-14 40-24 90-24s90 10 90 24v120c0 14-40 24-90 24s-90-10-90-24z" /><path d="M60 60c0 14 40 24 90 24s90-10 90-24M60 120c0 14 40 24 90 24s90-10 90-24" />
        <path d="M40 240h220M40 280h220M40 320h220M80 220v120M150 220v120M220 220v120" opacity=".7" />
        <path d="M150 210c-18 0-30 13-30 30 0 22 30 50 30 50s30-28 30-50c0-17-12-30-30-30z" fill="currentColor" fillOpacity=".15" /><circle cx="150" cy="240" r="9" />
      </>)}
      {kind === 'mobile' && (<>
        <rect x="90" y="30" width="120" height="240" rx="22" /><path d="M130 50h40" /><rect x="105" y="70" width="90" height="140" rx="8" strokeDasharray="6 8" />
        <path d="M230 90a40 40 0 0 1 0 60M250 70a70 70 0 0 1 0 100M270 50a100 100 0 0 1 0 140" opacity=".8" />
        <path d="M40 300c0 20 18 36 40 36h140c22 0 40-16 40-36" /><path d="M150 336v-30M138 318l12-12 12 12" />
        <circle cx="150" cy="250" r="8" />
      </>)}
      {kind === 'cloud' && (<>
        <path d="M80 120a40 40 0 0 1 76-22 34 34 0 0 1 64 18 30 30 0 0 1-4 60H86a30 30 0 0 1-6-56z" />
        <rect x="40" y="220" width="60" height="60" rx="8" /><rect x="120" y="220" width="60" height="60" rx="8" /><rect x="200" y="220" width="60" height="60" rx="8" />
        <path d="M70 176v44M150 176v44M230 176v44" strokeDasharray="6 8" />
        <circle cx="150" cy="320" r="18" /><path d="M150 296v8M150 336v8M126 320h8M166 320h8M133 303l6 6M161 331l6 6M167 303l-6 6M139 331l-6 6" />
      </>)}
    </svg>
  );
}
