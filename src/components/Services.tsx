import { Sketch, type SketchKind } from './Sketch';

// Sticky stack: every card pins a little lower than the one before it, so as you
// scroll they pile up and each earlier card is left showing its title band.
const services = [
  {
    n: '01',
    title: 'Backend Systems',
    lead: 'The server side, built to last.',
    can: [
      'REST API design, versioning and documentation',
      'Authentication, JWT and role-based access control',
      'Transactional workflows and background jobs',
      'Modular, testable service architecture',
    ],
    stack: 'Java · Spring Boot · FastAPI · JWT · REST',
    card: 'bg-accent text-fg',
    sketch: 'backend' as SketchKind,
  },
  {
    n: '02',
    title: 'Data & Spatial',
    lead: 'Data models that hold up in an audit.',
    can: [
      'Relational schema design and migrations',
      'Geospatial queries, clustering and boundaries with PostGIS',
      'Caching and queues with Redis',
      'Embedded and offline storage with SQLite',
    ],
    stack: 'PostgreSQL · PostGIS · Redis · SQLite',
    card: 'bg-accent2 text-fg',
    sketch: 'data' as SketchKind,
  },
  {
    n: '03',
    title: 'Mobile Systems',
    lead: 'Apps that keep working where the signal doesn\u2019t.',
    can: [
      'Cross-platform apps in Flutter',
      'Offline-first storage and background sync',
      'GPS, camera and map integration',
      'Push notifications with Firebase Cloud Messaging',
    ],
    stack: 'Flutter · Dart · FCM · Leaflet · SQLite',
    card: 'bg-accent3 text-fg',
    sketch: 'mobile' as SketchKind,
  },
  {
    n: '04',
    title: 'Cloud & Infrastructure',
    lead: 'From repo to running system.',
    can: [
      'Containerised deployments with Docker',
      'Reverse proxy, routing and TLS with Nginx',
      'CI/CD pipelines in GitHub Actions',
      'Cloud hosting and monitoring on Azure',
    ],
    stack: 'Docker · Nginx · GitHub Actions · Microsoft Azure',
    card: 'bg-fg text-bg',
    sketch: 'cloud' as SketchKind,
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
            className={`sticky grid min-h-[62vh] overflow-hidden rounded-t-[2.5rem] lg:min-h-[74vh] lg:grid-cols-[1fr_minmax(280px,32%)] ${s.card}`}
            style={{ top: `calc(4.5rem + ${i} * clamp(6.25rem, 9.5vw, 9.5rem))` }}
          >
            <div className="flex flex-col justify-between px-8 pb-8 pt-6 sm:px-12 sm:pb-12 sm:pt-7 lg:px-14 lg:pb-14">
              {/* Title hugs the top of the card so it stays readable in the pinned band. */}
              <div className="flex items-start gap-5">
                <span className="t-mono mt-3 hidden opacity-60 sm:block">{s.n}</span>
                <h3 className="t-display text-[clamp(2.6rem,8.5vw,8rem)]">{s.title}</h3>
              </div>
              <div className="mt-10 max-w-xl">
                <p className="text-xl leading-snug sm:text-2xl">{s.lead}</p>
                <ul className="mt-5 space-y-2 text-base leading-snug sm:text-lg">
                  {s.can.map((c) => (
                    <li key={c} className="flex gap-3">
                      <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-70" />
                      {c}
                    </li>
                  ))}
                </ul>
                <p className="t-mono mt-7 opacity-70">{s.stack}</p>
              </div>
            </div>
            <div className="relative m-4 mt-0 aspect-[4/5] overflow-hidden rounded-2xl p-3 lg:m-6 lg:aspect-auto lg:p-4">
              <Sketch kind={s.sketch} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
