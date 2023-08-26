import userManager from "../services/user-manager.ts";

function useUser() {
    const signUp = () => {
        userManager.signinRedirect()
            .then((response) =>  console.log(response))
            .catch((exception) => console.log(exception));
    };

    return { createAnAccount: signUp };
}

export default useUser;
