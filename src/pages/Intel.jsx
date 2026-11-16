import logo86 from "../assets/hero page/logo.webp";
import "../styles/doc.css";

const archives = [
  {
    title: "Sector 86 Defense",
    range: "Episodes 01–11",
    text: "Mission logs detailing Major Vladilena Milizé’s tenure as Handler for the elite Spearhead Squadron. Communications established via Para-RAID sensory synchronization. Records indicate significant psychological strain and high casualty rates as the squadron, led by Captain Shinei Nouzen, faced overwhelming Legion offensives on the Republic perimeter.",
  },
  {
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

function IntelBriefing() {
  return (
    <article className="doc intel">
      <div>
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
        <blockquote>
          Personnel must filter out Republic propaganda. Assessing the
          psychological deterioration of active processors is vital. To treat
          the Eighty-Six as mere hardware is a critical tactical failure.
        </blockquote>
        <img className="logo" src={logo86} alt="86 Eighty-Six" />
      </div>

      <div>
        {archives.map((a) => (
          <section key={a.title}>
            <h2>
              {a.title}
              <span>{a.range}</span>
            </h2>
            <p>{a.text}</p>
          </section>
        ))}
      </div>
    </article>
  );
}

export default IntelBriefing;
