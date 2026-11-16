// Powers on file. `color` and `map` place each one on the Factions globe: `map` is a centre in degrees and a
// radius in degrees of arc. No official map of the continent exists, so the positions are a schematic guess:
// the Republic in the west, the Federacy east of it, Roa Gracia in the north, the Legion holding the rest.
export const factions = [
  {
    id: "republic",
    color: 0xd9e2ec,
    map: { lon: -25, lat: 31, r: 8.5, unstable: true },
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
  },
  {
    id: "federacy",
    color: 0x4da3ff,
    map: { lon: 13, lat: 33, r: 12.5 },
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
  },
  {
    id: "legion",
    color: 0xf5a524,
    map: { lon: -5, lat: 22, r: 0 },
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
  },
  {
    id: "roagracia",
    color: 0x7fd4c8,
    map: { lon: -4, lat: 55, r: 7.5 },
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
  },
];

// Named in the briefings but not profiled: drawn on the globe, greyed out.
export const unlisted = [
  {
    id: "wald",
    name: "Alliance of Wald",
    color: 0x6b7a8c,
    map: { lon: 6, lat: 9, r: 6.5 },
  },
];

export default factions;
