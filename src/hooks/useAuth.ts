import authService, { Auth } from "../services/auth-service.ts";
import { SignInFormData } from "../components/AuthForm/SignInForm.tsx";
function useAuth() {
  const signIn = (data: SignInFormData) => {
    authService
      .create(data)
      .then((res) => {
        console.log("res.data", res.data);
      })
      .catch((err) => {
        console.log("error signing-in", err);
      });
  };
}

export default useAuth;
