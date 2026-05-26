import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Plot from "./pages/Plot";
import Characters from "./pages/Characters";
import Arsenal from "./pages/Arsenal";
import Factions from "./pages/Factions";
import MissionLog from "./pages/MissionLog";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plot" element={<Plot />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/arsenal" element={<Arsenal />} />
          <Route path="/factions" element={<Factions />} />
          <Route path="/missions" element={<MissionLog />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
