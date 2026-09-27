import { useEffect, useRef } from 'react';
import { Cloud, Database, Server, Smartphone } from 'lucide-react';
import { projects, social } from '../lib/data';

// Reference footer: rounded dark card, centred name and columns, and the work
// images burst out of the bottom as the footer arrives (simple physics:
// gravity + friction), resetting once you scroll away.
const cfg = { gravity: 0.25, friction: 0.99, size: 170, hForce: 20, vForce: 15, spin: 10 };

const cols = [
  { h: 'Explore', links: [['Home', '#home'], ['Work', '#work'], ['Contact', '#contact']] },
  { h: 'Systems', links: projects.slice(0, 3).map((p) => [p.name, p.live ?? p.github ?? '#work']) },
  { h: 'Connect', links: [['LinkedIn', social.linkedin], ['GitHub', social.github], ['X', social.twitter]] },
  { h: 'Currently', links: [['Building VETRA', 'https://vetra.co.in'], [social.location, '#contact']] },
];

function Corner() {
  return (
    <div className="flex items-center gap-2 opacity-60" aria-hidden="true">
      <Server size={14} /><Database size={14} /><Smartphone size={14} /><Cloud size={14} />
    </div>
  );
}

export function Footer() {
  const footer = useRef<HTMLElement>(null);
  const burst = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const box = burst.current;
    if (reduce || !box || !footer.current) return;

    let exploded = false;
    let raf = 0;

    const explode = () => {
      if (exploded || window.innerWidth < 1000) return;
      exploded = true;
      box.innerHTML = '';
      const parts = projects.map((p) => {
        const el = document.createElement('img');
        el.src = p.image!;
        el.alt = '';
        el.className = 'absolute left-1/2 rounded-2xl shadow-xl will-change-transform';
        Object.assign(el.style, { bottom: '-160px', width: `${cfg.size}px`, height: 'auto' });
        box.appendChild(el);
        return {
          el,
          x: 0,
          y: 0,
          vx: (Math.random() - 0.5) * cfg.hForce,
          vy: -cfg.vForce - Math.random() * 10,
          r: 0,
          vr: (Math.random() - 0.5) * cfg.spin,
        };
      });
      const tick = () => {
        let settled = true;
        for (const p of parts) {
          p.vy += cfg.gravity;
          p.vx *= cfg.friction;
          p.vy *= cfg.friction;
          p.vr *= cfg.friction;
          p.x += p.vx;
          p.y += p.vy;
          p.r += p.vr;
          p.el.style.transform = `translate(calc(-50% + ${p.x}px), ${p.y}px) rotate(${p.r}deg)`;
          if (p.y < box.offsetHeight / 2) settled = false;
        }
        if (!settled) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const check = () => {
      const top = footer.current!.getBoundingClientRect().top;
      if (top > window.innerHeight + 100) exploded = false;
      if (!exploded && top <= window.innerHeight - 250) explode();
    };
    window.addEventListener('scroll', check, { passive: true });
    check();

    return () => {
      window.removeEventListener('scroll', check);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <footer ref={footer} className="relative h-[85svh] min-h-[600px] p-6 text-bg sm:p-8 max-lg:h-[100svh]">
      <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[2em] bg-fg p-6 sm:p-8">
        <div className="flex justify-between"><Corner /><Corner /></div>

        <h2 className="t-display text-center text-[clamp(3.5rem,11vw,10rem)]">Om Rajput</h2>

        <div className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
          {cols.map((c) => (
            <div key={c.h} className="flex flex-col items-center gap-3">
              <p className="t-mono">{c.h}</p>
              {c.links.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="opacity-40 transition-opacity hover:opacity-100"
                >
                  {label}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="flex items-end justify-between">
          <Corner />
          <p className="t-mono opacity-60">© — Om Rajput // {new Date().getFullYear()}</p>
          <Corner />
        </div>

        <div ref={burst} className="pointer-events-none absolute bottom-0 left-0 h-[200%] w-full overflow-hidden" aria-hidden="true" />
      </div>
    </footer>
  );
}
