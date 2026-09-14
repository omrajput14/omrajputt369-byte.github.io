import { social } from '../lib/data';
import { Container, SectionHeading } from './ui';
import { Reveal } from './Reveal';

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
        <div>
          <SectionHeading index="05" eyebrow="About" title="About" />
          <Reveal className="space-y-5 max-w-2xl text-base sm:text-lg text-muted leading-relaxed">
            <p>
              I'm a CSE/Data Science student and systems engineer, focused on architecture, system design and
              real-world digital infrastructure more than any one layer of the stack.
            </p>
            <p>
              I enjoy taking messy real-world problems and turning them into structured systems — from APIs and
              databases to mobile applications, geospatial intelligence and cloud deployment.
            </p>
            <p>
              My current work focuses on AgriTech, Veterinary Healthcare and CivicTech, where software has to work
              beyond ideal demo conditions.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:pt-[4.5rem]">
          <div className="overflow-hidden rounded-lg border border-border">
            <img src="/images/profile.jpg" alt="Om Rajput" className="aspect-[4/5] w-full object-cover grayscale" />
          </div>
          <dl className="mt-6 space-y-3 font-mono text-xs text-muted">
            <div className="flex justify-between border-b border-border pb-2">
              <dt>Based in</dt>
              <dd className="text-ink">{social.location}</dd>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <dt>Focus</dt>
              <dd className="text-ink">AgriTech · CivicTech · Healthcare</dd>
            </div>
            <div className="flex justify-between">
              <dt>Status</dt>
              <dd className="text-ink">Building VETRA</dd>
            </div>
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
