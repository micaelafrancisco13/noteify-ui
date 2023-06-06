import CustomTextField from "../custom/CustomTextField.tsx";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import EditOffIcon from "@mui/icons-material/EditOff";
import {
  getPersonalDetails,
  updatePersonalDetails,
} from "../../services/userDetails.ts";
import { styled } from "@mui/material/styles";

const StyledBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const schema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }).max(255),
  lastName: z.string().min(1, { message: "Last name is required" }).max(255),
});

export type PersonalDetailsFormData = z.infer<typeof schema>;

interface Props {
  submitButton: ReactNode;
}

function PersonalDetails({ submitButton }: Props) {
  const [isEditable, setIsEditable] = useState(false);
  const [initialValue, setInitialValue] = useState<PersonalDetailsFormData>();

  const useFormMethods = useForm<PersonalDetailsFormData>({
    defaultValues: { firstName: "", lastName: "" },
    resolver: zodResolver(schema),
  });

  const { handleSubmit, setValue, reset } = useFormMethods;

  useEffect(() => {
    if (!isEditable) {
      reset();

      setTimeout(() => {
        const { firstName, lastName } = getPersonalDetails();
        setInitialValue({ firstName, lastName });
        setValue("firstName", firstName);
        setValue("lastName", lastName);
      }, 1000);
    }
  }, [isEditable]);

  const handleOnUpdateUser = (data: PersonalDetailsFormData) => {
    setIsEditable(false);
    if (
      initialValue?.firstName === data.firstName &&
      initialValue?.lastName === data.lastName
    )
      return;
    updatePersonalDetails(data);
  };

  return (
    <Box>
      <StyledBox>
        <Typography>Personal Details</Typography>
        <IconButton
          size="small"
          aria-label="Edit personal details"
          onClick={() => {
            setIsEditable(!isEditable);
          }}
        >
          {!isEditable ? <EditIcon /> : <EditOffIcon />}
        </IconButton>
      </StyledBox>
      <Divider sx={{ my: 1, mb: 4 }} />
      <FormProvider {...useFormMethods}>
        <form
          onSubmit={handleSubmit((data) => handleOnUpdateUser(data))}
          autoComplete="off"
        >
          <Stack spacing={4}>
            <CustomTextField
              label="First name"
              name="firstName"
              variant="filled"
              readOnly={!isEditable}
            />
            <CustomTextField
              label="Last name"
              name="lastName"
              variant="filled"
              readOnly={!isEditable}
            />
            {isEditable && submitButton}
          </Stack>
        </form>
      </FormProvider>
    </Box>
  );
}

export default PersonalDetails;
