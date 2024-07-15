import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { DutiesProvider } from "./context/DutiesContext.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DutiesProvider>
      <App />
    </DutiesProvider>
  </React.StrictMode>
);
