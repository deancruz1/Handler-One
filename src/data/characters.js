// ── ACTIVE PERSONNEL: SPEARHEAD SQUADRON ──
import lenaBg from "../assets/characters-page/bg/lena.mp4";
import shinBg from "../assets/characters-page/bg/shin.mp4";
import raidenBg from "../assets/characters-page/bg/raiden.mp4";
import theoBg from "../assets/characters-page/bg/theo.mp4";
import kurenaBg from "../assets/characters-page/bg/kurena.mp4";
import anjuBg from "../assets/characters-page/bg/anju.mp4";

import lenaCrest from "../assets/characters-page/crest/lena.webp";
import shinCrest from "../assets/characters-page/crest/shin.webp";
import raidenCrest from "../assets/characters-page/crest/raiden.webp";
import theoCrest from "../assets/characters-page/crest/theo.webp";
import kurenaCrest from "../assets/characters-page/crest/kurena.webp";
import anjuCrest from "../assets/characters-page/crest/anju.webp";

import lenaImg from "../assets/characters-page/carousel/lena.webp";
import shinImg from "../assets/characters-page/carousel/shin.webp";
import raidenImg from "../assets/characters-page/carousel/raiden.webp";
import theoImg from "../assets/characters-page/carousel/theo.webp";
import kurenaImg from "../assets/characters-page/carousel/kurena.webp";
import anjuImg from "../assets/characters-page/carousel/anju.webp";

// ── FALLEN PERSONNEL (KIA): IMAGES ONLY ──
import chiseImg from "../assets/characters-page/carousel/chise.webp";
import daiyaImg from "../assets/characters-page/carousel/daiya.webp";
import harizImg from "../assets/characters-page/carousel/hariz.webp";
import harutoImg from "../assets/characters-page/carousel/haruto.webp";
import ioImg from "../assets/characters-page/carousel/io.webp";
import kaieImg from "../assets/characters-page/carousel/kaie.webp";
import kariyaImg from "../assets/characters-page/carousel/kariya.webp";
import kujoImg from "../assets/characters-page/carousel/kujo.webp";
import kurotoImg from "../assets/characters-page/carousel/kuroto.webp";
import leccaImg from "../assets/characters-page/carousel/lecca.webp";
import louieImg from "../assets/characters-page/carousel/louie.webp";
import matthewImg from "../assets/characters-page/carousel/matthew.webp";
import mikuriImg from "../assets/characters-page/carousel/mikuri.webp";
import minaImg from "../assets/characters-page/carousel/mina.webp";
import mynaImg from "../assets/characters-page/carousel/myna.webp";
import ochiImg from "../assets/characters-page/carousel/ochi.webp";
import shuriImg from "../assets/characters-page/carousel/shuri.webp";
import tohzanImg from "../assets/characters-page/carousel/tohzan.webp";
import toumaImg from "../assets/characters-page/carousel/touma.webp";

const characters = [
  // ── ACTIVE ROSTER ──
  {
    id: "lena",
    name: "Maj. Vladilena Milizé",
    codename: "Handler One",
    serial: "SM-9421-A",
    role: "Tactical Operations Commander",
    status: "ACTIVE - COMMAND",
    video: lenaBg,
    crest: lenaCrest,
    image: lenaImg,
    description:
      "[CLEARANCE: ALBA-ONLY] Elite Republican commanding officer. Achieved the rank of Major at age 16. Currently assigned to the Eastern Front, overseeing the Spearhead Squadron. Notable for unprecedented Para-RAID synchronization rates and a highly unorthodox, sympathetic command structure toward assigned Processors.",
  },
  {
    id: "shin",
    name: "Cpt. Shinei Nouzen",
    codename: "Undertaker",
    serial: "86-V-011",
    role: "Vanguard / Melee Specialist",
    status: "ACTIVE - DEPLOYED",
    video: shinBg,
    crest: shinCrest,
    image: shinImg,
    description:
      "Field commander of Spearhead Squadron. Five-year frontline survival rate defies standard statistical models. Specializes in high-mobility, close-quarters Juggernaut combat. Psychological profile flags extreme combat desensitization. Known among localized Legion units and fellow Processors as 'The Reaper'.",
  },
  {
    id: "raiden",
    name: "LT. Raiden Shuga",
    codename: "Wehrwolf",
    serial: "86-V-015",
    role: "Tactical Support / Vice-Commander",
    status: "ACTIVE - DEPLOYED",
    video: raidenBg,
    crest: raidenCrest,
    image: raidenImg,
    description:
      "Spearhead Squadron secondary command. Serves as the tactical anchor, mitigating the aggressive vanguard maneuvers of Undertaker. Demonstrates high-tier operational awareness and electronic warfare capability. Four-year combat veteran and primary stabilizing element within the squadron's interpersonal dynamics.",
  },
  {
    id: "theo",
    name: "ENS Theoto Rikka",
    codename: "Laughing Fox",
    serial: "86-V-022",
    role: "High-Mobility Specialist",
    status: "ACTIVE - DEPLOYED",
    video: theoBg,
    crest: theoCrest,
    image: theoImg,
    description:
      "Processor excelling in erratic, three-dimensional evasive maneuvers that frequently exceed standard Juggernaut structural parameters. Psychological profile notes deep-seated hostility toward San Magnolia command, masked by a brutally pragmatic battlefield demeanor. Personal insignia inherited from a fallen Alba commanding officer.",
  },
  {
    id: "kurena",
    name: "ENS Kurena Kukumila",
    codename: "Gunslinger",
    serial: "86-V-028",
    role: "Long-Range Marksman",
    status: "ACTIVE - DEPLOYED",
    video: kurenaBg,
    crest: kurenaCrest,
    image: kurenaImg,
    description:
      "Designated marksman of Spearhead Squadron. Four-year combat veteran. Target acquisition and accuracy ratings consistently hold above the 98th percentile, even under heavy localized jamming. Demonstrates fierce loyalty to the squadron commander and extreme lethality in overwatch positions.",
  },
  {
    id: "anju",
    name: "Sgt. Anju Emma",
    codename: "Snow Witch",
    serial: "86-V-034",
    role: "Area Denial / Heavy Artillery",
    status: "ACTIVE - DEPLOYED",
    video: anjuBg,
    crest: anjuCrest,
    image: anjuImg,
    description:
      "Suppressive fire and area-denial specialist. Operates modified heavy-ordnance loadouts to control battlefield choke points and scatter Legion formations. Behavioral reports highlight a modest, stabilizing presence at base camp that completely inverts into calculated, overwhelming ruthlessness during live-fire engagements.",
  },

  // ── KIA / FALLEN PERSONNEL ──
  {
    id: "kaie",
    name: "ENS Kaie Taniya",
    codename: "Kirschblüte",
    serial: "86-V-059",
    role: "Vanguard / Skirmisher",
    status: "KIA - SIGNAL LOST",
    video: null,
    crest: null,
    image: kaieImg,
    description:
      "Former Vanguard of Spearhead Squadron. Operated with a calm, analytical pragmatism that anchored younger Processors. Excelled in complex terrain maneuvering. Para-RAID logs indicate sudden catastrophic frame failure during a routine patrol in Sector 15 due to marshland entrapment. Juggernaut abandoned; remains unrecovered.",
  },
  {
    id: "daiya",
    name: "ENS Daiya Irma",
    codename: "Black Dog",
    serial: "86-V-047",
    role: "Logistics / Heavy Support",
    status: "KIA - EUTHANIZED",
    video: null,
    crest: null,
    image: daiyaImg,
    description:
      "Heavy fire support Processor. Displayed high emotional intelligence, frequently defusing tension among squadmates. Unit suffered a critical mobility kill during an artillery barrage. Para-RAID telemetry confirms final act was maneuvering to shield allied units. Euthanized on the battlefield per Spearhead Vanguard protocol.",
  },
  {
    id: "haruto",
    name: "Sgt. Haruto Keats",
    codename: "Falke",
    serial: "86-V-042",
    role: "Flanking Specialist",
    status: "KIA - OVERWHELMED",
    video: null,
    crest: null,
    image: harutoImg,
    description:
      "High-spirited combatant known for maintaining morale under highly localized stress conditions. Specialized in high-speed flanking maneuvers to break Legion formations. Mission logs confirm fatal engagement with heavy artillery-type Legion. Audio data from final Para-RAID transmission sealed by commanding officer.",
  },
  {
    id: "kujo",
    name: "Sgt. Kujo Nico",
    codename: "Sirius",
    serial: "86-V-061",
    role: "Standard Combatant",
    status: "KIA - EUTHANIZED",
    video: null,
    crest: null,
    image: kujoImg,
    description:
      "Standard frontline Processor. Combat record indicates reliable, by-the-book performance in standard formations. Suffered catastrophic frame damage and severe lower-body trauma during a night raid engagement. Telemetry terminated by Spearhead Commander Undertaker to prevent Legion neural assimilation.",
  },
  {
    id: "lecca",
    name: "Sgt. Lecca Lin",
    codename: "Burnt Tayl",
    serial: "86-V-068",
    role: "Vanguard Element",
    status: "KIA - ASSIMILATION DENIED",
    video: null,
    crest: null,
    image: leccaImg,
    description:
      "Vanguard element. Combat data shows a preference for high-risk, close-quarters engagement distances. Unit was overwhelmed and surrounded by Ameise units in Sector 09. Rather than face capture, Processor manually triggered her Juggernaut's self-destruct mechanism to deny the Legion intact neural matter. No remains recovered.",
  },
  {
    id: "matthew",
    name: "Sgt. Matthew Nanaki",
    codename: "Walpurgis",
    serial: "86-V-091",
    role: "Overwatch Marksman",
    status: "KIA - COUNTER-SNIPED",
    video: null,
    crest: null,
    image: matthewImg,
    description:
      "Secondary marksman working in tandem with Gunslinger. Position compromised after three confirmed Löwe kills. Targeted and eliminated by a high-velocity laser trajectory from a Legion sniper model before relocation could be completed.",
  },
  {
    id: "mina",
    name: "Sgt. Mina Valkyrie",
    codename: "Aegis",
    serial: "86-V-097",
    role: "Electronic Warfare",
    status: "KIA - NEURAL SHOCK",
    video: null,
    crest: null,
    image: minaImg,
    description:
      "Tasked with intercepting Legion tactical data pulses. Equipment modification bypassed standard Republic safety limiters. Suffered fatal neural feedback loop through the Para-RAID when a massive Legion command signal saturated the area.",
  },
  {
    id: "chise",
    name: "Pvt. Chise Authen",
    codename: "Griffin",
    serial: "86-V-071",
    role: "Suppressive Fire",
    status: "KIA - FRAME FAILURE",
    video: null,
    crest: null,
    image: chiseImg,
    description:
      "Assigned to Spearhead defensive lines. Maintained suppressing fire during a massive Legion offensive. Frame suffered critical overheating and subsequent explosive failure of the rotary autocannon. Signal lost immediately following the malfunction.",
  },
  {
    id: "hariz",
    name: "Pvt. Hariz Senyo",
    codename: "Cato'Nine",
    serial: "86-V-074",
    role: "Assault / Breacher",
    status: "KIA - SIGNAL LOST",
    video: null,
    crest: null,
    image: harizImg,
    description:
      "Assault specialist operating at the spear's tip during Vanguard charges. Engaged multiple Grauwolf units in close combat. Para-RAID telemetry recorded massive blunt force trauma to the cockpit before connection was severed.",
  },
  {
    id: "io",
    name: "Pvt. Io Dodanthe",
    codename: "Argos",
    serial: "86-V-079",
    role: "Ammunition Logistics",
    status: "KIA - DIRECT HIT",
    video: null,
    crest: null,
    image: ioImg,
    description:
      "Responsible for mid-combat ammunition ferrying. Unit was tracked by Legion long-range sensors while attempting to resupply Vanguard elements. Vaporized by a direct hit from a Skorpion-class artillery shell. No recoverable frame components.",
  },
  {
    id: "kariya",
    name: "Pvt. Kariya Rohga",
    codename: "La Bete",
    serial: "86-V-082",
    role: "Forward Scout",
    status: "KIA - AMBUSHED",
    video: null,
    crest: null,
    image: kariyaImg,
    description:
      "Forward recon Processor. Tasked with mapping localized Legion jamming fields. Unit fell into an active camouflage trap set by self-propelled mines. Cockpit breached instantly; biological signs flatlined within four seconds of initial contact.",
  },
  {
    id: "kuroto",
    name: "Pvt. Kuroto Hinie",
    codename: "Manticore",
    serial: "86-V-085",
    role: "Trench Defense",
    status: "KIA - SWARMED",
    video: null,
    crest: null,
    image: kurotoImg,
    description:
      "Stationed at the outer perimeter of Base 3. Defended a critical choke point during a nighttime raid. Juggernaut's legs were severed by Ameise sensor-whips, rendering the unit immobile. Swarmed by lightweight Legion models shortly after.",
  },
  {
    id: "louie",
    name: "Pvt. Louie Kino",
    codename: "Fafnir",
    serial: "86-V-088",
    role: "Rear Guard",
    status: "KIA - ARTILLERY BARRAGE",
    video: null,
    crest: null,
    image: louieImg,
    description:
      "Assigned to protect the squadron's rear flank during a tactical retreat. Unit was caught in a coordinated orbital bombardment calculation by Legion artillery. Sustained massive shrapnel damage leading to immediate operator expiration.",
  },
  {
    id: "mikuri",
    name: "Pvt. Mikuri Cairo",
    codename: "Leuokosia",
    serial: "86-V-094",
    role: "Skirmisher",
    status: "KIA - CRITICAL DAMAGE",
    video: null,
    crest: null,
    image: mikuriImg,
    description:
      "Utilized high-mobility tactics in urban ruins. Juggernaut frame structural integrity was compromised by successive glancing blows. Frame collapsed upon itself during a high-speed evasive maneuver, crushing the cockpit.",
  },
  {
    id: "myna",
    name: "Pvt. Myna Shiroka",
    codename: "Artemis",
    serial: "86-V-102",
    role: "Reconnaissance",
    status: "KIA - OVERWHELMED",
    video: null,
    crest: null,
    image: mynaImg,
    description:
      "Lightweight reconnaissance unit. Separated from the main squadron during a localized jamming event. Cornered in a blind canyon by a patrol of Grauwolf units. Audio logs indicate defensive fighting lasted for exactly eleven minutes before silence.",
  },
  {
    id: "ochi",
    name: "Pvt. Ochi Anton",
    codename: "Gladiator",
    serial: "86-V-105",
    role: "Heavy Armor Support",
    status: "KIA - EUTHANIZED",
    video: null,
    crest: null,
    image: ochiImg,
    description:
      "Operated a heavily modified Juggernaut with additional salvaged plating. Survived a direct hit from a Löwe but was pinned underneath the wreckage of his own machine. Mercy-killed by Vanguard elements to prevent capture.",
  },
  {
    id: "shuri",
    name: "Pvt. Shuri Gilith",
    codename: "Dendroaspis",
    serial: "86-V-109",
    role: "Close-Quarters Combat",
    status: "KIA - FRAME PIERCED",
    video: null,
    crest: null,
    image: shuriImg,
    description:
      "Specialized in closing the distance with heavy Legion models. Executed a flawless approach on a Löwe unit but was intercepted by an unseen Grauwolf. High-frequency blade pierced the Juggernaut cockpit directly from the flank.",
  },
  {
    id: "tohzan",
    name: "Pvt. Tohzan Sasha",
    codename: "Gunmetalstorm",
    serial: "86-V-112",
    role: "Vanguard Shield",
    status: "KIA - STRUCTURAL COLLAPSE",
    video: null,
    crest: null,
    image: tohzanImg,
    description:
      "Acted as a physical barrier for lighter units retreating from a hot zone. Absorbed excessive enemy fire, leading to total structural failure of the Juggernaut's central chassis. Remained at his post until the reactor detonated.",
  },
  {
    id: "touma",
    name: "Pvt. Touma Sauvy",
    codename: "Helianthus",
    serial: "86-V-117",
    role: "Flank Guard",
    status: "KIA - SIGNAL LOST",
    video: null,
    crest: null,
    image: toumaImg,
    description:
      "Stationed on the vulnerable eastern flank during Operation [REDACTED]. Warned the squadron of an incoming heavy Ameise detachment. Signal cut off mid-transmission. Wreckage later found completely stripped of its central processing unit.",
  },
];

export default characters;
