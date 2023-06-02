import Masonry from "@mui/lab/Masonry";
import notes from "../../services/notes.ts";
import NoteCard from "../NoteCard/NoteCard.tsx";

interface Props {
  drawerToggle: boolean;
}

function Notes({ drawerToggle }: Props) {
  return (
    <Masonry
      columns={{
        xs: 1,
        sm: drawerToggle ? 1 : 2,
        md: drawerToggle ? 2 : 3,
        lg: drawerToggle ? 3 : 4,
        xl: 4,
      }}
      spacing={2}
      sx={{ width: "auto" }}
    >
      {notes.map((n) => (
        <NoteCard note={n} />
      ))}
    </Masonry>
  );
}

export default Notes;
