export function CTA() {
  return (
    <section className="flex min-h-[100svh] items-center justify-center px-6 sm:px-8">
      {/* Reference pill: thick black border, hard offset shadow, slow 4-colour gradient. */}
      <a
        href="#contact"
        className="cta-pill relative flex h-[220px] w-full max-w-[1100px] flex-col items-center justify-center gap-2 rounded-full border-[0.5em] border-black px-6 text-center shadow-[10px_10px_0_5px_#000] transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1 sm:h-[300px] sm:border-[0.75em] lg:w-[60%]"
      >
        <span className="t-mono">Let's build something useful together</span>
        <span className="t-display text-[clamp(3rem,7vw,6.5rem)]">Get in touch</span>
      </a>
    </section>
  );
}
