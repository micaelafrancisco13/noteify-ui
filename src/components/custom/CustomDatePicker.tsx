import { Controller, useFormContext } from "react-hook-form";
import { DatePickerProps, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

type Props = DatePickerProps<Date> & { label: string; name?: string };

function CustomDatePicker(props: Props) {
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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              {...field}
              {...props}
              slotProps={{
                textField: {
                  error: hasError,
                  helperText: hasError
                    ? `${errors[fieldName]?.message}.`
                    : null,
                },
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
      )}
      control={control}
    />
  );
}

export default CustomDatePicker;
