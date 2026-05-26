import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "00 Home" },
  { to: "/intel", label: "01 Intel" },
  { to: "/characters", label: "02 Spearhead Squadron" },
  { to: "/arsenal", label: "03 Arsenal" },
  { to: "/factions", label: "04 Factions" },
  { to: "/missions", label: "05 Mission Logs" },
];
// (Remember to change the GitHub link label in the Navbar to "06 GitHub" to match!)

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10 px-6 lg:px-12 py-4 lg:py-5">
      {/* ── Inner Constraint Layout ── */}
      {/* Aligns layout edges precisely with your main content areas */}
      <div className="max-w-400 mx-auto flex items-center justify-end w-full">
        {/* ── Desktop Navigation Links ── */}
        <div className="hidden lg:flex items-center gap-10 text-sm font-medium uppercase tracking-wider">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `text-xl transition-all duration-300 ${
                  isActive
                    ? "text-blue-500 font-semibold"
                    : "text-text-secondary hover:text-text-primary"
                }`
              }
              style={({ isActive }) =>
                isActive
                  ? { textShadow: "0 0 10px rgba(0, 132, 255, 0.6)" }
                  : {}
              }
            >
              {label}
            </NavLink>
          ))}
          <a
            href="https://github.com/deancruz1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-text-secondary hover:text-blue-400 transition-colors duration-300"
          >
            06 GitHub
          </a>
        </div>

        {/* ── Mobile Hamburger Button ── */}
        {/* Morphs cleanly from 3 lines into an "X" shape when active */}
        <button
          onClick={toggleMenu}
          className="lg:hidden flex flex-col justify-center items-center gap-1.5 p-2 z-50 focus:outline-none"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-text-primary transition-all duration-300 ease-out ${isOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-text-primary transition-all duration-300 ease-out ${isOpen ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`block h-0.5 w-6 bg-text-primary transition-all duration-300 ease-out ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* ── Mobile Drawer Overlay Menu ── */}
      <div
        className={`fixed inset-0 h-screen w-screen bg-black/95 backdrop-blur-xl z-40 lg:hidden flex flex-col items-center justify-center gap-8 transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center gap-8 text-center uppercase tracking-widest">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={closeMenu}
              className={({ isActive }) =>
                `text-2xl font-light tracking-wide transition-all duration-300 ${
                  isActive
                    ? "text-blue-500 font-bold scale-105"
                    : "text-text-secondary hover:text-text-primary"
                }`
              }
              style={({ isActive }) =>
                isActive
                  ? { textShadow: "0 0 12px rgba(0, 132, 255, 0.8)" }
                  : {}
              }
            >
              {label}
            </NavLink>
          ))}
          <a
            href="https://github.com/deancruz1"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="text-text-secondary hover:text-blue-400 transition-colors duration-300 text-2xl font-light tracking-wide"
          >
            06 GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
