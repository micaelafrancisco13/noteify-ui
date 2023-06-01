import moment from "moment";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Masonry from "@mui/lab/Masonry";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import notes from "../../services/notes.ts";

// interface NoteCategory {
//   _id: string;
//   name: string;
// }
//
// interface Note {
//   _id: string;
//   title: string;
//   description: string;
//   category: NoteCategory;
//   dateCreated: string;
//   dateLastModified: string;
// }

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
        <Card key={n._id}>
          <CardHeader
            avatar={
              <Avatar sx={{ background: "purple" }} aria-label="Note category">
                {n.category.name.charAt(0)}
              </Avatar>
            }
            title={n.title}
            subheader={moment(n.dateLastModified).format("ll")}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {n.description}
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
      ))}
    </Masonry>
  );
}

export default Notes;
