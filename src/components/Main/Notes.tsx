import Masonry from "@mui/lab/Masonry";
import NoteCard from "../NoteCard/NoteCard.tsx";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { getNotes } from "../../services/notes.ts";
import CustomButton from "../custom/CustomButton.tsx";
import AnchorMenu from "../common/AnchorMenu.tsx";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import _ from "lodash";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { getCategories } from "../../services/categories.ts";

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
  const categories = getCategories();
  const numberOfNotes = notes.length;
  const [sortedOrFilteredNotes, setSortedOrFilteredNotes] = useState(notes);

  const sortMenu = [
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

  const filterMenu = categories.map((category) => ({
    name: category.name,
    execute: () =>
      setSortedOrFilteredNotes(
        _.filter(notes, (note) => note.category.name === category.name)
      ),
  }));

  return (
    <>
      {numberOfNotes >= 1 && (
        <Grid container alignItems="center">
          <Grid
            item
            sx={{ display: "flex", alignItems: "center" }}
            xs={3}
            sm={6}
          >
            <Typography>{`${numberOfNotes} notes`}</Typography>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
            xs
            sm={6}
          >
            <Stack direction="row" spacing={1}>
              <AnchorMenu
                buttonChildren={
                  <StyledButton variant="text">Sort by</StyledButton>
                }
                title={"Sort notes"}
                menu={sortMenu}
              />
              <AnchorMenu
                buttonChildren={
                  <StyledButton variant="text">Filter by</StyledButton>
                }
                title={"Filter notes"}
                menu={filterMenu}
              />
            </Stack>
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
