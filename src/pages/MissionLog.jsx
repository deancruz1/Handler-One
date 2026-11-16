import missions from "../data/missions";
import "../styles/doc.css";

const acts = [
  [1, "Republic front"],
  [2, "Federal campaign"],
];

function MissionLog() {
  return (
    <article className="doc">
      <h1>Mission log</h1>
      {acts.map(([act, name]) => (
        <section key={act} className={act === 2 ? "act2" : undefined}>
          <h2>{name}</h2>
          {missions
            .filter((m) => m.act === act)
            .map((m) => (
              <div className="episode" key={m.id}>
                <span className="ep">{m.ep}</span>
                <div>
                  <h3>{m.title}</h3>
                  <div className="meta">
                    {m.operationDate}, {m.status.toLowerCase()}
                  </div>
                </div>
                <p>{m.desc}</p>
              </div>
            ))}
        </section>
      ))}
    </article>
  );
}

export default MissionLog;
