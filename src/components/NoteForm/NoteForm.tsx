import {
  Button,
  FormControlLabel,
  Radio,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import CustomTextField from "../custom/CustomTextField.tsx";
import { useParams } from "react-router-dom";
import CustomRadioGroup from "../custom/CustomRadioGroup.tsx";
import { categoryIDs, getCategories } from "../../services/categories.ts";
import { useState } from "react";
import CustomDatePicker from "../custom/CustomDatePicker.tsx";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(255),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(255),
  categoryId: z.enum(categoryIDs, {
    errorMap: () => ({ message: "A category must be selected" }),
  }),
  upcomingDate: z
    .date({
      invalid_type_error: "Upcoming date of task is required",
    })
    .min(new Date(), { message: "Date from the past is not valid" }),
});

export type NoteFormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: NoteFormData) => void;
}

function NoteForm({ onSubmit }: Props) {
  const useFormMethods = useForm<NoteFormData>({
    defaultValues: {
      title: "",
      description: "",
      categoryId: "",
      upcomingDate: new Date(),
    },
    resolver: zodResolver(schema),
  });
  const { id } = useParams();
  const [upcoming, setUpcoming] = useState(false);

  const { handleSubmit, reset } = useFormMethods;

  return (
    <>
      <Typography>{id}</Typography>
      <FormProvider {...useFormMethods}>
        <form
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
            reset();
          })}
          autoComplete="off"
        >
          <Stack>
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
            <FormControlLabel
              control={
                <Switch
                  checked={upcoming}
                  onChange={(event) => setUpcoming(event.target.checked)}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Upcoming task"
            />
            {upcoming && (
              <CustomDatePicker label="Date of task" name="upcomingDate" />
            )}
            <Button type="submit" variant="contained" sx={{ mt: 4 }}>
              Submit
            </Button>
          </Stack>
        </form>
      </FormProvider>
    </>
  );
}

export default NoteForm;
