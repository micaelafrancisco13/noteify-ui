import PersonalDetails from "./PersonalDetails.tsx";
import CustomButton from "../custom/CustomButton.tsx";
import EmailDetail from "./EmailDetail.tsx";
import { Stack } from "@mui/material";

interface Props {
  drawerToggle: boolean;
}

function Account({ drawerToggle }: Props) {
  const submitButton = (
    <CustomButton
      color="accent_pale_green"
      type="submit"
      variant="contained"
      maxWidth="220px"
      drawerToggle={drawerToggle}
    >
      Submit
    </CustomButton>
  );

  return (
    <Stack spacing={4}>
      <PersonalDetails submitButton={submitButton} />
      <EmailDetail submitButton={submitButton} />
    </Stack>
  );
}

export default Account;
