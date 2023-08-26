import PersonalDetails from "./PersonalDetails.tsx";
import EmailDetail from "./EmailDetail.tsx";
import PasswordDetail from "./PasswordDetail.tsx";
import { Grid, Stack } from "@mui/material";

interface Props {
    drawerToggle: boolean;
}

function Account({ drawerToggle }: Props) {
    return (
        <Grid
            container
            direction={{
                xs: "column",
                md: drawerToggle ? "column" : "row",
                lg: "row",
            }}
            justifyContent="center"
            alignItems="center"
        >
            <Grid
                item
                xs={12}
                md={6}
                order={{ xs: 1, md: drawerToggle ? 1 : 2, lg: 2 }}
                sx={{ width: "100%" }}
            >
                {/*<DisplayPicture />*/}
            </Grid>
            <Grid
                item
                xs={12}
                md={6}
                order={{ xs: 2, md: drawerToggle ? 2 : 1, lg: 1 }}
                sx={{ width: "100%" }}
            >
                <Stack spacing={8}>
                    <PersonalDetails drawerToggle={drawerToggle}/>
                    <EmailDetail drawerToggle={drawerToggle}/>
                    <PasswordDetail drawerToggle={drawerToggle}/>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default Account;
