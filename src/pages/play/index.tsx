import React, { useState } from "react";
import { ChessInstance, ShortMove } from "chess.js";
import NotationMenu from "./components/NotationMenu";
import InteractiveBoard from "./components/InteractiveBoard";
import { Box } from '@mui/material';
import * as ChessJS from "chess.js";
import DoMove from "../../engine/BoardHandler";

const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;

export default function PlayPage() {
  const [board] = useState<ChessInstance>(
    new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  );
  const [fen, setFen] = useState(board.fen());

  return (
    <>
    <Box display="flex">
      <InteractiveBoard
        position={fen}
        handleMove={(move: ShortMove) => setFen(DoMove(board, move))}
      />
    </Box>
    <NotationMenu
      notation={board.history()}
    />
    </>
  );
}
