import { PasswordDetailFormData } from "../components/Account/PasswordDetail.tsx";

const passwordDetail: PasswordDetailFormData = {
  password: "myNewPassword123",
};

export function updatePasswordDetail(data: PasswordDetailFormData) {
  console.log("update password");
  passwordDetail.password = data.password;
}
