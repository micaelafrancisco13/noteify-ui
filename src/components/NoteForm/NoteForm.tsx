import {
  FormControlLabel,
  Grid,
  Radio,
  Stack,
  Typography,
} from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import CustomTextField from "../custom/CustomTextField.tsx";
import { useNavigate, useParams } from "react-router-dom";
import CustomRadioGroup from "../custom/CustomRadioGroup.tsx";
import { categoryIDs, getCategories } from "../../services/categories.ts";
import { useEffect, useState } from "react";
import CustomDatePicker from "../custom/CustomDatePicker.tsx";
import SwitchComponent from "../common/SwitchComponent.tsx";
import CustomButton from "../custom/CustomButton.tsx";
import { updateNote } from "../../services/notes.ts";
import { format, isBefore, startOfDay } from "date-fns";
import { Note } from "../../services/note-service.ts";
import useNote from "../../hooks/useNote.ts";
import useNotes from "../../hooks/useNotes.ts";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(255),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(255_000),
  categoryId: z.enum(categoryIDs, {
    errorMap: () => ({ message: "A category must be selected" }),
  }),
  dateCreated: z.date().optional(),
  dateLastModified: z.date().optional(),
  upcomingDate: z
    .date({
      invalid_type_error: "Upcoming date of task is required",
    })
    .min(startOfDay(new Date()), {
      message: "Date from the past is not valid",
    }),
});

export type NoteFormData = z.infer<typeof schema>;

interface Props {
  drawerToggle: boolean;
}

function NoteForm({ drawerToggle }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();

  const useFormMethods = useForm<NoteFormData>({
    defaultValues: {
      title: "",
      description: "",
      categoryId: "",
      upcomingDate: startOfDay(new Date()),
    },
    resolver: zodResolver(schema),
  });
  const { handleSubmit, reset, resetField, setValue, watch } = useFormMethods;

  const [upcoming, setUpcoming] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [originalUpcomingDate, setOriginalUpcomingDate] = useState("");

  const { note: currentNote, getNoteErrorMessage, statusCode } = useNote(id);
  const { notes, createNote, isCreatingNote } = useNotes();

  useEffect(() => {
    if (id) {
      console.log("<NoteForm/>");
      setInitialFormState();

      if (id === "new") return;

      if (statusCode === 404) return navigate("/not-found");

      if (!getNoteErrorMessage && currentNote) populateForm(currentNote);
    }
  }, [id, currentNote, getNoteErrorMessage, statusCode]);

  useEffect(() => {
    if (!upcoming) {
      resetField("upcomingDate");
    }
  }, [upcoming]);

  const setInitialFormState = () => {
    reset();
    setUpcoming(false);
    setCategoryName("");
    setOriginalUpcomingDate("");
  };

  const populateForm = (note: Note) => {
    setValue("title", note.title);
    setValue("description", note.description);
    setValue("categoryId", note.category._id);
    setValue("dateCreated", new Date(note.dateCreated));
    setValue("dateLastModified", new Date(note.dateLastModified));
    setValue("upcomingDate", new Date(note.upcomingDate));
    setUpcoming(true);
    setCategoryName(note.category.name);
    setOriginalUpcomingDate(note.upcomingDate);
  };

  const handleOnSubmitNote = (data: NoteFormData) => {
    console.log("Saved note: ", data);

    if (id === "new") createNote(data, navigate);
    else updateNote({ id, ...data });
  };

  const dateCreated = watch("dateCreated");
  const dateLastModified = watch("dateLastModified");
  const past = isBefore(
    startOfDay(new Date(originalUpcomingDate)),
    startOfDay(new Date())
  );

  return (
    <>
      {getNoteErrorMessage && (
        <Typography sx={{ color: (theme) => theme.palette.error.main, mb: 2 }}>
          {`ERROR: ${getNoteErrorMessage}.`}
        </Typography>
      )}
      <FormProvider {...useFormMethods}>
        <form
          onSubmit={handleSubmit((data) => {
            handleOnSubmitNote(data);
            reset();
          })}
          autoComplete="off"
        >
          <Stack spacing={4}>
            <CustomTextField
              label="Title"
              InputProps={{
                readOnly: past,
              }}
            />
            <Stack spacing={1}>
              <CustomTextField
                label="Description"
                multiline
                rows={7}
                InputProps={{
                  readOnly: past,
                }}
              />
              {dateCreated && dateLastModified && (
                <Stack sx={{ color: "#E0E0E0" }}>
                  <Typography variant="caption">
                    {`Created on: ${format(
                      new Date(dateCreated),
                      "EEE MMMM dd, yyyy 'at' hh:mm a"
                    )}`}
                  </Typography>
                  <Typography variant="caption">
                    {`Last modified on: ${format(
                      new Date(dateLastModified),
                      "EEE MMMM dd, yyyy 'at' hh:mm a"
                    )}`}
                  </Typography>
                </Stack>
              )}
            </Stack>
            {!past ? (
              <CustomRadioGroup label="Category" name="categoryId">
                {getCategories().map((c) => (
                  <FormControlLabel
                    key={c._id}
                    value={c._id}
                    control={<Radio />}
                    label={c.name}
                  />
                ))}
              </CustomRadioGroup>
            ) : (
              <Typography variant="body2">Category: {categoryName}</Typography>
            )}
            <Grid container>
              {(id === "new" || !past) && (
                <Grid
                  item
                  sm={drawerToggle ? 12 : 6}
                  md={6}
                  sx={{ width: "100%" }}
                >
                  <SwitchComponent
                    label="Upcoming task"
                    checked={upcoming}
                    onChange={(value) => setUpcoming(value)}
                  />
                </Grid>
              )}
              <Grid
                item
                sm={drawerToggle ? 12 : 6}
                md={6}
                sx={{ width: "100%" }}
              >
                {upcoming && (
                  <CustomDatePicker
                    label="Date of task"
                    name="upcomingDate"
                    past={past}
                  />
                )}
              </Grid>
            </Grid>
            {/*{createNoteErrorMessage && (*/}
            {/*  <Typography*/}
            {/*    sx={{*/}
            {/*      color: (theme) => theme.palette.error.main,*/}
            {/*      fontSize: "12.5px",*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    {`ERROR: ${createNoteErrorMessage}.`}*/}
            {/*  </Typography>*/}
            {/*)}*/}
            <CustomButton
              type="submit"
              variant="contained"
              drawerToggle={drawerToggle}
              maxWidth="220px"
              disabled={past || isCreatingNote}
            >
              {isCreatingNote ? "Submitting..." : "Submit"}
            </CustomButton>
          </Stack>
        </form>
      </FormProvider>
    </>
  );
}

export default NoteForm;
