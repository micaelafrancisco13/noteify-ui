import { TextField, TextFieldProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type Props = TextFieldProps & { label: string; past?: boolean };

function CustomTextField(props: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const fieldName = props.name ? props.name : props.label.toLowerCase();
  const hasError = Boolean(errors[fieldName]);
  const { past, ...originalProps } = props;

  return (
    <Controller
      name={fieldName}
      render={({ field }) => (
        <TextField
          {...field}
          {...originalProps}
          id={fieldName}
          error={hasError}
          helperText={hasError && `${errors[fieldName]?.message}.`}
          variant="outlined"
          InputProps={{
            readOnly: past,
          }}
        />
      )}
      control={control}
    />
  );
}

export default CustomTextField;
