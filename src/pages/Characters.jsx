import { useState } from "react";
import characters from "../data/characters";

function Characters() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = characters[activeIndex];

  return (
    <section className="relative w-full min-h-screen lg:h-screen p-0 overflow-y-auto lg:overflow-hidden bg-black text-white font-sans">
      {/* ── Background Video (Dead Feed Fallback added) ── */}
      <div className="fixed lg:absolute inset-0 z-0 pointer-events-none bg-zinc-950">
        {active.video ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-60 grayscale-50"
            key={active.video}
          >
            <source src={active.video} type="video/mp4" />
          </video>
        ) : (
          /* Dead Signal Static (Fallback) */
          <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] animate-[pulse_2s_ease-in-out_infinite] mix-blend-overlay" />
        )}

        {/* CRT Scanline & Vignette Overlays */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.5)_2px,transparent_2px)] bg-size-[100%_4px]" />
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 to-black/40" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black opacity-80" />
      </div>

      {/* ── Main Layout Wrapper ── */}
      <div className="relative z-10 w-full h-full max-w-400 mx-auto px-4 sm:px-6 lg:px-12 pt-24 pb-12 flex flex-col lg:flex-row gap-10 lg:gap-16">
        {/* ── LEFT COLUMN: Personnel Dossier ── */}
        <div className="w-full lg:w-5/12 flex flex-col shrink-0 lg:h-full animate-[fadeIn_0.3s_ease-out]">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6 border-b border-white/20 pb-4">
            <div className="w-3 h-3 bg-red-500 animate-pulse shadow-[0_0_10px_#ef4444]" />
            <h2 className="text-xs font-mono tracking-[0.3em] text-red-400 uppercase">
              Classified // Spearhead Squadron
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 mb-6">
            {/* Character Portrait (Tactical Crop) */}
            <div className="relative w-full sm:w-48 h-64 shrink-0 bg-black/50 border border-white/10 p-1 mx-auto sm:mx-0">
              {/* Corner Brackets */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/50" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/50" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/50" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/50" />

              <img
                src={active.image}
                alt={active.name}
                className={`w-full h-full object-cover object-top opacity-90 ${active.status.includes("KIA") ? "mix-blend-luminosity  contrast-125" : "mix-blend-luminosity"}`}
              />
              {/* Fake scanning line over portrait */}
              <div className="absolute top-0 left-0 w-full h-px bg-blue-500/50 shadow-[0_0_10px_#3b82f6] animate-[scan_3s_ease-in-out_infinite]" />
            </div>

            {/* Vital Stats */}
            <div className="flex flex-col justify-end w-full text-center sm:text-left mt-4 sm:mt-0">
              <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-1 gap-1">
                <h4 className="font-mono text-[0.7rem] text-zinc-500 tracking-widest uppercase">
                  Personal Name
                </h4>
                <span
                  className={`font-mono text-[0.65rem] tracking-widest uppercase ${active.status.includes("KIA") ? "text-red-400/70" : "text-blue-400/70"}`}
                >
                  {active.serial}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight mb-3 text-white">
                {active.name}
              </h1>

              <h4 className="font-mono text-[0.7rem] text-zinc-500 tracking-widest uppercase mb-1">
                Callsign / Assignment
              </h4>
              <h2
                className={`text-lg sm:text-xl font-bold uppercase tracking-widest mb-1 ${active.status.includes("KIA") ? "text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" : "text-blue-400 drop-shadow-[0_0_8px_rgba(0,132,255,0.5)]"}`}
              >
                {active.codename}
              </h2>
              <h3 className="text-[0.75rem] font-mono text-zinc-400 uppercase tracking-wide mb-5">
                // {active.role}
              </h3>

              {/* Status Grid */}
              <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 max-w-sm mx-auto sm:mx-0 w-full">
                <div className="text-left">
                  <div className="text-[0.55rem] sm:text-[0.6rem] font-mono text-zinc-500 mb-1">
                    OPERATIONAL STATUS
                  </div>
                  <div
                    className={`text-xs font-mono font-bold ${
                      active.status.includes("KIA")
                        ? "text-red-600 animate-pulse drop-shadow-[0_0_5px_rgba(220,38,38,0.8)]"
                        : active.status.includes("DEPLOYED")
                          ? "text-orange-400"
                          : "text-green-400"
                    }`}
                  >
                    {active.status}
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-[0.55rem] sm:text-[0.6rem] font-mono text-zinc-500 mb-1">
                    PARA-RAID
                  </div>
                  <div
                    className={`text-xs font-mono font-bold ${active.status.includes("KIA") ? "text-zinc-600" : "text-blue-400"}`}
                  >
                    {active.status.includes("KIA")
                      ? "OFFLINE"
                      : "SYNCED // ACTIVE"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description Block */}
          <div className="relative bg-black/40 border border-white/10 p-5 sm:p-6 lg:flex-1 min-h-37.5 lg:h-auto overflow-y-auto custom-scrollbar">
            {/* Safely render crest only if it exists */}
            {active.crest && (
              <img
                src={active.crest}
                alt="Crest"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-xs h-xs md:w-sm md:h-sm lg:w-lg lg:h-lg object-contain opacity-10 pointer-events-none"
              />
            )}
            <p className="text-sm lg:text-base font-mono leading-relaxed text-zinc-300 text-justify relative z-10">
              {active.description}
            </p>
          </div>
        </div>

        {/* ── RIGHT COLUMN: Tactical Roster Grid ── */}
        <div className="w-full lg:w-7/12 flex flex-col lg:h-full mt-4 lg:mt-0">
          <div className="flex justify-between items-end mb-4 border-b border-white/20 pb-2">
            <h3 className="text-sm font-mono tracking-widest text-zinc-400 uppercase">
              Processor Roster
            </h3>
            <span className="text-xs font-mono text-zinc-600">
              COUNT: {characters.length}
            </span>
          </div>

          {/* The Roster List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:overflow-y-auto custom-scrollbar pr-1 lg:pr-2 pb-12 lg:pb-24">
            {characters.map((char, index) => {
              const isActive = index === activeIndex;
              const isDead = char.status.includes("KIA");

              return (
                <button
                  key={char.id || index}
                  onClick={() => {
                    setActiveIndex(index);
                    // Smooth scroll back to top on mobile
                    if (window.innerWidth < 1024) {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className={`group relative flex items-center p-3 transition-all duration-300 text-left border ${
                    isActive
                      ? isDead
                        ? "bg-red-900/10 border-red-500/30 shadow-[inset_0_0_20px_rgba(220,38,38,0.1)]"
                        : "bg-blue-900/20 border-blue-500/50 shadow-[inset_0_0_20px_rgba(0,132,255,0.15)]"
                      : "bg-black/40 border-white/5 hover:border-white/20 hover:bg-white/5"
                  }`}
                >
                  {/* Active Indicator Line */}
                  {isActive && (
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1 ${isDead ? "bg-red-600 shadow-[0_0_10px_#dc2626]" : "bg-blue-500 shadow-[0_0_10px_#3b82f6]"}`}
                    />
                  )}

                  {/* Tiny Thumbnail */}
                  <div className="w-10 h-10 shrink-0 bg-black overflow-hidden mr-4 border border-white/10 group-hover:border-white/30 transition-colors">
                    <img
                      src={char.image}
                      alt={char.codename}
                      className={`w-full h-full object-cover transition-all ${
                        isActive
                          ? isDead
                            ? "mix-blend-luminosity grayscale contrast-125"
                            : "mix-blend-normal"
                          : "mix-blend-luminosity opacity-60 group-hover:mix-blend-normal group-hover:opacity-100"
                      }`}
                    />
                  </div>

                  {/* Name Data */}
                  <div className="flex-1 overflow-hidden">
                    <div
                      className={`text-xs font-mono tracking-widest uppercase truncate ${
                        isActive
                          ? isDead
                            ? "text-red-400"
                            : "text-blue-400"
                          : "text-zinc-500 group-hover:text-zinc-300"
                      }`}
                    >
                      {char.codename}
                    </div>
                    <div
                      className={`text-sm font-bold uppercase truncate tracking-wide ${isActive ? "text-white" : "text-zinc-400"}`}
                    >
                      {char.name}
                    </div>
                  </div>

                  {/* Classification Serial */}
                  <div
                    className={`text-[0.55rem] sm:text-[0.6rem] font-mono uppercase tracking-wider shrink-0 pl-2 ${
                      isActive
                        ? isDead
                          ? "text-red-500/60"
                          : "text-blue-400/60"
                        : "text-zinc-600 opacity-50"
                    }`}
                  >
                    {char.serial}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Required Custom CSS for animations and scrollbars */}
      <style>{`
        @keyframes scan {
          0%, 100% { transform: translateY(0); opacity: 0; }
          10%, 90% { opacity: 1; }
          50% { transform: translateY(16rem); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        /* Custom scrollbar to match the terminal theme */
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 132, 255, 0.5);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 132, 255, 0.8);
        }
      `}</style>
    </section>
  );
}

export default Characters;
