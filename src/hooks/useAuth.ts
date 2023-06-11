import authService from "../services/auth-service.ts";
import { SignInFormData } from "../components/AuthForm/SignInForm.tsx";
import { useState } from "react";
import { setJwt } from "../services/api-client.ts";
import { AxiosError } from "axios";
import { useLocation } from "react-router-dom";

function useAuth() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState<AxiosError>();
  const TOKEN_KEY = "token";
  const location = useLocation();

  setJwt(localStorage.getItem(TOKEN_KEY));

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

  const authErrorMessage = error?.message;
  const authStatusCode = error?.response?.status;

  return { signIn, isLoggingIn, authErrorMessage, authStatusCode };
}

export default useAuth;
