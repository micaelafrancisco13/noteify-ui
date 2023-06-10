import { Box, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import NoteIfyLogo from "../../assets/NoteIfy-logo.png";
import CustomTextField from "../custom/CustomTextField.tsx";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import PasswordEyeIcon from "../common/PasswordEyeIcon.tsx";
import CustomButton from "../custom/CustomButton.tsx";

const StyledBox = styled(Box)(({ theme }) => ({
  padding: "16px",
  [theme.breakpoints.up("sm")]: {
    padding: "24px",
  },
}));

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, {
    message: "Current password is required",
  }),
});

export type SignInFormData = z.infer<typeof schema>;

function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  const useFormMethods = useForm<SignInFormData>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(schema),
  });

  const { handleSubmit, watch, reset } = useFormMethods;

  const handleOnSubmitNote = (data: SignInFormData) => {
    console.log("login data", data);
  };

  console.log("password", watch("password"));

  return (
    <StyledBox>
      <img
        width="32px"
        height="32px"
        src={NoteIfyLogo}
        alt="NoteIfy official logo"
      />
      <Typography fontWeight="700" fontSize="30px">
        Sign in
      </Typography>
      <FormProvider {...useFormMethods}>
        <form
          onSubmit={handleSubmit((data) => {
            handleOnSubmitNote(data);
            reset();
          })}
          autoComplete="off"
        >
          <Stack spacing={4}>
            <CustomTextField label="Email address" name="email" type="email" />
            <CustomTextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <PasswordEyeIcon
                    showPassword={showPassword}
                    hasInput={watch("password") !== ""}
                    setShowPassword={(value) => setShowPassword(value)}
                  />
                ),
              }}
            />
            <CustomButton
              type="submit"
              variant="contained"
              maxWidth="400px"
              // disabled={past || isCreatingNote || isUpdatingNote}
            >
              {/*{isCreatingNote || isUpdatingNote ? "Submitting..." : "Submit"}*/}
              Login
            </CustomButton>
          </Stack>
        </form>
      </FormProvider>
    </StyledBox>
  );
}

export default SignInForm;
