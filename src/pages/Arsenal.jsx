import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Segmented from "../components/Segmented";
import mechs from "../data/mechs";
import { mountArsenal } from "../three/arsenalScene";
import "./arsenal.css";

const prefersStill = () =>
  window.matchMedia("(prefers-reduced-motion:reduce)").matches;

function Arsenal() {
  const [params] = useSearchParams();
  const [view, setView] = useState(() => ({
    id: mechs.some((m) => m.id === params.get("u"))
      ? params.get("u")
      : mechs[0].id,
    style: "holo",
    motion: prefersStill() ? "hold" : "idle",
    load: params.get("load") === "guns" ? "guns" : "blades",
    pilot: "off",
  }));
  const stage = useRef(null);
  const lineup = useRef(null);
  const scene = useRef(null);
  const set = (key) => (value) => setView((v) => ({ ...v, [key]: value }));

  useEffect(() => {
    const s = mountArsenal({
      stage: stage.current,
      lineup: lineup.current,
      mechs,
      onSelect: (id) => setView((v) => ({ ...v, id })),
    });
    scene.current = s;
    return () => {
      scene.current = null;
      s.dispose();
    };
  }, []);

  useEffect(() => {
    scene.current?.update(view);
  }, [view]);

  useEffect(() => {
    const onKey = (e) => {
      const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[
        e.key
      ];
      if (step) {
        e.preventDefault();
        setView((v) => {
          const i = mechs.findIndex((m) => m.id === v.id);
          return {
            ...v,
            id: mechs[(i + step + mechs.length) % mechs.length].id,
          };
        });
      }
      if (e.key.toLowerCase() === "w")
        setView((v) => ({
          ...v,
          motion: v.motion === "walk" ? "idle" : "walk",
        }));
      if (e.key.toLowerCase() === "p")
        setView((v) => ({ ...v, pilot: v.pilot === "on" ? "off" : "on" }));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const mech = mechs.find((m) => m.id === view.id);
  const accent = mech.hostile ? "var(--hostile)" : "var(--signal)";

  return (
    <div className="console">
      <section className="stage" ref={stage} aria-label="Unit viewer" />

      <aside className="side">
        {/* phones only: the lineup is too wide to pick from there */}
        <div className="pick" role="listbox" aria-label="Machines">
          {mechs.map((m) => (
            <button
              key={m.id}
              type="button"
              role="option"
              aria-selected={m.id === view.id}
              style={{ "--c": m.hostile ? "var(--hostile)" : "var(--signal)" }}
              onClick={() => set("id")(m.id)}
            >
              {m.name.replace(/\s*\(.*/, "")}
            </button>
          ))}
        </div>

        <div className="file" style={{ "--c": accent }}>
          <h2>{mech.name}</h2>
          <div className="sub">{mech.faction}</div>
          <dl>
            <dt>Type</dt>
            <dd>{mech.type}</dd>
            <dt>Status</dt>
            <dd>{mech.status}</dd>
            <dt>Armament</dt>
            <dd>{mech.armament}</dd>
            <dt>Armor</dt>
            <dd>{mech.armor}</dd>
            <dt>Size</dt>
            <dd>
              {mech.size.length} m long, {mech.size.height} m high
              {mech.size.estimated ? " (estimated)" : ""}
            </dd>
            <dt>Crew</dt>
            <dd>{mech.crew ?? "None. Autonomous."}</dd>
          </dl>
          <p>{mech.description}</p>
        </div>

        <div className="opts">
          <span>Display</span>
          <Segmented
            value={view.style}
            onChange={set("style")}
            options={[
              ["holo", "Hologram"],
              ["paint", "Paint"],
            ]}
          />
          <span>Motion</span>
          <Segmented
            value={view.motion}
            onChange={set("motion")}
            options={[
              ["hold", "Hold"],
              ["idle", "Idle"],
              ["walk", "Walk"],
            ]}
          />
          <span>Loadout</span>
          <Segmented
            value={view.load}
            onChange={set("load")}
            disabled={!mech.crew}
            options={[
              ["guns", "Guns"],
              ["blades", "Blades"],
            ]}
          />
          <span>Processor</span>
          <Segmented
            value={view.pilot}
            onChange={set("pilot")}
            disabled={!mech.crew}
            options={[
              ["off", "Hidden"],
              ["on", "Shown"],
            ]}
          />
        </div>
      </aside>

      <section className="strip">
        <div className="lineup" ref={lineup} />
      </section>
    </div>
  );
}

export default Arsenal;
