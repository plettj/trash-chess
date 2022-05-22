import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import TopBar from "./components/TopBar";
import PlayPage from "./pages/PlayPage";
import getTheme from "./assets/theme";

export default function TrashChess() {
  return (
    <ThemeProvider theme={getTheme()}>
        <Box flex={1} overflow="hidden">
          <Box sx={{ flexGrow: 1 }}>
            <TopBar />
          </Box>
            <PlayPage></PlayPage>
        </Box>
    </ThemeProvider>
  );
}