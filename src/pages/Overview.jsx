import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import characters from "../data/characters";
import missions from "../data/missions";
import { mountSector } from "../three/sectorScene";
import "./overview.css";

const EPISODES = 23;
const FIRST_OF_ACT_TWO = 12;

// The Handler commands from behind the wall and has no machine. Shin fights with blades; everyone else with guns.
const roster = characters.map((c) => ({
  ...c,
  kia: c.status.startsWith("KIA"),
  machine: c.id === "lena" ? null : c.id === "shin" ? "blades" : "guns",
}));
const synced = roster.filter((r) => !r.kia);
const lost = roster.filter((r) => r.kia);
const order = [...synced, ...lost];

// Each synced Processor gets a steady, slightly different waveform.
const wave = (seed) =>
  Array.from({ length: 16 }, (_, i) => {
    const n = Math.abs(Math.sin(seed * 12.9898 + i * 78.233) * 43758.5453) % 1;
    return {
      animationDelay: `-${(n * 1.1).toFixed(2)}s`,
      animationDuration: `${(0.7 + ((n * 7.3) % 1) * 0.8).toFixed(2)}s`,
    };
  });
const waves = Object.fromEntries(synced.map((r, i) => [r.id, wave(i + 1)]));

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
        setId((current) => {
          const i = order.findIndex((r) => r.id === current);
          return order[(i + who + order.length) % order.length].id;
        });
      }
      if (which)
        setRecord((i) => (i + which + missions.length) % missions.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const who = roster.find((r) => r.id === id);
  const mission = missions[record];

  const row = (r) => (
    <button
      key={r.id}
      type="button"
      role="option"
      aria-selected={r.id === id}
      className={r.kia ? "kia" : undefined}
      ref={(el) => {
        rows.current[r.id] = el;
      }}
      onClick={() => setId(r.id)}
    >
      <span className="s" />
      <span>
        <b>{r.codename}</b>
        <small>{r.name}</small>
      </span>
      {r.kia ? (
        <span className="flat" />
      ) : (
        <span className="wave">
          {waves[r.id].map((style, i) => (
            <i key={i} style={style} />
          ))}
        </span>
      )}
    </button>
  );

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

        <div className="roster" role="listbox" aria-label="Processors">
          <div className="grp">
            <span>Synced</span>
            <span>{synced.length}</span>
          </div>
          {synced.map(row)}
          <div className="grp">
            <span>Signal lost</span>
            <span>{lost.length}</span>
          </div>
          {lost.map(row)}
        </div>
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
          </div>
          <h4>{mission.title}</h4>
          <p>{mission.desc}</p>
        </div>
      </section>
    </div>
  );
}

export default Overview;
