import { AppBar, Button, Toolbar, Typography } from "@mui/material";

export default function TopBar() {
  return (
    <AppBar>
      <Toolbar>
        <Button color="inherit" href="https://www.plett.dev/">Portfolio</Button>
        <Typography variant="h4" component="div" align="center" sx={{ flexGrow: 1 }}>
          TS Chess Engine
        </Typography>
        <Button color="inherit" href="https://github.com/plettj">Github</Button>
      </Toolbar>
    </AppBar>
  );
}