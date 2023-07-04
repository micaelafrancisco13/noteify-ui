import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import accountService, { Account } from "../services/account-service.ts";
import useAccount from "./useAccount.ts";

function useAvatarInitialName() {
  const [avatarInitialName, setAvatarInitialName] = useState("");
  const [error, setError] = useState<AxiosError>();

  const [isFetchingInitial, setIsFetchingInitial] = useState(false);
  useEffect(() => {
    setIsFetchingInitial(true);
    const result = accountService.getOne<Account>();
    if (result) {
      const { response, cancel } = result;

      response
        .then((res) => {
          setAvatarInitialName(res.data.firstName[0]);
          setIsFetchingInitial(false);
        })
        .catch((err) => {
          setError(err);
          setAvatarInitialName("");
          setIsFetchingInitial(false);
        });

      return () => cancel();
    }
  }, []);

  const { updatePersonalDetailsError } = useAccount();
  const updateInitial = (newInitial: string) => {
    if (!updatePersonalDetailsError) setAvatarInitialName(newInitial);
    else setAvatarInitialName(avatarInitialName);
  };

  console.log("useAvatarInitialName", avatarInitialName);

  const avatarInitialNameErrorMessage = error?.message;
  const avatarInitialNameStatusCode = error?.response?.status;

  return {
    avatarInitialName,
    isFetchingInitial,
    setAvatarInitialName,

    updateInitial,

    avatarInitialNameErrorMessage,
    avatarInitialNameStatusCode,
  };
}

export default useAvatarInitialName;
