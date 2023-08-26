import useAuth from "../../hooks/useAuth.ts";
import { useEffect } from "react";
import { Navigate } from "react-router";
import { Typography } from "@mui/material";
import useUser from "../../hooks/useUser.ts";

function SignUpForm() {
    const { getCurrentUser } = useAuth();
    const { createAnAccount } = useUser();

    useEffect(() => {
        if (!getCurrentUser()) createAnAccount();
    }, [getCurrentUser]);

    if (getCurrentUser())
        return <Navigate to="/"/>;

    return <Typography>Redirecting to keycloak...</Typography>
}

export default SignUpForm;