import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ProductList from "./Component/ProductList.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProductList />
  </StrictMode>,
);
