import PersonalDetails from "./PersonalDetails.tsx";
import EmailDetail from "./EmailDetail.tsx";
import PasswordDetail from "./PasswordDetail.tsx";
import { Stack } from "@mui/material";
import useAccount from "../../hooks/useAccount.ts";

interface Props {
  drawerToggle: boolean;
}

function Account({ drawerToggle }: Props) {
  const { accountDetails } = useAccount();

  return (
    <Stack spacing={8}>
      <PersonalDetails
        firstName={accountDetails.firstName}
        lastName={accountDetails.lastName}
        drawerToggle={drawerToggle}
      />
      <EmailDetail drawerToggle={drawerToggle} />
      <PasswordDetail drawerToggle={drawerToggle} />
    </Stack>
  );
}

export default Account;
