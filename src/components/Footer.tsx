import { social } from '../lib/data';

export function Footer() {
  return (
    <footer className="bg-fg px-6 pb-8 pt-24 text-bg sm:px-10">
      <h2 className="t-display text-[clamp(4rem,16vw,15rem)] leading-[0.85]">Om Rajput</h2>
      <div className="t-mono mt-16 grid gap-10 border-t border-bg/20 pt-10 sm:grid-cols-3">
        <div>
          <p className="text-bg/50">Explore</p>
          <div className="mt-3 flex flex-col gap-2"><a href="#home" className="hover:text-accent">Home</a><a href="#work" className="hover:text-accent">Work</a><a href="#contact" className="hover:text-accent">Contact</a></div>
        </div>
        <div>
          <p className="text-bg/50">Connect</p>
          <div className="mt-3 flex flex-col gap-2">
            <a href={social.github} target="_blank" rel="noreferrer" className="hover:text-accent">GitHub</a>
            <a href={social.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent">LinkedIn</a>
            <a href={social.instagram} target="_blank" rel="noreferrer" className="hover:text-accent">Instagram</a>
          </div>
        </div>
        <div>
          <p className="text-bg/50">Currently</p>
          <div className="mt-3 flex flex-col gap-2"><a href="https://vetra.co.in" target="_blank" rel="noreferrer" className="hover:text-accent">Building VETRA ↗</a></div>
        </div>
      </div>
      <p className="t-mono mt-16 text-bg/50">© — Om Rajput // {new Date().getFullYear()}</p>
    </footer>
  );
}
