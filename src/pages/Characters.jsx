import { useEffect, useRef, useState } from "react";
import Roster from "../components/Roster";
import { roster, neighbour } from "../data/roster";
import "./squadron.css";

function Characters() {
  const [id, setId] = useState(roster[0].id);
  const rows = useRef({});
  const byKeyboard = useRef(false);

  useEffect(() => {
    const onKey = (e) => {
      const step = { ArrowDown: 1, ArrowUp: -1 }[e.key];
      if (!step) return;
      e.preventDefault();
      byKeyboard.current = true;
      setId((current) => neighbour(current, step));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!byKeyboard.current) return;
    byKeyboard.current = false;
    rows.current[id]?.scrollIntoView({ block: "nearest" });
  }, [id]);

  const who = roster.find((r) => r.id === id);

  return (
    <div className="console squadron">
      <section className={`stage tall${who.kia ? " kia" : ""}`}>
        {who.video && (
          <video key={who.id} src={who.video} autoPlay muted loop playsInline />
        )}
        {who.crest && <img className="crest" src={who.crest} alt="Personal Mark" />}
        <div className="person">
          <img className="face" src={who.image} alt={who.name} />
          <div>
            <h1>{who.codename}</h1>
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
          <p>{who.description}</p>
        </div>
      </section>

      <aside className="side">
        <Roster selected={id} onSelect={setId} rows={rows} />
      </aside>
    </div>
  );
}

export default Characters;
