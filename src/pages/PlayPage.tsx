import React, { useState } from "react";
import { ChessInstance, ShortMove } from "chess.js";
import NotationMenu from "../components/NotationMenu";
import InteractiveBoard from "../components/InteractiveBoard";
import { Box, InputLabel, FormControl, MenuItem, Select, SelectChangeEvent, Typography, Button } from '@mui/material';
import * as ChessJS from "chess.js";
import { doMove, doComputerMove } from "../engine/BoardHandler";
import getTheme from "../assets/theme";

const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;

export default function PlayPage() {
  const [board] = useState<ChessInstance>(
    new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  );
  const [fen, setFen] = useState(board.fen());
  const [blackEngine, setBlackEngine] = useState(3);
  const [whiteEngine, setWhiteEngine] = useState(0); // 0 - player
  const [calculatingMove, setCalculatingMove] = useState(false);
  const theme = getTheme();

  const handleWhite = (event: SelectChangeEvent) => {
    setWhiteEngine(Number(event.target.value));
  }
  const handleBlack = (event: SelectChangeEvent) => {
    setBlackEngine(Number(event.target.value));
  }

  async function handleComputerMove() {
    setCalculatingMove(true);
    console.log("calculating...");

    const fen = await doComputerMove(board, blackEngine, whiteEngine);

    setCalculatingMove(false);
    console.log("calculating... DONE!");
    setFen(fen);
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
          <Box width="215px" mx="auto" py={6}>
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
          <Box width="215px" mx="auto" py={2}>
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
          <Box display="flex" justifyContent="center" mt={4}>
            <Button
              variant="contained"
              onClick={async () => { await handleComputerMove(); }}
              disabled={calculatingMove}
              sx={{
                backgroundColor: theme.palette.primary.dark,
                color: theme.palette.primary.contrastText,
                "&:hover": {
                  backgroundColor: theme.palette.primary.main
                }
              }}
            ><strong>Play computer move</strong></Button>
          </Box>
        </Box>
      </Box>

      <Box mx={2}/>

      {calculatingMove &&
        <Box
          position="absolute"
          zIndex="50"
          width="520px"
          height="520px"
          bgcolor="rgba(0, 0, 0, 0.5)"
          m={0}
          p={0}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography color="white" variant="h4">
            Calculating move...
          </Typography>
        </Box>
      }

      <InteractiveBoard
        position={fen}
        handleMove={(move: ShortMove) => setFen(doMove(board, move, blackEngine, whiteEngine))}
      />

      <Box mx={2}/>

      <NotationMenu
        notation={board.history()}
      />
    </Box>
  );
}
