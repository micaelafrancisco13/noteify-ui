import {
  AppBar,
  Box,
  Divider,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { RefObject } from "react";
import SideDrawer from "../SideDrawer/SideDrawer.tsx";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../common/Logo.tsx";
import ToggleButton from "./ToggleButton.tsx";
import { StyledDrawerListButton } from "../common/SideDrawerMenuItems.tsx";
import { useTheme } from "@mui/material/styles";
import { navbarLinks } from "../../utils/navbarLinks.ts";

interface Props {
  drawerToggle: boolean;
  onDrawerToggle: (toggle: boolean) => void;
  drawerRef: RefObject<HTMLDivElement>;
}

function NavBarSignedOut({ drawerToggle, onDrawerToggle, drawerRef }: Props) {
  const navigate = useNavigate();
  const smallScreen = useMediaQuery(useTheme().breakpoints.down("sm"));

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

          {smallScreen ? (
            <ToggleButton
              drawerToggle={drawerToggle}
              onDrawerToggle={onDrawerToggle}
            />
          ) : (
            <>
              {navbarLinks.map(({ ariaLabel, navigateTo, label }, index) => (
                <StyledDrawerListButton
                  key={index}
                  color="simple_white"
                  aria-label={ariaLabel}
                  component={Link}
                  to={navigateTo}
                  onClick={() => {
                    onDrawerToggle(false);
                  }}
                  sx={{ padding: "9px 14px" }}
                >
                  <Typography fontWeight={700}>{label}</Typography>
                </StyledDrawerListButton>
              ))}
            </>
          )}
        </Toolbar>
        {smallScreen && <Divider />}
      </AppBar>
      <SideDrawer
        anchor="top"
        drawerToggle={drawerToggle}
        onDrawerToggle={onDrawerToggle}
        stackSpacing={2}
        stackDirection="row"
        drawerRef={drawerRef}
        dominantItem={
          <>
            {navbarLinks.map(({ ariaLabel, navigateTo, label }, index) => (
              <StyledDrawerListButton
                key={index}
                color="simple_white"
                aria-label={ariaLabel}
                component={Link}
                to={navigateTo}
                onClick={() => {
                  onDrawerToggle(false);
                }}
                sx={{ padding: "9px 14px" }}
              >
                <Typography fontWeight={700}>{label}</Typography>
              </StyledDrawerListButton>
            ))}
          </>
        }
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
