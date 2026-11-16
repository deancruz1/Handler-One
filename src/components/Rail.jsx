import { Link, NavLink } from "react-router-dom";

const links = [
  ["/", "Overview"],
  ["/intel", "Intel"],
  ["/characters", "Squadron"],
  ["/arsenal", "Arsenal"],
  ["/factions", "Factions"],
  ["/missions", "Mission log"],
];

function Rail() {
  return (
    <nav className="rail" aria-label="Sections">
      <Link className="brand" to="/">
        <i />
        Handler One
      </Link>
      {links.map(([to, label]) => (
        <NavLink key={to} to={to} end={to === "/"}>
          {label}
        </NavLink>
      ))}
      <a
        href="https://github.com/deancruz1"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub ↗
      </a>
    </nav>
  );
}

export default Rail;
