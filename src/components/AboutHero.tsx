import { useEffect, useRef } from 'react';
import { gsap } from '../lib/lenis';

// Reference layout: centred "Hi, I'm / Name", a tilted portrait parked in the
// middle (teal border, coral outline) that lifts and counter-rotates as you
// scroll past, and the bio centred at the bottom.
export function AboutHero() {
  const section = useRef<HTMLElement>(null);
  const portrait = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const desktop = window.innerWidth >= 1000;
    gsap.set(portrait.current, { xPercent: -50, yPercent: -50, rotation: desktop ? 10 : 0 });
    if (reduce || !desktop) return;
    const tween = gsap.to(portrait.current, {
      y: -200,
      rotation: -25,
      ease: 'none',
      scrollTrigger: { trigger: section.current, start: 'top top', end: 'bottom top', scrub: 1 },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section ref={section} className="relative flex h-[100svh] min-h-[720px] flex-col items-center justify-between overflow-hidden px-6 pb-16 pt-32 sm:px-8">
      <div className="text-center">
        <h2 className="t-display text-[clamp(4rem,8.5vw,7.5rem)]">Hi, I'm</h2>
        <h2 className="t-display text-[clamp(4rem,8.5vw,7.5rem)]">Om</h2>
      </div>

      <div
        ref={portrait}
        className="absolute left-1/2 top-[52%] aspect-[5/7] w-[34%] overflow-hidden rounded-2xl border-[0.25em] border-accent3 outline outline-[0.25em] outline-accent will-change-transform sm:w-[24%] lg:top-[55%] lg:w-[15%]"
      >
        <img src="/images/profile.jpg" alt="Om Rajput" className="h-full w-full object-cover" />
      </div>

      <div className="flex w-full flex-col items-center gap-6 text-center lg:w-1/2">
        <p className="text-base leading-snug sm:text-lg">
          I'm a systems engineer and architect, more interested in how a whole system holds together than in any one
          layer of it. I take messy real-world problems — livestock disease surveillance, crop export logistics,
          village governance — and turn them into structured software that keeps working where connectivity doesn't.
        </p>
        <p className="t-mono">Build / Ship / Scale / Repeat</p>
      </div>
    </section>
  );
}
