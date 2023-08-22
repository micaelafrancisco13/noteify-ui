import { Typography } from '@mui/material';
import { useEffect } from 'react';
import useAuth from "../../hooks/useAuth.ts";
import { Navigate } from "react-router-dom";

function Callback() {
    const { signInCallback, getCurrentUser } = useAuth();

    useEffect(() => {
        console.log("callback callback")
        signInCallback();
    }, []);

    if (getCurrentUser()) return <Navigate to="/"/>;

    return (
        <Typography>Processing authentication...</Typography>
    );
}

export default Callback;