import { useEffect, useState } from "react";
import accountService, { Account } from "../services/account-service.ts";
import { AxiosError } from "axios";

function useAccount() {
  const [accountDetails, setAccountDetails] = useState<Account | null>(null);
  const [isFetchingAccountDetails, setIsFetchingAccountDetails] =
    useState(false);
  const [error, setError] = useState<AxiosError>();

  useEffect(() => {
    const result = accountService.getOne<Account>();
    if (result) {
      setIsFetchingAccountDetails(true);
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

  const accountDetailsErrorMessage = error?.message;
  const accountDetailsStatusCode = error?.response?.status;

  return {
    accountDetails,
    isFetchingAccountDetails,
    accountDetailsErrorMessage,
    accountDetailsStatusCode,
  };
}

export default useAccount;
