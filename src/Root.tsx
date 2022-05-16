import "./App.css";
import PlayPage from "./pages/play/index";
import { Box, Typography, Toolbar, AppBar, Button } from '@mui/material';


const TrashChess = (): JSX.Element => {

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Button color="inherit" href="https://www.plett.dev/">Website</Button>
          <Typography variant="h4" component="div" align="center" sx={{ flexGrow: 1 }}>
            Trash Chess
          </Typography>
          <Button color="inherit" href="https://github.com/plettj">Github</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <Box display="flex">
      <PlayPage></PlayPage>
    </Box>
    <Box display="flex">
      {/* // TODO: create more pages!! */}
    </Box>
    </>
  );
}

export default TrashChess
