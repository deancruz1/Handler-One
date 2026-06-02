import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

const params = new URLSearchParams(window.location.search);
const redirect = params.get("p");
if (redirect) {
  window.history.replaceState(null, "", redirect);
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/Handler-One/">
      <App />
    </BrowserRouter>
  </StrictMode>,
);
