// MUI Imports
import { ThemeProvider as MuiThemeProvider } from "@mui/material";

// Theme Imports
import { theme } from "./theme";

// React Imports
import React from "react";

export function ThemeProvider(props: React.PropsWithChildren) {
  return <MuiThemeProvider theme={theme} {...props} />;
}
