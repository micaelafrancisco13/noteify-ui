import NoteIfyLogo from "../../assets/NoteIfy-logo.png";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

function Logo() {
  return (
    <Box
      sx={{
        display: "flex",
      }}
      component={Link}
      to="/"
    >
      <img
        width="28px"
        height="28px"
        src={NoteIfyLogo}
        alt="NoteIfy official logo"
      />
    </Box>
  );
}

export default Logo;
