import { AppBar, Toolbar, Typography } from "@mui/material";
import { RefObject } from "react";
import SideDrawer from "../SideDrawer/SideDrawer.tsx";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import { useNavigate } from "react-router-dom";
import Logo from "../common/Logo.tsx";
import ToggleButton from "./ToggleButton.tsx";

interface Props {
  drawerToggle: boolean;
  onDrawerToggle: (toggle: boolean) => void;
  drawerRef: RefObject<HTMLDivElement>;
}

function NavBarSignedOut({ drawerToggle, onDrawerToggle, drawerRef }: Props) {
  const navigate = useNavigate();

  const buttonChildren = ["Sign in", "Start for free"].map((value) => (
    <Typography>{value}</Typography>
  ));

  return (
    <>
      <AppBar
        elevation={0}
        position={"fixed"}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar
          disableGutters={true}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Logo />
          <ToggleButton
            drawerToggle={drawerToggle}
            onDrawerToggle={onDrawerToggle}
          />
        </Toolbar>
      </AppBar>
      <SideDrawer
        drawerToggle={drawerToggle}
        onDrawerToggle={onDrawerToggle}
        drawerRef={drawerRef}
        menuItems={[
          {
            color: "simple_white",
            ariaLabel: `Sign in to your account`,
            onSelectMenuItem: () => navigate(`/auth/sign-in`),
            buttonChildren: buttonChildren[0],
          },
          {
            color: "primary",
            ariaLabel: `Register an account`,
            startIcon: <DateRangeOutlinedIcon />,
            onSelectMenuItem: () => navigate(`/auth/sign-up`),
            buttonChildren: buttonChildren[1],
          },
        ]}
      />
      <Toolbar disableGutters={true} />
    </>
  );
}

export default NavBarSignedOut;
