import { engineering, metrics } from '../lib/data';
import { Container, SectionHeading } from './ui';
import { Reveal } from './Reveal';
import { AnimatedCounter } from './AnimatedCounter';

export function Engineering() {
  return (
    <section id="engineering" className="border-y border-border bg-surface/40 py-24 sm:py-32">
      <Container>
        <SectionHeading index="04" eyebrow="Stack" title="Engineering" />

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {engineering.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.05}>
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{group.title}</h3>
              <ul className="mt-4 space-y-2 border-l border-border pl-4">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 border-t border-border pt-12 sm:grid-cols-3">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.05}>
              <div className="font-display text-4xl font-semibold tabular-nums sm:text-5xl">
                {m.numeric !== undefined ? <AnimatedCounter target={m.numeric} suffix={m.suffix} /> : m.value}
              </div>
              <div className="mt-2 font-mono text-xs uppercase tracking-wide text-muted">{m.label}</div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15} className="mt-6 font-mono text-xs uppercase tracking-wide text-muted">
          End-to-end product development — idea, backend, data, deployment.
        </Reveal>
      </Container>
    </section>
  );
}
