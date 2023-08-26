import useAuth from "../../hooks/useAuth.ts";
import { useEffect } from "react";
import { Typography } from "@mui/material";

function CallbackSignOut() {
    const { signOutCallback } = useAuth();

    useEffect(() => {
        signOutCallback();
    }, []);

    return (
        <Typography>Signing out...</Typography>
    );
}

export default CallbackSignOut;