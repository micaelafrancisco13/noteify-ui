import { useState } from "react";
import { AxiosError } from "axios";
import { SignUpFormData } from "../components/AuthForm/SignUpForm.tsx";
import userService from "../services/user-service.ts";
import useAuth from "./useAuth.ts";

function useUser() {
    const [isCreatingAnAccount, setIsCreatingAnAccount] = useState(false);
    const [createAnAccountError, setCreateAnAccountError] =
        useState<AxiosError>();
    const { signInUponRegistration } = useAuth();

    const createAnAccount = (data: SignUpFormData) => {
        const { confirmPassword, ...rest } = data;
        setIsCreatingAnAccount(true);
        userService
            .create(rest)
            .then((res) => {
                setIsCreatingAnAccount(false);
                const token = res.headers.authorization;
                signInUponRegistration(token);
                window.location.assign("/");
            })
            .catch((err) => {
                setIsCreatingAnAccount(false);
                setCreateAnAccountError(err);
            });
    };

    return { createAnAccount, isCreatingAnAccount, createAnAccountError };
}

export default useUser;
