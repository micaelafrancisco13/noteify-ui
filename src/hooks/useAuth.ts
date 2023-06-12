import authService, { CurrentUser } from "../services/auth-service.ts";
import { SignInFormData } from "../components/AuthForm/SignInForm.tsx";
import { useState } from "react";
import { AxiosError } from "axios";
import jwtDecode from "jwt-decode";
import { setJwt } from "../services/api-client.ts";

function useAuth() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState<AxiosError>();
  const TOKEN_KEY = "token";

  setJwt(localStorage.getItem(TOKEN_KEY));

  const signIn = (data: SignInFormData) => {
    setIsLoggingIn(true);
    authService
      .create(data)
      .then((res) => {
        localStorage.setItem(TOKEN_KEY, res.data);
        setIsLoggingIn(false);
        window.location.assign("/notes");
      })
      .catch((err) => {
        setError(err);
        setIsLoggingIn(false);
      });
  };

  const signOut = () => {
    localStorage.removeItem(TOKEN_KEY);
  };

  const getCurrentUser = () => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) return jwtDecode(token) as CurrentUser;
    } catch (ex) {
      return null;
    }
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
