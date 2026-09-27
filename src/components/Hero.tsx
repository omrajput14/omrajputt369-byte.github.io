import { useEffect, useRef } from 'react';
import { Cloud, Database, MapPin, Server, Smartphone } from 'lucide-react';
import { gsap, ScrollTrigger } from '../lib/lenis';
import { heroScreens, social } from '../lib/data';

export function Hero() {
  const holder = useRef<HTMLDivElement>(null);
  const name = useRef<HTMLHeadingElement>(null);
  const om = useRef<HTMLSpanElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Rapid cycle through the project showcase posters.
    let i = 0;
    const cycle = reduce
      ? 0
      : window.setInterval(() => {
          i = (i + 1) % heroScreens.length;
          if (img.current) img.current.src = heroScreens[i];
        }, 250);

    // At rest the framed card sits in the open space beside "OM", sized to
    // the line so the name is never covered; scrolling grows it into its
    // full-width slot. Everything is measured, so it holds on any viewport.
    let dx = 0;
    let dy = 0;
    let s0 = 0.26;
    const TILT = -14;
    const measure = () => {
      const h = holder.current, f = frame.current, o = om.current, n = name.current;
      if (!h || !f || !o || !n) return;
      const hr = h.getBoundingClientRect();
      const or = o.getBoundingClientRect();
      const nr = n.getBoundingClientRect();
      const fw = f.offsetWidth;
      const fh = f.offsetHeight;
      const gap = Math.max(12, window.innerWidth * 0.02);
      const left = or.right + gap;
      const right = nr.right;
      // Width budget from the free space; height budget so the tilted card
      // stays within line one instead of spilling onto "RAJPUT".
      const byWidth = ((right - left) * 0.82) / fw;
      const rad = Math.abs(TILT) * (Math.PI / 180);
      const byHeight = (or.height * 1.02) / (fw * Math.sin(rad) + fh * Math.cos(rad));
      s0 = Math.max(0.16, Math.min(0.55, byWidth, byHeight));
      dx = (left + right) / 2 - (hr.left + fw / 2);
      dy = or.top + or.height / 2 - (hr.top + fh / 2);
    };
    const apply = (p: number) => {
      if (!frame.current) return;
      gsap.set(frame.current, {
        x: dx * (1 - p),
        y: dy * (1 - p),
        scale: s0 + (1 - s0) * p,
        rotate: TILT * (1 - p),
      });
    };
    measure();
    if (!reduce) apply(0);
    // Font swap changes the width of "OM", so re-measure once fonts land.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

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
        <h1 ref={name} className="t-display text-[clamp(5.5rem,21vw,21rem)]">
          <span className="block text-left">
            <span ref={om} className="inline-block pr-[0.06em]">Om</span>
          </span>
          <span className="block pr-[0.05em] text-right">Rajput</span>
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
          className="relative aspect-[16/9] w-full overflow-hidden rounded-[1.75rem] bg-fg p-2.5 shadow-2xl will-change-transform sm:rounded-[2.25rem] sm:p-3"
        >
          <img
            ref={img}
            src={heroScreens[0]}
            alt="Project showcase"
            className="h-full w-full rounded-[1.25rem] object-cover sm:rounded-[1.6rem]"
          />
        </div>
      </div>
    </section>
  );
}
