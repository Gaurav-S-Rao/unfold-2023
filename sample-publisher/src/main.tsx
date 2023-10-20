import React from "react";
import ReactDOM from "react-dom/client";
import { ReachProvider } from "reach-sdk";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReachProvider clientId="alskfjsalfkd" >
      <App />
    </ReachProvider>
  </React.StrictMode>
);
