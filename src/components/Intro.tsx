import { useEffect, useRef, useState } from 'react';
import { gsap, setScrollLocked } from '../lib/lenis';

// The intro is a system boot: a log brings the stack up bottom-first, then
// the screen splits into the architecture's layers — each band labelled —
// and they lift away top-first to reveal the site.

const bootLog: Array<[string, string]> = [
  ['infra', 'docker · nginx · azure'],
  ['data', 'postgresql · postgis · redis'],
  ['services', 'spring boot · fastapi · rest'],
  ['clients', 'flutter · react'],
];

// Top of the screen to the bottom = top of the stack to the bottom.
const layers = [
  { n: '04', name: 'Clients', tech: 'Flutter · React', cls: 'bg-accent3 text-fg' },
  { n: '03', name: 'Services', tech: 'Spring Boot · FastAPI · REST', cls: 'bg-accent2 text-fg' },
  { n: '02', name: 'Data', tech: 'PostgreSQL · PostGIS · Redis', cls: 'bg-accent text-fg' },
  { n: '01', name: 'Infrastructure', tech: 'Docker · Nginx · Azure', cls: 'bg-accent4 text-bg' },
];

const readBooted = () => {
  try {
    return sessionStorage.getItem('booted') === '1';
  } catch {
    return false;
  }
};

export function Intro() {
  const [done, setDone] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  // Read once at mount (StrictMode re-runs effects, so don't decide in there).
  const [fullBoot] = useState(() => !readBooted());
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (done || !root.current) return;
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    setScrollLocked(true);

    const finish = () => {
      try {
        sessionStorage.setItem('booted', '1');
      } catch {
        /* private mode — just replay next time */
      }
      setScrollLocked(false);
      setDone(true);
    };

    // gsap.context so cleanup reverts every inline style it set — StrictMode
    // runs this effect twice, and a bare .from() would leave lines at 0.
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: finish });
      if (fullBoot) {
        const n = { v: 0 };
        tl.fromTo('[data-line]', { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.25, stagger: 0.2, ease: 'power2.out' }, 0.15)
          .to(
            n,
            {
              v: 100,
              duration: 1.15,
              ease: 'power1.inOut',
              onUpdate: () => {
                if (count.current) count.current.textContent = String(Math.round(n.v)).padStart(3, '0');
              },
            },
            0.1,
          )
          .to('[data-band]', { yPercent: -100, duration: 0.9, stagger: 0.1, ease: 'power2.inOut' }, 1.45);
      } else {
        // Repeat visit this session: skip the log, just lift the stack away.
        gsap.set('[data-boot]', { display: 'none' });
        tl.to('[data-band]:not([data-boot])', { yPercent: -100, duration: 0.7, stagger: 0.08, ease: 'power2.inOut' }, 0.1);
      }
    }, root);

    return () => {
      ctx.revert();
      setScrollLocked(false);
    };
  }, [done, fullBoot]);

  if (done) return null;

  return (
    <div ref={root} aria-hidden="true" className="fixed inset-0 z-[100]">
      {/* boot screen — top of the pile, leaves first */}
      <div data-band data-boot className="absolute inset-0 bg-fg text-bg will-change-transform" style={{ zIndex: 50 }}>
        <div className="flex h-full flex-col justify-between px-6 py-8 sm:px-10 sm:py-10">
          <div className="t-mono flex justify-between">
            <span>om.rajput — system boot</span>
            <span className="opacity-50">nashik · in</span>
          </div>

          <div className="font-mono text-[12px] leading-7 sm:text-sm sm:leading-8">
            {bootLog.map(([k, v]) => (
              <p key={k} data-line className="flex gap-3 sm:gap-5">
                <span className="text-accent3">[ OK ]</span>
                <span className="w-20 sm:w-24">{k}</span>
                <span className="opacity-50">{v}</span>
              </p>
            ))}
            <p data-line className="mt-2 text-accent">
              5 systems online<span className="animate-pulse">_</span>
            </p>
          </div>

          <div className="flex items-end justify-between">
            <span className="t-mono opacity-50">booting</span>
            <span ref={count} className="t-display text-[clamp(5rem,16vw,14rem)] leading-none">
              000
            </span>
          </div>
        </div>
      </div>

      {/* architecture layers — the label rides each band's bottom edge */}
      {layers.map((l, i) => (
        <div key={l.n} data-band className={`absolute inset-0 will-change-transform ${l.cls}`} style={{ zIndex: 40 - i * 10 }}>
          <div className="absolute inset-x-0 bottom-0 flex items-baseline justify-between gap-4 px-6 pb-4 sm:px-10 sm:pb-6">
            <span className="t-mono">
              {l.n} / {l.name}
            </span>
            <span className="t-mono text-right opacity-70">{l.tech}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
