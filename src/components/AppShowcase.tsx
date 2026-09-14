import { useState } from 'react';
import { Smartphone, Monitor } from 'lucide-react';
import { vetraScreens, type Screen } from '../lib/data';
import { Reveal } from './Reveal';

type Variant = 'phone' | 'desktop';

const dims: Record<Variant, string> = {
  phone: 'h-[380px] w-[190px]',
  desktop: 'h-[220px] w-[360px]',
};

function ScreenCard({ screen, variant }: { screen: Screen; variant: Variant }) {
  const [failed, setFailed] = useState(false);
  const Icon = variant === 'phone' ? Smartphone : Monitor;

  return (
    <div className="shrink-0 snap-start">
      <div className={`${dims[variant]} overflow-hidden rounded-2xl border border-border bg-canvas`}>
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
            <Icon size={20} className="text-border" />
            <span className="font-mono text-[11px] text-muted">{screen.caption}</span>
          </div>
        )}
      </div>
      <p className={`mt-3 ${variant === 'phone' ? 'max-w-[190px]' : 'max-w-[360px]'} font-mono text-xs text-muted`}>
        {screen.caption}
      </p>
    </div>
  );
}

const tabs = [
  { key: 'farmer', label: 'Farmer app', variant: 'phone' as Variant },
  { key: 'vet', label: 'Vet app', variant: 'phone' as Variant },
  { key: 'gov', label: 'Gov dashboard', variant: 'desktop' as Variant },
] as const;

export function AppShowcase() {
  const [tab, setTab] = useState<'farmer' | 'vet' | 'gov'>('farmer');
  const active = tabs.find((t) => t.key === tab)!;
  const screens = vetraScreens[tab];

  return (
    <Reveal delay={0.1} className="mt-20">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Product tour</div>
        <div className="flex gap-1 rounded-md border border-border p-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`rounded px-3 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors ${
                tab === t.key ? 'bg-ink text-canvas' : 'text-muted hover:text-ink'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="scroll-thin flex gap-5 overflow-x-auto pb-2 snap-x snap-mandatory">
        {screens.map((screen) => (
          <ScreenCard key={screen.src} screen={screen} variant={active.variant} />
        ))}
      </div>
    </Reveal>
  );
}
