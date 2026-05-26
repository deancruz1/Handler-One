import { useState } from "react";
import FireParticlesBackground from "../components/FireParticlesBackground";

const mechas = [
  {
    id: "m1a4",
    name: "M1A4 Juggernaut",
    faction: "Republic of San Magnolia",
    type: "Feldreß (Unmanned Drone - Official Designation)",
    armament: "57mm Smoothbore Gun, 2x Heavy Machine Guns",
    armor: "Scavenged Aluminum Alloy (Extremely Weak)",
    description:
      "The Republic's primary combat unit. Dubbed the 'aluminum coffin' by the Eighty-Six, it boasts high mobility but zero defensive capabilities. It is entirely unsuited for modern combat against the Legion, requiring handlers to rely entirely on the piloting skills and sacrifices of the Eighty-Six to survive.",
    status: "Obsolete / Active",
  },
  {
    id: "xm2",
    name: "XM2 Reginleif",
    faction: "Federal Republic of Giad",
    type: "3rd Generation Feldreß",
    armament: "88mm Smoothbore Gun, High-Frequency Blades",
    armor: "Composite Armor (Lightweight)",
    description:
      "Developed by the Federacy based on combat data from Spearhead Squadron. It sacrifices heavy armor for sheer, terrifying speed and maneuverability. It is designed specifically for the Eighty-Six, allowing them to fight on equal footing with the Legion's most lethal units.",
    status: "Active Deployment",
  },
  {
    id: "ameise",
    name: "Ameise (Scout Type)",
    faction: "The Legion",
    type: "Autonomous Drone",
    armament: "2x 14mm Anti-Personnel Machine Guns",
    armor: "Light",
    description:
      "The eyes and ears of the Legion. While lightly armed and armored, they travel in massive swarms to locate enemy forces and share targeting data instantly across the Legion network.",
    status: "Hostile",
  },
  {
    id: "lowe",
    name: "Löwe (Tank Type)",
    faction: "The Legion",
    type: "Autonomous Drone",
    armament: "120mm Smoothbore Turret",
    armor: "Heavy Composite",
    description:
      "The main battle tank of the Legion. It mimics feline predatory movements and possesses armor thick enough to deflect standard Juggernaut rounds effortlessly. Taking one down usually requires a coordinated ambush.",
    status: "Hostile",
  },
];

function Arsenal() {
  const [activeMech, setActiveMech] = useState(mechas[0]);

  return (
    <section className="relative w-full min-h-screen pt-24 pb-12 flex items-center bg-black overflow-hidden">
      {/* ── Tech/Wireframe Background ── */}
      <FireParticlesBackground />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,132,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,132,255,0.05)_1px,transparent_1px)] bg-size-[40px_40px] z-0 pointer-events-none" />

      {/* ── Main Layout Constraint ── */}
      <div className="relative z-10 w-full max-w-400 mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-8 lg:gap-12 h-full lg:h-[calc(100vh-160px)]">
        {/* ── Left Column: Database Index ── */}
        <div className="w-full lg:w-1/3 flex flex-col h-full bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)]">
          <div className="p-6 border-b border-white/10 bg-blue-950/20">
            <h2 className="text-xl font-bold uppercase tracking-widest text-blue-400 font-mono">
              // Tech Arsenal
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Select unit for technical readouts.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-3">
            {mechas.map((mech) => (
              <button
                key={mech.id}
                onClick={() => setActiveMech(mech)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 font-mono ${
                  activeMech.id === mech.id
                    ? "bg-blue-600/20 border-blue-500 text-white shadow-[0_0_15px_rgba(0,132,255,0.3)]"
                    : "bg-white/5 border-transparent text-text-secondary hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="text-xs tracking-widest uppercase mb-1 opacity-70">
                  {mech.faction}
                </div>
                <div className="text-lg font-bold uppercase">{mech.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Right Column: Specs Display ── */}
        <div className="w-full lg:w-2/3 h-full flex flex-col bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 lg:p-10 relative overflow-y-auto custom-scrollbar">
          {/* Target Reticle Aesthetic Corner */}
          <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-blue-500 opacity-50" />
          <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-blue-500 opacity-50" />

          {/* Header Info */}
          <div className="mb-8">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-mono font-bold uppercase tracking-widest border rounded-full border-blue-500 text-blue-400 bg-blue-500/10">
              Status: {activeMech.status}
            </span>
            <h1
              className="text-4xl lg:text-6xl font-bold uppercase tracking-tighter text-white mb-2"
              style={{ textShadow: "0 0 15px rgba(255, 255, 255, 0.3)" }}
            >
              {activeMech.name}
            </h1>
            <h3 className="text-xl font-light text-text-secondary tracking-widest uppercase">
              {activeMech.type}
            </h3>
          </div>

          {/* Placeholder for 3D Render / Image */}
          <div className="w-full h-64 lg:h-80 bg-linear-to-tr from-white/5 to-transparent border border-white/10 rounded-xl mb-8 flex items-center justify-center relative overflow-hidden group">
            <div className="text-white/20 font-mono tracking-widest text-sm uppercase z-10 group-hover:text-blue-400 transition-colors">
              [ Tactical Visual Feed Offline ]
            </div>
            {/* Ambient scanner line animation */}
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/50 shadow-[0_0_10px_rgba(0,132,255,0.8)] animate-[scan_3s_ease-in-out_infinite]" />
          </div>

          {/* Tech Specs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="text-xs uppercase font-mono text-blue-500 mb-1 border-b border-white/10 pb-1">
                Primary Armament
              </div>
              <div className="text-white font-medium">
                {activeMech.armament}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase font-mono text-blue-500 mb-1 border-b border-white/10 pb-1">
                Armor Classification
              </div>
              <div className="text-white font-medium">{activeMech.armor}</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="text-xs uppercase font-mono text-blue-500 mb-2 border-b border-white/10 pb-1">
              Field Notes
            </div>
            <p className="text-text-secondary leading-relaxed font-light text-justify">
              {activeMech.description}
            </p>
          </div>
        </div>
      </div>

      {/* Required CSS for the scanner animation inline */}
      <style>{`
        @keyframes scan {
          0%, 100% { transform: translateY(0); opacity: 0; }
          10%, 90% { opacity: 1; }
          50% { transform: translateY(20rem); }
        }
      `}</style>
    </section>
  );
}

export default Arsenal;
