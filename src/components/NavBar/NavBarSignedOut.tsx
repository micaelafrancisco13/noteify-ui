import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { RefObject } from "react";
import SideDrawer from "../SideDrawer/SideDrawer.tsx";
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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        py: "5px",
        px: "3px",
      }}
    >
      <Typography fontWeight={700}>{value}</Typography>
    </Box>
  ));

  return (
    <>
      <AppBar
        elevation={0}
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar
          disableGutters={true}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Logo />
          <ToggleButton
            drawerToggle={drawerToggle}
            onDrawerToggle={onDrawerToggle}
          />
        </Toolbar>
      </AppBar>
      <SideDrawer
        anchor="top"
        drawerToggle={drawerToggle}
        onDrawerToggle={onDrawerToggle}
        stackSpacing={2}
        stackDirection="row"
        drawerRef={drawerRef}
        menuItems={[
          {
            color: "simple_white",
            variant: "outlined",
            ariaLabel: `Sign in to your account`,
            onSelectMenuItem: () => {
              navigate(`/auth/sign-in`);
              onDrawerToggle(false);
            },
            buttonChildren: buttonChildren[0],
          },
          {
            color: "primary",
            variant: "outlined",
            ariaLabel: `Register an account`,
            onSelectMenuItem: () => {
              navigate(`/auth/sign-up`);
              onDrawerToggle(false);
            },
            buttonChildren: buttonChildren[1],
          },
        ]}
      />
      <Toolbar disableGutters={true} />
    </>
  );
}

export default NavBarSignedOut;
