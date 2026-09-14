import { ArrowUpRight } from 'lucide-react';
import { notes } from '../lib/data';
import { Container, SectionHeading } from './ui';
import { Reveal } from './Reveal';

export function EngineeringNotes() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHeading index="07" eyebrow="Writing" title="Engineering notes" />

        <div className="grid gap-6 sm:grid-cols-3">
          {notes.map((note, i) => (
            <Reveal key={note.title} delay={i * 0.06}>
              <a
                href={note.href}
                className="group block h-full rounded-lg border border-border bg-surface p-6 transition-colors hover:border-accent/40"
              >
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wide text-muted">
                  <span>{note.tag}</span>
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold leading-snug">{note.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{note.description}</p>
                <span className="mt-4 block font-mono text-xs text-muted">{note.readTime}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
