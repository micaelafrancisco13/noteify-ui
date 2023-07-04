import { Box, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CustomTextField from "../custom/CustomTextField.tsx";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import PasswordEyeIcon from "../common/PasswordEyeIcon.tsx";
import CustomButton from "../custom/CustomButton.tsx";
import { Link, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.ts";
import { z } from "zod";
import Logo from "../common/Logo.tsx";

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

  const { handleSubmit, watch, setError, reset } = useFormMethods;
  const { signIn, isLoggingIn, error } = useAuth();

  useEffect(() => {
    if (error && error.response) {
      setError("email", {
        type: "custom",
        message: error.response.data as string,
      });
    }
  }, [error]);

  const handleOnSubmitNote = (data: SignInFormData) => {
    signIn(data);
  };

  const { getCurrentUser } = useAuth();
  if (getCurrentUser()) return <Navigate to="/" />;

  return (
    <StyledBox>
      <Box sx={{ px: { xs: "8px", sm: 0 } }}>
        <Logo />
      </Box>
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
                  autoComplete="username"
                  label="Email address"
                  name="email"
                  type="email"
                />
                <CustomTextField
                  autoComplete="current-password"
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
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,
                      height: "48px",
                      fontSize: "18px",
                    }}
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? "Signing in..." : "Sign in"}
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
