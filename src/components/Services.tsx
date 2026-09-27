import { Doodle, type DoodleKind } from './Doodle';

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
    doodle: 'backend' as DoodleKind,
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
    doodle: 'data' as DoodleKind,
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
    doodle: 'mobile' as DoodleKind,
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
    doodle: 'cloud' as DoodleKind,
  },
];

export function Services() {
  return (
    <section>
      {/* Reference: a full-screen centred header before the stack. */}
      <div className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center sm:px-8">
        <div className="mb-8 h-[100px] w-[100px] overflow-hidden rounded-[1em] border-[0.25rem] border-fg outline outline-[0.25rem] outline-accent3">
          <img src="/images/profile.jpg" alt="Om Rajput" className="h-full w-full object-cover" />
        </div>
        <p className="text-lg sm:text-xl">Your problem. My systems.</p>
        <h2 className="t-display mt-4 text-[clamp(2.8rem,7vw,6.5rem)]">
          <span className="block">Backend, data &amp;</span>
          <span className="block">cloud infrastructure</span>
        </h2>
        <p className="t-display mt-16 text-[clamp(2.5rem,5vw,4.5rem)]" aria-hidden="true">&darr;</p>
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
            {/* White doodle panel, like the reference's service illustrations. */}
            <div className="relative m-4 mt-0 aspect-[4/5] overflow-hidden rounded-2xl bg-white p-5 text-fg sm:aspect-[16/12] lg:m-6 lg:aspect-auto lg:p-7">
              <Doodle kind={s.doodle} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
