import keycloakClient from "./keycloak-client.ts";

// const hasRun = useRef(false);
const initializeKeycloak = (callback: () => void) => {
    // if (hasRun.current) return;
    //
    // hasRun.current = true;

    keycloakClient.init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        pkceMethod: 'S256',
        checkLoginIframe: false
    })
        .then((authenticated) => {
            if (!authenticated)
                console.log("User is not authenticated!");
            else {
                // localStorage.setItem(TOKEN_KEY, keycloakClient.token as string);
                console.log("TOKEN", keycloakClient.token as string);
                callback();
            }
        })
        .catch(console.error);
}

const redirectSignIn = () => {
    window.location.href = keycloakClient.createLoginUrl({redirectUri: "http://localhost:5173/notes"});
}

export default {
    initializeKeycloak,
    redirectSignIn
}