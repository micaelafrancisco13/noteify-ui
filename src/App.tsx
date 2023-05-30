import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme.ts";
import NavBar from "./NavBar/NavBar.tsx";
import { useRef, useState } from "react";
import Main from "./Main/Main.tsx";

function App() {
  const [drawerToggle, setDrawerToggle] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar
        drawerToggle={drawerToggle}
        onDrawerToggle={(toggle) => setDrawerToggle(toggle)}
        drawerRef={drawerRef}
      />
      <Main drawerToggle={drawerToggle} drawerRef={drawerRef} />
    </ThemeProvider>
  );
}

export default App;
