import { Box, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ReactNode, useState } from "react";

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

export interface AnchorMenuItemProps {
  name: string;
  icon?: ReactNode;
  execute: () => void;
}

interface Props {
  buttonChildren: ReactNode;
  title: string;
  menu: AnchorMenuItemProps[];
}

function AnchorMenu({ buttonChildren, title, menu }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title={title}>
        <Box
          aria-controls={open ? "menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={(event) => setAnchorEl(event.currentTarget)}
        >
          {buttonChildren}
        </Box>
      </Tooltip>
      <StyledMenu
        id="menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        MenuListProps={{
          "aria-labelledby": title,
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
        {menu.map((menu, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              handleClose();
              menu.execute();
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography fontSize="15px">{menu.name}</Typography>
              {menu.icon}
            </Box>
          </MenuItem>
        ))}
      </StyledMenu>
    </>
  );
}

export default AnchorMenu;
