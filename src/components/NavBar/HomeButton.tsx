import { IconButton } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Link } from "react-router-dom";

function HomeButton() {
    return (
        <IconButton aria-label="Go home" component={Link} to="/">
            <HomeOutlinedIcon/>
        </IconButton>
    );
}

export default HomeButton;
