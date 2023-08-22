import authService from "../services/auth-service.ts";
import {SignInFormData} from "../components/AuthForm/SignInForm.tsx";
import {useState} from "react";
import {AxiosError} from "axios";
import {setJwt} from "../services/api-client.ts";
import {useKeycloak} from "@react-keycloak/web";

// import keycloakClient from "../services/keycloak-client.ts";

function useAuth() {
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [error, setError] = useState<AxiosError>();
    const TOKEN_KEY = "keycloak_token";

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
                setError(err);
                setIsLoggingIn(false);
            });
    };

    const signInUponRegistration = (jwt: string) => {
        localStorage.setItem(TOKEN_KEY, jwt);
    };
    const {keycloak} = useKeycloak();

    const signOut = () => {
        keycloak.logout().then(response => {
            localStorage.removeItem(TOKEN_KEY);
        }).catch(exception => {

        })
    };

    const getCurrentUser = () => {
        console.log("keycloak.token", keycloak.token);
        if (keycloak.authenticated) {
            localStorage.setItem(TOKEN_KEY, `Bearer ${keycloak.token}`);
            return keycloak.token;
        }
        return null;
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
        signInUponRegistration,
        signOut,
        getCurrentUser,
        isLoggingIn,
        error,
        authStatusCode,
    };
}

export default useAuth;
