import { useEffect, useRef } from "react";
import { synced, lost } from "../data/roster";
import "./roster.css";

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

// The sync roster: the living with a live waveform, the lost with a flat line.
// `rows` is a ref whose `.current` collects each row's element by id, for scrolling one into view.
function Roster({ selected, onSelect, rows }) {
  const list = useRef(null);

  // When the roster is a sideways row (phones), bring the selected name to the middle of it.
  useEffect(() => {
    const el = list.current;
    const item = rows?.current[selected];
    if (!el || !item || el.scrollWidth <= el.clientWidth) return;
    el.scrollTo({
      left: item.offsetLeft - (el.clientWidth - item.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [selected, rows]);

  const row = (r) => (
    <button
      key={r.id}
      type="button"
      role="option"
      aria-selected={r.id === selected}
      className={r.kia ? "kia" : undefined}
      ref={(el) => {
        if (rows) rows.current[r.id] = el;
      }}
      onClick={() => onSelect(r.id)}
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
    <div className="roster" role="listbox" aria-label="Processors" ref={list}>
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
  );
}

export default Roster;
