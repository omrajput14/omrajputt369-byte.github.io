import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Github } from 'lucide-react';
import { vetra } from '../lib/data';
import { Container, Chip, LinkButton, SectionHeading } from './ui';
import { Reveal } from './Reveal';

const flow = [
  { label: 'Farmer / Vet', detail: 'Field entry point' },
  { label: 'Flutter', detail: 'Offline-first mobile app' },
  { label: 'REST API', detail: 'Spring Boot service layer' },
  { label: 'PostgreSQL + PostGIS', detail: 'Records & spatial data' },
  { label: 'Disease Surveillance', detail: 'Outbreak intelligence' },
  { label: 'Government Dashboard', detail: 'Reporting & response' },
];

export function VetraFlagship() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="vetra" className="border-y border-border bg-surface/40 py-24 sm:py-32">
      <Container>
        <SectionHeading index="01" eyebrow="Flagship system" title="Currently building — VETRA" />

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <h3 className="font-display text-2xl font-semibold">{vetra.tagline}</h3>
            <p className="mt-4 text-muted leading-relaxed">{vetra.description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href={vetra.live} target="_blank" rel="noreferrer" variant="primary">
                Live System <ArrowUpRight size={16} />
              </LinkButton>
              <LinkButton href={vetra.github} target="_blank" rel="noreferrer" variant="secondary">
                <Github size={16} /> GitHub
              </LinkButton>
              <button
                onClick={() => setExpanded((e) => !e)}
                className="inline-flex items-center gap-1.5 px-5 py-3 font-mono text-xs uppercase tracking-wide text-muted hover:text-ink transition-colors"
                aria-expanded={expanded}
              >
                Architecture
                <ChevronDown size={14} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {vetra.extraLink && (
              <a
                href={vetra.extraLink.href}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block font-mono text-xs text-muted underline decoration-border underline-offset-4 hover:text-accent"
              >
                {vetra.extraLink.label} ↗
              </a>
            )}

            <motion.div
              initial={false}
              animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="mt-6 flex flex-wrap gap-2 pt-2 group">
                {vetra.stack.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </motion.div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative rounded-lg border border-border bg-canvas p-6 sm:p-8">
              <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Data flow</div>
              <ol className="relative">
                {flow.map((node, i) => (
                  <motion.li
                    key={node.label}
                    whileHover={{ x: 4 }}
                    className="group relative flex gap-4 pb-8 last:pb-0"
                  >
                    {i < flow.length - 1 && (
                      <span className="absolute left-[7px] top-4 h-full w-px bg-border transition-colors group-hover:bg-accent/50" />
                    )}
                    <span className="relative mt-1 h-[15px] w-[15px] shrink-0 rounded-full border-2 border-border bg-canvas transition-colors group-hover:border-accent" />
                    <span>
                      <span className="block font-medium text-ink">{node.label}</span>
                      <span className="block font-mono text-xs text-muted">{node.detail}</span>
                    </span>
                  </motion.li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
