import { systems } from '../lib/data';
import { Container, SectionHeading } from './ui';
import { Reveal } from './Reveal';

export function Systems() {
  return (
    <section id="systems" className="py-24 sm:py-32">
      <Container>
        <SectionHeading index="03" eyebrow="Breadth" title="Systems I build" />

        <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {systems.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05} className="bg-canvas p-6">
              <span className="font-mono text-xs text-accent">0{i + 1}</span>
              <h3 className="mt-3 font-display text-base font-semibold">{s.title}</h3>
              <p className="mt-2 text-xs text-muted leading-relaxed">{s.description}</p>
              <ul className="mt-4 space-y-1.5">
                {s.items.map((item) => (
                  <li key={item} className="font-mono text-[11px] text-muted flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-border" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
