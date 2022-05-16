import "./App.css";
import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TrashChess from "./Root";

const mainTheme = createTheme({
  spacing: 4,
  palette: {
    primary: {
      main: '#ed1334',
      light: '#f24962',
      dark: '#bf0d28',
      contrastText: '#fcfafa'
    },
    secondary: {
      main: '#E33E7F'
    }
  }
});

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={mainTheme}>
      <Box height="100vh" display="flex" flexDirection="column">
        <Box flex={1} overflow="auto">
          <TrashChess />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
