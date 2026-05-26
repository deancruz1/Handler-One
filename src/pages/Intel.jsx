import logo86 from "../assets/hero page/logo.webp";
import FireParticlesBackground from "../components/FireParticlesBackground";

function IntelBriefing() {
  return (
    <section className="relative w-full min-h-screen lg:h-screen p-0 overflow-x-hidden lg:overflow-hidden bg-black text-text-primary flex items-center">
      {/* ── Background Wallpaper ── */}
      <FireParticlesBackground />

      {/* ── Visual Ambient Overlays ── */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent lg:bg-linear-to-r lg:from-black/90 lg:via-black/40 lg:to-black/30 z-0 pointer-events-none" />

      {/* ── Layout Constraint ── */}
      <div className="relative z-10 w-full h-full max-w-400 mx-auto px-6 lg:px-12 pt-24 lg:pt-28 pb-12 flex flex-col lg:flex-row items-stretch justify-between gap-8 lg:gap-12">
        {/* ── Left Column: The Premise (Repackaged as Situation Report) ── */}
        <div className="flex flex-col justify-between w-full lg:w-[45%] bg-black/50 backdrop-blur-lg border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl h-auto lg:h-[calc(100vh-160px)]">
          <div>
            <span
              className="text-red-500 uppercase tracking-widest text-sm font-bold block mb-2"
              style={{ textShadow: "0 0 8px rgba(239, 68, 68, 0.5)" }}
            >
              Classified Briefing // Clearance Level: Handler
            </span>
            <h1 className="text-[2.5rem] sm:text-[3.5rem] lg:text-[4rem] font-bold uppercase leading-tight tracking-tighter mb-4">
              Theater <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-gray-400">
                Situation Report
              </span>
            </h1>
            <p className="text-[1rem] md:text-[1.1rem] font-light leading-relaxed text-text-secondary text-justify mb-6">
              Official state media dictates that the Republic of San Magnolia
              has sustained a bloodless war against the Giadian Empire's
              autonomous armor, the{" "}
              <strong className="text-white font-medium">Legion</strong>.
              Republic command officially classifies all frontline defensive
              units as uncrewed drones.
            </p>
            <p className="text-[1rem] md:text-[1.1rem] font-light leading-relaxed text-text-secondary text-justify">
              This terminal bypasses state filters. The drones are manned by the{" "}
              <strong className="text-blue-400 font-medium">Eighty-Six</strong>
              —systematically disenfranchised citizens forced into the
              Juggernaut chassis. This console provides direct, unfiltered
              tactical linkage to their operational statuses.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-4 mt-8 border-t border-white/10 pt-6">
            <img
              src={logo86}
              alt="86 Logo"
              className="h-10 w-auto opacity-60 grayscale"
            />
            <div className="text-xs uppercase tracking-widest text-text-secondary">
              Unauthorized Access Logs Monitored // San Magnolia Intelligence
            </div>
          </div>
        </div>

        {/* ── Right Column: Structural Story Arcs (Repackaged as Mission Archives) ── */}
        <div className="w-full lg:w-[50%] flex flex-col justify-start gap-5 overflow-y-auto lg:pr-4 custom-scrollbar h-auto lg:h-[calc(100vh-160px)] pb-10 lg:pb-0">
          {/* Arc 1 Card -> Operation Spearhead */}
          <div className="bg-white/3 hover:bg-white/6 backdrop-blur-md border border-white/5 hover:border-blue-500/30 rounded-2xl p-5 sm:p-6 transition-all duration-300 group shrink-0">
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-white group-hover:text-blue-400 transition-colors">
                Archive: Sector 86 Defense
              </h2>
              <span className="text-xs font-mono px-2 py-1 bg-white/10 rounded uppercase text-text-secondary tracking-wider">
                Records 01-11
              </span>
            </div>
            <p className="text-[0.95rem] font-light leading-relaxed text-text-secondary text-justify">
              Mission logs detailing Major Vladilena Milizé’s tenure as Handler
              for the elite Spearhead Squadron. Communications established via
              Para-RAID sensory synchronization. Records indicate significant
              psychological strain and high casualty rates as the squadron, led
              by Captain Shinei Nouzen, faced overwhelming Legion offensives on
              the Republic perimeter.
            </p>
          </div>

          {/* Arc 2 Card -> The Federal Campaign */}
          <div className="bg-white/3 hover:bg-white/6 backdrop-blur-md border border-white/5 hover:border-blue-500/30 rounded-2xl p-5 sm:p-6 transition-all duration-300 group shrink-0">
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-white group-hover:text-blue-400 transition-colors">
                Operation: Morpho Eradication
              </h2>
              <span className="text-xs font-mono px-2 py-1 bg-white/10 rounded uppercase text-text-secondary tracking-wider">
                Records 12-23
              </span>
            </div>
            <p className="text-[0.95rem] font-light leading-relaxed text-text-secondary text-justify">
              Following a Special Reconnaissance operation, surviving Spearhead
              elements were absorbed by the Federal Republic of Giad. Reformed
              into the Nordlicht Squadron under the Eighty-Sixth Strike Package,
              units were deployed deep into contested territory to dismantle
              high-velocity railgun Legion variants.
            </p>
          </div>

          {/* Expanded Source Material Card -> Classified Intel */}
          <div className="bg-blue-900/10 hover:bg-blue-900/20 backdrop-blur-md border border-blue-500/20 hover:border-blue-500/50 rounded-2xl p-5 sm:p-6 transition-all duration-300 group shrink-0">
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-white group-hover:text-blue-400 transition-colors">
                Classified: Expanding Theaters
              </h2>
              <span className="text-xs font-mono px-2 py-1 bg-blue-500/20 text-blue-300 rounded uppercase tracking-wider">
                Restricted Access
              </span>
            </div>
            <p className="text-[0.95rem] font-light leading-relaxed text-text-secondary text-justify">
              Projected forecasts indicate the Legion threat is evolving beyond
              initial Giadian borders. Future deployments of the Strike Package
              will necessitate joint operations with the United Kingdom of Roa
              Gracia and the Alliance of Wald. Handlers must prepare for heavy
              winter warfare, aerial Legion prototypes, and unprecedented
              tactical escalation.
            </p>
          </div>

          {/* Core Themes Callout -> Tactical Doctrine */}
          <div className="border-l-2 border-red-500 bg-red-500/5 rounded-r-xl p-4 text-sm font-light text-text-secondary leading-relaxed shrink-0 mt-auto">
            <span className="font-bold text-white uppercase tracking-wider block mb-1 text-xs">
              Command Directive:
            </span>
            Personnel must filter out Republic propaganda. Assessing the
            psychological deterioration of active processors is vital. To treat
            the Eighty-Six as mere hardware is a critical tactical failure.
          </div>
        </div>
      </div>
    </section>
  );
}

export default IntelBriefing;
