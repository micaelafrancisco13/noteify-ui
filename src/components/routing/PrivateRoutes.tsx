import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth.ts";

function PrivateRoutes() {
    const { getCurrentUser } = useAuth();

    if (!getCurrentUser()) return <Navigate to="/auth/sign-in"/>;

    return <Outlet/>;
}

export default PrivateRoutes;
