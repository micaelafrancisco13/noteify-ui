import Masonry from "@mui/lab/Masonry";
import NoteCard from "../NoteCard/NoteCard.tsx";
import { Typography } from "@mui/material";
import { getNotes } from "../../services/notes.ts";

interface Props {
  drawerToggle: boolean;
  onDeleteNote: (id: string) => void;
}

function Notes({ drawerToggle, onDeleteNote }: Props) {
  const notes = getNotes();

  return (
    <>
      <Typography>{`${notes.length} notes`}</Typography>
      <Masonry
        columns={{
          xs: 1,
          sm: drawerToggle ? 1 : 2,
          md: drawerToggle ? 2 : 3,
          lg: drawerToggle ? 3 : 4,
          xl: 4,
        }}
        spacing={2}
        sx={{ width: "auto", mt: 2 }}
      >
        {notes.map((n) => (
          <NoteCard key={n._id} note={n} onDeleteNote={onDeleteNote} />
        ))}
      </Masonry>
    </>
  );
}

export default Notes;
