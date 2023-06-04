import Masonry from "@mui/lab/Masonry";
import NoteCard from "../NoteCard/NoteCard.tsx";
import { Button, Grid, Typography } from "@mui/material";
import { getNotes } from "../../services/notes.ts";
import CustomButton from "../custom/CustomButton.tsx";
import AnchorMenu from "../common/AnchorMenu.tsx";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import _ from "lodash";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const StyledButton = styled(CustomButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  borderBottom: "1px solid white",
  borderRadius: 0,
  textTransform: "none",
})) as typeof Button;

interface Props {
  drawerToggle: boolean;
  onDeleteNote: (id: string) => void;
}

function Notes({ drawerToggle, onDeleteNote }: Props) {
  const notes = getNotes();
  const numberOfNotes = notes.length;
  const [sortedOrFilteredNotes, setSortedOrFilteredNotes] = useState(notes);

  const menu = [
    {
      name: "Title",
      execute() {
        setSortedOrFilteredNotes(_.orderBy(notes, ["title"], ["asc"]));
      },
      icon: <KeyboardArrowUpIcon fontSize="small" />,
    },
    {
      name: "Title",
      execute() {
        setSortedOrFilteredNotes(_.orderBy(notes, ["title"], ["desc"]));
      },
      icon: <KeyboardArrowDownIcon fontSize="small" />,
    },
    {
      name: "Date created",
      execute() {
        setSortedOrFilteredNotes(_.orderBy(notes, ["dateCreated"], ["asc"]));
      },
      icon: <KeyboardArrowUpIcon fontSize="small" />,
    },
    {
      name: "Date created",
      execute() {
        setSortedOrFilteredNotes(_.orderBy(notes, ["dateCreated"], ["desc"]));
      },
      icon: <KeyboardArrowDownIcon fontSize="small" />,
    },
    {
      name: "Date last modified",
      execute() {
        setSortedOrFilteredNotes(
          _.orderBy(notes, ["dateLastModified"], ["asc"])
        );
      },
      icon: <KeyboardArrowUpIcon fontSize="small" />,
    },
    {
      name: "Date last modified",
      execute() {
        setSortedOrFilteredNotes(
          _.orderBy(notes, ["dateLastModified"], ["desc"])
        );
      },
      icon: <KeyboardArrowDownIcon fontSize="small" />,
    },
  ];

  return (
    <>
      {numberOfNotes >= 1 && (
        <Grid container>
          <Grid item sx={{ display: "flex", alignItems: "center" }} xs={6}>
            <Typography>{`${numberOfNotes} notes`}</Typography>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
            xs={6}
          >
            <AnchorMenu
              buttonChildren={
                <StyledButton variant="text">Sort by</StyledButton>
              }
              title={"Sort notes"}
              menu={menu}
            />
          </Grid>
        </Grid>
      )}
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
        {sortedOrFilteredNotes.map((n) => (
          <NoteCard key={n._id} note={n} onDeleteNote={onDeleteNote} />
        ))}
      </Masonry>
    </>
  );
}

export default Notes;
