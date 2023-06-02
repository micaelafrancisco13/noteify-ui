import Masonry from "@mui/lab/Masonry";
import NoteCard from "../NoteCard/NoteCard.tsx";
import { getNotes } from "../../services/notes.ts";
import { Typography } from "@mui/material";

interface Props {
  drawerToggle: boolean;
}

function Notes({ drawerToggle }: Props) {
  const notes = getNotes();

  console.log(notes);

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
          <NoteCard key={n._id} note={n} />
        ))}
      </Masonry>
    </>
  );
}

export default Notes;
