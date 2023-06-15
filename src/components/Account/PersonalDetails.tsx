import CustomTextField from "../custom/CustomTextField.tsx";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import EditOffIcon from "@mui/icons-material/EditOff";
import { styled } from "@mui/material/styles";
import useAccount from "../../hooks/useAccount.ts";
import CustomButton from "../custom/CustomButton.tsx";

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
  drawerToggle: boolean;
}

function PersonalDetails({ drawerToggle }: Props) {
  const [isEditable, setIsEditable] = useState(false);

  const useFormMethods = useForm<PersonalDetailsFormData>({
    defaultValues: { firstName: "", lastName: "" },
    resolver: zodResolver(schema),
  });

  const { handleSubmit, setValue, reset } = useFormMethods;

  const {
    accountDetails,
    updatePersonalDetails,
    isUpdatingPersonalDetails,
    updatePersonalDetailsError,
    setUpdatePersonalDetailsError,
  } = useAccount();

  useEffect(() => {
    if (!isEditable) {
      setValue("firstName", accountDetails.firstName);
      setValue("lastName", accountDetails.lastName);
    } else {
      setValue("firstName", "");
      setValue("lastName", "");
    }
  }, [accountDetails.firstName, accountDetails.lastName, isEditable]);

  const handleOnUpdateUser = (data: PersonalDetailsFormData) => {
    setIsEditable(false);

    if (
      data.firstName === accountDetails.firstName &&
      data.lastName === accountDetails.lastName
    )
      return;

    updatePersonalDetails(data);
  };

  const errorMessage = (updatePersonalDetailsError?.response?.data as string)
    ? (updatePersonalDetailsError?.response?.data as string)
    : updatePersonalDetailsError?.message;

  return (
    <Box>
      <StyledBox>
        <Typography>Personal Details</Typography>
        <IconButton
          size="small"
          aria-label="Edit personal details"
          onClick={() => {
            setIsEditable(!isEditable);
            reset();
            setUpdatePersonalDetailsError(undefined);
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
              InputProps={{
                readOnly: !isEditable,
              }}
            />
            <Box>
              <CustomTextField
                label="Last name"
                name="lastName"
                variant="filled"
                fullWidth
                InputProps={{
                  readOnly: !isEditable,
                }}
              />
              {errorMessage && (
                <Typography
                  sx={{ fontSize: "13px", color: "error.main", my: 1 }}
                >
                  {errorMessage}
                </Typography>
              )}
            </Box>
            {isEditable && (
              <CustomButton
                color="accent_pale_green"
                type="submit"
                variant="contained"
                maxWidth="220px"
                drawerToggle={drawerToggle}
              >
                {isUpdatingPersonalDetails ? "Submitting..." : "Submit"}
              </CustomButton>
            )}
          </Stack>
        </form>
      </FormProvider>
    </Box>
  );
}

export default PersonalDetails;
