import { FormControlLabel, Grid, Radio, Stack } from "@mui/material";
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
import {
  createNote,
  getSpecificNote,
  Note,
  updateNote,
} from "../../services/notes.ts";
import { startOfDay } from "date-fns";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(255),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(255_000),
  categoryId: z.enum(categoryIDs, {
    errorMap: () => ({ message: "A category must be selected" }),
  }),
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
  const { handleSubmit, reset, resetField, setValue } = useFormMethods;

  const [upcoming, setUpcoming] = useState(false);

  useEffect(() => {
    if (id) {
      if (id === "new") return;

      const currentNote = getSpecificNote(id);
      if (!currentNote) return navigate("/not-found");

      populateForm(currentNote);

      console.log(currentNote);
    }

    if (!upcoming) {
      resetField("upcomingDate");
    }
  }, [id, upcoming]);

  const populateForm = (note: Note) => {
    setValue("title", note.title);
    setValue("description", note.description);
    setValue("categoryId", note.category._id);
    setValue("upcomingDate", new Date(note.upcomingDate));
  };

  const handleOnSubmitNote = (data: NoteFormData) => {
    console.log("data", data);
    if (id === "new") createNote(data);
    else updateNote({ id, ...data });
    navigate("/");
  };

  return (
    <>
      <FormProvider {...useFormMethods}>
        <form
          onSubmit={handleSubmit((data) => {
            handleOnSubmitNote(data);
            reset();
          })}
          autoComplete="off"
        >
          <Stack spacing={4}>
            <CustomTextField label="Title" />
            <CustomTextField label="Description" multiline rows={7} />
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
            <Grid container>
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
              <Grid
                item
                sm={drawerToggle ? 12 : 6}
                md={6}
                sx={{ width: "100%" }}
              >
                {upcoming && (
                  <CustomDatePicker label="Date of task" name="upcomingDate" />
                )}
              </Grid>
            </Grid>
            <CustomButton
              type="submit"
              variant="contained"
              drawerToggle={drawerToggle}
              maxWidth="220px"
            >
              Submit
            </CustomButton>
          </Stack>
        </form>
      </FormProvider>
    </>
  );
}

export default NoteForm;
