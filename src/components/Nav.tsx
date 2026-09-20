import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/lenis';
import { social } from '../lib/data';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);
  const items = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlay.current || !items.current) return;
    const rows = items.current.querySelectorAll('[data-row]');
    if (open) {
      document.documentElement.classList.add('lenis-stopped');
      gsap.set(overlay.current, { display: 'flex' });
      gsap.fromTo(overlay.current, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'power4.inOut' });
      gsap.fromTo(rows, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, delay: 0.25, ease: 'power3.out' });
    } else {
      document.documentElement.classList.remove('lenis-stopped');
      gsap.to(overlay.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.55,
        ease: 'power4.inOut',
        onComplete: () => gsap.set(overlay.current, { display: 'none' }),
      });
    }
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 mix-blend-difference text-bg sm:px-10">
        <a href="#home" className="t-display text-2xl tracking-tight">
          O <span className="text-accent">✦</span> R
        </a>
        <button onClick={() => setOpen((o) => !o)} className="t-mono" aria-expanded={open} aria-label="Toggle menu">
          {open ? '[ Close ]' : '[ Menu ]'}
        </button>
      </header>

      <div ref={overlay} className="fixed inset-0 z-40 hidden flex-col justify-between bg-fg px-6 pb-10 pt-28 text-bg sm:px-10" style={{ display: 'none' }}>
        <div ref={items} className="flex flex-col gap-2">
          {links.map((l) => (
            <div key={l.href} data-row>
              <a href={l.href} onClick={() => setOpen(false)} className="t-display text-[clamp(3.5rem,12vw,9rem)] transition-colors hover:text-accent">
                {l.label}
              </a>
            </div>
          ))}
        </div>
        <div ref={undefined} className="grid gap-8 border-t border-bg/20 pt-8 sm:grid-cols-3">
          <div data-row>
            <p className="t-mono text-bg/50">Find me</p>
            <div className="mt-3 flex flex-col gap-1 text-lg">
              <a href={social.github} target="_blank" rel="noreferrer" className="hover:text-accent">GitHub</a>
              <a href={social.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent">LinkedIn</a>
            </div>
          </div>
          <div data-row>
            <p className="t-mono text-bg/50">Get in touch</p>
            <a href={`mailto:${social.email}`} className="mt-3 block text-lg hover:text-accent">{social.email}</a>
          </div>
          <div data-row>
            <p className="t-mono text-bg/50">Based in</p>
            <p className="mt-3 text-lg">{social.location}</p>
          </div>
        </div>
      </div>
    </>
  );
}
