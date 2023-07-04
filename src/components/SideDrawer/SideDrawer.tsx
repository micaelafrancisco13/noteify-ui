import { Box, Drawer, Toolbar } from "@mui/material";
import { ReactNode, RefObject } from "react";
import SideDrawerMenuItems, {
  DrawerMenuItem,
} from "../common/SideDrawerMenuItems.tsx";
import { styled } from "@mui/material/styles";

type Anchor = "left" | "top" | "right" | "bottom" | undefined;

const StyledDrawer = styled(Drawer, {
  // shouldForwardProp: (prop) => prop !== "anchor",
})<{
  anchor: Anchor;
}>(({ theme, anchor }) => ({
  "& .MuiDrawer-paper": {
    background: anchor !== "top" && theme.palette.secondary.dark,
    [theme.breakpoints.up("sm")]: {
      maxWidth: anchor === "top" ? "100%" : theme.spacing(270 / 8),
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: theme.spacing(305 / 8),
    },
  },
}));

interface Props {
  anchor: Anchor;
  drawerToggle: boolean;
  onDrawerToggle: (toggle: boolean) => void;
  drawerRef: RefObject<HTMLDivElement>;
  stackSpacing: number;
  stackDirection: "row" | "column";
  dominantItem?: ReactNode;
  menuItems: DrawerMenuItem[];
}

function SideDrawer({
  anchor,
  drawerToggle,
  onDrawerToggle,
  drawerRef,
  dominantItem,
  stackSpacing,
  stackDirection,
  menuItems,
}: Props) {
  return (
    <>
      <StyledDrawer
        anchor={anchor}
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
            stackSpacing={stackSpacing}
            stackDirection={stackDirection}
            dominantItem={dominantItem}
            menuItems={menuItems}
          />
        </Box>
      </StyledDrawer>
    </>
  );
}

export default SideDrawer;
