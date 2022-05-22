import { Grid, Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import getTheme from '../assets/theme';

interface Props {
  notation: string[];
}

export default function NotationMenu({ notation }: Props) {
  let [selected, setSelected] = useState(notation.length - 1);
  let theme = getTheme();

  let gridItems = [];
  for (let i = 0; i < notation.length; i++) {
    let moveCell = (
      <Grid
        item
        xs={5}
        color={i === selected ? theme.palette.secondary.light : theme.palette.primary.contrastText}
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
    <Grid
      container
      width="200px"
      display="flex"
      bgcolor={theme.palette.primary.dark}
    >
      <Grid item xs={12}>
        <Typography>
          <strong>Game Notation:</strong>
        </Typography>
      </Grid>
    {gridItems}
    </Grid>
  );
}
