import { projects } from '../lib/data';

/** Every system with its real stack and links — the scannable index behind the showcase. */
export function AllWork() {
  return (
    <section id="all-work" className="px-6 py-28 sm:px-10">
      <div className="mb-14 flex items-end justify-between gap-6">
        <h2 className="t-display text-[clamp(3rem,8vw,7rem)]">All systems</h2>
        <p className="t-mono hidden sm:block">Backend · Data · Spatial · Mobile · Infra</p>
      </div>
      <ol className="border-t border-fg/20">
        {projects.map((p, i) => (
          <li key={p.id} className="grid gap-4 border-b border-fg/20 py-8 md:grid-cols-[4rem_1fr_1.2fr_auto] md:items-baseline md:gap-8">
            <span className="t-mono text-fg/50">0{i + 1}</span>
            <div>
              <h3 className="t-display text-4xl">{p.name}</h3>
              <p className="t-mono mt-1 text-accent">{p.tagline}</p>
            </div>
            <div>
              <p className="max-w-prose leading-snug">{p.description}</p>
              <p className="t-mono mt-4 text-fg/60 normal-case tracking-normal">{p.stack.join(' · ')}</p>
            </div>
            <div className="t-mono flex gap-5 md:flex-col md:items-end md:gap-2">
              {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="hover:text-accent">GitHub ↗</a>}
              {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="hover:text-accent">Live ↗</a>}
              {p.extraLink && <a href={p.extraLink.href} target="_blank" rel="noreferrer" className="hover:text-accent">{p.extraLink.label} ↗</a>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
