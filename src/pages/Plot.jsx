import logo86 from "../assets/hero page/logo.webp";
import FireParticlesBackground from "../components/FireParticlesBackground";

function Plot() {
  return (
    <section className="relative w-full min-h-screen lg:h-screen p-0 overflow-x-hidden lg:overflow-hidden bg-black text-text-primary flex items-center">
      {/* ── Background Wallpaper ── */}
      <FireParticlesBackground />

      {/* ── Visual Ambient Overlays ── */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent lg:bg-linear-to-r lg:from-black/90 lg:via-black/40 lg:to-black/30 z-0 pointer-events-none" />

      {/* ── Layout Constraint ── */}
      <div className="relative z-10 w-full h-full max-w-400 mx-auto px-6 lg:px-12 pt-24 lg:pt-28 pb-12 flex flex-col lg:flex-row items-stretch justify-between gap-8 lg:gap-12">
        {/* ── Left Column: The Premise ── */}
        <div className="flex flex-col justify-between w-full lg:w-[45%] bg-black/50 backdrop-blur-lg border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl h-auto lg:h-[calc(100vh-160px)]">
          <div>
            <span
              className="text-blue-500 uppercase tracking-widest text-sm font-bold block mb-2"
              style={{ textShadow: "0 0 8px rgba(0, 132, 255, 0.5)" }}
            >
              Operational Overview
            </span>
            <h1 className="text-[2.5rem] sm:text-[3.5rem] lg:text-[4rem] font-bold uppercase leading-tight tracking-tighter mb-4">
              The Deception of <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-gray-400">
                Zero Casualties
              </span>
            </h1>
            <p className="text-[1rem] md:text-[1.1rem] font-light leading-relaxed text-text-secondary text-justify mb-6">
              For nine years, the Republic of San Magnolia has claimed to
              withstand an endless assault from the neighboring Empire of Giad’s
              autonomous drone army, the{" "}
              <strong className="text-white font-medium">Legion</strong>, using
              their own uncrewed combat vehicles. The citizens celebrate a
              flawless, bloodless defense.
            </p>
            <p className="text-[1rem] md:text-[1.1rem] font-light leading-relaxed text-text-secondary text-justify">
              But behind the iron walls lies a horrific truth: the Republic's
              drones are not unmanned. They are piloted by the{" "}
              <strong className="text-blue-400 font-medium">Eighty-Six</strong>
              —human citizens stripped of their rights, forced into active
              military encampments, and treated as disposable parts in a
              meat-grinder war meant to systematically erase them.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-4 mt-8 border-t border-white/10 pt-6">
            <img
              src={logo86}
              alt="86 Logo"
              className="h-10 w-auto opacity-60"
            />
            <div className="text-xs uppercase tracking-widest text-text-secondary">
              Classification: Top Secret // Republic Military Archive
            </div>
          </div>
        </div>

        {/* ── Right Column: Structural Story Arcs & Source Material ── */}
        <div className="w-full lg:w-[50%] flex flex-col justify-start gap-5 overflow-y-auto lg:pr-4 custom-scrollbar h-auto lg:h-[calc(100vh-160px)] pb-10 lg:pb-0">
          {/* Arc 1 Card */}
          <div className="bg-white/3 hover:bg-white/6 backdrop-blur-md border border-white/5 hover:border-blue-500/30 rounded-2xl p-5 sm:p-6 transition-all duration-300 group shrink-0">
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-white group-hover:text-blue-400 transition-colors">
                Act I: The San Magnolia Front
              </h2>
              <span className="text-xs font-mono px-2 py-1 bg-white/10 rounded uppercase text-text-secondary tracking-wider">
                Episodes 01-11
              </span>
            </div>
            <p className="text-[0.95rem] font-light leading-relaxed text-text-secondary text-justify">
              Major Vladilena "Lena" Milizé, an idealistic Republic officer,
              becomes the "Handler" of the legendary Spearhead Squadron
              stationed on the brutal frontlines. Communicating solely via an
              auditory sensory link known as the Para-RAID, she meets the
              tactical captain, Shinei Nouzen—the "Undertaker". As she fights
              alongside them, she uncovers the dynamic cruelty of her home
              nation and the tragic honor of warriors who accept death to
              preserve their pride.
            </p>
          </div>

          {/* Arc 2 Card */}
          <div className="bg-white/3 hover:bg-white/6 backdrop-blur-md border border-white/5 hover:border-blue-500/30 rounded-2xl p-5 sm:p-6 transition-all duration-300 group shrink-0">
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-white group-hover:text-blue-400 transition-colors">
                Act II: The Federal Campaign
              </h2>
              <span className="text-xs font-mono px-2 py-1 bg-white/10 rounded uppercase text-text-secondary tracking-wider">
                Episodes 12-23
              </span>
            </div>
            <p className="text-[0.95rem] font-light leading-relaxed text-text-secondary text-justify">
              After embarking on a terminal Special Reconnaissance Mission into
              enemy territory, the surviving members of Spearhead break through
              the borders and are rescued by the newly formed Federal Republic
              of Giad. Offered freedom and a normal civilian life, the shattered
              soldiers struggle to adapt. Drawn inextricably back to the iron
              cockpit, they join the Giad military as the Nordlicht Squadron to
              destroy the evolving global Legion threat.
            </p>
          </div>

          {/* Expanded Source Material Card (The Light Novels) */}
          <div className="bg-blue-900/10 hover:bg-blue-900/20 backdrop-blur-md border border-blue-500/20 hover:border-blue-500/50 rounded-2xl p-5 sm:p-6 transition-all duration-300 group shrink-0">
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-white group-hover:text-blue-400 transition-colors">
                The Source Material
              </h2>
              <span className="text-xs font-mono px-2 py-1 bg-blue-500/20 text-blue-300 rounded uppercase tracking-wider">
                Light Novels (Vol 04+)
              </span>
            </div>
            <p className="text-[0.95rem] font-light leading-relaxed text-text-secondary text-justify">
              The critically acclaimed anime adaptation masterfully covers the
              first three volumes of Asato Asato's award-winning light novel
              series. For those yearning to see what lies beyond the anime's
              conclusion, the sprawling literary epic continues. The narrative
              expands into treacherous new territories, exploring allied nations
              like the United Kingdom of Roa Gracia and the Alliance of Wald,
              introducing terrifying new Legion variants, and delving deeper
              into the Eighty-Sixth Strike Package as they spearhead humanity's
              desperate counteroffensive.
            </p>
          </div>

          {/* Core Themes Callout */}
          <div className="border-l-2 border-blue-500 bg-blue-500/5 rounded-r-xl p-4 text-sm font-light text-text-secondary leading-relaxed shrink-0 mt-auto">
            <span className="font-bold text-white uppercase tracking-wider block mb-1 text-xs">
              Core Narrative Pillars:
            </span>
            Explores systemic discrimination, state-sponsored propaganda, the
            deep psychological processing of battlefield trauma, and what it
            truly means to maintain humanity when the world has stripped it
            away.
          </div>
        </div>
      </div>
    </section>
  );
}

export default Plot;
