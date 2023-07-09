import {
  AppBar,
  Box,
  Divider,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { RefObject } from "react";
import SideDrawer from "../SideDrawer/SideDrawer.tsx";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../common/Logo.tsx";
import ToggleButton from "./ToggleButton.tsx";
import {
  customVariants,
  StyledDrawerListButton,
} from "../common/SideDrawerMenuItems.tsx";
import { useTheme } from "@mui/material/styles";
import { authLinks, NavbarLink, navbarLinks } from "../../utils/navbarLinks.ts";

interface Props {
  drawerToggle: boolean;
  onDrawerToggle: (toggle: boolean) => void;
  drawerRef: RefObject<HTMLDivElement>;
}

function NavBarSignedOut({ drawerToggle, onDrawerToggle, drawerRef }: Props) {
  const navigate = useNavigate();
  const match = useMediaQuery(useTheme().breakpoints.down("md"));

  const buttonChildren = authLinks.map(({ label }) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        py: "5px",
        px: "3px",
      }}
    >
      <Typography fontWeight={700}>{label}</Typography>
    </Box>
  ));

  const menuItems = authLinks.map(({ color, ariaLabel, navigateTo }, index) => {
    return {
      color: color,
      variant: "contained" as customVariants,
      ariaLabel: ariaLabel,
      onSelectMenuItem: () => {
        navigate(navigateTo);
        onDrawerToggle(false);
      },
      buttonChildren: buttonChildren[index],
    };
  });

  const getAllNavbarLinks = (links: NavbarLink[], fontWeight: number) => {
    return links.map(({ color, ariaLabel, navigateTo, label }, index) => (
      <StyledDrawerListButton
        key={index}
        color={
          label === "Sign in" ? (match ? "paper_gray" : "simple_white") : color
        }
        variant={label === "Start for free" ? "contained" : "text"}
        aria-label={ariaLabel}
        component={Link}
        to={navigateTo}
        onClick={() => {
          onDrawerToggle(false);
        }}
        sx={{ padding: "10px 18px", borderRadius: "10px" }}
      >
        <Typography fontWeight={label === "Start for free" ? 600 : fontWeight}>
          {label}
        </Typography>
      </StyledDrawerListButton>
    ));
  };

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
          {match ? (
            <ToggleButton
              drawerToggle={drawerToggle}
              onDrawerToggle={onDrawerToggle}
            />
          ) : (
            <Stack direction="row">
              {getAllNavbarLinks(navbarLinks, 400)}
              <Divider orientation="vertical" flexItem sx={{ mx: "8px" }} />
              <Stack direction="row" spacing={1.5}>
                {getAllNavbarLinks(authLinks, 400)}
              </Stack>
            </Stack>
          )}
        </Toolbar>
        {match && <Divider />}
      </AppBar>
      <SideDrawer
        anchor="top"
        drawerToggle={drawerToggle}
        onDrawerToggle={onDrawerToggle}
        stackSpacing={2}
        stackDirection="row"
        drawerRef={drawerRef}
        dominantItem={<>{getAllNavbarLinks(navbarLinks, 700)}</>}
        menuItems={menuItems}
      />
      <Toolbar disableGutters={true} />
    </>
  );
}

export default NavBarSignedOut;
