const services = [
  { n: '01', title: 'Backend Systems', body: 'REST APIs, authentication, transactional workflows and modular service architecture that survives real traffic.', stack: 'Java · Spring Boot · FastAPI · JWT' },
  { n: '02', title: 'Data & Spatial', body: 'Relational and geospatial data layers — outbreak clustering, district boundaries, records that hold up in an audit.', stack: 'PostgreSQL · PostGIS · Redis · SQLite' },
  { n: '03', title: 'Mobile & Field Apps', body: 'Offline-first apps for farmers and vets working with patchy signal — GPS, camera, push, sync when it can.', stack: 'Flutter · Dart · FCM · Leaflet' },
  { n: '04', title: 'Cloud & Infrastructure', body: 'Containerised, proxied, CI-deployed and monitored — the part that turns a repo into a running system.', stack: 'Docker · Nginx · GitHub Actions · Azure' },
];

export function Services() {
  return (
    <section className="px-6 py-28 sm:px-10">
      <div className="mb-20 grid gap-6 lg:grid-cols-2 lg:items-end">
        <p className="t-mono">Your problem. My systems.</p>
        <h2 className="t-display text-[clamp(2.8rem,7vw,6rem)]">Backend, data &amp; cloud infrastructure for the real world</h2>
      </div>

      {/* Sticky stack: each card pins slightly lower than the last, so they pile up as you scroll. */}
      <div className="flex flex-col gap-6">
        {services.map((s, i) => (
          <article
            key={s.n}
            className="sticky grid gap-6 rounded-sm border border-fg/15 bg-bg p-8 sm:p-12 lg:grid-cols-[6rem_1fr_1fr]"
            style={{ top: `${6 + i * 2.5}rem` }}
          >
            <span className="t-mono text-fg/50">{s.n}</span>
            <h3 className="t-display text-5xl sm:text-6xl">{s.title}</h3>
            <div>
              <p className="text-lg leading-snug">{s.body}</p>
              <p className="t-mono mt-6 text-accent">{s.stack}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
