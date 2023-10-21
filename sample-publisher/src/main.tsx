import React from "react";
import ReactDOM from "react-dom/client";
import { ReachProvider } from "reach-sdk";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReachProvider clientId="65330175120c40ce59c169b0">
      <App />
    </ReachProvider>
  </React.StrictMode>
);
