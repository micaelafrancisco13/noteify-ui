import { Box, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { RefObject } from "react";

interface Props {
  drawerToggle: boolean;
  onDrawerToggle: (toggle: boolean) => void;
  drawerRef: RefObject<HTMLDivElement>;
}

function SideDrawer({ drawerToggle, onDrawerToggle, drawerRef }: Props) {
  return (
    <>
      <IconButton
        title="Toggle side drawer"
        aria-label="Toggle side drawer"
        onClick={() => onDrawerToggle(!drawerToggle)}
      >
        <MenuOutlinedIcon />
      </IconButton>
      <Drawer
        variant="persistent"
        ModalProps={{
          hideBackdrop: true,
        }}
        open={drawerToggle}
        onClose={() => onDrawerToggle(false)}
      >
        <Box ref={drawerRef}>
          <Toolbar>dsds</Toolbar>
          <Box paddingX={3} paddingY={4}>
            <Typography>Some drawer text</Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export default SideDrawer;
