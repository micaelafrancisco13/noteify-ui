import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      // main: "#FFA69E",
      main: "#93BEDF",
      // main: "#EBCFB2",
    },
    secondary: {
      main: "#202020",
      light: "#252525",
      dark: "#181818",
      contrastText: "#fff",
    },
    accent_pale_green: {
      main: "#5A967E",
      light: "#7BAB97",
      dark: "#3E6958",
      contrastText: "#fff",
    },
    accent_green: {
      main: "#1C8C3A",
      light: "#49A361",
      dark: "#136228",
      contrastText: "#fff",
    },
    accent_purple: {
      main: "#a970ff",
      light: "#BA8CFF",
      dark: "#764EB2",
      contrastText: "#fff",
    },
    accent_brown: {
      main: "#82541A",
      light: "#9B7647",
      dark: "#5B3A12",
      contrastText: "#fff",
    },
  },
  components: {
    MuiFormHelperText: {
      styleOverrides: { root: { fontSize: "12.5px" } },
    },
    MuiCardHeader: {
      styleOverrides: {
        subheader: { fontSize: "12.5px" },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: (props) => ({
          backgroundColor: props.theme.palette.secondary.main, // Access theme.palette to get the desired color
        }),
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: (props) => ({
          padding: "8px 24px",
          backgroundColor: props.theme.palette.secondary.main, // Access theme.palette to get the desired color
        }),
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: (props) => ({
          backgroundColor: props.theme.palette.secondary.dark,
          border: 0,
          width: "100%",
          [theme.breakpoints.up("sm")]: {
            maxWidth: theme.spacing(270 / 8),
          },
          [theme.breakpoints.up("md")]: {
            maxWidth: theme.spacing(305 / 8),
          },
        }),
      },
    },
  },
});

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    accent_pale_green: PaletteColor;
    accent_green: PaletteColor;
    accent_purple: PaletteColor;
    accent_brown: PaletteColor;
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    accent_pale_green?: PaletteColorOptions;
    accent_green?: PaletteColorOptions;
    accent_purple?: PaletteColorOptions;
    accent_brown?: PaletteColorOptions;
  }
}

// @babel-ignore-comment-in-output Update the Button's color prop options
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    accent_pale_green: true;
    accent_green: true;
    accent_purple: true;
    accent_brown: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsColorOverrides {
    accent_pale_green: true;
    accent_green: true;
    accent_purple: true;
    accent_brown: true;
  }
}

export default theme;
