import React from "react";
import ReactDOM from "react-dom/client";
import { ReachProvider } from "reach-sdk";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReachProvider clientId="65334534a3963583942cff6d">
      <App />
    </ReachProvider>
  </React.StrictMode>
);
