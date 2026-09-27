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
  const bars = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    if (!desktop || !section.current || !titles.current) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    // One title per viewport width, the first being the section label.
    const move = window.innerWidth * projects.length;
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

        bars.current.forEach((bar, i) => {
          if (bar) bar.style.opacity = p * bars.current.length > i ? '1' : '0.2';
        });
      },
    });

    return () => st.kill();
  }, [desktop]);

  if (!desktop) {
    // Under 1000px the pinned 3D choreography fights touch scrolling, so the
    // work reads as a straightforward list instead.
    return (
      // Distinct keys: without them React reuses the desktop titles node for
      // this list on resize, and it keeps GSAP's leftover translateX.
      <section key="work-mobile" id="work" className="px-6 py-24">
        <div className="mb-10 flex items-baseline justify-between">
          <h2 className="t-display text-5xl">Featured work</h2>
          <span className="t-mono">[ {projects.length} ]</span>
        </div>
        <div className="flex flex-col gap-10">
          {projects.map((p) => (
            <a key={p.id} href={p.live ?? p.github} target="_blank" rel="noreferrer" className="block">
              <div className="overflow-hidden rounded-lg">
                <div className="aspect-[16/9]"><img src={p.image} alt={p.name} /></div>
              </div>
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
    // ScrollTrigger's pin wraps the pinned node in its own spacer div, which
    // React doesn't know about — so React must own a wrapper around it, or
    // unmounting (e.g. resizing below 1000px) throws on removeChild and blanks
    // the whole app.
    <div key="work-desktop" id="work">
    <section ref={section} className="relative h-screen overflow-hidden">
      {/* Flying cards live in a perspective box behind the titles. */}
      <div className="absolute inset-0 z-0" style={{ perspective: '1000px' }}>
        {projects.map((p, i) => (
          <a
            key={p.id}
            ref={(el) => (cards.current[i] = el)}
            href={p.live ?? p.github}
            target="_blank"
            rel="noreferrer"
            className="absolute w-[24vw] max-w-[380px] overflow-hidden rounded-[1.5em] shadow-2xl will-change-transform"
            style={{ left: `${SLOTS[i % SLOTS.length][0]}%`, top: `${SLOTS[i % SLOTS.length][1]}%`, transformStyle: 'preserve-3d' }}
          >
            <div className="aspect-[16/9]"><img src={p.image} alt={p.name} /></div>
          </a>
        ))}
      </div>

      {/* One title per viewport width, reference-style. */}
      <div ref={titles} className="absolute inset-y-0 left-0 z-10 flex will-change-transform" style={{ width: `${(projects.length + 1) * 100}vw` }}>
        <div className="flex w-screen items-center justify-center">
          <h2 className="t-display -translate-y-[0.4em] text-center text-[clamp(4.5rem,8vw,8rem)]">Featured Systems</h2>
        </div>
        {projects.map((p, i) => (
          <div key={p.id} className="flex w-screen items-center justify-center">
            <a href={p.live ?? p.github} target="_blank" rel="noreferrer" className="group -translate-y-[0.4em] text-center">
              <span className="t-mono block text-fg/50 group-hover:text-accent">0{i + 1} — {p.tagline}</span>
              <span className="t-display mt-3 block text-[clamp(4.5rem,8vw,8rem)] transition-colors group-hover:text-accent">{p.name}</span>
            </a>
          </div>
        ))}
      </div>

      {/* Vertical progress pill on the right. */}
      <div className="absolute right-8 top-1/2 z-20 flex w-8 -translate-y-1/2 flex-col items-center gap-[0.35rem] rounded-full bg-fg px-[0.65rem] py-5" aria-hidden="true">
        {Array.from({ length: 36 }).map((_, i) => (
          <span key={i} ref={(el) => (bars.current[i] = el)} className="h-[1.5px] w-full bg-bg transition-opacity duration-300" style={{ opacity: 0.2 }} />
        ))}
      </div>

      <div className="t-mono absolute inset-x-0 bottom-0 z-20 flex items-center justify-between p-8">
        <p>Systems shipped [ {projects.length} ]</p>
        <p className="opacity-50">///////////////////</p>
        <a href="#all-work" className="hover:text-accent">View all systems ↓</a>
      </div>
    </section>
    </div>
  );
}
