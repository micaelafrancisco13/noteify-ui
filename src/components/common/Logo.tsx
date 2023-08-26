import NoteIfyLogo from "../../assets/NoteIfy-logo.png";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

function Logo() {
    return (
        <Box
            sx={{
                display: "flex",
                width: "28px",
                height: "28px",
            }}
            component={Link}
            to="/"
        >
            <img src={NoteIfyLogo} alt="NoteIfy official logo"/>
        </Box>
    );
}

export default Logo;
