import { Box, Drawer, Toolbar } from "@mui/material";
import { ReactNode, RefObject } from "react";
import SideDrawerMenuItems, {
  DrawerMenuItem,
} from "../common/SideDrawerMenuItems.tsx";

interface Props {
  drawerToggle: boolean;
  onDrawerToggle: (toggle: boolean) => void;
  drawerRef: RefObject<HTMLDivElement>;
  dominantItem?: ReactNode;
  menuItems: DrawerMenuItem[];
}

function SideDrawer({
  drawerToggle,
  onDrawerToggle,
  drawerRef,
  dominantItem,
  menuItems,
}: Props) {
  return (
    <>
      <Drawer
        variant="persistent"
        ModalProps={{
          hideBackdrop: true,
        }}
        open={drawerToggle}
        onClose={() => onDrawerToggle(false)}
      >
        <Box ref={drawerRef}>
          <Toolbar />
          <SideDrawerMenuItems
            dominantItem={dominantItem}
            menuItems={menuItems}
          />
        </Box>
      </Drawer>
    </>
  );
}

export default SideDrawer;
