import { EmailDetailFormData } from "../components/Account/EmailDetail.tsx";

const emailDetail: EmailDetailFormData = {
  email: "micaela13@gmail.com",
};

export function getEmailDetail() {
  return emailDetail;
}

export function updateEmailDetail(data: EmailDetailFormData) {
  console.log("update email");
  emailDetail.email = data.email;
}
