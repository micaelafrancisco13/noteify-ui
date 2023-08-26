import { useState } from "react";
import { AxiosError } from "axios";
import { setJwt } from "../services/api-client.ts";
import jwtDecode from "jwt-decode";
import userManager from "../services/user-manager.ts";

function useAuth() {
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [error, setError] = useState<AxiosError>();
    const TOKEN_KEY = "keycloak_token";

    setJwt(localStorage.getItem(TOKEN_KEY));

    const signIn = () => {
        userManager.signinRedirect()
            .then((response) =>  console.log(response))
            .catch((exception) => console.log(exception));
    };

    const signInCallback = () => {
        setIsLoggingIn(true);
        userManager
            .signinRedirectCallback()
            .then((response) => {
                localStorage.setItem(TOKEN_KEY, `${response.token_type} ${response.access_token}`);
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
        userManager.signoutRedirect()
            .then((response) =>  console.log(response))
            .catch((exception) => console.log(exception));
    };

    const signOutCallback = () => {
        setIsLoggingOut(true);
        userManager
            .signoutRedirectCallback()
            .then((response) => {
                console.log(response);
                setIsLoggingOut(false);
                window.location.assign("/");
            })
            .catch((err) => {
                setError(err);
                setIsLoggingOut(false);
            });
    };

    const getCurrentUser = () => {
        try {
            const token = localStorage.getItem(TOKEN_KEY);
            if (token) return jwtDecode(token);
        } catch (ex) {
            return null;
        }
    };

    const authStatusCode = error?.response?.status;

    return {
        signIn,
        signInCallback,
        signOut,
        signOutCallback,
        getCurrentUser,
        isLoggingIn,
        isLoggingOut,
        error,
        authStatusCode,
    };
}

export default useAuth;
