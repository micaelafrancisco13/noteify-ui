import { Box, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import useAuth from "../../hooks/useAuth.ts";
import { Navigate } from "react-router-dom";
import DisplayImage from "./DisplayImage.tsx";
import { styled, useTheme } from "@mui/material/styles";
import SocialMedia from "../common/SocialMedia.tsx";
import { MyLink, myLinks } from "../../utils/myLinks.ts";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";

const StyledBox = styled(Box)(() => ({
    padding: "24px",
}));

const StyledImageContainer = styled(Box)(() => ({
    width: "100%",
    maxWidth: "420px",
}));

function AboutTheDev() {
    const match = useMediaQuery(useTheme().breakpoints.up("sm"));

    const { getCurrentUser } = useAuth();
    if (getCurrentUser()) return <Navigate to="/"/>;

    const doubleBreak = (
        <>
            <br/>
            <br/>
        </>
    );

    const icons = [<LinkedInIcon/>, <LanguageIcon/>];
    const myLinksWithIcon: MyLink[] = myLinks.map((link, index) => {
        return { ...link, socialIcon: icons[index] };
    });

    return (
        <StyledBox>
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{
                    height: `calc(100vh - 88px)`,
                }}
                spacing={4}
            >
                <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
                    <Stack spacing={2}>
                        <Typography
                            component="h1"
                            fontSize="40px"
                            textAlign={match ? "left" : "center"}
                        >
                            About the <span className="developer-text">Developer</span>
                        </Typography>
                        <Typography fontSize="18px" textAlign={match ? "left" : "center"}>
                            Hi, I'm Ela! After completing my internship and before embarking
                            on my full-time role as a software engineer, I took the initiative
                            to create this web app, driven by my desire to further refine my
                            skills in full-stack web development. {doubleBreak} Utilizing the
                            MERN stack for the 2nd time, I developed this application, while
                            also gaining prior experience with the Spring framework during my
                            internship. If you'd like to learn more about me and my work, feel
                            free to explore one of my social media profiles provided below.
                        </Typography>
                        <Stack
                            direction="row"
                            justifyContent={match ? "left" : "center"}
                            spacing={1}
                        >
                            {myLinksWithIcon.map(
                                ({ link, linkTitle, buttonTitle, socialIcon }, index) => (
                                    <SocialMedia
                                        key={index}
                                        link={link}
                                        linkTitle={linkTitle}
                                        buttonTitle={buttonTitle}
                                        socialIcon={socialIcon}
                                    />
                                )
                            )}
                        </Stack>
                    </Stack>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    order={{ xs: 1, md: 2 }}
                >
                    <StyledImageContainer>
                        <DisplayImage/>
                    </StyledImageContainer>
                </Grid>
            </Grid>
        </StyledBox>
    );
}

export default AboutTheDev;
