import {
  Box,
  Button,
  Divider,
  Drawer,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { RefObject } from "react";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import CustomButton from "../custom/CustomButton.tsx";
import SideDrawerMenuItems, {
  DrawerMenuItem,
} from "../common/SideDrawerMenuItems.tsx";
import _ from "lodash";

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

  const handleDrawerClose = () => {
    onDrawerToggle(!match);
  };

  const handleAppendQueryParam = (value: string) => {
    handleDrawerClose();
    navigate(`/notes?date=${value}`);
  };

  console.log("date", date);

  const buttonChildren = ["Today", "Upcoming", "Archived"].map((value) => (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <Typography color={(theme) => theme.palette.text.primary} variant="body2">
        {value}
      </Typography>
      {_.camelCase(value) === date && (
        <BeenhereIcon fontSize="small" sx={{ color: "white" }} />
      )}
    </Box>
  ));

  const sideDrawerMenu: DrawerMenuItem[] = [
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
  ];

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
            dominantItem={
              <>
                <StyledListButton
                  color="primary"
                  aria-label={`Create new notes`}
                  startIcon={
                    <AddCircleIcon sx={{ width: "24px", height: "24px" }} />
                  }
                  component={Link}
                  to="/notes/new"
                  onClick={handleDrawerClose}
                >
                  <Typography color={(theme) => theme.palette.text.primary}>
                    New note
                  </Typography>
                </StyledListButton>
                <Divider sx={{ my: 2 }} />
              </>
            }
            menuItems={sideDrawerMenu}
          />
        </Box>
      </Drawer>
    </>
  );
}

export default SideDrawer;
