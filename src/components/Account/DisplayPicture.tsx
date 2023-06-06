import { Box } from "@mui/material";

function DisplayPicture() {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          width: "200px",
          height: "200px",
          border: "1px solid red",
          borderRadius: "50%",
          mb: 4,
        }}
      >
        Some display picture
      </Box>
    </Box>
  );
}

export default DisplayPicture;
