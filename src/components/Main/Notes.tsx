import moment from "moment";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import notes from "../../services/notes.ts";
import Masonry from "@mui/lab/Masonry";

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
              <Avatar sx={{ background: "purple" }} aria-label="recipe">
                {n.category.name.charAt(0)}
              </Avatar>
            }
            // action={
            //   <IconButton aria-label="settings">
            //     <MoreVertIcon />
            //   </IconButton>
            // }
            title={n.title}
            subheader={moment(n.dateLastModified).format("ll")}
          />

          <CardContent>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {n.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      ))}
    </Masonry>
  );
}

export default Notes;
