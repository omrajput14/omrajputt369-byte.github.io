import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/lenis';
import { social, workImages } from '../lib/data';

export function Hero() {
  const holder = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Rapid cycle through real project screenshots — the reference's hero tic.
    let i = 0;
    const cycle = reduce
      ? 0
      : window.setInterval(() => {
          i = (i + 1) % workImages.length;
          if (img.current) img.current.src = workImages[i];
        }, 250);

    // The image starts small, tilted and pushed up, and settles into place as
    // its holder scrolls from the bottom of the viewport to the top.
    const st = ScrollTrigger.create({
      trigger: holder.current,
      start: 'top bottom',
      end: 'top top',
      onUpdate: (self) => {
        if (!img.current || reduce) return;
        const p = self.progress;
        gsap.set(img.current, {
          yPercent: -110 + 110 * p,
          scale: 0.25 + 0.75 * p,
          rotate: -15 + 15 * p,
        });
      },
    });

    return () => {
      if (cycle) clearInterval(cycle);
      st.kill();
    };
  }, []);

  return (
    <section id="home" className="px-6 pt-32 sm:px-10">
      <div className="flex min-h-[calc(100vh-8rem)] flex-col justify-between">
        <div className="flex items-start justify-between gap-6">
          <p className="t-mono">Systems Engineer</p>
          <p className="t-mono hidden sm:block">{social.location}</p>
          <p className="t-mono">
            <span className="text-accent">●</span> Building: VETRA
          </p>
        </div>

        <h1 className="t-display mt-16 text-[clamp(5rem,22vw,20rem)]">
          <span className="block">Om</span>
          <span className="block pl-[0.12em]">Rajput</span>
        </h1>

        <div className="mt-12 flex flex-wrap items-end justify-between gap-6 pb-8">
          <p className="max-w-md text-lg leading-snug">
            Backend, data, spatial and cloud infrastructure for AgriTech, CivicTech and veterinary healthcare — built to
            work outside the demo.
          </p>
          <a href={social.github} target="_blank" rel="noreferrer" className="t-mono border-b border-fg pb-1 transition-colors hover:border-accent hover:text-accent">
            Fetch // GitHub ↗
          </a>
        </div>
      </div>

      <div ref={holder} className="relative mx-auto mt-4 aspect-[16/10] w-full max-w-5xl overflow-visible">
        <img
          ref={img}
          src={workImages[0]}
          alt="Screenshots of shipped systems"
          className="h-full w-full rounded-sm object-cover will-change-transform"
          style={{ transformOrigin: 'center top' }}
        />
      </div>
    </section>
  );
}
