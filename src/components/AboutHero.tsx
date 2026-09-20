export function AboutHero() {
  return (
    <section className="grid gap-12 px-6 py-28 sm:px-10 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-20 lg:py-40">
      <div>
        <h2 className="t-display text-[clamp(3rem,8vw,7rem)]">Hi, I'm Om</h2>
        <p className="mt-8 max-w-2xl text-xl leading-snug sm:text-2xl">
          I'm a systems engineer and architect who is more interested in how a whole system holds together than in any
          one layer of it. I take messy real-world problems — livestock disease surveillance, municipal water supply,
          crop export logistics — and turn them into structured software: APIs, spatial databases, mobile apps and
          cloud deployments that have to keep working in places with bad connectivity and no IT department.
        </p>
        <p className="t-mono mt-10 text-accent">Build / Ship / Scale / Repeat</p>
      </div>
      <div className="aspect-[4/5] w-full max-w-sm overflow-hidden rounded-sm lg:justify-self-end">
        <img src="/images/profile.jpg" alt="Om Rajput" className="grayscale" />
      </div>
    </section>
  );
}
