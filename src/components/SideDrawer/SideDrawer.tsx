import {
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { RefObject } from "react";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import { styled } from "@mui/material/styles";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../custom/CustomButton.tsx";

const StyledListButton = styled(CustomButton)(() => ({
  display: "flex",
  justifyContent: "flex-start",
  textTransform: "none",
})) as typeof Button;

interface Props {
  drawerToggle: boolean;
  onDrawerToggle: (toggle: boolean) => void;
  drawerRef: RefObject<HTMLDivElement>;
}

function SideDrawer({ drawerToggle, onDrawerToggle, drawerRef }: Props) {
  const navigate = useNavigate();

  const handleAppendQueryParam = (value: string) => {
    navigate(`/notes?date=${value}`);
  };

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
              color="primary"
              aria-label={`Create new notes`}
              startIcon={
                <AddCircleIcon sx={{ width: "24px", height: "24px" }} />
              }
              component={Link}
              to="/notes/new"
            >
              <Typography color={(theme) => theme.palette.text.primary}>
                New note
              </Typography>
            </StyledListButton>
            <Divider sx={{ my: 2 }} />
            <StyledListButton
              color="accent_green"
              aria-label={`Today's notes`}
              startIcon={<TodayOutlinedIcon />}
              onClick={() => handleAppendQueryParam("today")}
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
              aria-label={`Upcoming notes`}
              startIcon={<DateRangeOutlinedIcon />}
              onClick={() => handleAppendQueryParam("upcoming")}
            >
              <Typography
                color={(theme) => theme.palette.text.primary}
                variant="body2"
              >
                Upcoming
              </Typography>
            </StyledListButton>
            <StyledListButton
              color="accent_brown"
              aria-label={`Archived notes`}
              startIcon={<BeenhereIcon />}
              onClick={() => handleAppendQueryParam("archived")}
            >
              <Typography
                color={(theme) => theme.palette.text.primary}
                variant="body2"
              >
                Archived
              </Typography>
            </StyledListButton>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}

export default SideDrawer;
