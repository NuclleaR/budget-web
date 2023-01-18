///<reference path="./index.d.ts">

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resources from "virtual:i18next-loader";

i18n.use(LanguageDetector).init({
  resources: {
    en: {
      translation: resources.en,
    },
    uk: {
      translation: resources.uk,
    },
  },
  fallbackLng: "uk",
  debug: true,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
