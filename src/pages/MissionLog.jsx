import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import missions from "../data/missions";
import { roster } from "../data/roster";
import "./missions.css";

const acts = [
  [1, "Republic front"],
  [2, "Federal campaign"],
].map(([act, name]) => ({ act, name, episodes: missions.filter((m) => m.act === act) }));
const actName = Object.fromEntries(acts.map((a) => [a.act, a.name]));

function MissionLog() {
  const [params, setParams] = useSearchParams();
  const mission = missions.find((m) => m.ep === params.get("ep")) ?? missions[0];
  const rows = useRef({});
  const list = useRef(null);

  // One arc open at a time, so the list fits without scrolling. Picking an episode elsewhere opens its arc.
  const [open, setOpen] = useState(mission.act);
  const [shownAct, setShownAct] = useState(mission.act);
  if (shownAct !== mission.act) {
    setShownAct(mission.act);
    setOpen(mission.act);
  }

  const show = (m) => setParams({ ep: m.ep }, { replace: true });

  // On phones the row changes length when an arc opens, so bring the opened arc's name to the start.
  const openArc = (act, header) => {
    setOpen(act);
    requestAnimationFrame(() => {
      const row = list.current;
      if (!row || row.scrollWidth <= row.clientWidth) return;
      row.scrollBy({ left: header.getBoundingClientRect().left - row.getBoundingClientRect().left, behavior: "smooth" });
    });
  };

  useEffect(() => {
    const onKey = (e) => {
      const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
      if (!step) return;
      e.preventDefault();
      const i = missions.indexOf(mission);
      show(missions[(i + step + missions.length) % missions.length]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Keep the selected episode in view in the list: down the side panel, or across the row on phones.
  // Only the list scrolls, never the page.
  // Waits for the fonts, since the titles change width when the display font arrives.
  useEffect(() => {
    let live = true;
    document.fonts.ready.then(() => {
      const item = rows.current[mission.ep];
      const row = list.current;
      const side = row?.parentElement;
      if (!live || !item || !row || !side) return;
      const r = item.getBoundingClientRect();
      if (row.scrollWidth > row.clientWidth) {
        const b = row.getBoundingClientRect();
        row.scrollBy({ left: r.left - b.left - (b.width - r.width) / 2, behavior: "smooth" });
      } else if (side.scrollHeight > side.clientHeight) {
        const b = side.getBoundingClientRect();
        if (r.top < b.top || r.bottom > b.bottom)
          side.scrollBy({ top: r.top - b.top - (b.height - r.height) / 2, behavior: "smooth" });
      }
    });
    return () => {
      live = false;
    };
  }, [mission]);

  const cast = mission.cast.map((id) => roster.find((r) => r.id === id));

  return (
    <div className={`console missions${mission.act === 2 ? " act2" : ""}`}>
      <section className="stage" aria-label="Episode">
        <h1>Mission log</h1>
        <div className="big" aria-hidden="true">
          {mission.ep}
        </div>

        <div className="brief" key={mission.ep}>
          <h2>{mission.title}</h2>
          <dl>
            <div>
              <dt>Episode</dt>
              <dd>
                {mission.ep} of {missions.length}
              </dd>
            </div>
            <div>
              <dt>Arc</dt>
              <dd>{actName[mission.act]}</dd>
            </div>
            <div>
              <dt>Aired</dt>
              <dd>{mission.aired}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd className="st">{mission.status}</dd>
            </div>
          </dl>
          <p>{mission.desc}</p>

          {cast.length > 0 && (
            <ul className="cast" aria-label="Personnel">
              {cast.map((r) => (
                <li key={r.id}>
                  <Link to={`/characters?id=${r.id}`}>
                    <img src={r.image} alt="" />
                    <b>{r.codename}</b>
                    <small>{r.name}</small>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <aside className="side">
        <div className="eps" ref={list}>
          {acts.map(({ act, name, episodes }) => (
            <div key={act} className={`arcgroup act${act}${open === act ? " open" : ""}`}>
              <button
                type="button"
                className="arc"
                aria-expanded={open === act}
                aria-controls={`arc-${act}`}
                onClick={(e) => openArc(act, e.currentTarget)}
              >
                <span>{name}</span>
                <span>
                  {episodes[0].ep}–{episodes[episodes.length - 1].ep}
                </span>
              </button>
              <div className="list" id={`arc-${act}`} inert={open !== act}>
                <div role="listbox" aria-label={name}>
                  {episodes.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      role="option"
                      aria-selected={m === mission}
                      ref={(el) => {
                        rows.current[m.ep] = el;
                      }}
                      onClick={() => show(m)}
                    >
                      <span className="n">{m.ep}</span>
                      <span>
                        <b>{m.title}</b>
                        <small>{m.aired}</small>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <section className="strip timeline" aria-label="All episodes">
        <div className="cells">
          {missions.map((m) => (
            <button
              key={m.id}
              type="button"
              className={`act${m.act}`}
              aria-pressed={m === mission}
              aria-label={`Episode ${m.ep}: ${m.title}`}
              title={m.title}
              onClick={() => show(m)}
            >
              <span>{m.ep}</span>
              <i />
            </button>
          ))}
        </div>
        <div className="arcs" style={{ gridTemplateColumns: acts.map((a) => `${a.episodes.length}fr`).join(" ") }}>
          {acts.map((a) => (
            <span key={a.act}>{a.name}</span>
          ))}
        </div>
      </section>
    </div>
  );
}

export default MissionLog;
