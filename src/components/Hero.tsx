import { useEffect, useRef } from 'react';
import { Cloud, Database, MapPin, Server, Smartphone } from 'lucide-react';
import { gsap, ScrollTrigger } from '../lib/lenis';
import { heroScreens, social } from '../lib/data';

// Reference mechanic: two long name lines at different depths — line one sits
// BEHIND the card, line two sits IN FRONT of it — so the card tucks between
// them and both lines stay readable. The card flies out of the full-viewport
// holder below and settles into it as you scroll.
export function Hero() {
  const nameBlock = useRef<HTMLDivElement>(null);
  const holder = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let i = 0;
    const cycle = reduce
      ? 0
      : window.setInterval(() => {
          i = (i + 1) % heroScreens.length;
          if (img.current) img.current.src = heroScreens[i];
        }, 250);
    if (reduce) return () => undefined;

    // Offset from the frame's resting centre to the seam between the two name
    // lines. On desktop this is what the reference's translateY(-110%) lands
    // on; measuring it keeps mobile (a shorter 16:9 frame) aligned too.
    let dx = 0;
    let dy = 0;
    let s0 = 0.25;
    const measure = () => {
      const n = nameBlock.current, h = holder.current, f = frame.current;
      if (!n || !h || !f) return;
      const nr = n.getBoundingClientRect();
      const hr = h.getBoundingClientRect();
      const pad = parseFloat(getComputedStyle(h).paddingLeft);
      const fcx = hr.left + pad + f.offsetWidth / 2;
      const fcy = hr.top + parseFloat(getComputedStyle(h).paddingTop) + f.offsetHeight / 2;
      dx = nr.left + nr.width / 2 - fcx;
      // Sit a little below the seam: the card mostly rests behind line two
      // (which is in front of it) and only grazes the foot of the name, so
      // "OM RAJPUT" always reads in full.
      const lineH = (n.firstElementChild as HTMLElement).getBoundingClientRect().height;
      const wide = window.innerWidth >= 1000;
      dy = nr.top + nr.height / 2 + lineH * (wide ? 0.45 : 0.8) - fcy;
      s0 = wide ? 0.25 : 0.34;
    };
    const apply = (p: number) => {
      if (!frame.current) return;
      gsap.set(frame.current, {
        x: dx * (1 - p),
        y: dy * (1 - p),
        scale: s0 + (1 - s0) * p,
        rotate: -15 * (1 - p),
      });
    };
    measure();
    apply(0);

    const st = ScrollTrigger.create({
      trigger: holder.current,
      start: 'top bottom',
      end: 'top top',
      onRefresh: (self) => {
        measure();
        apply(self.progress);
      },
      onUpdate: (self) => apply(self.progress),
    });
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      if (cycle) clearInterval(cycle);
      st.kill();
    };
  }, []);

  return (
    <>
      <section id="home" className="relative flex h-[100svh] min-h-[560px] flex-col items-center justify-center overflow-x-clip px-6 sm:px-8">
        <div ref={nameBlock} className="t-display whitespace-nowrap text-center text-[14.6vw] leading-[0.9]">
          {/* behind the card */}
          <div className="relative -z-10 -translate-x-[2%]">
            <h1>Om Rajput</h1>
          </div>
          {/* in front of the card */}
          <div className="relative z-20 translate-x-[7%]">
            <p>Builds Systems</p>
          </div>
        </div>

        <div className="t-mono absolute inset-x-0 bottom-0 flex items-center justify-end p-6 sm:p-8 lg:justify-between">
          <div className="hidden items-center gap-3 lg:flex" aria-hidden="true">
            <Server size={16} /><Database size={16} /><Smartphone size={16} /><MapPin size={16} /><Cloud size={16} />
          </div>
          <a
            href={social.github}
            target="_blank"
            rel="noreferrer"
            className="absolute left-6 hover:text-accent sm:left-8 lg:left-1/2 lg:-translate-x-1/2"
          >
            Fetch // GitHub
          </a>
          <span>Systems mode: on</span>
        </div>
      </section>

      {/* Full-viewport holder the card lands in (16:9 below 1000px). */}
      <section ref={holder} className="relative px-6 pb-6 sm:px-8 sm:pb-8 lg:h-[100svh] lg:pt-8">
        <div
          ref={frame}
          className="relative aspect-[16/9] w-full overflow-hidden rounded-[1.25em] border-[0.3em] border-fg bg-fg will-change-transform lg:aspect-auto lg:h-full lg:rounded-[2em]"
        >
          <img ref={img} src={heroScreens[0]} alt="Project showcase" className="h-full w-full object-cover" />
        </div>
      </section>
    </>
  );
}
