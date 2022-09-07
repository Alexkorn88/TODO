import React from "react";
import { createRoot } from "react-dom/client";

import App from "./components/app";
import "./components/app/app.css";

const container = document.getElementById("todoapp");
const root = createRoot(container);
root.render(<App />);
