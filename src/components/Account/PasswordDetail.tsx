import CustomTextField from "../custom/CustomTextField.tsx";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import EditOffIcon from "@mui/icons-material/EditOff";
import { styled } from "@mui/material/styles";
import PasswordEyeIcon from "../common/PasswordEyeIcon.tsx";
import CustomButton from "../custom/CustomButton.tsx";
import useAccount from "../../hooks/useAccount.ts";

const StyledBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const schema = z.object({
  currentPassword: z.string().min(1, {
    message: "Current password is required",
  }),
  newPassword: z.string().min(8, {
    message: "New password must be at least 8 characters long",
  }),
});

export type PasswordDetailFormData = z.infer<typeof schema>;

interface Props {
  drawerToggle: boolean;
}

function PasswordDetail({ drawerToggle }: Props) {
  const [isEditable, setIsEditable] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const useFormMethods = useForm<PasswordDetailFormData>({
    defaultValues: { currentPassword: "", newPassword: "" },
    resolver: zodResolver(schema),
  });

  const { handleSubmit, reset, watch } = useFormMethods;

  useEffect(() => {
    if (!isEditable) {
      reset();
      setShowPassword(false);
    }
  }, [isEditable]);

  const {
    updatePasswordDetail,
    isUpdatingPasswordDetail,
    updatePasswordDetailError,
  } = useAccount();

  const handleOnUpdateUser = (data: PasswordDetailFormData) => {
    setIsEditable(false);
    updatePasswordDetail(data);
  };

  return (
    <Box>
      <StyledBox>
        <Typography>Password</Typography>
        <IconButton
          size="small"
          aria-label="Edit password"
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
          noValidate={true}
        >
          <Stack spacing={4}>
            <CustomTextField
              autoComplete="current-password"
              label="Current password"
              name="currentPassword"
              variant="filled"
              type={showPassword ? "text" : "password"}
              InputProps={{
                readOnly: !isEditable,
                endAdornment: isEditable && (
                  <PasswordEyeIcon
                    hasInput={watch("currentPassword") !== ""}
                    showPassword={showPassword}
                    setShowPassword={(value) => setShowPassword(value)}
                  />
                ),
              }}
            />
            <CustomTextField
              autoComplete="new-password"
              label="New password"
              name="newPassword"
              variant="filled"
              type={showPassword ? "text" : "password"}
              InputProps={{
                readOnly: !isEditable,
                endAdornment: isEditable && (
                  <PasswordEyeIcon
                    hasInput={watch("newPassword") !== ""}
                    showPassword={showPassword}
                    setShowPassword={(value) => setShowPassword(value)}
                  />
                ),
              }}
            />
            <Box>
              {isEditable && (
                <CustomButton
                  color="accent_pale_green"
                  type="submit"
                  variant="contained"
                  maxWidth="220px"
                  drawerToggle={drawerToggle}
                >
                  {isUpdatingPasswordDetail ? "Submitting..." : "Submit"}
                </CustomButton>
              )}
              {updatePasswordDetailError && (
                <Typography
                  sx={{ fontSize: "13px", color: "error.main", my: 1 }}
                >
                  {updatePasswordDetailError.response?.status}
                </Typography>
              )}
            </Box>
          </Stack>
        </form>
      </FormProvider>
    </Box>
  );
}

export default PasswordDetail;
