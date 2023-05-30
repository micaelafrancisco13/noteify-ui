import { Box, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import theme from "./theme.ts";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box component="main">
        <Typography>App</Typography>
      </Box>
    </ThemeProvider>
  );
}

export default App;
