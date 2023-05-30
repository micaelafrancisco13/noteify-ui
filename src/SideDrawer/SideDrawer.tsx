import { Box, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { RefObject } from "react";

interface Props {
  drawerToggle: boolean;
  onDrawerToggle: (toggle: boolean) => void;
  drawerRef: RefObject<HTMLDivElement>;
  homeButton: JSX.Element;
}

function SideDrawer({
  drawerToggle,
  onDrawerToggle,
  drawerRef,
  homeButton,
}: Props) {
  const toggleButton = (
    <IconButton
      title="Toggle side drawer"
      aria-label="Toggle side drawer"
      onClick={() => onDrawerToggle(!drawerToggle)}
    >
      <MenuOutlinedIcon />
    </IconButton>
  );

  return (
    <>
      {toggleButton}
      <Drawer
        variant="persistent"
        ModalProps={{
          hideBackdrop: true,
        }}
        open={drawerToggle}
        onClose={() => onDrawerToggle(false)}
      >
        <Box ref={drawerRef}>
          <Toolbar disableGutters={true}>
            <>
              {toggleButton}
              {homeButton}
            </>
          </Toolbar>
          <Box paddingX={18 / 8} paddingY={30 / 8}>
            <Typography>Some drawer text</Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export default SideDrawer;
