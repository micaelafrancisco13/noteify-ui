import { useState } from "react";
import { AxiosError } from "axios";
import { SignUpFormData } from "../components/AuthForm/SignUpForm.tsx";
import accountService from "../services/account-service.ts";

function useUser() {
  const [isCreatingAnAccount, setIsCreatingAnAccount] = useState(false);
  const [createAnAccountError, setCreateAnAccountError] =
    useState<AxiosError>();
  const createAnAccount = (data: SignUpFormData) => {
    setIsCreatingAnAccount(true);
    console.log("New user", data);
    accountService
      .create(data)
      .then((res) => {
        setIsCreatingAnAccount(false);
        const token = res.headers["Authorization"];
        console.log(token);
      })
      .catch((err) => {
        setIsCreatingAnAccount(false);
        setCreateAnAccountError(err);
      });
  };

  return { createAnAccount, isCreatingAnAccount, createAnAccountError };
}

export default useUser;
