import PersonalDetails from "./PersonalDetails.tsx";
import CustomButton from "../custom/CustomButton.tsx";
import EmailDetail from "./EmailDetail.tsx";
import PasswordDetail from "./PasswordDetail.tsx";
import { Stack } from "@mui/material";
import useAccount from "../../hooks/useAccount.ts";

interface Props {
  drawerToggle: boolean;
}

function Account({ drawerToggle }: Props) {
  const { accountDetails } = useAccount();

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
    <Stack spacing={8}>
      <PersonalDetails
        submitButton={submitButton}
        firstName={accountDetails?.firstName as string}
        lastName={accountDetails?.lastName as string}
      />
      <EmailDetail submitButton={submitButton} />
      <PasswordDetail submitButton={submitButton} />
    </Stack>
  );
}

export default Account;
