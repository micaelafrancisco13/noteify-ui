import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { RefObject } from "react";
import Notes from "./Notes.tsx";

const StyledMain = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "drawerToggle" && prop !== "drawerWidth",
})<{
  drawerToggle: boolean;
  drawerWidth?: number;
}>(({ theme, drawerToggle, drawerWidth }) => ({
  flexGrow: 1,
  marginLeft: 0,
  [theme.breakpoints.up("sm")]: {
    marginLeft: `${drawerWidth}px`,
  },
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(drawerToggle && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface Props {
  drawerToggle: boolean;
  drawerRef: RefObject<HTMLDivElement>;
}

function Main({ drawerToggle, drawerRef }: Props) {
  return (
    <StyledMain
      drawerToggle={drawerToggle}
      drawerWidth={drawerToggle ? drawerRef.current?.offsetWidth : 0}
    >
      <Box sx={{ p: 2 }}>
        <Typography>App</Typography>
        <Notes drawerToggle={drawerToggle} />
      </Box>
    </StyledMain>
  );
}

export default Main;
