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
import Image from "../../assets/SignUp.png";

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
  [theme.breakpoints.up("md")]: {
    marginLeft: "80px",
    display: "block",
  },
}));

const schema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }).max(255),
  lastName: z.string().min(1, { message: "Last name is required" }).max(255),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export type SignInFormData = z.infer<typeof schema>;

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);

  const useFormMethods = useForm<SignInFormData>({
    defaultValues: { firstName: "", lastName: "", email: "", password: "" },
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
            // height: `100vh`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Typography fontWeight="700" fontSize="30px" sx={{ mt: 5.5, mb: 11 }}>
            Sign up
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
                <CustomTextField label="First name" name="firstName" />
                <CustomTextField label="Last name" name="lastName" />
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
                    {isLoggingIn ? "Signing up..." : "Sign up"}
                  </CustomButton>
                  <Typography sx={{ fontSize: "13px" }}>
                    By signing up, you agree to NoteIfy's{" "}
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
                Already signed up?{" "}
                <Box component={Link} to={"/auth/sign-in"}>
                  <span
                    style={{
                      textDecoration: "underline",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    Go to sign up
                  </span>
                </Box>
              </Typography>
            </form>
          </FormProvider>
        </Box>
        <StyledImageContainer>
          <img src={Image} alt="Landing page display picture" />
        </StyledImageContainer>
      </Box>
    </StyledBox>
  );
}

export default SignUpForm;
