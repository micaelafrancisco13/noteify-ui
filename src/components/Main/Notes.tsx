import Masonry from "@mui/lab/Masonry";
import { Button, Grid, Stack, Typography } from "@mui/material";
import CustomButton from "../custom/CustomButton.tsx";
import AnchorMenu, { AnchorMenuItemProps } from "../common/AnchorMenu.tsx";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import _ from "lodash";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useSearchParams } from "react-router-dom";
import { isAfter, isBefore, isEqual, startOfDay } from "date-fns";
import useNotes from "../../hooks/useNotes.ts";
import { Note } from "../../services/note-service.ts";
import CardSkeleton from "../NoteCard/CardSkeleton.tsx";
import NoteCard from "../NoteCard/NoteCard.tsx";
import useCategories from "../../hooks/useCategories.ts";

const StyledButton = styled(CustomButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  borderBottom: "1px solid white",
  borderRadius: 0,
  textTransform: "none",
})) as typeof Button;

const StyledHeadingOne = styled(Typography)(({ theme }) => ({
  fontSize: `${14 / 8}rem`,
  borderBottom: `2px solid ${theme.palette.primary.main}`,
  display: "inline-block",
})) as typeof Typography;

interface Props {
  drawerToggle: boolean;
}

function Notes({ drawerToggle }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { category, date, sortBy, orderBy } = Object.fromEntries([
    ...searchParams,
  ]);
  const existingParams = Object.fromEntries(searchParams.entries());

  const { categories } = useCategories();
  const {
    notes: allNotes,
    noteErrorMessage,
    isFetchingNotes,
    deleteNote,
  } = useNotes();

  const [sortMenu, setSortMenu] = useState<AnchorMenuItemProps[] | []>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const numberOfNotes = filteredNotes.length;

  useEffect(() => {
    let newFilteredNotes = allNotes;

    if (category)
      newFilteredNotes = allNotes.filter(
        (note) => _.camelCase(note.category.name) === category
      );

    const currentDate = startOfDay(new Date());
    if (date === "today")
      newFilteredNotes = newFilteredNotes.filter((n) =>
        isEqual(startOfDay(new Date(n.upcomingDate)), currentDate)
      );
    else if (date === "upcoming")
      newFilteredNotes = newFilteredNotes.filter((n) =>
        isAfter(startOfDay(new Date(n.upcomingDate)), currentDate)
      );
    else if (date === "archived")
      newFilteredNotes = newFilteredNotes.filter((n) =>
        isBefore(startOfDay(new Date(n.upcomingDate)), currentDate)
      );

    setFilteredNotes(newFilteredNotes);

    if (orderBy === "asc" || orderBy === "desc")
      setFilteredNotes(_.orderBy(newFilteredNotes, [sortBy], [orderBy]));

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
          if (orderBy === "asc") queryOrder = "desc";
          else if (!orderBy || orderBy === "desc") queryOrder = "asc";

          setSearchParams({
            ...existingParams,
            sortBy: _.camelCase(menu),
            orderBy: queryOrder,
          });
        },
      };
    });

    setSortMenu(newSortMenu);
  }, [allNotes, allNotes.length, category, date, sortBy, orderBy]);

  const filterMenu = categories.map((category) => ({
    name: category.name,
    execute: () =>
      setSearchParams({
        ...existingParams,
        category: _.camelCase(category.name),
      }),
  }));

  const handleOnDeleteNote = (id: string) => {
    deleteNote(id);
  };

  return (
    <>
      {date && (
        <StyledHeadingOne component="h1">{_.capitalize(date)}</StyledHeadingOne>
      )}
      {noteErrorMessage && (
        <Typography sx={{ color: (theme) => theme.palette.error.main, mb: 2 }}>
          {`ERROR: ${noteErrorMessage}.`}
        </Typography>
      )}
      <Grid container alignItems="center" sx={{ my: date ? 4 : 0 }}>
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
        {isFetchingNotes
          ? [...Array(4)].map((_, index) => <CardSkeleton key={index} />)
          : filteredNotes.map((n) => (
              <NoteCard
                key={n._id}
                note={n}
                onDeleteNote={() => handleOnDeleteNote(n._id)}
              />
            ))}
      </Masonry>
    </>
  );
}

export default Notes;
