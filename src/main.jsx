import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import AppRouter from "./app/routes/AppRouter";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("#root not found");

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
