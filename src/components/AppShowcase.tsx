import { useState } from 'react';
import { Smartphone } from 'lucide-react';
import { vetraScreens, type Screen } from '../lib/data';
import { Reveal } from './Reveal';

function ScreenCard({ screen }: { screen: Screen }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="shrink-0 snap-start">
      <div className="h-[380px] w-[190px] overflow-hidden rounded-2xl border border-border bg-canvas">
        {!failed ? (
          <img
            src={screen.src}
            alt={screen.caption}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 px-4 text-center">
            <Smartphone size={20} className="text-border" />
            <span className="font-mono text-[11px] text-muted">{screen.caption}</span>
          </div>
        )}
      </div>
      <p className="mt-3 max-w-[190px] font-mono text-xs text-muted">{screen.caption}</p>
    </div>
  );
}

export function AppShowcase() {
  const [tab, setTab] = useState<'farmer' | 'vet'>('farmer');
  const screens = vetraScreens[tab];

  return (
    <Reveal delay={0.1} className="mt-20">
      <div className="mb-6 flex items-center justify-between">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Product tour</div>
        <div className="flex gap-1 rounded-md border border-border p-1">
          {(['farmer', 'vet'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded px-3 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors ${
                tab === t ? 'bg-ink text-canvas' : 'text-muted hover:text-ink'
              }`}
            >
              {t === 'farmer' ? 'Farmer app' : 'Vet app'}
            </button>
          ))}
        </div>
      </div>

      <div className="scroll-thin flex gap-5 overflow-x-auto pb-2 snap-x snap-mandatory">
        {screens.map((screen) => (
          <ScreenCard key={screen.src} screen={screen} />
        ))}
      </div>
    </Reveal>
  );
}
