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
import { Link } from "react-router-dom";

const StyledBox = styled(Box)(({ theme }) => ({
  padding: "16px",
  [theme.breakpoints.up("sm")]: {
    padding: "24px",
  },
}));

const StyledImageContainer = styled(Box)(({ theme }) => ({
  display: "none",
  width: "100%",
  maxWidth: "420px",
  height: "210px",
  border: "1px solid green",
  [theme.breakpoints.up("md")]: {
    marginLeft: "80px",
    display: "block",
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

  return (
    <StyledBox>
      <img
        width="32px"
        height="32px"
        src={NoteIfyLogo}
        alt="NoteIfy official logo"
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Typography
            fontWeight="700"
            fontSize="30px"
            // sx={{ my: "96px", mb: "32px" }}
          >
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
                <CustomTextField
                  label="Email address"
                  name="email"
                  type="email"
                />
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
                <Stack spacing={2}>
                  <CustomButton
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ textTransform: "none", fontWeight: 700 }}
                    // disabled={past || isCreatingNote || isUpdatingNote}
                  >
                    {/*{isCreatingNote || isUpdatingNote ? "Submitting..." : "Submit"}*/}
                    Sign in
                  </CustomButton>
                  <Typography
                    component={Link}
                    to={"/some-forgot-password-page"}
                    sx={{ fontSize: "13px", textDecoration: "underline" }}
                  >
                    Forgot your password?
                  </Typography>
                  <Typography sx={{ fontSize: "13px" }}>
                    By signing in, you agree to NoteIfy's{" "}
                    <span
                      style={{
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      Terms of Service
                    </span>{" "}
                    and{" "}
                    <span
                      style={{
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      Privacy Policy
                    </span>
                    .
                  </Typography>
                </Stack>
              </Stack>
              <Typography
                sx={{ fontSize: "13px", textAlign: "center", py: "32px" }}
              >
                Don't have an account?{" "}
                <Box component={Link} to={"/auth/sign-up"}>
                  <span
                    style={{
                      textDecoration: "underline",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    Sign up
                  </span>
                </Box>
              </Typography>
            </form>
          </FormProvider>
        </Box>
        <StyledImageContainer />
      </Box>
    </StyledBox>
  );
}

export default SignInForm;
