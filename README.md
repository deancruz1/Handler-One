# Handler One - 86 Eighty-Six Fansite

A personal fansite for the anime and light novel series *86 Eighty-Six*, built as the console a Handler would sit at: the Spearhead Squadron on a live sector map, their machines in 3D, and the powers of the continent on a globe. This is an unofficial fan project.

Live site: [https://deancruz1.github.io/Handler-One/](https://deancruz1.github.io/Handler-One/)

## Pages

| Route | Page | What it shows |
| --- | --- | --- |
| `/` | Overview | A wireframe map of Sector 86 with each Processor's Juggernaut, a marker where each signal was lost, and the Legion to the east. Selecting a Processor opens their file and shows their machine. |
| `/intel` | Intel | The situation report and the two story arcs. |
| `/characters` | Squadron | Every Processor at full size, beside the sync roster. |
| `/arsenal` | Arsenal | The Juggernaut, Reginleif, Löwe and Ameise as 3D models you can walk around, with a side-on lineup at one scale. |
| `/factions` | Factions | A globe of the known world, coloured by who holds the ground. |
| `/missions` | Mission log | The episodes on file, grouped by arc. |

## Features

- **3D models built in code.** The four machines are assembled from three.js geometry in `src/three/`, with no model files to download. Each has a rigged walk cycle and can be shown as a hologram or painted.
- **Console layout.** One navigation rail and a shared stage, side panel and strip layout across every page, collapsing to a single column on phones.
- **Keyboard control.** Arrow keys step through Processors, machines, powers and episodes. In the Arsenal, `W` toggles the walk cycle and `P` shows the pilot.
- **Deep links on GitHub Pages.** A custom `404.html` and a redirect in `main.jsx` let any route be opened or refreshed directly on static hosting.
- **Reduced motion.** Auto-rotation and looping animations stop when the visitor's system asks for less motion.

The geography on the Factions globe is a schematic guess. No official map of the continent has been published, and everything beyond the continent is invented.

## Technologies

- **React 19** and **React Router 7**
- **three.js** for the sector map, the machines and the globe
- **Vite** for development and builds
- **Tailwind CSS 4**, used for its base reset; the console itself is styled with plain CSS
- **GitHub Pages** for hosting, published with `gh-pages`

## Folder Structure

```
├── public/                 # favicon, social preview image and the 404.html redirect
├── src/
│   ├── assets/             # character portraits, feeds and personal marks
│   ├── components/         # Rail (navigation), Roster, Segmented control
│   ├── data/               # characters, roster, mechs, factions, missions
│   ├── pages/              # one component and stylesheet per route
│   ├── styles/             # console.css (shared layout), doc.css (text pages)
│   ├── three/              # the 3D scenes and the machine models
│   ├── App.jsx             # shell and routes
│   ├── index.css           # fonts and global base
│   └── main.jsx
├── eslint.config.js
├── package.json
└── vite.config.js
```

## How the 3D is organised

- `src/three/kit.js` is a small modelling kit: lofted hulls, limbs, a two-bone leg rig, and helpers that turn a model into a hologram or bake it down to two draw calls.
- `juggernaut.js`, `reginleif.js`, `lowe.js` and `ameise.js` each build one machine with that kit.
- `sectorScene.js`, `arsenalScene.js` and `globeScene.js` each mount one scene into a page and return a small handle (`select`, `update`, `dispose`). The React pages own the state and the panels; the scene modules own the canvas.
- The three 3D pages are loaded on demand, so three.js is not downloaded for the text pages.

## Editing the content

Everything shown on the site comes from `src/data/`:

- `characters.js` - Processor files, portraits, feeds and personal marks
- `mechs.js` - the machines in the Arsenal
- `factions.js` - the powers and where each sits on the globe
- `missions.js` - the episodes on file

## Running locally

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build into dist/
npm run lint
npm run deploy    # build, then publish dist/ to GitHub Pages
```

## Contact Information

If you'd like to get in touch with me, here are the best ways to reach me:

- **Email:** [deancruzgg@gmail.com](mailto:deancruzgg@gmail.com)
- **GitHub:** [https://github.com/deancruz1](https://github.com/deancruz1)
- **LinkedIn:** [https://www.linkedin.com/in/dean-cruz/](https://www.linkedin.com/in/dean-cruz/)
- **Location:** Singapore, SG

Feel free to send me a message for collaborations, opportunities, or general questions about my work. I'm always open to new opportunities and feedback!
