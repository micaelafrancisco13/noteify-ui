import { useRef, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme.ts";
import NavBar from "./components/NavBar/NavBar.tsx";
import Main from "./components/Main/Main.tsx";
import NotFound from "./components/NotFound.tsx";
import NoteForm, { NoteFormData } from "./components/NoteForm/NoteForm.tsx";
import Notes from "./components/Main/Notes.tsx";

function App() {
  const [drawerToggle, setDrawerToggle] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const handleSubmitNote = (data: NoteFormData) => {
    console.log("data", data);
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar
          drawerToggle={drawerToggle}
          onDrawerToggle={(toggle) => setDrawerToggle(toggle)}
          drawerRef={drawerRef}
        />
        <Main drawerToggle={drawerToggle} drawerRef={drawerRef}>
          <Routes>
            <Route
              path="/notes/:id"
              element={<NoteForm onSubmit={handleSubmitNote} />}
            />
            <Route
              path="/notes"
              element={<Notes drawerToggle={drawerToggle} />}
            />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="/" element={<Navigate to={`/notes`} replace />} />
            <Route path="*" element={<Navigate to={`/not-found`} replace />} />
          </Routes>
        </Main>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
