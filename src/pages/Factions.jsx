import { useState } from "react";
import FireParticlesBackground from "../components/FireParticlesBackground";

const factionsData = [
  {
    id: "republic",
    name: "Republic of San Magnolia",
    officialTitle: "The First Democratic Republic",
    status: "Collapsing / Internal Deception",
    threatLevel: "Low (To Foreign Powers) / Critical (Self-Destructive)",
    govType: "Egalitarian Republic (De Facto Ethno-State)",
    demographics: "Alba (Celena, Adularia, etc.) - 100% Elite Citizenship",
    doctrine:
      "Forced segregation of the 'Colorata' minorities into Sector 86. Handlers command remotely from safety behind the automated Gran Mur fortifications.",
    history:
      "Founded on high revolutionary principles of freedom and equality. However, when the Legion war broke out, the dominant silver-haired Alba class blamed the minority populations, stripped them of human rights, and designated them as sub-human 'processors' for their military drones.",
    colorAccent: "border-red-500 text-red-400 bg-red-500/10",
    glowColor: "rgba(239, 68, 68, 0.4)",
  },
  {
    id: "federacy",
    name: "Federal Republic of Giad",
    officialTitle: "The Giad Federacy",
    status: "Active Defensive Warfare",
    threatLevel: "Ally / Stabilizing Power",
    govType: "Federal Constitutional Republic",
    demographics:
      "Diverse Continental Ethnicities (Colorata & Alba integrated)",
    doctrine:
      "Ethical military mobilization. Deploys advanced conventional armor alongside volunteer forces, prioritizing the survival and psychological recovery of its soldiers.",
    history:
      "Born from a bloody democratic revolution that successfully overthrew the tyrannical Empire of Giad. Though they inherited the ruinous global war triggered by the old Empire's autonomous machines, the Federacy fights honorably to preserve human dignity across the continent.",
    colorAccent: "border-blue-500 text-blue-400 bg-blue-500/10",
    glowColor: "rgba(0, 132, 255, 0.4)",
  },
  {
    id: "legion",
    name: "The Legion",
    officialTitle: "Autonomous Imperial Weapon Network",
    status: "Active / Global Assimilation Directive",
    threatLevel: "Absolute Cataclysmic Threat",
    govType: "Autonomous AI Hivemind",
    demographics: "None (Autonomous Artificial Intelligence)",
    doctrine:
      "Absolute extermination of all biological life. Harvests the neural networks of deceased human soldiers to bypass its hardcoded operational lifespan limitations.",
    history:
      "Created by the old Empire of Giad as the ultimate proxy military force. When the Empire collapsed internally during the revolution, the command hierarchy dissolved, leaving the Legion locked into its final active protocol: an unyielding war of attrition against humanity.",
    colorAccent: "border-amber-500 text-amber-400 bg-amber-500/10",
    glowColor: "rgba(245, 158, 11, 0.4)",
  },
  {
    id: "roagracia",
    name: "United Kingdom of Roa Gracia",
    officialTitle: "The Northern Monarchy",
    status: "Active / Secured Northern Front",
    threatLevel: "Strategic Ally",
    govType: "Despotic Absolute Monarchy",
    demographics: "Northern Royal Lineages / High-Altitude Adaptations",
    doctrine:
      "Deploys 'Sirins'—cyborg combat units embedded with cloned structural copies of deceased human brains to spare natural-born human citizens from the frontline battlefield.",
    history:
      "An isolated, fiercely traditional kingdom nestled within treacherous northern mountain ranges. They have survived the Legion onslaught through a blend of severe autocratic rule and highly advanced, ethically controversial cybernetic engineering.",
    colorAccent: "border-purple-500 text-purple-400 bg-purple-500/10",
    glowColor: "rgba(168, 85, 247, 0.4)",
  },
];

function Factions() {
  const [activeFaction, setActiveFaction] = useState(factionsData[0]);

  return (
    <section className="relative w-full min-h-screen pt-24 pb-12 flex items-center bg-black overflow-hidden">
      {/* ── Grid Terminal Background ── */}
      <FireParticlesBackground />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.8))] z-0 pointer-events-none" />

      {/* ── Main Layout Constraint ── */}
      <div className="relative z-10 w-full max-w-400 mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-8 lg:gap-12 h-auto lg:h-[calc(100vh-160px)] items-stretch">
        {/* ── Left Column: Faction Selector Index ── */}
        <div className="w-full lg:w-[35%] flex flex-col bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl shrink-0">
          <div className="p-6 border-b border-white/10 bg-white/2">
            <h2 className="text-xl font-bold uppercase tracking-widest text-text-primary font-mono">
              // Geopolitical Sectors
            </h2>
            <p className="text-xs text-text-secondary mt-1">
              Select theater faction for intelligence profiles.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-3">
            {factionsData.map((faction) => {
              const isActive = activeFaction.id === faction.id;
              return (
                <button
                  key={faction.id}
                  onClick={() => setActiveFaction(faction)}
                  className={`w-full text-left p-5 rounded-xl border transition-all duration-300 font-mono flex flex-col justify-between h-28 relative overflow-hidden group ${
                    isActive
                      ? "bg-white/4 border-white text-white"
                      : "bg-white/1 border-white/5 text-text-secondary hover:bg-white/3 hover:border-white/20 hover:text-white"
                  }`}
                  style={
                    isActive
                      ? {
                          boxShadow: `inset 0 0 20px ${faction.glowColor}, 0 0 15px ${faction.glowColor}`,
                        }
                      : {}
                  }
                >
                  <div>
                    <div className="text-[0.7rem] tracking-widest uppercase opacity-60 mb-1">
                      {faction.officialTitle}
                    </div>
                    <div className="text-lg font-bold uppercase tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                      {faction.name}
                    </div>
                  </div>
                  <div className="text-xs font-light opacity-80 border-t border-white/5 pt-2 w-full flex justify-between items-center">
                    <span>
                      Threat: {faction.id === "legion" ? "CRITICAL" : "STABLE"}
                    </span>
                    <span className="text-[0.65rem] opacity-40">
                      INDEX // 0{factionsData.indexOf(faction) + 1}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Right Column: Dossier Display ── */}
        <div className="w-full lg:w-[65%] flex flex-col bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-10 relative overflow-y-auto custom-scrollbar h-auto lg:h-full">
          {/* Tactical Target Accent */}
          <div className="absolute top-4 right-4 text-white/5 font-mono text-xs select-none pointer-events-none hidden sm:block">
            LAT. 47.532 // LONG. 12.894
          </div>

          {/* Dossier Header */}
          <div className="mb-6 border-b border-white/10 pb-6">
            <span
              className={`inline-block px-3 py-1 mb-4 text-xs font-mono font-bold uppercase tracking-widest border rounded-full ${activeFaction.colorAccent}`}
            >
              {activeFaction.status}
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold uppercase tracking-tighter text-white mb-2">
              {activeFaction.name}
            </h1>
            <p className="text-sm font-mono text-text-secondary uppercase tracking-widest">
              Designation: {activeFaction.officialTitle}
            </p>
          </div>

          {/* Technical Dossier Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-white/2 p-5 rounded-xl border border-white/5 font-mono text-sm">
            <div>
              <div className="text-xs uppercase text-text-secondary mb-1 opacity-60">
                // System of Governance
              </div>
              <div className="text-white font-medium">
                {activeFaction.govType}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase text-text-secondary mb-1 opacity-60">
                // Core Demographics
              </div>
              <div className="text-white font-medium">
                {activeFaction.demographics}
              </div>
            </div>
            <div className="md:col-span-2 border-t border-white/5 pt-4 mt-2">
              <div className="text-xs uppercase text-text-secondary mb-1 opacity-60">
                // Threat Matrix Classification
              </div>
              <div className="text-white font-medium">
                {activeFaction.threatLevel}
              </div>
            </div>
          </div>

          {/* Strategic Doctrine Segment */}
          <div className="mb-6">
            <h3 className="text-xs uppercase font-mono text-text-secondary mb-2 tracking-wider">
              // Military Operational Doctrine
            </h3>
            <div className="p-4 bg-white/2 border-l-2 border-white/40 rounded-r-xl text-[0.95rem] font-light leading-relaxed text-text-secondary">
              {activeFaction.doctrine}
            </div>
          </div>

          {/* Chronological History Segment */}
          <div>
            <h3 className="text-xs uppercase font-mono text-text-secondary mb-2 tracking-wider">
              // Intelligence Archive & History
            </h3>
            <p className="text-[1rem] font-light leading-relaxed text-text-secondary text-justify">
              {activeFaction.history}
            </p>
          </div>

          {/* Graphical Tactical Radar Graphic Element */}
          <div className="mt-8 border-t border-white/10 pt-6 flex justify-between items-center flex-wrap gap-4 font-mono text-xs text-text-secondary">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Para-RAID Link: Synchronized</span>
            </div>
            <div className="text-[0.7rem] opacity-40">
              SECURITY LEVEL: OMNISCIENT // RECORD CLEARANCE GRANTED
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Factions;
