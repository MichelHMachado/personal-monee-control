import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    gradient: {
      primary: string;
      reversed: string;
    };
    danger: {
      main: string;
      light: string;
    };
  }

  interface PaletteOptions {
    gradient?: {
      primary?: string;
      reversed?: string;
    };
    danger?: {
      main?: string;
      light: string;
    };
  }

  interface Theme {
    status: {
      danger: string;
    };
  }

  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
