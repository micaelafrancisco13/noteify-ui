import Masonry from "@mui/lab/Masonry";
import NoteCard from "../NoteCard/NoteCard.tsx";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { getNotes } from "../../services/notes.ts";
import CustomButton from "../custom/CustomButton.tsx";
import AnchorMenu, { AnchorMenuItemProps } from "../common/AnchorMenu.tsx";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import _ from "lodash";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { getCategories } from "../../services/categories.ts";
import { useNavigate, useSearchParams } from "react-router-dom";

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
  const navigate = useNavigate();
  const searchParams = useSearchParams()[0];
  const { sortBy, orderBy } = Object.fromEntries([...searchParams]);

  const notes = getNotes();
  const categories = getCategories();

  const [sortMenu, setSortMenu] = useState<AnchorMenuItemProps[] | []>([]);
  const [sortedOrFilteredNotes, setSortedOrFilteredNotes] = useState(notes);
  const numberOfNotes = sortedOrFilteredNotes.length;

  console.log("<Notes/>");

  useEffect(() => {
    if (orderBy === "asc" || orderBy === "desc")
      setSortedOrFilteredNotes(_.orderBy(notes, [sortBy], [orderBy]));

    const newSortMenu: AnchorMenuItemProps[] = [
      "Title",
      "Date created",
      "Date last modified",
    ].map((menu) => {
      return {
        name: menu,
        icon:
          _.camelCase(menu) === sortBy ? (
            orderBy === "asc" ? (
              <KeyboardArrowDownIcon />
            ) : (
              <KeyboardArrowUpIcon />
            )
          ) : (
            <KeyboardArrowUpIcon />
          ),
        execute: function () {
          let queryOrder = "";
          if (orderBy === "asc") queryOrder = "orderBy=desc";
          else if (!orderBy || orderBy === "desc") queryOrder = "orderBy=asc";

          navigate(`/notes?sortBy=${_.camelCase(menu)}&${queryOrder}`);
        },
      };
    });

    setSortMenu(newSortMenu);
  }, [notes, notes.length, sortBy, orderBy]);

  const filterMenu = categories.map((category) => ({
    name: category.name,
    execute: () =>
      setSortedOrFilteredNotes(
        _.filter(notes, ["category.name", category.name])
      ),
  }));

  return (
    <>
      <Grid container alignItems="center">
        <Grid item sx={{ display: "flex", alignItems: "center" }} xs={3} sm={6}>
          <Typography>{`${numberOfNotes} ${
            numberOfNotes <= 1 ? "note" : "notes"
          }`}</Typography>
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
