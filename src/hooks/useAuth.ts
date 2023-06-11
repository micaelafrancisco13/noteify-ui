import authService from "../services/auth-service.ts";
import { SignInFormData } from "../components/AuthForm/SignInForm.tsx";
import { useState } from "react";
import { AxiosError } from "axios";

function useAuth() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState<AxiosError>();
  const TOKEN_KEY = "token";

  const signIn = (data: SignInFormData) => {
    setIsLoggingIn(true);
    authService
      .create(data)
      .then((res) => {
        localStorage.setItem(TOKEN_KEY, res.data);
        console.log("res.data", res.data);
        setIsLoggingIn(false);
      })
      .catch((err) => {
        console.log("Error signing-in", err);
        setError(err);
        setIsLoggingIn(false);
      });
  };

  const signOut = () => {
    localStorage.removeItem(TOKEN_KEY);
  };

  const getCurrentUser = () => {
    authService.endpoint = "/users/me";

    authService
      .create()
      .then((res) => {
        console.log("response.data", res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const authErrorMessage = error?.message;
  const authStatusCode = error?.response?.status;

  return {
    signIn,
    signOut,
    getCurrentUser,
    isLoggingIn,
    authErrorMessage,
    authStatusCode,
  };
}

export default useAuth;
