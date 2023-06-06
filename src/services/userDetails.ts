import { PersonalDetailsFormData } from "../components/Account/PersonalDetails.tsx";

const personalDetails: PersonalDetailsFormData = {
  firstName: "First name",
  lastName: "Last name",
};

export function getPersonalDetails() {
  return personalDetails;
}

export function updatePersonalDetails(data: PersonalDetailsFormData) {
  console.log("update");
  personalDetails.firstName = data.firstName;
  personalDetails.lastName = data.lastName;
}
