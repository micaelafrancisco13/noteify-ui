import { useState } from "react";
import { AxiosError } from "axios";
import { setJwt } from "../services/api-client.ts";
import { UserManager } from "oidc-client-ts";
import jwtDecode from "jwt-decode";

function useAuth() {
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [error, setError] = useState<AxiosError>();
    const TOKEN_KEY = "keycloak_token";
    const userManager = new UserManager({
        authority: "http://localhost:8000",
        metadata: {
            authorization_endpoint:
                "http://localhost:8000/realms/noteify-realm/protocol/openid-connect/auth",
            token_endpoint:
                "http://localhost:8000/realms/noteify-realm/protocol/openid-connect/token",
        },
        redirect_uri: "http://localhost:5173/callback-sign-in",
        client_id: "noteify-react-client",
    });

    setJwt(localStorage.getItem(TOKEN_KEY));

    const signIn = () => {
        console.log("should login");
        userManager.signinRedirect().then((response) => {
            console.log(response);
        });
    };

    const signInCallback = () => {
        setIsLoggingIn(true);
        userManager
            .signinRedirectCallback()
            .then((response) => {
                localStorage.setItem("oidc_response", response.toStorageString());
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

    // const hasRun = useRef(false);
    // useEffect(() => {
    //   if (!keycloakClient) {
    //     console.log("init");
    //     keycloakClient.init({
    //       onLoad: 'check-sso',
    //       silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    //       pkceMethod: 'S256',
    //       checkLoginIframe: false
    //     })
    //         .then((authenticated) => {
    //           if (!authenticated)
    //             console.log("User is not authenticated!");
    //           else
    //             localStorage.setItem(TOKEN_KEY, keycloakClient.token as string);
    //         })
    //         .catch(console.error);
    //   }
    //
    // }, [keycloakClient]);
    //
    // const redirectSignIn = () => {
    //   window.location.href = keycloakClient.createLoginUrl();
    // }

    return {
        signIn,
        signInCallback,
        signOut,
        getCurrentUser,
        isLoggingIn,
        error,
        authStatusCode,
    };
}

export default useAuth;
