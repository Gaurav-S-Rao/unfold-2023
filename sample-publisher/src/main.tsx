import React from "react";
import ReactDOM from "react-dom/client";
import { SuireachProvider } from "reach-sdk";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SuireachProvider>
      <App />
    </SuireachProvider>
  </React.StrictMode>
);
