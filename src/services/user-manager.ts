import { UserManager } from "oidc-client-ts";

export default new UserManager( {
    authority: "http://localhost:8000",
    metadata: {
        issuer: "http://localhost:8000/realms/noteify-realm",
        authorization_endpoint: "http://localhost:8000/realms/noteify-realm/protocol/openid-connect/auth",
        registration_endpoint: "http://localhost:8000/realms/noteify-realm/login-actions/registration",
        token_endpoint: "http://localhost:8000/realms/noteify-realm/protocol/openid-connect/token",
        introspection_endpoint: "http://localhost:8000/realms/noteify-realm/protocol/openid-connect/token/introspect",
        userinfo_endpoint: "http://localhost:8000/realms/noteify-realm/protocol/openid-connect/userinfo",
        end_session_endpoint: "http://localhost:8000/realms/noteify-realm/protocol/openid-connect/logout",
        jwks_uri: "http://localhost:8000/realms/noteify-realm/protocol/openid-connect/certs",
        check_session_iframe: "http://localhost:8000/realms/noteify-realm/protocol/openid-connect/login-status-iframe.html",
    },
    client_id: "noteify-react-client",
    redirect_uri: "http://localhost:5173/callback-sign-in",
    post_logout_redirect_uri: "http://localhost:5173/callback-sign-out",
})