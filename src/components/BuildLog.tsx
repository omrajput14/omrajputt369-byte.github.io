import { buildLog } from '../lib/data';
import { Container, SectionHeading } from './ui';
import { Reveal } from './Reveal';

export function BuildLog() {
  return (
    <section id="buildlog" className="py-24 sm:py-32">
      <Container>
        <SectionHeading index="05" eyebrow="Progression" title="Build log" description="Six systems, in order." />

        <ol className="relative border-l border-border pl-8">
          {buildLog.map((entry, i) => (
            <Reveal key={entry.title} delay={i * 0.06} className="relative pb-12 last:pb-0">
              <span className="absolute -left-[calc(2rem+5px)] top-1 h-[9px] w-[9px] rounded-full border-2 border-accent bg-canvas" />
              <span className="font-mono text-xs text-accent">{entry.tag}</span>
              <h3 className="mt-1 font-display text-xl font-semibold">{entry.title}</h3>
              <p className="mt-2 max-w-2xl text-sm text-muted leading-relaxed">{entry.description}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
