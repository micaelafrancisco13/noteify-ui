import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { RefObject } from "react";
import SideDrawer from "../SideDrawer/SideDrawer.tsx";
import ToggleButton from "./ToggleButton.tsx";
import HomeButton from "./HomeButton.tsx";
import SettingsPopup from "./SettingsPopup.tsx";
import _ from "lodash";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { styled, useTheme } from "@mui/material/styles";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CustomButton from "../custom/CustomButton.tsx";

const StyledBox = styled(Box)(() => ({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
})) as typeof Box;

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

function NavBarSignedIn({ drawerToggle, onDrawerToggle, drawerRef }: Props) {
  const navigate = useNavigate();
  const searchParams = useSearchParams()[0];
  const match = useMediaQuery(useTheme().breakpoints.down("sm"));
  const { date } = Object.fromEntries([...searchParams]);
  const handleAppendQueryParam = (value: string) => {
    handleDrawerClose();
    navigate(`/notes?date=${value}`);
  };

  const handleDrawerClose = () => {
    onDrawerToggle(!match);
  };

  const buttonChildren = ["Today", "Upcoming", "Archived"].map((value) => (
    <StyledBox>
      <Typography color={(theme) => theme.palette.text.primary} variant="body2">
        {value}
      </Typography>
      {_.camelCase(value) === date && (
        <BeenhereIcon fontSize="small" sx={{ color: "white" }} />
      )}
    </StyledBox>
  ));

  return (
    <>
      <AppBar
        elevation={0}
        position={"fixed"}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar
          disableGutters={true}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            background: (theme) => theme.palette.secondary.main,
          }}
        >
          <Box>
            <ToggleButton
              drawerToggle={drawerToggle}
              onDrawerToggle={onDrawerToggle}
            />
            <HomeButton />
          </Box>
          <SettingsPopup />
        </Toolbar>
      </AppBar>
      <SideDrawer
        anchor="left"
        drawerToggle={drawerToggle}
        onDrawerToggle={onDrawerToggle}
        drawerRef={drawerRef}
        stackSpacing={0}
        stackDirection="column"
        dominantItem={
          <StyledListButton
            color="primary"
            aria-label={`Create new notes`}
            startIcon={<AddCircleIcon sx={{ width: "24px", height: "24px" }} />}
            component={Link}
            to="/notes/new"
            onClick={handleDrawerClose}
          >
            <Typography color={(theme) => theme.palette.text.primary}>
              New note
            </Typography>
          </StyledListButton>
        }
        menuItems={[
          {
            color: "accent_green",
            ariaLabel: `Today's notes`,
            startIcon: <TodayOutlinedIcon />,
            onSelectMenuItem: () => handleAppendQueryParam("today"),
            buttonChildren: buttonChildren[0],
          },
          {
            color: "accent_purple",
            ariaLabel: `Upcoming notes`,
            startIcon: <DateRangeOutlinedIcon />,
            onSelectMenuItem: () => handleAppendQueryParam("upcoming"),
            buttonChildren: buttonChildren[1],
          },
          {
            color: "accent_brown",
            ariaLabel: `Archived notes`,
            startIcon: <EventAvailableIcon />,
            onSelectMenuItem: () => handleAppendQueryParam("archived"),
            buttonChildren: buttonChildren[2],
          },
        ]}
      />
      <Toolbar disableGutters={true} />
    </>
  );
}

export default NavBarSignedIn;
