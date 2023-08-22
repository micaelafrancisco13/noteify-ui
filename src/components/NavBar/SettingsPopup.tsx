import { Avatar, IconButton, useMediaQuery } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import AnchorMenu from "../common/AnchorMenu.tsx";
import { useNavigate } from "react-router-dom";

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
    border: `2px solid ${theme.palette.accent_pale_green.main}`,
    color: theme.palette.accent_pale_green.main,
}));

interface Props {
    onDrawerToggle: (toggle: boolean) => void;
}

function SettingsPopup({ onDrawerToggle }: Props) {
    const match = useMediaQuery(useTheme().breakpoints.up("sm"));
    const navigate = useNavigate();

    const menu = [
        {
            name: "Account",
            execute() {
                navigate("/account");
                if (!match) onDrawerToggle(false);
            },
        },
        {
            name: "Log out",
            execute() {
                navigate("/auth/sign-out");
                if (!match) onDrawerToggle(false);
            },
        },
    ];

    return (
        <AnchorMenu
            buttonChildren={
                <IconButton size="small">
                    <StyledAvatar aria-label="Display image">
                        {/*<Typography>{avatarInitialName?.toUpperCase()}</Typography>*/}
                    </StyledAvatar>
                </IconButton>
            }
            title={"Account settings"}
            menu={menu}
        />
    );
}

export default SettingsPopup;
