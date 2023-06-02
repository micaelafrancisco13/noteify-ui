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
import { Note } from "../../services/notes.ts";

interface Props {
  note: Note;
}

function NoteCard({ note }: Props) {
  return (
    <Card>
      <CardHeader
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
        <IconButton aria-label="Modify note">
          <EditOutlinedIcon />
        </IconButton>
        <IconButton aria-label="Delete note">
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default NoteCard;
