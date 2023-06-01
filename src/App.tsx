import { useRef, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme.ts";
import NavBar from "./components/NavBar/NavBar.tsx";
import Main from "./components/Main/Main.tsx";
import NotFound from "./components/NotFound.tsx";

function App() {
  const [drawerToggle, setDrawerToggle] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar
          drawerToggle={drawerToggle}
          onDrawerToggle={(toggle) => setDrawerToggle(toggle)}
          drawerRef={drawerRef}
        />
        <Routes>
          <Route
            path="/"
            element={<Main drawerToggle={drawerToggle} drawerRef={drawerRef} />}
          />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to={`/not-found`} replace />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
