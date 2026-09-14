import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Globe, Landmark, Stethoscope } from 'lucide-react';
import { allProjects, categoryLabels, type Category, type ProjectIcon } from '../lib/data';
import { Container, Chip, SectionHeading } from './ui';
import { Reveal } from './Reveal';

const icons: Record<ProjectIcon, typeof Stethoscope> = {
  vetra: Stethoscope,
  website: Globe,
  landmark: Landmark,
};

function ProjectBanner({ icon }: { icon: ProjectIcon }) {
  const Icon = icons[icon];
  return (
    <div
      className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-border bg-canvas"
      style={{
        backgroundImage:
          'linear-gradient(rgb(var(--border)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--border)) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    >
      <Icon
        size={40}
        strokeWidth={1.25}
        className="text-muted transition-transform duration-500 group-hover:scale-110 group-hover:text-accent"
      />
    </div>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Category | 'all'>('all');

  const activeCategories = useMemo(
    () => Array.from(new Set(allProjects.flatMap((p) => p.categories))) as Category[],
    []
  );
  const filters: Array<Category | 'all'> = ['all', ...activeCategories];

  const visible = allProjects.filter((p) => filter === 'all' || p.categories.includes(filter));

  return (
    <section id="work" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          index="02"
          eyebrow="Work"
          title="Engineered systems"
          description="Real, shipped software — not demos. Each one solves a specific problem end to end."
        />

        {filters.length > 2 && (
          <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
            {filters.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={`rounded-md px-3.5 py-2 font-mono text-xs uppercase tracking-wide transition-colors ${
                  filter === f ? 'bg-ink text-canvas' : 'border border-border text-muted hover:text-ink hover:border-accent/40'
                }`}
              >
                {f === 'all' ? 'All' : categoryLabels[f]}
              </button>
            ))}
          </div>
        )}

        <motion.div layout className="grid gap-6 sm:grid-cols-2">
          {visible.map((project) => (
            <motion.article
              layout
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-accent/40"
            >
              <ProjectBanner icon={project.icon} />

              <div className="p-6">
                <h3 className="font-display text-lg font-semibold">{project.name}</h3>
                <p className="font-mono text-xs text-accent mt-1">{project.tagline}</p>
                <p className="mt-3 text-sm text-muted leading-relaxed">{project.description}</p>

                {project.stack.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5 group">
                    {project.stack.map((s) => (
                      <Chip key={s}>{s}</Chip>
                    ))}
                  </div>
                )}

                <div className="mt-5 flex items-center gap-4 border-t border-border pt-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-muted hover:text-ink transition-colors"
                    >
                      <Github size={14} /> GitHub
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-muted hover:text-accent transition-colors"
                    >
                      Live <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {visible.length === 0 && (
          <Reveal>
            <p className="py-16 text-center font-mono text-sm text-muted">No systems tagged for this filter yet.</p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
