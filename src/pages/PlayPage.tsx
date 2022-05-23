import React, { useState } from "react";
import { ChessInstance, ShortMove } from "chess.js";
import NotationMenu from "../components/NotationMenu";
import InteractiveBoard from "../components/InteractiveBoard";
import { Box, InputLabel, FormControl, MenuItem, Select, SelectChangeEvent, Typography, Button } from '@mui/material';
import * as ChessJS from "chess.js";
import DoMove from "../engine/BoardHandler";
import getTheme from "../assets/theme";

const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;

export default function PlayPage() {
  const [board] = useState<ChessInstance>(
    new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  );
  const [fen, setFen] = useState(board.fen());
  const [blackEngine, setBlackEngine] = useState(3);
  const [whiteEngine, setWhiteEngine] = useState(0); // 0 - player
  const theme = getTheme();

  const handleWhite = (event: SelectChangeEvent) => {
    setWhiteEngine(Number(event.target.value));
  }
  const handleBlack = (event: SelectChangeEvent) => {
    setBlackEngine(Number(event.target.value));
  }

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box width="250px" height="520px">
        <Typography height="40px" variant="h5">
          <strong>Bot Options:</strong>
        </Typography>
        <Box
          width="250px"
          height="480px"
          borderRadius={5}
          bgcolor={theme.palette.primary.main}
        >
          <Box width="215px" mx="auto" py={4}>
            <FormControl fullWidth>
              <InputLabel id="white-player-label">White Player</InputLabel>
              <Select
                labelId="white-player-label"
                id="white-player-select"
                label="White Player"
                value={whiteEngine.toString()}
                onChange={handleWhite}
              >
                <MenuItem value={0}>Player</MenuItem>
                <MenuItem value={1}>Random Bot</MenuItem>
                <MenuItem value={2}>Minimax Bot (depth: 4)</MenuItem>
                <MenuItem value={3}>Heuristic Bot (depth: 3)</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box width="215px" mx="auto" py={4}>
            <FormControl fullWidth>
              <InputLabel id="black-player-label">Black Player</InputLabel>
              <Select
                labelId="black-bot-label"
                id="black-bot-select"
                label="Black Player"
                value={blackEngine.toString()}
                onChange={handleBlack}
              >
                <MenuItem value={0}>Player</MenuItem>
                <MenuItem value={1}>Random Bot</MenuItem>
                <MenuItem value={2}>Minimax Bot (depth: 4)</MenuItem>
                <MenuItem value={3}>Heuristic Bot (depth: 3)</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                setFen(DoMove(board, {from: "a2", to: "b6", promotion: "q"}, blackEngine, whiteEngine));
              }}
              sx={{
                backgroundColor: theme.palette.primary.dark,
                color: theme.palette.primary.contrastText,
                "&:hover": {
                  backgroundColor: theme.palette.primary.main
                }
              }}
            ><strong>Play Move</strong></Button>
          </Box>
        </Box>
      </Box>

      <Box mx={2}/>

      <InteractiveBoard
        position={fen}
        handleMove={(move: ShortMove) => setFen(DoMove(board, move, blackEngine, whiteEngine))}
      />

      <Box mx={2}/>

      <NotationMenu
        notation={board.history()}
      />
    </Box>
  );
}
