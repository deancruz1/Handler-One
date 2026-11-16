// Machines on file. `model` names the builder in src/three/models.js. `crew` is set only for piloted machines.
// Sizes are the published figures for the Feldreß; the Legion types have none, so theirs are estimates.
const mechs = [
  {
    id: "m1a4",
    model: "juggernaut",
    crew: "Officially none. One Processor.",
    size: { length: 5.4, height: 2.1 },
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
    model: "reginleif",
    crew: "One Processor",
    size: { length: 6.3, height: 2.7 },
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
    model: "ameise",
    hostile: true,
    size: { length: 4.7, height: 2.9, estimated: true },
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
    model: "lowe",
    hostile: true,
    size: { length: 8.6, height: 3.3, estimated: true },
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

export default mechs;
