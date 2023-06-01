import { Box, Drawer, Stack, Toolbar, Typography } from "@mui/material";
import { RefObject } from "react";
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
}

function SideDrawer({ drawerToggle, onDrawerToggle, drawerRef }: Props) {
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
          <Stack paddingX={18 / 8} paddingY={30 / 8}>
            <StyledListButton
              color="accent_green"
              variant="text"
              aria-label={`Today's notes`}
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
              aria-label={`Upcoming notes`}
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
