import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Rail from "./components/Rail";
import Intel from "./pages/Intel";
import Characters from "./pages/Characters";
import MissionLog from "./pages/MissionLog";

// Pages that draw in 3D load on demand, so three.js stays out of the text pages.
const Overview = lazy(() => import("./pages/Overview"));
const Arsenal = lazy(() => import("./pages/Arsenal"));
const Factions = lazy(() => import("./pages/Factions"));

function App() {
  return (
    <div className="shell">
      <Rail />
      <main className="page">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/intel" element={<Intel />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/arsenal" element={<Arsenal />} />
            <Route path="/factions" element={<Factions />} />
            <Route path="/missions" element={<MissionLog />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
