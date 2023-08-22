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
    const { ...originalProps } = props;

    return (
        <Controller
            name={fieldName}
            render={({ field: { ref, ...otherFieldProps } }) => (
                <TextField
                    {...otherFieldProps}
                    inputRef={ref}
                    {...originalProps}
                    id={fieldName}
                    error={hasError}
                    helperText={hasError && `${errors[fieldName]?.message}.`}
                    variant={props.variant ? props.variant : "outlined"}
                />
            )}
            control={control}
        />
    );
}

export default CustomTextField;
