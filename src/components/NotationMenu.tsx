import { Grid, Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import getTheme from '../assets/theme';

interface Props {
  notation: string[];
}

export default function NotationMenu({ notation }: Props) {
  const [selected, setSelected] = useState(notation.length - 1);
  const theme = getTheme();

  let gridItems = [];
  for (let i = 0; i < notation.length; i++) {
    let moveCell = (
      <Grid
        item
        xs={5}
        color={i === selected ? "yellow" : theme.palette.primary.contrastText}
        key={i}
      >
        <Box onMouseDown={(event) => setSelected(i)}>
          {notation[i]}
        </Box>
      </Grid>
    );
    if (i % 2) {
      gridItems.push(moveCell);
    } else {
      gridItems.push(<Grid item xs={2} key={-(i + 1)}>{Math.round(i/2 + 1)}.</Grid>, moveCell);
    }
  }

  return (
    <Box height="520px">
      <Typography height="40px" variant="h5">
        <strong>Game Notation:</strong>
      </Typography>
      <Box height="auto">
        <Grid
          container
          width="250px"
          height="480px"
          display="flex"
          overflow="auto"
          bgcolor={theme.palette.primary.main}
          borderRadius={5}
          p={3}
        >
        {gridItems}
        </Grid>
      </Box>
    </Box>
  );
}
