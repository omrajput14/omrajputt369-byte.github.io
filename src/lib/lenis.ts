import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
let locked = false;

/** Lock/unlock page scrolling (used by the boot intro). Safe to call before init. */
export function setScrollLocked(value: boolean) {
  locked = value;
  if (!lenis) return;
  if (value) lenis.stop();
  else lenis.start();
}

/** One smooth-scroll instance, driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function initSmoothScroll() {
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  if (locked) lenis.stop();
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (t: number) => lenis?.raf(t * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

export { gsap, ScrollTrigger };
