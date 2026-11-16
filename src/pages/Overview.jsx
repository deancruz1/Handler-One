import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Roster from "../components/Roster";
import missions from "../data/missions";
import { roster, neighbour } from "../data/roster";
import { mountSector } from "../three/sectorScene";
import "./overview.css";

const EPISODES = 23;
const FIRST_OF_ACT_TWO = 12;

function Overview() {
  const [id, setId] = useState("shin");
  const [record, setRecord] = useState(0);
  const map = useRef(null);
  const inset = useRef(null);
  const scene = useRef(null);
  const rows = useRef({});
  const byKeyboard = useRef(false);

  useEffect(() => {
    const s = mountSector(map.current, inset.current, roster, setId);
    scene.current = s;
    return () => {
      scene.current = null;
      s.dispose();
    };
  }, []);

  useEffect(() => {
    scene.current?.select(id);
    if (byKeyboard.current) {
      byKeyboard.current = false;
      rows.current[id]?.scrollIntoView({ block: "nearest" });
    }
  }, [id]);

  useEffect(() => {
    const onKey = (e) => {
      const who = { ArrowDown: 1, ArrowUp: -1 }[e.key];
      const which = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (who) {
        e.preventDefault();
        byKeyboard.current = true;
        setId((current) => neighbour(current, who));
      }
      if (which)
        setRecord((i) => (i + which + missions.length) % missions.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const who = roster.find((r) => r.id === id);
  const mission = missions[record];

  return (
    <div className="console overview">
      <section className="stage" ref={map} aria-label="Sector map">
        <h1>Sector 86 · Ward 1</h1>
        <Link
          ref={inset}
          to={`/arsenal?u=m1a4&load=${who.machine ?? "guns"}`}
          className={`unit${who.kia ? " kia" : ""}${who.machine ? "" : " none"}`}
          aria-label="Open this machine in the Arsenal"
        />
      </section>

      <aside className="side">
        <div className={`dossier${who.kia ? " kia" : ""}`}>
          <div className="portrait">
            <img src={who.image} alt={who.name} />
            {who.video && (
              <video key={who.id} src={who.video} autoPlay muted loop playsInline />
            )}
          </div>
          <div>
            <h2>{who.codename}</h2>
            <div className="name">{who.name}</div>
            <dl>
              <dt>Serial</dt>
              <dd>{who.serial}</dd>
              <dt>Role</dt>
              <dd>{who.role}</dd>
              <dt>Status</dt>
              <dd className="st">{who.status}</dd>
            </dl>
          </div>
          {who.crest && <img className="mark" src={who.crest} alt="Personal Mark" />}
          <p>{who.description}</p>
        </div>

        <Roster selected={id} onSelect={setId} rows={rows} />
      </aside>

      <section className="strip log">
        <div>
          <div className="ticks">
            {Array.from({ length: EPISODES }, (_, i) => {
              const at = missions.findIndex((m) => Number(m.ep) === i + 1);
              return (
                <button
                  key={i}
                  type="button"
                  className={`${i + 1 >= FIRST_OF_ACT_TWO ? "act2" : ""}${at >= 0 ? " has" : ""}`}
                  disabled={at < 0}
                  aria-pressed={at >= 0 && at === record}
                  aria-label={`Episode ${i + 1}`}
                  title={at >= 0 ? missions[at].title : undefined}
                  onClick={() => setRecord(at)}
                />
              );
            })}
          </div>
          <div className="acts">
            <span>Republic front</span>
            <span>Federal campaign</span>
          </div>
        </div>
        <div className="entry">
          <div className="k">
            Episode {mission.ep}, {mission.operationDate}
            <span className="step">
              <button
                type="button"
                aria-label="Previous episode"
                onClick={() => setRecord((i) => (i - 1 + missions.length) % missions.length)}
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next episode"
                onClick={() => setRecord((i) => (i + 1) % missions.length)}
              >
                ›
              </button>
            </span>
          </div>
          <h4>{mission.title}</h4>
          <p>{mission.desc}</p>
        </div>
      </section>
    </div>
  );
}

export default Overview;
