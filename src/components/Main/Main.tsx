import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ReactNode, RefObject } from "react";

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
  children: ReactNode;
}

function Main({ drawerToggle, drawerRef, children }: Props) {
  return (
    <StyledMain
      drawerToggle={drawerToggle}
      drawerWidth={drawerToggle ? drawerRef.current?.offsetWidth : 0}
    >
      <Box sx={{ py: 4, px: 2 }}>{children}</Box>
    </StyledMain>
  );
}

export default Main;
