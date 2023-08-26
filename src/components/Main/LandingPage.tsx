import { Box, Typography, useMediaQuery } from "@mui/material";
import { StyledDrawerListButton } from "../common/SideDrawerMenuItems.tsx";
import { Link } from "react-router-dom";
import { authLinks } from "../../utils/navbarLinks.ts";
import { useTheme } from "@mui/material/styles";

function LandingPage() {
    const { color, ariaLabel, navigateTo, label } = authLinks[1];
    const match = useMediaQuery(useTheme().breakpoints.up("sm"));

    return (
        <Box
            sx={{
                paddingX: "16px",
                display: "flex",
                height: `calc(${
                    useMediaQuery(useTheme().breakpoints.between("sm", "md"))
                        ? "60vh"
                        : "100vh"
                } - ${match ? "64px" : "56px"})`,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Typography
                component="h1"
                textAlign="center"
                sx={{ fontSize: { xs: "37px", md: "47px" }, fontWeight: 600 }}
            >
                Organize your <br/>
                work and life, finally.
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box sx={{ maxWidth: "475px" }}>
                    <Typography
                        textAlign="center"
                        sx={{ fontSize: { xs: "18px", md: "20.5px" }, my: "24px" }}
                    >
                        Become focused, organized, and calm with NoteIfy. The world’s #1
                        task manager and to-do list app.
                    </Typography>
                </Box>
                <StyledDrawerListButton
                    color={color}
                    variant="contained"
                    aria-label={ariaLabel}
                    component={Link}
                    to={navigateTo}
                    sx={{ padding: "10px 18px", borderRadius: "10px" }}
                >
                    <Typography fontWeight={600}>{label}</Typography>
                </StyledDrawerListButton>
            </Box>
        </Box>
    );
}

export default LandingPage;
