import { Grid, Typography } from '@mui/material';
//import React, { useState } from 'react';

interface Props {
  notation: string;
}

export default function NotationMenu({ notation }: Props) {

  return (
    <Grid
      color="red"
      width="100%"
      display="flex"
    >
      <Typography>
        <strong>Game Notation: {notation}</strong>
      </Typography>
    </Grid>
  );
}
