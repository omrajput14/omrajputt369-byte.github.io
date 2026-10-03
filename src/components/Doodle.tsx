// Hand-drawn doodle panels for the service cards — the reference's service
// images are black line doodles on white; these are the systems-engineering
// equivalent. No SVG turbulence filter: re-rasterising it as the sticky cards
// un-stack made scrolling back up stall for hundreds of ms.
export type DoodleKind = 'backend' | 'data' | 'mobile' | 'cloud';

const label = { fontFamily: 'Caveat, "Comic Sans MS", cursive', fontSize: 26, fill: 'currentColor', stroke: 'none' } as const;
const small = { ...label, fontSize: 20 };

function Backend() {
  return (<>
    <path d="M36 70c-14 0-14 8-14 20v18c0 8-6 10-12 10 6 0 12 2 12 10v18c0 12 0 20 14 20" />
    <path d="M364 70c14 0 14 8 14 20v18c0 8 6 10 12 10-6 0-12 2-12 10v18c0 12 0 20-14 20" />
    <rect x="60" y="62" width="150" height="46" rx="8" /><text x="74" y="93" {...label}>GET /api/v1</text>
    <path d="M214 86h40m-10-8 10 8-10 8" /><rect x="262" y="62" width="96" height="46" rx="8" /><text x="276" y="93" {...label}>200 OK</text>
    <rect x="60" y="130" width="180" height="170" rx="10" />
    {[152, 204, 256].map((y) => (<g key={y}><rect x="74" y={y} width="152" height="36" rx="6" /><circle cx="92" cy={y + 18} r="5" /><circle cx="110" cy={y + 18} r="5" /><path d={`M132 ${y + 18}h80`} strokeDasharray="6 7" /></g>))}
    <text x="80" y="326" {...small}>service layer</text>
    <rect x="268" y="178" width="92" height="74" rx="10" /><path d="M288 178v-18a26 26 0 0 1 52 0v18" /><circle cx="314" cy="210" r="8" /><path d="M314 218v14" />
    <text x="286" y="276" {...label}>JWT</text>
    <circle cx="316" cy="372" r="30" /><circle cx="316" cy="372" r="10" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => { const r = (a * Math.PI) / 180; return <path key={a} d={`M${316 + Math.cos(r) * 30} ${372 + Math.sin(r) * 30}l${Math.cos(r) * 10} ${Math.sin(r) * 10}`} />; })}
    <rect x="40" y="360" width="200" height="120" rx="10" /><path d="M40 388h200" /><circle cx="56" cy="374" r="4" /><circle cx="70" cy="374" r="4" /><circle cx="84" cy="374" r="4" />
    <text x="56" y="420" {...small}>@RestController</text><text x="56" y="448" {...small}>class OrderApi {'{'}</text><text x="56" y="472" {...small}>  POST /orders</text>
    <path d="M280 440l30 44 8-20 20-6z" />
  </>);
}

function Data() {
  return (<>
    <path d="M40 56c0-14 36-24 80-24s80 10 80 24v110c0 14-36 24-80 24s-80-10-80-24z" /><path d="M40 56c0 14 36 24 80 24s80-10 80-24M40 110c0 14 36 24 80 24s80-10 80-24" />
    <text x="62" y="222" {...label}>PostgreSQL</text>
    <rect x="232" y="40" width="140" height="150" rx="8" /><path d="M232 74h140M232 110h140M232 146h140M290 40v150" />
    <text x="244" y="64" {...small}>id</text><text x="302" y="64" {...small}>district</text><text x="244" y="100" {...small}>01</text><text x="302" y="100" {...small}>Nashik</text><text x="244" y="136" {...small}>02</text><text x="302" y="136" {...small}>Dhule</text>
    <path d="M44 262l54-18 40 26 50-30 56 20 40-14 60 26-18 60 20 48-56 34-60-12-44 22-58-30-42 10-26-50 18-40z" />
    <path d="M98 244l12 62-40 30M188 240l-12 70 50 40M244 260l-16 90" strokeDasharray="5 7" />
    {[[130, 300], [212, 330], [300, 312]].map(([x, y]) => (<g key={x}><path d={`M${x} ${y}c-14 0-24-10-24-24 0-18 24-40 24-40s24 22 24 40c0 14-10 24-24 24z`} /><circle cx={x} cy={y - 26} r="7" /></g>))}
    <text x="152" y="440" {...label}>PostGIS</text>
    <circle cx="330" cy="440" r="26" /><path d="M349 459l24 24" /><text x="296" y="506" {...small}>SELECT *</text>
    <path d="M48 470v30M68 452v48M88 478v22M108 440v60" />
  </>);
}

function Mobile() {
  return (<>
    <rect x="40" y="60" width="140" height="270" rx="22" /><path d="M86 80h48" />
    {[110, 170, 230].map((y) => (<g key={y}><rect x="56" y={y} width="108" height="46" rx="8" /><circle cx="78" cy={y + 23} r="10" /><path d={`M96 ${y + 16}h52M96 ${y + 30}h34`} /></g>))}
    <circle cx="110" cy="304" r="8" />
    <rect x="220" y="100" width="140" height="270" rx="22" /><path d="M266 120h48" />
    <path d="M236 150l40-10 36 20 32-12v150l-32 12-36-20-40 10z" /><path d="M276 140v150M312 160v150" strokeDasharray="5 7" />
    <path d="M290 250c-12 0-20-8-20-20 0-16 20-34 20-34s20 18 20 34c0 12-8 20-20 20z" /><circle cx="290" cy="228" r="6" />
    <path d="M196 40a30 30 0 0 1 0 42M210 28a52 52 0 0 1 0 66" /><path d="M186 30l28 60" />
    <text x="30" y="30" {...label}>offline? still works</text>
    <path d="M60 400a44 44 0 0 1 80-16m6 36a44 44 0 0 1-80 16" /><path d="M132 370l8 16-18 2M68 450l-8-16 18-2" />
    <text x="40" y="498" {...label}>sync</text>
    <path d="M250 440a28 28 0 0 1 56 0v26l10 14h-76l10-14z" /><path d="M268 488a10 10 0 0 0 20 0" /><circle cx="306" cy="420" r="9" fill="currentColor" />
    <text x="316" y="470" {...small}>push</text>
  </>);
}

function Cloud() {
  return (<>
    <path d="M90 130a50 50 0 0 1 96-26 42 42 0 0 1 80 22 38 38 0 0 1-4 76H98a38 38 0 0 1-8-72z" />
    <text x="146" y="172" {...label}>Azure</text>
    {[40, 146, 252].map((x, i) => (<g key={x}><rect x={x} y="250" width="96" height="70" rx="8" /><path d={`M${x} 274h96M${x + 32} 250v70M${x + 64} 250v70`} /><text x={x + 16} y="348" {...small}>svc-{i + 1}</text></g>))}
    <path d="M88 202v48M194 202v48M300 202v48" strokeDasharray="6 7" />
    {[['build', 40], ['test', 150], ['deploy', 260]].map(([t, x]) => (<g key={t as string}><rect x={x as number} y="380" width="96" height="44" rx="22" /><text x={(x as number) + 20} y="410" {...small}>{t}</text></g>))}
    <path d="M136 402h14m-6-6 6 6-6 6M246 402h14m-6-6 6 6-6 6" />
    <path d="M362 394l10 10 18-22" />
    <rect x="40" y="450" width="330" height="56" rx="8" /><text x="56" y="486" {...label}>&gt;_ docker compose up -d</text>
    <text x="276" y="40" {...small}>nginx :443</text><path d="M300 50l-30 40" /><path d="M262 80l8 10 10-6" />
  </>);
}

export function Doodle({ kind }: { kind: DoodleKind }) {
  return (
    <svg viewBox="0 0 400 520" preserveAspectRatio="xMidYMin meet" className="h-full w-full" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <g>
        {kind === 'backend' && <Backend />}
        {kind === 'data' && <Data />}
        {kind === 'mobile' && <Mobile />}
        {kind === 'cloud' && <Cloud />}
      </g>
    </svg>
  );
}
