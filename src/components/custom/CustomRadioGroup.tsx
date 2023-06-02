import {
  FormControl,
  FormHelperText,
  FormLabel,
  RadioGroup,
  RadioGroupProps,
  useMediaQuery,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { ReactNode } from "react";
import theme from "../../theme.ts";

type Props = RadioGroupProps & { label: string; children: ReactNode };

function CustomRadioGroup(props: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const fieldName = props.name ? props.name : props.label.toLowerCase();
  const hasError = Boolean(errors[fieldName]);
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Controller
      name={fieldName}
      render={({ field }) => (
        <FormControl error={hasError} variant="outlined">
          <FormLabel id={fieldName}>{props.label}</FormLabel>
          <RadioGroup
            row={matches}
            aria-labelledby={fieldName}
            {...field}
            {...props}
          >
            {props.children}
          </RadioGroup>
          {hasError && (
            <FormHelperText>{`${errors[fieldName]?.message}.`}</FormHelperText>
          )}
        </FormControl>
      )}
      control={control}
    />
  );
}

export default CustomRadioGroup;
