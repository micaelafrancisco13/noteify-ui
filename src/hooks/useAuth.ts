import authService, { CurrentUser } from "../services/auth-service.ts";
import { SignInFormData } from "../components/AuthForm/SignInForm.tsx";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import jwtDecode from "jwt-decode";
import { setJwt } from "../services/api-client.ts";

function useAuth() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState<AxiosError>();
  const TOKEN_KEY = "token";

  setJwt(localStorage.getItem(TOKEN_KEY));

  useEffect(() => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) setCurrentUser(jwtDecode(token) as CurrentUser);
    } catch (ex) {
      setCurrentUser(null);
    }
  }, []);

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
        setError(err);
        setIsLoggingIn(false);
      });
  };

  const signOut = () => {
    localStorage.removeItem(TOKEN_KEY);
  };

  const authErrorMessage = error?.message;
  const authStatusCode = error?.response?.status;

  return {
    signIn,
    signOut,
    currentUser,
    isLoggingIn,
    authErrorMessage,
    authStatusCode,
  };
}

export default useAuth;
