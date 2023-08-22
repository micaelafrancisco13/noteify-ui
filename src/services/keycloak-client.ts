import Keycloak, {KeycloakInitOptions} from 'keycloak-js';

export const keycloakConfig = new Keycloak({
    url: 'http://localhost:8000',
    realm: 'noteify-realm',
    clientId: 'noteify-react-client'
});

export const keycloakInitialState: KeycloakInitOptions = {
    onLoad: 'login-required',
    // silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    pkceMethod: 'S256',
    checkLoginIframe: false,
    redirectUri: "http://localhost:5173/notes"
};