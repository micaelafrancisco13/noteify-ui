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
import { useParams } from "react-router-dom";
import CustomRadioGroup from "../custom/CustomRadioGroup.tsx";
import { categoryIDs, getCategories } from "../../services/categories.ts";
import { useEffect, useState } from "react";
import CustomDatePicker from "../custom/CustomDatePicker.tsx";
import SwitchComponent from "../common/SwitchComponent.tsx";
import CustomButton from "../custom/CustomButton.tsx";

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
  const { id } = useParams();

  const useFormMethods = useForm<NoteFormData>({
    defaultValues: {
      title: "",
      description: "",
      categoryId: "",
      upcomingDate: new Date(),
    },
    resolver: zodResolver(schema),
  });
  const { handleSubmit, reset, setValue, setError } = useFormMethods;

  const [upcoming, setUpcoming] = useState(false);

  useEffect(() => {
    if (!upcoming) {
      reset({ upcomingDate: new Date() });
    }
  }, [upcoming]);

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
            <Grid container spacing={{ sm: 2 }}>
              <Grid item sm={6} sx={{ width: "100%" }}>
                <SwitchComponent
                  label="Upcoming task"
                  checked={upcoming}
                  onChange={(value) => setUpcoming(value)}
                />
              </Grid>
              <Grid item sm={6} sx={{ width: "100%" }}>
                {upcoming && (
                  <CustomDatePicker label="Date of task" name="upcomingDate" />
                )}
              </Grid>
            </Grid>
            <CustomButton type="submit" variant="contained">
              Submit
            </CustomButton>
          </Stack>
        </form>
      </FormProvider>
    </>
  );
}

export default NoteForm;
