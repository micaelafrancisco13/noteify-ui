import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Note } from "../../services/notes.ts";
import { Link } from "react-router-dom";

interface Props {
  isLoading: boolean;
  note: Note;
  onDeleteNote: (id: string) => void;
}

function NoteCard({ note, onDeleteNote }: Props) {
  const isLoading = true;
  return (
    <Card>
      <CardHeader
        sx={{
          "& .MuiCardHeader-content": {
            wordBreak: "break-all",
          },
        }}
        avatar={
          isLoading ? (
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          ) : (
            <Avatar sx={{ background: "purple" }} aria-label="Note category">
              {note.category.name.charAt(0)}
            </Avatar>
          )
        }
        title={
          isLoading ? (
            <Skeleton
              animation="wave"
              variant="text"
              sx={{ fontSize: "14px" }}
            />
          ) : (
            note.title
          )
        }
        subheader={
          isLoading ? (
            <Skeleton
              animation="wave"
              variant="text"
              sx={{ fontSize: "12.5px" }}
            />
          ) : (
            format(new Date(note.dateLastModified), "MMMM dd, yyyy")
          )
        }
      />
      <CardContent>
        {isLoading ? (
          <Skeleton animation="wave" variant="text" sx={{ fontSize: "14px" }} />
        ) : (
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {note.description}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <IconButton
          aria-label="Modify note"
          component={Link}
          to={`/notes/${note._id}`}
        >
          {isLoading ? (
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={24}
              height={24}
            />
          ) : (
            <EditOutlinedIcon />
          )}
        </IconButton>
        <IconButton
          aria-label="Delete note"
          onClick={() => onDeleteNote(note._id)}
        >
          {isLoading ? (
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={24}
              height={24}
            />
          ) : (
            <DeleteOutlineOutlinedIcon />
          )}
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default NoteCard;
