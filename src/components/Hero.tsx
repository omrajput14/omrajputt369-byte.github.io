import { useEffect, useRef } from 'react';
import { Cloud, Database, MapPin, Server, Smartphone } from 'lucide-react';
import { gsap, ScrollTrigger } from '../lib/lenis';
import { heroScreens, social } from '../lib/data';

export function Hero() {
  const holder = useRef<HTMLDivElement>(null);
  const name = useRef<HTMLHeadingElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Rapid cycle through real dashboard screens — the reference's hero tic.
    let i = 0;
    const cycle = reduce
      ? 0
      : window.setInterval(() => {
          i = (i + 1) % heroScreens.length;
          if (img.current) img.current.src = heroScreens[i];
        }, 250);

    // The framed image starts small, tilted and pulled up into the middle of
    // the name; it settles into its full-width slot as the holder scrolls
    // from the bottom of the viewport to the top.
    // Distance (px) from the frame's resting centre up to the name's centre —
    // measured, not a percentage, so it lands in the name on every viewport.
    let lift = 0;
    const measure = () => {
      if (!holder.current || !name.current) return;
      const h = holder.current.getBoundingClientRect();
      const n = name.current.getBoundingClientRect();
      lift = h.top + h.height / 2 - (n.top + n.height / 2);
    };
    const apply = (p: number) => {
      if (!frame.current) return;
      gsap.set(frame.current, {
        y: -lift * (1 - p),
        scale: 0.26 + 0.74 * p,
        rotate: -14 + 14 * p,
      });
    };
    measure();
    if (!reduce) apply(0);

    const st = ScrollTrigger.create({
      trigger: holder.current,
      start: 'top bottom',
      end: 'top top+=80',
      onRefresh: (self) => {
        measure();
        if (!reduce) apply(self.progress);
      },
      onUpdate: (self) => !reduce && apply(self.progress),
    });

    return () => {
      if (cycle) clearInterval(cycle);
      st.kill();
    };
  }, []);

  return (
    <section id="home" className="px-6 sm:px-10">
      <div className="flex min-h-screen flex-col justify-between pb-10 pt-28">
        <div />
        <h1 ref={name} className="t-display text-center text-[clamp(5.5rem,21vw,21rem)]">
          <span className="block">Om</span>
          <span className="block">Rajput</span>
        </h1>
        <div className="t-mono flex items-center justify-between gap-6">
          <div className="hidden items-center gap-3 sm:flex" aria-hidden="true">
            <Server size={16} /><Database size={16} /><Smartphone size={16} /><MapPin size={16} /><Cloud size={16} />
          </div>
          <a href={social.github} target="_blank" rel="noreferrer" className="hover:text-accent">
            Fetch // GitHub
          </a>
          <span><span className="text-accent">●</span> Systems mode: on</span>
        </div>
      </div>

      {/* Full-width slot the framed image lands in. */}
      <div ref={holder} className="relative mx-auto w-full max-w-[1400px] pb-16">
        <div
          ref={frame}
          className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.75rem] bg-fg p-2.5 shadow-2xl will-change-transform sm:rounded-[2.25rem] sm:p-3"
        >
          <img
            ref={img}
            src={heroScreens[0]}
            alt="VETRA government surveillance dashboard"
            className="h-full w-full rounded-[1.25rem] object-cover object-top sm:rounded-[1.6rem]"
          />
        </div>
      </div>
    </section>
  );
}
