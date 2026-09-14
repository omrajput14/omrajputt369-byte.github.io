import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin } from 'lucide-react';
import { Container, LinkButton } from './ui';
import { social } from '../lib/data';

const techLine = ['Java', 'Spring Boot', 'PostgreSQL', 'PostGIS', 'Flutter', 'React', 'Cloud', 'AI'];

const headline = 'I BUILD SYSTEMS THAT SOLVE REAL-WORLD PROBLEMS.';

export function Hero() {
  const reduce = useReducedMotion();
  const words = headline.split(' ');

  return (
    <section id="home" className="relative flex min-h-screen items-center pt-16 overflow-hidden">
      {/* faint technical grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgb(var(--border)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--border)) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 100%)',
        }}
      />

      <Container className="relative py-24">
        <h1 className="font-display max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl md:text-6xl">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={reduce ? undefined : { opacity: 0, y: 24 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block mr-[0.28em]"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-6 max-w-xl text-lg text-muted"
        >
          Systems engineer and architect focused on backend design, data and cloud infrastructure for real-world
          environments.
        </motion.p>

        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <LinkButton href="#vetra" variant="primary">
            See the System <ArrowUpRight size={16} />
          </LinkButton>
          <LinkButton href="https://github.com/omrajput14" target="_blank" rel="noreferrer" variant="secondary">
            <Github size={16} /> GitHub
          </LinkButton>
          <LinkButton href={social.linkedin} target="_blank" rel="noreferrer" variant="secondary">
            <Linkedin size={16} /> LinkedIn
          </LinkButton>
        </motion.div>

        <motion.div
          initial={reduce ? undefined : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-muted"
        >
          {techLine.map((tech, i) => (
            <span key={tech} className="flex items-center gap-3">
              {tech}
              {i < techLine.length - 1 && <span className="text-border">·</span>}
            </span>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
