import { useEffect, useRef, useState } from "react";
import { factions, unlisted } from "../data/factions";
import { mountGlobe } from "../three/globeScene";
import "./factions.css";

const powers = [...factions, ...unlisted];
const css = (color) => "#" + color.toString(16).padStart(6, "0");

function Factions() {
  const [id, setId] = useState(factions[0].id);
  const stage = useRef(null);
  const scene = useRef(null);

  useEffect(() => {
    const s = mountGlobe(stage.current, powers, setId);
    scene.current = s;
    return () => {
      scene.current = null;
      s.dispose();
    };
  }, []);

  useEffect(() => {
    scene.current?.select(id);
  }, [id]);

  useEffect(() => {
    const onKey = (e) => {
      const step = { ArrowDown: 1, ArrowUp: -1 }[e.key];
      if (step) {
        e.preventDefault();
        setId((current) => {
          const i = factions.findIndex((f) => f.id === current);
          return factions[(i + step + factions.length) % factions.length].id;
        });
      }
      if (e.key === " " && e.target === document.body) {
        e.preventDefault();
        scene.current?.toggleHold();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const faction = factions.find((f) => f.id === id);

  return (
    <div className="console">
      <section className="stage tall" ref={stage} aria-label="Theatre globe">
        <div className="tear" />
        <div className="tear b" />
      </section>

      <aside className="side">
        <div className="file" style={{ "--c": css(faction.color) }}>
          <h2>{faction.name}</h2>
          <div className="sub">{faction.officialTitle}</div>
          <dl>
            <dt>Status</dt>
            <dd>{faction.status}</dd>
            <dt>Government</dt>
            <dd>{faction.govType}</dd>
            <dt>People</dt>
            <dd>{faction.demographics}</dd>
            <dt>Threat</dt>
            <dd>{faction.threatLevel}</dd>
          </dl>
          <div className="doctrine">{faction.doctrine}</div>
          <p>{faction.history}</p>
        </div>

        <div className="powers" role="listbox" aria-label="Factions">
          {powers.map((p) => (
            <button
              key={p.id}
              type="button"
              role="option"
              aria-selected={p.id === id}
              disabled={!p.status}
              style={{ "--c": css(p.color) }}
              onClick={() => setId(p.id)}
            >
              {p.name}
              {!p.status && <small>not on file</small>}
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}

export default Factions;
