import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import './index.css'
const root = createRoot(document.getElementById('app'))

root.render(
  <React.StrictMode>
      <App />
0  </React.StrictMode>
);
