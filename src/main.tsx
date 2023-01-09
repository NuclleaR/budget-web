import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { initializeParse } from "./utils/parse";

initializeParse(import.meta.env.VITE_PARSE_SERVER, import.meta.env.VITE_APP_ID);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
