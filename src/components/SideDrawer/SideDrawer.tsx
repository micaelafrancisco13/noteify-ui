import {
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { RefObject } from "react";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import { styled } from "@mui/material/styles";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
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
  const searchParams = useSearchParams()[0];
  const { date } = Object.fromEntries([...searchParams]);
  const match = useMediaQuery(useTheme().breakpoints.down("sm"));

  const handleAppendQueryParam = (value: string) => {
    onDrawerToggle(!match);
    navigate(`/notes?date=${value}`);
  };

  console.log("date", date);

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
              onClick={() => onDrawerToggle(!match)}
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
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  color={(theme) => theme.palette.text.primary}
                  variant="body2"
                >
                  Today
                </Typography>
                {"today" === date && (
                  <BeenhereIcon fontSize="small" sx={{ color: "white" }} />
                )}
              </Box>
            </StyledListButton>
            <StyledListButton
              color="accent_purple"
              aria-label={`Upcoming notes`}
              startIcon={<DateRangeOutlinedIcon />}
              onClick={() => handleAppendQueryParam("upcoming")}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  color={(theme) => theme.palette.text.primary}
                  variant="body2"
                >
                  Upcoming
                </Typography>
                {"upcoming" === date && (
                  <BeenhereIcon fontSize="small" sx={{ color: "white" }} />
                )}
              </Box>
            </StyledListButton>
            <StyledListButton
              color="accent_brown"
              aria-label={`Archived notes`}
              startIcon={<EventAvailableIcon />}
              onClick={() => handleAppendQueryParam("archived")}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  color={(theme) => theme.palette.text.primary}
                  variant="body2"
                >
                  Archived
                </Typography>
                {"archived" === date && (
                  <BeenhereIcon fontSize="small" sx={{ color: "white" }} />
                )}
              </Box>
            </StyledListButton>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}

export default SideDrawer;
