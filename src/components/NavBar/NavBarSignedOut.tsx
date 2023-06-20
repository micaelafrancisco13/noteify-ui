import { AppBar, Box, Toolbar } from "@mui/material";
import { RefObject } from "react";
import SideDrawer from "../SideDrawer/SideDrawer.tsx";
import ToggleButton from "./ToggleButton.tsx";
import HomeButton from "./HomeButton.tsx";
import SettingsPopup from "./SettingsPopup.tsx";

interface Props {
  drawerToggle: boolean;
  onDrawerToggle: (toggle: boolean) => void;
  drawerRef: RefObject<HTMLDivElement>;
}

function NavBarSignedOut({ drawerToggle, onDrawerToggle, drawerRef }: Props) {
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
          <Box>
            <ToggleButton
              drawerToggle={drawerToggle}
              onDrawerToggle={onDrawerToggle}
            />
            <HomeButton />
          </Box>
          <SettingsPopup />
        </Toolbar>
      </AppBar>
      <SideDrawer
        drawerToggle={drawerToggle}
        onDrawerToggle={onDrawerToggle}
        drawerRef={drawerRef}
      />
      <Toolbar disableGutters={true} />
    </>
  );
}

export default NavBarSignedOut;
