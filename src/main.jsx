import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// No MUI ThemeProvider / CssBaseline: the dashboard ships its own (original) CSS
// and a baseline reset would change how the existing design renders.
createRoot(document.getElementById("root")).render(<App />);
