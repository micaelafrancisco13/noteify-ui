import { useEffect, useState } from "react";
import accountService, { Account } from "../services/account-service.ts";
import { AxiosError } from "axios";
import { PersonalDetailsFormData } from "../components/Account/PersonalDetails.tsx";
import { EmailDetailFormData } from "../components/Account/EmailDetail.tsx";
import { PasswordDetailFormData } from "../components/Account/PasswordDetail.tsx";

function useAccount() {
  const [accountDetails, setAccountDetails] = useState<Account>({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [isFetchingAccountDetails, setIsFetchingAccountDetails] =
    useState(false);
  const [error, setError] = useState<AxiosError>();
  const originalAccountDetails = { ...accountDetails };

  useEffect(() => {
    setIsFetchingAccountDetails(true);
    const result = accountService.getOne<Account>();
    if (result) {
      const { response, cancel } = result;

      response
        .then((res) => {
          setAccountDetails(res.data);
          setIsFetchingAccountDetails(false);
        })
        .catch((err) => {
          setError(err);
          setIsFetchingAccountDetails(false);
        });

      return () => cancel();
    }
  }, []);

  const [isUpdatingPersonalDetails, setIsUpdatingPersonalDetails] =
    useState(false);
  const [updatePersonalDetailsError, setUpdatePersonalDetailsError] =
    useState<AxiosError>();
  const updatePersonalDetails = (data: PersonalDetailsFormData) => {
    setIsUpdatingPersonalDetails(true);
    setAccountDetails({
      firstName: data.firstName,
      lastName: data.lastName,
      email: accountDetails.email,
    });

    accountService
      .update({
        _id: "personal",
        ...data,
      })
      .then((res) => {
        setAccountDetails(res.data);
        setIsUpdatingPersonalDetails(false);
      })
      .catch((err) => {
        setAccountDetails(originalAccountDetails);
        setUpdatePersonalDetailsError(err);
        setIsUpdatingPersonalDetails(false);
      });
  };

  const [isUpdatingEmailDetail, setIsUpdatingEmailDetail] = useState(false);
  const [updateEmailDetailError, setUpdateEmailDetailError] =
    useState<AxiosError>();
  const updateEmailDetail = (data: EmailDetailFormData) => {
    setIsUpdatingEmailDetail(true);
    setAccountDetails({
      firstName: accountDetails.firstName,
      lastName: accountDetails.lastName,
      email: data.email,
    });

    console.log("data.email", data.email);

    accountService
      .update({
        _id: "email",
        ...data,
      })
      .then((res) => {
        setAccountDetails(res.data);
        setIsUpdatingEmailDetail(false);
      })
      .catch((err) => {
        setAccountDetails(originalAccountDetails);
        setUpdateEmailDetailError(err);
        setIsUpdatingEmailDetail(false);
      });
  };

  const [isUpdatingPasswordDetail, setIsUpdatingPasswordDetail] =
    useState(false);
  const [updatePasswordDetailError, setUpdatePasswordDetailError] =
    useState<AxiosError>();
  const [passwordChangedSuccessPrompt, setPasswordChangedSuccessPrompt] =
    useState("");
  const updatePasswordDetail = (data: PasswordDetailFormData) => {
    setIsUpdatingPasswordDetail(true);

    accountService
      .update({
        _id: "password",
        ...data,
      })
      .then(() => {
        setIsUpdatingPasswordDetail(false);
        setPasswordChangedSuccessPrompt("Password was successfully changed!");
      })
      .catch((err) => {
        setUpdatePasswordDetailError(err);
        setIsUpdatingPasswordDetail(false);
      });
  };

  return {
    accountDetails,
    isFetchingAccountDetails,
    error,

    updatePersonalDetails,
    isUpdatingPersonalDetails,
    updatePersonalDetailsError,
    setUpdatePersonalDetailsError,

    updateEmailDetail,
    isUpdatingEmailDetail,
    updateEmailDetailError,
    setUpdateEmailDetailError,

    updatePasswordDetail,
    isUpdatingPasswordDetail,
    updatePasswordDetailError,
    setUpdatePasswordDetailError,
    passwordChangedSuccessPrompt,
  };
}

export default useAccount;
