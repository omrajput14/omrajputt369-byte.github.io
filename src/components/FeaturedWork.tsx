import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../lib/lenis';
import { projects } from '../lib/data';

// Where each flying card sits in the frame (left%, top%) — spread around the
// edges so the horizontally-scrolling titles stay readable in the middle.
const SLOTS: Array<[number, number]> = [
  [8, 12], [70, 8], [78, 62], [12, 66], [42, 74], [58, 18], [28, 30],
];

const useDesktop = () => {
  const [d, setD] = useState(() => window.innerWidth >= 1000);
  useEffect(() => {
    // Plain resize rather than matchMedia — some embedded/emulated viewports
    // never dispatch the media-query change event.
    const fn = () => setD(window.innerWidth >= 1000);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return d;
};

export function FeaturedWork() {
  const desktop = useDesktop();
  const section = useRef<HTMLElement>(null);
  const titles = useRef<HTMLDivElement>(null);
  const cards = useRef<Array<HTMLAnchorElement | null>>([]);
  const dots = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    if (!desktop || !section.current || !titles.current) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const move = window.innerWidth * 4;
    gsap.set(cards.current, { z: -1500, scale: 0, opacity: 0 });

    const st = ScrollTrigger.create({
      trigger: section.current,
      start: 'top top',
      end: () => `+=${window.innerHeight * 5}`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;
        gsap.set(titles.current, { x: -move * p });

        cards.current.forEach((card, i) => {
          if (!card) return;
          const s = Math.min(1, Math.max(0, (p - i * 0.075) * 2));
          const fade = s < 0.15 ? s / 0.15 : s > 0.85 ? (1 - s) / 0.15 : 1;
          gsap.set(card, { z: -1500 + 3000 * s, scale: s, opacity: fade });
        });

        dots.current.forEach((dot, i) => {
          if (dot) dot.style.opacity = p * dots.current.length > i ? '1' : '0.2';
        });
      },
    });

    return () => st.kill();
  }, [desktop]);

  if (!desktop) {
    // Under 1000px the pinned 3D choreography fights touch scrolling, so the
    // work reads as a straightforward list instead.
    return (
      <section id="work" className="px-6 py-24">
        <div className="mb-10 flex items-baseline justify-between">
          <h2 className="t-display text-5xl">Featured work</h2>
          <span className="t-mono">[ {projects.length} ]</span>
        </div>
        <div className="flex flex-col gap-10">
          {projects.map((p) => (
            <a key={p.id} href={p.live ?? p.github} target="_blank" rel="noreferrer" className="block">
              {p.image ? (
                <div className="aspect-[16/10] overflow-hidden rounded-sm"><img src={p.image} alt={p.name} /></div>
              ) : (
                <div className="flex aspect-[16/10] items-end rounded-sm bg-fg p-6 text-bg">
                  <span className="t-display text-4xl">{p.name}</span>
                </div>
              )}
              <div className="mt-3 flex items-baseline justify-between gap-4">
                <h3 className="t-display text-3xl">{p.name}</h3>
                <span className="t-mono text-right">{p.tagline}</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={section} id="work" className="relative h-screen overflow-hidden">
      <div className="absolute left-10 top-10 z-20 flex items-center gap-6">
        <p className="t-mono">Featured work</p>
        <span className="t-mono">[ {projects.length} ]</span>
      </div>
      <div className="absolute right-10 top-10 z-20 flex gap-1.5">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} ref={(el) => (dots.current[i] = el)} className="h-1.5 w-1.5 rounded-full bg-fg transition-opacity duration-300" style={{ opacity: 0.2 }} />
        ))}
      </div>

      {/* Flying cards live in a perspective box behind the titles. */}
      <div className="absolute inset-0 z-0" style={{ perspective: '1000px' }}>
        {projects.map((p, i) => (
          <a
            key={p.id}
            ref={(el) => (cards.current[i] = el)}
            href={p.live ?? p.github}
            target="_blank"
            rel="noreferrer"
            className="absolute w-[24vw] max-w-[380px] overflow-hidden rounded-sm shadow-2xl will-change-transform"
            style={{ left: `${SLOTS[i % SLOTS.length][0]}%`, top: `${SLOTS[i % SLOTS.length][1]}%`, transformStyle: 'preserve-3d' }}
          >
            {p.image ? (
              <div className="aspect-[16/10]"><img src={p.image} alt={p.name} /></div>
            ) : (
              <div className="flex aspect-[16/10] flex-col justify-end bg-fg p-5 text-bg">
                <span className="t-mono text-accent">{p.tagline}</span>
                <span className="t-display mt-2 text-4xl">{p.name}</span>
              </div>
            )}
          </a>
        ))}
      </div>

      <div className="absolute inset-y-0 left-0 z-10 flex items-center">
        <div ref={titles} className="flex items-center whitespace-nowrap pl-[10vw] will-change-transform">
          {projects.map((p, i) => (
            <a
              key={p.id}
              href={p.live ?? p.github}
              target="_blank"
              rel="noreferrer"
              className="t-display group mr-[12vw] text-[clamp(6rem,15vw,15rem)] transition-colors hover:text-accent"
            >
              <span className="t-mono mr-6 inline-block align-top text-fg/50 not-italic tracking-normal group-hover:text-accent">0{i + 1}</span>
              {p.name}
            </a>
          ))}
        </div>
      </div>

      <a href="#all-work" className="t-mono absolute bottom-10 left-10 z-20 border-b border-fg pb-1 hover:border-accent hover:text-accent">
        View all systems ↓
      </a>
    </section>
  );
}
