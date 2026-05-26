# Handler One - 86 Eighty-Six Fansite

This is a personal fansite dedicated to the anime and light novel series *86 Eighty-Six*, designed with an immersive, tactical terminal interface reminiscent of a Handler's control console. It features deep character dossiers for the Spearhead Squadron, real-time sync states, and dynamic routing to give users a highly cinematic experience.

## Features

- **Immersive Tactical UI:** Designed to mimic a military terminal with CRT scanline layers, warning themes, and specialized alert colors (matching the Spearhead `#ef4444` red).
- **Dynamic Data Caching:** Utilizes TanStack Query for seamless server-state management, ensuring character dossiers and active Para-RAID sync statuses load instantly without redundant fetching.
- **Responsive Design:** Smooth mobile fallbacks built to transition from desktop terminal layouts to handheld tactical screens.
- **SPA GitHub Pages Routing:** Custom `404.html` and URL interception scripts implemented to allow flawless deep-linking and refreshing on standard static hosting.

## Technologies Used

- **React:** For building the frontend terminal interface.
- **React Router:** For navigation between operational screens.
- **TanStack Query:** For data fetching, caching, and state synchronization.
- **Vite:** For rapid development and optimized build tooling.
- **GitHub Pages:** For deploying the web application.

## Project Structure

**main.jsx**
```javascript
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.jsx";

// Initialize the caching client for character data
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/Handler-One">
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
```

## Folder Structure

```
├── public/                 # SEO images (og-image.webp), favicon, 404.html redirect script
├── src/                    
│   ├── assets/             # Media assets (character portraits, unit emblems, UI overlays)
│   ├── components/         # Fire particles effect, Nabar
│   ├── pages/              # Main route components
│   ├── App.jsx             
│   ├── index.css           # Global tactical theme styling
│   └── main.jsx            
├── eslint.config.js        
├── package.json            
└── vite.config.js          
```

## Key Components

- **FireParticlesBackground:** Animated particles that represent fire sparks used throughout website to give "battlefield" feeling
- **Navbar:** Responsive navbar with breakpoints in desktop, tablet, and mobile.

## Context & Hooks

- **useQuery:** TanStack Query hooks to manage data fetching and caching for the roster.
- **useSystemAlert:** Custom hook to trigger UI color shifts (e.g., changing from standard blue to alert red).
- **useIsMobile:** Custom hook for responsive breakpoint detection.

## Data Files

- `processor-data.js` - Character dossiers and operational history
- `tactical-assets.js` - Mapping for unit insignias and mecha models

## Routing

The application utilizes the following routes:

- `/` - Main Handler Terminal / Dashboard
- `/characters` - Full Spearhead Squadron Roster
- `/characters/:id` - Detailed personnel file for a specific processor
- `*` - Classified/Not Found page

## Deployment

This website is hosted on GitHub Pages and utilizes a custom SPA workaround for routing. You can view the live operational version at:

[https://deancruz1.github.io/Handler-One/](https://deancruz1.github.io/Handler-One/)

## Usage

This terminal application is divided into the following primary sectors:

- **Dashboard (Home):** The primary tactical overview, introducing the operational zone, active alerts, and a briefing on the Spearhead Squadron.
- **Spearhead Roster:** A complete view of the active 86 personnel, filterable by operational status and callsign.
- **Processor Dossiers:** Individual pages for each character, featuring detailed tactical data, personal history, and specialized equipment loadouts.

To navigate the system, use the provided terminal command links in the navigation bar. The application fully supports direct URL navigation (e.g., linking directly to a specific character's page) thanks to the integrated SPA redirect script.

## Contact Information

If you'd like to get in touch with me, here are the best ways to reach me:

- **Email:** [deancruzgg@gmail.com](mailto:deancruzgg@gmail.com)
- **GitHub:** [https://github.com/deancruz1](https://github.com/deancruz1)
- **LinkedIn:** [https://www.linkedin.com/in/dean-cruz/](https://www.linkedin.com/in/dean-cruz/)
- **Location:** Singapore, SG

Feel free to send me a message for collaborations, opportunities, or general questions about my work. I'm always open to new opportunities and feedback!
