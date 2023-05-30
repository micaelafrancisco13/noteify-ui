import { AppBar, IconButton, Toolbar } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { RefObject } from "react";
import SideDrawer from "../SideDrawer/SideDrawer.tsx";

interface Props {
  drawerToggle: boolean;
  onDrawerToggle: (toggle: boolean) => void;
  drawerRef: RefObject<HTMLDivElement>;
}

function NavBar({ drawerToggle, onDrawerToggle, drawerRef }: Props) {
  const homeButton = (
    <IconButton title="Go home">
      <HomeOutlinedIcon />
    </IconButton>
  );

  return (
    <>
      <AppBar elevation={0}>
        <Toolbar disableGutters={true}>
          <SideDrawer
            drawerToggle={drawerToggle}
            onDrawerToggle={onDrawerToggle}
            drawerRef={drawerRef}
            homeButton={homeButton}
          />
          {homeButton}
        </Toolbar>
      </AppBar>
      <Toolbar disableGutters={true} />
    </>
  );
}

export default NavBar;
