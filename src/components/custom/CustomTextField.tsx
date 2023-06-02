import { TextField, TextFieldProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type Props = TextFieldProps & { label: string };

function CustomTextField(props: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const fieldName = props.name ? props.name : props.label.toLowerCase();
  const hasError = Boolean(errors[fieldName]);

  return (
    <Controller
      name={fieldName}
      render={({ field }) => (
        <TextField
          {...field}
          {...props}
          id={fieldName}
          error={hasError}
          helperText={hasError && `${errors[fieldName]?.message}.`}
          variant="outlined"
          sx={{ mb: 4 }}
        />
      )}
      control={control}
    />
  );
}

export default CustomTextField;
