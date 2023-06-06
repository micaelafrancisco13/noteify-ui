import PersonalDetails from "./PersonalDetails.tsx";
import CustomButton from "../custom/CustomButton.tsx";

interface Props {
  drawerToggle: boolean;
}

function Account({ drawerToggle }: Props) {
  return (
    <>
      <PersonalDetails
        submitButton={
          <CustomButton
            color="accent_pale_green"
            type="submit"
            variant="contained"
            maxWidth="220px"
            drawerToggle={drawerToggle}
          >
            Submit
          </CustomButton>
        }
      />
    </>
  );
}

export default Account;
