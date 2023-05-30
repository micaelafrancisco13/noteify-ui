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
  return (
    <>
      <AppBar elevation={0}>
        <Toolbar>
          <SideDrawer
            drawerToggle={drawerToggle}
            onDrawerToggle={onDrawerToggle}
            drawerRef={drawerRef}
          />
          <IconButton title="Go home">
            <HomeOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}

export default NavBar;
