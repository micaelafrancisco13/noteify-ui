import useAuth from "../../hooks/useAuth.ts";
import { useEffect } from "react";
import { Typography } from "@mui/material";

function CallbackSignOut() {
    const { signOutCallback } = useAuth();

    useEffect(() => {
        console.log("callback callback")
        signOutCallback();
    }, []);

    return (
        <Typography>Signing out...</Typography>
    );
}

export default CallbackSignOut;