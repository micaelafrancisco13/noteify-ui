import React from "react";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 32,
  height: 32,
  [theme.breakpoints.up("sm")]: {
    width: 34,
    height: 34,
  },
  [theme.breakpoints.up("lg")]: {
    width: 36,
    height: 36,
  },
  background: "#131313",
  border: `2px solid #5A967E`,
  color: "#5A967E",
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    marginTop: theme.spacing(1.5),
    "& .MuiAvatar-root": {
      width: 32,
      height: 32,
      marginLeft: -0.5,
      marginRight: theme.spacing(1),
    },
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      backgroundColor: "#2f2f2f",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  },
}));

function SettingsPopup() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <StyledAvatar aria-label="Display image">
            <Typography>M</Typography>
          </StyledAvatar>
        </IconButton>
      </Tooltip>
      <StyledMenu
        id="account-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        MenuListProps={{
          "aria-labelledby": "Account settings",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Typography fontSize="15px">Settings</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography fontSize="15px">Log out</Typography>
        </MenuItem>
      </StyledMenu>
    </>
  );
}

export default SettingsPopup;
