import { Link } from "react-router-dom";
import logo86 from "../assets/hero page/logo.webp";
import missions from "../data/missions";
import { roster, synced, lost } from "../data/roster";
import "./intel.css";

const archives = [
  {
    act: 1,
    title: "Sector 86 Defense",
    range: "Episodes 01–11",
    text: "Mission logs detailing Major Vladilena Milizé’s tenure as Handler for the elite Spearhead Squadron. Communications established via Para-RAID sensory synchronization. Records indicate significant psychological strain and high casualty rates as the squadron, led by Captain Shinei Nouzen, faced overwhelming Legion offensives on the Republic perimeter.",
  },
  {
    act: 2,
    title: "Morpho Eradication",
    range: "Episodes 12–23",
    text: "Following a Special Reconnaissance operation, surviving Spearhead elements were absorbed by the Federal Republic of Giad. Reformed into the Nordlicht Squadron under the Eighty-Sixth Strike Package, units were deployed deep into contested territory to dismantle high-velocity railgun Legion variants.",
  },
  {
    title: "Expanding Theaters",
    range: "Restricted",
    text: "Projected forecasts indicate the Legion threat is evolving beyond initial Giadian borders. Future deployments of the Strike Package will necessitate joint operations with the United Kingdom of Roa Gracia and the Alliance of Wald. Handlers must prepare for heavy winter warfare, aerial Legion prototypes, and unprecedented tactical escalation.",
  },
];

const processors = roster.filter((r) => r.machine);
const handler = roster.find((r) => !r.machine);
const deployed = synced.filter((r) => r.machine);

// The schematic is drawn in a 1000 x 1000 box. The Republic sits west of centre with the Eastern Front facing the Legion.
const C = [400, 500];
const R = { sectors: 205, wall: 228, outer: 330 };
const at = (deg, r) => [
  C[0] + Math.cos((deg * Math.PI) / 180) * r,
  C[1] + Math.sin((deg * Math.PI) / 180) * r,
];
const rand = (seed) => {
  const n = Math.sin(seed * 12.9898) * 43758.5453;
  return n - Math.floor(n);
};

const handlerAt = at(0, 168);
const deployedAt = deployed.map((_, i) => at(-28 + (i * 56) / (deployed.length - 1), 282));
// The lost are scattered on either flank of the squadron, clear of its labels.
const lostAt = lost.map((_, i) => at((i % 2 ? 1 : -1) * (38 + rand(i + 1) * 24), 248 + rand(i + 40) * 72));
const legion = Array.from({ length: 70 }, (_, i) => {
  const deg = -150 + rand(i + 100) * 300;
  const east = Math.cos((deg * Math.PI) / 180);
  return at(deg, R.outer + 26 + rand(i + 200) * (150 + 140 * Math.max(0, east)));
}).filter(([x, y]) => x > 12 && x < 988 && y > 12 && y < 988);

const pct = ([x, y]) => ({ left: `${x / 10}%`, top: `${y / 10}%` });

function Schematic() {
  return (
    <figure className="schematic">
      <div className="map">
        <svg viewBox="0 0 1000 1000" aria-hidden="true">
          {legion.map(([x, y], i) => (
            <path key={i} className="legion" d={`M${x - 5} ${y + 4} L${x} ${y - 5} L${x + 5} ${y + 4} Z`} />
          ))}
          <circle className="s86" cx={C[0]} cy={C[1]} r={(R.wall + R.outer) / 2} strokeWidth={R.outer - R.wall} />
          <circle className="edge" cx={C[0]} cy={C[1]} r={R.outer} />
          {Array.from({ length: 85 }, (_, i) => {
            const deg = (i / 85) * 360 - 90;
            const [x1, y1] = at(deg, R.sectors - 26);
            const [x2, y2] = at(deg, R.sectors);
            return <line key={i} className="sector" x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
          <circle className="wall" cx={C[0]} cy={C[1]} r={R.wall} />
          <circle className="wall inner" cx={C[0]} cy={C[1]} r={R.wall - 8} />
          {deployedAt.map(([x, y], i) => (
            <line key={i} className="raid" x1={handlerAt[0]} y1={handlerAt[1]} x2={x} y2={y} />
          ))}
          {lostAt.map(([x, y], i) => (
            <path key={i} className="lost" d={`M${x - 7} ${y - 7} L${x + 7} ${y + 7} M${x + 7} ${y - 7} L${x - 7} ${y + 7}`} />
          ))}
          {deployedAt.map(([x, y], i) => (
            <rect key={i} className="unit" x={x - 7} y={y - 7} width="14" height="14" />
          ))}
          <rect
            className="unit handler"
            x={handlerAt[0] - 8}
            y={handlerAt[1] - 8}
            width="16"
            height="16"
            transform={`rotate(45 ${handlerAt[0]} ${handlerAt[1]})`}
          />
        </svg>

        <span className="label" style={pct([C[0], C[1] - 48])}>Sectors 1–85</span>
        <span className="label" style={pct([C[0], C[1] - R.wall - 20])}>Gran Mur</span>
        <span className="label" style={pct([C[0], C[1] - (R.wall + R.outer) / 2 - 4])}>Sector 86</span>
        <span className="label hostile" style={pct([985, 60])}>Legion territory</span>

        <Link className="tag left" to={`/characters?id=${handler.id}`} style={pct(handlerAt)}>
          {handler.codename}
        </Link>
        {deployed.map((r, i) => (
          <Link key={r.id} className="tag" to={`/characters?id=${r.id}`} style={pct(deployedAt[i])}>
            {r.codename}
          </Link>
        ))}
      </div>

      <figcaption>
        <span className="k-handler">Handler, behind the wall</span>
        <span className="k-unit">Processors synced: {deployed.length}</span>
        <span className="k-lost">Signals lost: {lost.length}</span>
        <span className="k-raid">Para-RAID link</span>
      </figcaption>
    </figure>
  );
}

function IntelBriefing() {
  return (
    <div className="console intel">
      <section className="stage tall" aria-label="Situation report">
        <div className="report">
          <h1>Theater situation report</h1>
          <p className="lead">
            Official state media dictates that the Republic of San Magnolia has
            sustained a bloodless war against the Giadian Empire's autonomous
            armor, the <strong>Legion</strong>. Republic command officially
            classifies all frontline defensive units as uncrewed drones.
          </p>
          <p className="lead">
            This terminal bypasses state filters. The drones are manned by the{" "}
            <strong>Eighty-Six</strong>: systematically disenfranchised citizens
            forced into the Juggernaut chassis. This console provides direct,
            unfiltered tactical linkage to their operational statuses.
          </p>

          <table className="record">
            <thead>
              <tr>
                <td />
                <th scope="col">Republic record</th>
                <th scope="col">On file</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Frontline units</th>
                <td><del>Uncrewed drones</del></td>
                <td>Eighty-Six Processors</td>
              </tr>
              <tr>
                <th scope="row">Juggernaut crew</th>
                <td><del>None</del></td>
                <td>One Processor</td>
              </tr>
              <tr>
                <th scope="row">Casualties</th>
                <td><del>None. A bloodless war.</del></td>
                <td className="alert">
                  {lost.length} of {processors.length} Processors on file lost
                </td>
              </tr>
            </tbody>
          </table>

          <blockquote>
            Personnel must filter out Republic propaganda. Assessing the
            psychological deterioration of active processors is vital. To treat
            the Eighty-Six as mere hardware is a critical tactical failure.
          </blockquote>
        </div>

        <Schematic />
      </section>

      <aside className="side archives">
        {archives.map((a) => (
          <section key={a.title} className={a.act ? `act${a.act}` : "restricted"}>
            <h2>{a.title}</h2>
            <div className="range">{a.range}</div>
            <p>{a.text}</p>
            {a.act && (
              <ul>
                {missions
                  .filter((m) => m.act === a.act)
                  .map((m) => (
                    <li key={m.id}>
                      <Link to={`/missions?ep=${m.ep}`} title={m.title} aria-label={`Episode ${m.ep}: ${m.title}`}>
                        {m.ep}
                      </Link>
                    </li>
                  ))}
              </ul>
            )}
          </section>
        ))}
        <img className="logo" src={logo86} alt="86 Eighty-Six" />
      </aside>
    </div>
  );
}

export default IntelBriefing;
