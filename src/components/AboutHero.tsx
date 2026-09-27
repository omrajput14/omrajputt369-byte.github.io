// About: clean editorial layout — B&W portrait anchored left on desktop,
// intro copy on the right. No tilt, no scroll animation; feels composed.
export function AboutHero() {
  return (
    <section
      id="about"
      className="flex min-h-[100svh] flex-col items-center justify-center gap-16 px-6 py-24 sm:px-8 lg:flex-row lg:items-center lg:gap-20 lg:py-0"
    >
      {/* Portrait — greyscale, square crop, clean border */}
      <div className="w-[72%] max-w-[260px] shrink-0 sm:max-w-[300px] lg:max-w-[340px]">
        <div className="overflow-hidden rounded-[1.5em] border-[0.3em] border-fg">
          <img
            src="/images/profile.jpg"
            alt="Om Rajput"
            className="block h-full w-full object-cover"
            style={{ filter: 'grayscale(100%)' }}
          />
        </div>
      </div>

      {/* Copy */}
      <div className="flex max-w-xl flex-col gap-6 text-center lg:text-left">
        <div>
          <p className="t-mono mb-3 opacity-50">Systems Engineer · Nashik, IN</p>
          <h2 className="t-display text-[clamp(3rem,7vw,6rem)]">Hi, I'm Om</h2>
        </div>

        <p className="text-base leading-relaxed sm:text-lg">
          I'm a systems engineer and architect, more interested in how a whole system holds together
          than in any one layer of it. I take messy real-world problems — livestock disease
          surveillance, crop export logistics, village governance — and turn them into structured
          software that keeps working where connectivity doesn't.
        </p>

        <p className="t-mono opacity-60">Build / Ship / Scale / Repeat</p>
      </div>
    </section>
  );
}
