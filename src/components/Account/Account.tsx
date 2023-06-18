import PersonalDetails from "./PersonalDetails.tsx";
import EmailDetail from "./EmailDetail.tsx";
import PasswordDetail from "./PasswordDetail.tsx";
import { Stack } from "@mui/material";

interface Props {
  drawerToggle: boolean;
}

function Account({ drawerToggle }: Props) {
  return (
    <Stack spacing={8} sx={{ maxWidth: "500px" }}>
      <PersonalDetails drawerToggle={drawerToggle} />
      <EmailDetail drawerToggle={drawerToggle} />
      <PasswordDetail drawerToggle={drawerToggle} />
    </Stack>
  );
}

export default Account;
