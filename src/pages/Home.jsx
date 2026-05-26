import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FireParticlesBackground from "../components/FireParticlesBackground";

function Home() {
  const [logs, setLogs] = useState([]);

  // Lazy State Initialization
  // Runs synchronously ONCE when the component first mounts.
  const [bootState, setBootState] = useState(() => {
    return sessionStorage.getItem("handlerTerminalBooted") ? "done" : "running";
  });

  // Routing paths for tactical navigation
  const navLinks = [
    { name: "TACTICAL INTEL", path: "/intel" },
    { name: "SQUADRON DATA", path: "/characters" },
    { name: "ARMORY ALMANAC", path: "/arsenal" },
  ];

  useEffect(() => {
    // Exit early to avoid setting timers if already booted
    if (bootState === "done") return;

    const bootSequence = [
      "INIT // TACTICAL SECURE PROTOCOL v86.0",
      "ESTABLISHING LINK TO EASTERN FRONT...",
      "BYPASSING REPUBLIC FIREWALLS...",
      "PARA-RAID SYNCHRONIZATION: 100%",
      "> ACCESS GRANTED. WELCOME, HANDLER ONE.",
    ];

    let delay = 0;
    const timeoutIds = [];

    bootSequence.forEach((line) => {
      delay += Math.random() * 400 + 500;
      const id = setTimeout(() => {
        setLogs((prev) => [...prev, line]);
      }, delay);
      timeoutIds.push(id);
    });

    const fadeId = setTimeout(() => {
      setBootState("fading");

      const doneId = setTimeout(() => {
        setBootState("done");
        sessionStorage.setItem("handlerTerminalBooted", "true");
      }, 1000);

      timeoutIds.push(doneId);
    }, delay + 1000);

    timeoutIds.push(fadeId);

    return () => {
      timeoutIds.forEach((id) => clearTimeout(id));
    };
  }, [bootState]);

  return (
    <section className="relative w-full h-screen p-0 overflow-hidden bg-black">
      {/* ── Terminal Boot Sequence Overlay ── */}
      {bootState !== "done" && (
        <div
          className={`absolute inset-0 z-50 flex flex-col justify-center items-start px-8 sm:px-20 bg-black font-mono text-blue-500/80 text-xs sm:text-sm tracking-[0.2em] uppercase transition-opacity duration-1000 ${
            bootState === "fading"
              ? "opacity-0 pointer-events-none"
              : "opacity-100"
          }`}
        >
          <div className="max-w-2xl w-full">
            {logs.map((log, i) => (
              <p
                key={i}
                className="mb-3 drop-shadow-[0_0_5px_rgba(0,132,255,0.5)]"
              >
                {log}
              </p>
            ))}
            {bootState === "running" && (
              <span className="w-2.5 h-4 bg-blue-500 animate-pulse mt-2 block shadow-[0_0_8px_rgba(0,132,255,0.8)]" />
            )}
          </div>
        </div>
      )}

      {/* ── Dynamic Fire Particle Baseline ── */}
      <FireParticlesBackground />

      {/* ── Strategic Vignette Overlays ── */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-black/50 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/40 to-transparent z-0 pointer-events-none hidden lg:block" />

      {/* ── Cinematic HUD Accents ── */}
      <div className="absolute top-10 left-10 w-6 h-6 border-t border-l border-white/20 pointer-events-none z-10 hidden sm:block" />
      <div className="absolute top-10 right-10 w-6 h-6 border-t border-r border-white/20 pointer-events-none z-10 hidden sm:block" />
      <div className="absolute bottom-10 left-10 w-6 h-6 border-b border-l border-white/20 pointer-events-none z-10 hidden sm:block" />
      <div className="absolute bottom-10 right-10 w-6 h-6 border-b border-r border-white/20 pointer-events-none z-10 hidden sm:block" />

      {/* ── Main Layout Wrapper ── */}
      <div className="relative z-10 w-full h-full max-w-400 mx-auto px-6 sm:px-12 lg:px-20 flex flex-col justify-center items-center lg:items-start">
        {/* ── Floating Content Block ── */}
        <div
          className={`w-full max-w-2xl text-center lg:text-left flex flex-col items-center lg:items-start select-none transition-all duration-1000 ${
            bootState !== "done" && bootState !== "fading"
              ? "opacity-0 translate-y-4 delay-300"
              : "opacity-100 translate-y-0"
          }`}
        >
          {/* System Status Segment */}
          <div className="flex items-center gap-3 mb-4 font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-[0.7rem] sm:text-xs tracking-[0.3em] text-blue-400 uppercase font-bold">
              SYS.STATUS // SYNC_ACTIVE
            </span>
          </div>

          {/* Core Subtitle */}
          <h2 className="text-white/60 uppercase text-xs sm:text-sm font-mono tracking-[0.4em] mb-2 pl-1">
            Tactical Operations Intermediary
          </h2>

          {/* The Hero Monolith */}
          <h1
            className="text-white uppercase text-[4rem] sm:text-[6.5rem] md:text-[8rem] lg:text-[9.5rem] font-bold leading-[0.85] tracking-tighter filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] animate-[pulse_6s_ease-in-out_infinite]"
            style={{ textShadow: "0 0 40px rgba(255,255,255,0.05)" }}
          >
            Handler <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-white to-white/70">
              One
            </span>
          </h1>

          {/* Minimalist Terminal Rule */}
          <div className="w-24 h-px bg-linear-to-r from-blue-500 to-transparent my-6 shadow-[0_0_8px_rgba(0,132,255,0.8)]" />

          {/* Lore Log */}
          <p className="text-[0.95rem] sm:text-[1.05rem] lg:text-[1.15rem] font-light leading-relaxed text-zinc-400 text-justify lg:text-left opacity-90 max-w-xl pl-1">
            Welcome back, Commander. Connection to the Eastern Front has been
            established. You are currently patched into the central database of
            the Eighty-Sixth Strike Package. Monitor local theater grids,
            cross-reference tech readouts, and oversee combat directives.
          </p>

          {/* ── Command Navigation Menu ── */}
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4 w-full max-w-xl">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                to={link.path}
                className="group relative px-5 py-3 border border-white/10 bg-white/5 hover:bg-blue-500/10 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-sm sm:flex-1 text-center flex items-center justify-center cursor-pointer"
              >
                <span className="relative z-10 font-mono text-[0.75rem] sm:text-xs text-zinc-400 group-hover:text-blue-400 tracking-[0.2em] uppercase flex items-center gap-2">
                  <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -ml-4">
                    &gt;
                  </span>
                  {link.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Context Prompt Footer */}
          <div className="mt-10 font-mono text-[0.65rem] sm:text-xs text-zinc-600 tracking-widest uppercase flex items-center gap-2">
            <span className="text-blue-500 animate-pulse block w-1.5 h-3 bg-blue-500"></span>
            AWAITING COMMAND INPUT...
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
