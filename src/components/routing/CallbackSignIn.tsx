import { Typography } from '@mui/material';
import { useEffect } from 'react';
import useAuth from "../../hooks/useAuth.ts";
import { Navigate } from "react-router-dom";

function CallbackSignIn() {
    const { signInCallback, getCurrentUser } = useAuth();

    useEffect(() => {
        signInCallback();
    }, []);

    if (getCurrentUser()) return <Navigate to="/"/>;

    return (
        <Typography>Processing authentication...</Typography>
    );
}

export default CallbackSignIn;