import { Avatar, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import AnchorMenu from "../common/AnchorMenu.tsx";
import { useNavigate } from "react-router-dom";

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 32,
  height: 32,
  [theme.breakpoints.up("sm")]: {
    width: 34,
    height: 34,
  },
  [theme.breakpoints.up("lg")]: {
    width: 36,
    height: 36,
  },
  background: "#131313",
  border: `2px solid ${theme.palette.accent_pale_green.main}`,
  color: theme.palette.accent_pale_green.main,
}));

function SettingsPopup() {
  const navigate = useNavigate();

  const menu = [
    {
      name: "Account",
      execute() {
        navigate("/account");
      },
    },
    {
      name: "Log out",
      execute() {
        navigate("/auth/sign-out");
      },
    },
  ];

  return (
    <AnchorMenu
      buttonChildren={
        <IconButton size="small">
          <StyledAvatar aria-label="Display image">
            <Typography>M</Typography>
          </StyledAvatar>
        </IconButton>
      }
      title={"Account settings"}
      menu={menu}
    />
  );
}

export default SettingsPopup;
