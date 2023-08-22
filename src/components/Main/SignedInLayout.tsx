import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ReactNode, RefObject } from "react";
import NavBarSignedIn from "../NavBar/NavBarSignedIn.tsx";

const StyledBox = styled(Box, {
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
    onDrawerToggle: (value: boolean) => void;
}

function SignedInLayout({
                            drawerToggle,
                            drawerRef,
                            children,
                            onDrawerToggle,
                        }: Props) {
    const drawerWidth = drawerRef.current?.offsetWidth;

    return (
        <>
            <NavBarSignedIn
                drawerToggle={drawerToggle}
                onDrawerToggle={(toggle) => onDrawerToggle(toggle)}
                drawerRef={drawerRef}
            />
            <StyledBox
                drawerToggle={drawerToggle}
                drawerWidth={drawerToggle ? drawerWidth : 0}
            >
                <Box sx={{ py: 4, px: 2 }}>{children}</Box>
            </StyledBox>
        </>
    );
}

export default SignedInLayout;
