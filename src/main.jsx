import React from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import App from "./App";
const theme = createTheme({ typography: { fontFamily: "Poppins, Inter, sans-serif" } });
createRoot(document.getElementById("root")).render(<ThemeProvider theme={theme}><CssBaseline/><App/></ThemeProvider>);
