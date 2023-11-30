// MUI Imports
import { createTheme } from "@mui/material";

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 989,
      lg: 1200,
      xl: 1536,
    },
  },
  spacing(abs: number) {
    return `${abs * 0.25}rem`;
  },
  palette: {
    secondary: {
      dark: "rgba(58, 53, 65, 0.6)",
      light: "rgba(58, 53, 65, 0.6)",
      main: "rgba(58, 53, 65, 0.6)",
    },
    text: {
      secondary: `rgba(58, 53, 65, 0.6)`,
    },
  },
  // shape: {
  //   borderRadius: 8,
  // },
});
