import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Roster from "../components/Roster";
import missions from "../data/missions";
import { roster, neighbour } from "../data/roster";
import { mountSector } from "../three/sectorScene";
import "./overview.css";

const ACT_ONE = missions.filter((m) => m.act === 1).length;

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
          <div className="ticks" style={{ gridTemplateColumns: `repeat(${missions.length}, 1fr)` }}>
            {missions.map((m, i) => (
              <button
                key={m.id}
                type="button"
                className={m.act === 2 ? "act2" : undefined}
                aria-pressed={i === record}
                aria-label={`Episode ${m.ep}: ${m.title}`}
                title={m.title}
                onClick={() => setRecord(i)}
              />
            ))}
          </div>
          <div className="acts" style={{ gridTemplateColumns: `${ACT_ONE}fr ${missions.length - ACT_ONE}fr` }}>
            <span>Republic front</span>
            <span>Federal campaign</span>
          </div>
        </div>
        <div className="entry">
          <div className="k">
            Episode {mission.ep}, aired {mission.aired}
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
