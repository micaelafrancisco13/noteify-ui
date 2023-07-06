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
        window.location.assign("/");
      })
      .catch((err) => {
        console.log("err.response", err.response);
        setError(err);
        setIsLoggingIn(false);
      });
  };

  const signInUponRegistration = (jwt: string) => {
    localStorage.setItem(TOKEN_KEY, jwt);
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

  const authStatusCode = error?.response?.status;

  return {
    signIn,
    signInUponRegistration,
    signOut,
    getCurrentUser,
    isLoggingIn,
    error,
    authStatusCode,
  };
}

export default useAuth;
