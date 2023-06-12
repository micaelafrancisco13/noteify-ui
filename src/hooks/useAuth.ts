import authService from "../services/auth-service.ts";
import { SignInFormData } from "../components/AuthForm/SignInForm.tsx";
import { useState } from "react";
import { AxiosError } from "axios";
import { useLocation } from "react-router-dom";

function useAuth() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState<AxiosError>();
  const TOKEN_KEY = "token";
  const location = useLocation();

  const signIn = (data: SignInFormData) => {
    setIsLoggingIn(true);
    authService
      .create(data)
      .then((res) => {
        localStorage.setItem(TOKEN_KEY, res.data);
        setIsLoggingIn(false);
        const { state } = location;
        window.location = state ? state.from.pathname : "/";
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

  const getCurrentUser = () => {};

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
