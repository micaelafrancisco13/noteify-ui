import useAuth from "../../hooks/useAuth.ts";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import { Navigate } from "react-router";


function SignInForm() {
    const { getCurrentUser, signIn } = useAuth();

    useEffect(() => {
        if (!getCurrentUser()) signIn();
    }, [getCurrentUser]);

    if (getCurrentUser())
        return <Navigate to="/"/>;

    return <Typography>Redirecting to keycloak...</Typography>
}

export default SignInForm;
