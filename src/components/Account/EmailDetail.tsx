import CustomTextField from "../custom/CustomTextField.tsx";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import EditOffIcon from "@mui/icons-material/EditOff";
import { styled } from "@mui/material/styles";
import CustomButton from "../custom/CustomButton.tsx";
import useAccount from "../../hooks/useAccount.ts";

const StyledBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export type EmailDetailFormData = z.infer<typeof schema>;

interface Props {
  drawerToggle: boolean;
}

function EmailDetail({ drawerToggle }: Props) {
  const [isEditable, setIsEditable] = useState(false);

  const useFormMethods = useForm<EmailDetailFormData>({
    defaultValues: { email: "" },
    resolver: zodResolver(schema),
  });

  const { handleSubmit, setValue, reset } = useFormMethods;

  const {
    accountDetails,
    updateEmailDetail,
    isUpdatingEmailDetail,
    updateEmailDetailError,
    setUpdateEmailDetailError,
  } = useAccount();

  useEffect(() => {
    if (!isEditable) setValue("email", accountDetails.email);
    else setValue("email", "");
  }, [accountDetails.email, isEditable]);

  const handleOnUpdateUser = (data: EmailDetailFormData) => {
    setIsEditable(false);

    if (data.email === accountDetails.email) return;

    updateEmailDetail(data);
  };

  const errorMessage = (updateEmailDetailError?.response?.data as string)
    ? (updateEmailDetailError?.response?.data as string)
    : updateEmailDetailError?.message;

  return (
    <Box>
      <StyledBox>
        <Typography>Email address</Typography>
        <IconButton
          size="small"
          aria-label="Edit email address"
          onClick={() => {
            setIsEditable(!isEditable);
            reset();
            setUpdateEmailDetailError(undefined);
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
          noValidate={true}
        >
          <Stack spacing={4}>
            <Box>
              <CustomTextField
                autoComplete="username"
                label="Email address"
                name="email"
                variant="filled"
                type="email"
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
                {isUpdatingEmailDetail ? "Submitting..." : "Submit"}
              </CustomButton>
            )}
          </Stack>
        </form>
      </FormProvider>
    </Box>
  );
}

export default EmailDetail;
