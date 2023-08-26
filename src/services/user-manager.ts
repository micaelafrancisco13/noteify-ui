import { UserManager } from "oidc-client-ts";

export default new UserManager( {
    authority: "http://localhost:8000",
    client_id: "noteify-react-client",
    metadata: {
        authorization_endpoint:
            "http://localhost:8000/realms/noteify-realm/protocol/openid-connect/auth",
        token_endpoint:
            "http://localhost:8000/realms/noteify-realm/protocol/openid-connect/token",
        end_session_endpoint: "http://localhost:8000/realms/noteify-realm/protocol/openid-connect/logout"
    },
    redirect_uri: "http://localhost:5173/callback-sign-in",
    post_logout_redirect_uri: "http://localhost:5173/callback-sign-out",
})