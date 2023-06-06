import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme.ts";
import NavBar from "./components/NavBar/NavBar.tsx";
import Main from "./components/Main/Main.tsx";
import NotFound from "./components/NotFound.tsx";
import NoteForm from "./components/NoteForm/NoteForm.tsx";
import Notes from "./components/Main/Notes.tsx";
import { deleteNote, getNotes, Note } from "./services/notes.ts";
import Account from "./components/Account/Account.tsx";

function App() {
  const [drawerToggle, setDrawerToggle] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    setNotes(getNotes());
  }, []);

  const handleOnDeleteNote = (id: string) => {
    // optimistic update
    setNotes(notes.filter((n) => n._id !== id));
    deleteNote(id);
  };

  console.log("App");

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
              element={<NoteForm drawerToggle={drawerToggle} />}
            />
            <Route
              path="/notes"
              element={
                <Notes
                  drawerToggle={drawerToggle}
                  onDeleteNote={handleOnDeleteNote}
                />
              }
            />
            <Route
              path="/account"
              element={<Account drawerToggle={drawerToggle} />}
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
