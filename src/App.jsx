import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Rail from "./components/Rail";
import Home from "./pages/Home";
import Intel from "./pages/Intel";
import Characters from "./pages/Characters";
import Factions from "./pages/Factions";
import MissionLog from "./pages/MissionLog";

// Pages that draw in 3D load on demand, so three.js stays out of the first paint.
const Arsenal = lazy(() => import("./pages/Arsenal"));

const legacy = (page) => <div className="legacy">{page}</div>;

function App() {
  return (
    <div className="shell">
      <Rail />
      <main className="page">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={legacy(<Home />)} />
            <Route path="/intel" element={legacy(<Intel />)} />
            <Route path="/characters" element={legacy(<Characters />)} />
            <Route path="/arsenal" element={<Arsenal />} />
            <Route path="/factions" element={legacy(<Factions />)} />
            <Route path="/missions" element={legacy(<MissionLog />)} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
