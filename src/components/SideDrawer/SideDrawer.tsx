import {
  Box,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { ReactElement, RefObject } from "react";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import { styled } from "@mui/material/styles";
import CustomButton from "../custom/CustomButton.tsx";

const StyledListButton = styled(CustomButton)(() => ({
  display: "flex",
  justifyContent: "flex-start",
  textTransform: "none",
}));

interface Props {
  drawerToggle: boolean;
  onDrawerToggle: (toggle: boolean) => void;
  drawerRef: RefObject<HTMLDivElement>;
  homeButton: ReactElement | null;
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
          <Stack paddingX={18 / 8} paddingY={30 / 8}>
            <StyledListButton
              color="accent_green"
              variant="text"
              startIcon={<TodayOutlinedIcon />}
            >
              <Typography
                color={(theme) => theme.palette.text.primary}
                variant="body2"
              >
                Today
              </Typography>
            </StyledListButton>
            <StyledListButton
              color="accent_purple"
              variant="text"
              startIcon={<DateRangeOutlinedIcon />}
            >
              <Typography
                color={(theme) => theme.palette.text.primary}
                variant="body2"
              >
                Upcoming
              </Typography>
            </StyledListButton>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}

export default SideDrawer;
