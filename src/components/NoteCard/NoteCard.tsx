import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link } from "react-router-dom";
import { Note } from "../../services/note-service.ts";

interface Props {
  note: Note;
  onDeleteNote: (id: string) => void;
}

function NoteCard({ note, onDeleteNote }: Props) {
  return (
    <Card>
      <CardHeader
        sx={{
          "& .MuiCardHeader-content": {
            wordBreak: "break-all",
          },
        }}
        avatar={
          <Avatar sx={{ background: "purple" }} aria-label="Note category">
            {note.category.name.charAt(0)}
          </Avatar>
        }
        title={note.title}
        subheader={format(new Date(note.dateLastModified), "MMMM dd, yyyy")}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {note.description}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          aria-label="Modify note"
          component={Link}
          to={`/notes/${note._id}`}
        >
          <EditOutlinedIcon />
        </IconButton>
        <IconButton
          aria-label="Delete note"
          onClick={() => onDeleteNote(note._id)}
        >
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default NoteCard;
