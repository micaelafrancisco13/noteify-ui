import jwtDecode from "jwt-decode";

export function getCurrentUser() {
    try {
        const TOKEN_KEY = "keycloak_token";
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) return jwtDecode(token);
    } catch (ex) {
        return null;
    }
}