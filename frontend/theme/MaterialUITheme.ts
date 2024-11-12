"use client";
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2d4b8a",
      light: "#55b2f4",
    },
    danger: {
      main: "#FF5050",
    },
    gradient: {
      primary: "linear-gradient(135deg, #d9e8f5, #a3c4f3)",
      reversed: "linear-gradient(270deg, #5DCAE4 0%, #358FCD 100%)",
    },
  },
  shadows: [
    "none",
    "0px 4px 12px rgba(0, 0, 0, 0.1)",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
  ],
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1440,
    },
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: "xl",
      },
    },
  },
});

export default theme;
