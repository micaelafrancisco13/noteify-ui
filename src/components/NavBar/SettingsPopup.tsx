import { Avatar, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import AnchorMenu from "../common/AnchorMenu.tsx";

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
  border: `2px solid #5A967E`,
  color: "#5A967E",
}));

function getMenu() {
  return [
    {
      name: "Settings",
      execute() {
        console.log("some settings func");
      },
    },
    {
      name: "Log out",
      execute() {
        console.log("some log out func");
      },
    },
  ];
}

function SettingsPopup() {
  const menu = getMenu();

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
