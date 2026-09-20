// Sticky stack: every card pins a little lower than the one before it, so as you
// scroll they pile up and each earlier card is left showing its title band.
const services = [
  {
    n: '01',
    title: 'Backend Systems',
    body: 'REST APIs, authentication, transactional workflows and modular service architecture that survives real traffic.',
    stack: 'Java · Spring Boot · FastAPI · JWT',
    card: 'bg-accent text-fg',
    img: '/images/jalsetu.png',
  },
  {
    n: '02',
    title: 'Data & Spatial',
    body: 'Relational and geospatial data layers — outbreak clustering, district boundaries, records that hold up in an audit.',
    stack: 'PostgreSQL · PostGIS · Redis · SQLite',
    card: 'bg-accent2 text-fg',
    img: '/images/agriflow.png',
  },
  {
    n: '03',
    title: 'Mobile Systems',
    body: 'Offline-first apps for farmers and vets working with patchy signal — GPS, camera, push, sync when it can.',
    stack: 'Flutter · Dart · FCM · Leaflet',
    card: 'bg-accent3 text-fg',
    img: '/images/ecoirrigate.png',
  },
  {
    n: '04',
    title: 'Cloud & Infrastructure',
    body: 'Containerised, proxied, CI-deployed and monitored — the part that turns a repo into a running system.',
    stack: 'Docker · Nginx · GitHub Actions · Azure',
    card: 'bg-fg text-bg',
    img: '/images/agroshield.png',
  },
];

export function Services() {
  return (
    <section className="py-28">
      <div className="mb-16 grid gap-6 px-6 sm:px-10 lg:grid-cols-2 lg:items-end">
        <p className="t-mono">Your problem. My systems.</p>
        <h2 className="t-display text-[clamp(2.8rem,7vw,6rem)]">Backend, data &amp; cloud infrastructure for the real world</h2>
      </div>

      {/* Extra room below so the last card can still pin at its offset instead of releasing early. */}
      <div className="px-3 pb-[32vh] sm:px-6">
        {services.map((s, i) => (
          <article
            key={s.n}
            className={`sticky grid min-h-[62vh] overflow-hidden rounded-t-[2.5rem] lg:min-h-[74vh] lg:grid-cols-[1fr_minmax(260px,28%)] ${s.card}`}
            style={{ top: `calc(4.5rem + ${i} * clamp(6.25rem, 9.5vw, 9.5rem))` }}
          >
            <div className="flex flex-col justify-between px-8 pb-8 pt-6 sm:px-12 sm:pb-12 sm:pt-7 lg:px-14 lg:pb-14">
              {/* Title hugs the top of the card so it stays readable in the pinned band. */}
              <div className="flex items-start gap-5">
                <span className="t-mono mt-3 hidden opacity-60 sm:block">{s.n}</span>
                <h3 className="t-display text-[clamp(2.6rem,8.5vw,8rem)]">{s.title}</h3>
              </div>
              <div className="mt-10 max-w-xl">
                <p className="text-lg leading-snug sm:text-xl">{s.body}</p>
                <p className="t-mono mt-6 opacity-70">{s.stack}</p>
              </div>
            </div>
            <div className="relative m-4 mt-0 aspect-[4/5] overflow-hidden rounded-2xl lg:m-6 lg:aspect-auto">
              <img src={s.img} alt="" className="h-full w-full object-cover" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
