import { useEffect } from "react";
import useAuth from "../../hooks/useAuth.ts";

function SignOut() {
  const { signOut } = useAuth();

  useEffect(() => {
    signOut();

    window.location.assign("/");
  }, []);

  return null;
}

export default SignOut;
