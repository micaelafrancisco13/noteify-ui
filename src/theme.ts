import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#de4c4a",
    },
    secondary: {
      main: "#202020",
      light: "#252525",
      dark: "#151515",
      contrastText: "#fff",
    },
  },
  components: {
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
          padding: "8px 16px",
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

export default theme;
