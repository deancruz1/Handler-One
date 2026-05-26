import { useState } from "react";
import FireParticlesBackground from "../components/FireParticlesBackground";

// I've added the most impactful episodes here to establish the layout.
// You can easily expand this array to include all 23 episodes!
const missionData = [
  {
    id: 1,
    act: 1,
    ep: "01",
    title: "Undertaker",
    operationDate: "April 2148",
    status: "Archived",
    desc: "Major Vladilena Milizé is assigned as the new Handler for the Spearhead Squadron, the Republic's most elite and notorious Eighty-Six unit stationed on the brutal Eastern Front.",
  },
  {
    id: 2,
    act: 1,
    ep: "02",
    title: "Spearhead",
    operationDate: "April 2148",
    status: "Archived",
    desc: "Lena connects with the squadron via the Para-RAID. She introduces herself, attempting to bridge the gap between Alba and Eighty-Six, but begins to understand the grim reality of their daily existence.",
  },
  {
    id: 9,
    act: 1,
    ep: "09",
    title: "Goodbye",
    operationDate: "May 2148",
    status: "Classified",
    desc: "The Spearhead Squadron is ordered on a Special Reconnaissance Mission with a zero percent survival rate. Refusing to abandon them, Lena hijacks Republic artillery to provide unsanctioned fire support.",
  },
  {
    id: 12,
    act: 2,
    ep: "12",
    title: "Welcome",
    operationDate: "October 2148",
    status: "Declassified",
    desc: "Months after their terminal mission, Shin and the survivors awaken in the Federal Republic of Giad. Rescued from the Legion, they are offered citizenship and a chance at a peaceful, normal life.",
  },
  {
    id: 22,
    act: 2,
    ep: "22",
    title: "Shin",
    operationDate: "December 2148",
    status: "Critical Operation",
    desc: "In the devastating aftermath of the Morpho subjugation, Shin faces his ultimate despair. Surrounded by the Legion, he is pulled back from the brink by a familiar voice connecting through the static.",
  },
  {
    id: 23,
    act: 2,
    ep: "23",
    title: "Handler One",
    operationDate: "March 2149",
    status: "Ongoing",
    desc: "A historic reunion. The newly formed Eighty-Sixth Strike Package meets their appointed tactical commander. After surviving hell on earth, the Spearhead Squadron is finally reunited with their Handler.",
  },
];

function MissionLog() {
  const [activeAct, setActiveAct] = useState(1);

  // Filter episodes based on the selected Act
  const filteredMissions = missionData.filter(
    (mission) => mission.act === activeAct,
  );

  return (
    <section className="relative w-full min-h-screen pt-24 pb-20 flex flex-col items-center bg-black overflow-hidden">
      {/* ── Terminal Background ── */}
      <FireParticlesBackground />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.8)_2px,transparent_2px)] bg-size-[100%_4px] z-0 pointer-events-none opacity-30" />
      <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black z-0 pointer-events-none" />

      {/* ── Main Layout Constraint ── */}
      <div className="relative z-10 w-full max-w-250 mx-auto px-6 lg:px-12 flex flex-col h-full">
        {/* ── Header & Act Toggles ── */}
        <div className="mb-12 flex flex-col items-center text-center">
          <h1
            className="text-3xl sm:text-5xl font-bold uppercase tracking-tighter text-white mb-6"
            style={{ textShadow: "0 0 15px rgba(0, 132, 255, 0.5)" }}
          >
            Combat Log Archive
          </h1>

          {/* Toggle Buttons */}
          <div className="flex bg-white/5 border border-white/10 p-1 rounded-xl backdrop-blur-md">
            <button
              onClick={() => setActiveAct(1)}
              className={`px-6 py-2 rounded-lg font-mono text-sm uppercase tracking-widest transition-all duration-300 ${
                activeAct === 1
                  ? "bg-blue-600/30 text-white border border-blue-500/50 shadow-[0_0_15px_rgba(0,132,255,0.4)]"
                  : "text-text-secondary hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              Act I: Republic Front
            </button>
            <button
              onClick={() => setActiveAct(2)}
              className={`px-6 py-2 rounded-lg font-mono text-sm uppercase tracking-widest transition-all duration-300 ${
                activeAct === 2
                  ? "bg-red-600/30 text-white border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                  : "text-text-secondary hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              Act II: Federal Campaign
            </button>
          </div>
        </div>

        {/* ── Vertical Timeline ── */}
        <div className="relative w-full before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-3.75 sm:before:left-6.75 before:w-0.5 before:bg-white/10 before:z-0">
          {/* Animated scanning line on the timeline */}
          <div
            className={`absolute top-0 bottom-0 left-3.75 sm:left-6.75 w-0.5 z-0 overflow-hidden ${activeAct === 1 ? "bg-blue-500/20" : "bg-red-500/20"}`}
          >
            <div
              className={`w-full h-32 animate-[scan_4s_ease-in-out_infinite] ${activeAct === 1 ? "bg-blue-500 shadow-[0_0_10px_#3b82f6]" : "bg-red-500 shadow-[0_0_10px_#ef4444]"}`}
            />
          </div>

          <div className="flex flex-col gap-8">
            {filteredMissions.map((mission) => {
              const isRepublic = activeAct === 1;
              const glowColor = isRepublic
                ? "rgba(0, 132, 255, 0.5)"
                : "rgba(239, 68, 68, 0.5)";
              const dotColor = isRepublic
                ? "bg-blue-500 border-blue-400"
                : "bg-red-500 border-red-400";
              const hoverBorder = isRepublic
                ? "hover:border-blue-500/50"
                : "hover:border-red-500/50";

              return (
                <div
                  key={mission.id}
                  className="relative flex items-start group z-10"
                >
                  {/* Timeline Dot */}
                  <div className="shrink-0 w-8 h-8 sm:w-14 sm:h-14 flex items-center justify-center bg-black relative z-10">
                    <div
                      className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 ${dotColor} group-hover:scale-150 transition-transform duration-500`}
                      style={{ boxShadow: `0 0 10px ${glowColor}` }}
                    />
                  </div>

                  {/* Mission Card */}
                  <div
                    className={`ml-4 sm:ml-8 flex-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-8 transition-all duration-300 ${hoverBorder} hover:bg-white/4`}
                  >
                    {/* Card Header */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-4 border-b border-white/10 pb-4">
                      <div>
                        <div className="text-xs font-mono tracking-widest text-text-secondary uppercase mb-1">
                          Record // Ep.{mission.ep}
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wide text-white group-hover:translate-x-2 transition-transform duration-300">
                          {mission.title}
                        </h2>
                      </div>
                      <div className="mt-3 sm:mt-0 text-right">
                        <div
                          className={`text-[0.65rem] font-mono tracking-widest uppercase border px-2 py-1 rounded-sm inline-block ${isRepublic ? "border-blue-500/30 text-blue-400 bg-blue-500/10" : "border-red-500/30 text-red-400 bg-red-500/10"}`}
                        >
                          {mission.status}
                        </div>
                        <div className="text-xs font-mono tracking-wider text-text-secondary uppercase mt-1">
                          {mission.operationDate}
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <p className="text-[0.95rem] font-light leading-relaxed text-text-secondary text-justify">
                      {mission.desc}
                    </p>

                    {/* Decorative Bottom Element */}
                    <div className="mt-6 flex items-center gap-2 text-[0.65rem] font-mono tracking-widest text-text-secondary opacity-50 uppercase">
                      <div
                        className={`w-1 h-1 rounded-full ${isRepublic ? "bg-blue-500" : "bg-red-500"} animate-pulse`}
                      />
                      Playback End
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Required CSS for the timeline scanning line */}
      <style>{`
        @keyframes scan {
          0%, 100% { transform: translateY(0); opacity: 0; }
          10%, 90% { opacity: 1; }
          50% { transform: translateY(100vh); }
        }
      `}</style>
    </section>
  );
}

export default MissionLog;
