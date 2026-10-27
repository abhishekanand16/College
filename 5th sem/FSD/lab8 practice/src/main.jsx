import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Diaplay from "./Component/Diaplay.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Diaplay />
  </StrictMode>,
);
