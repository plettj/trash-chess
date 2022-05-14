import React, { useState } from "react";
import "./App.css";
import Chessboard from "chessboardjsx";
import { ChessInstance, ShortMove } from "chess.js";
import NotationMenu from "./components/NotationMenu";
import { Box, Typography, Toolbar, AppBar, Button } from '@mui/material';
import * as ChessJS from "chess.js";


const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;

const TrashChess = (): JSX.Element => {
  const [board] = useState<ChessInstance>(
    new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  );
  const [fen, setFen] = useState(board.fen());

  const handleMove = (move: ShortMove) => {
    if (board.move(move)) {
      setTimeout(() => {
        const moves = board.moves();

        if (moves.length > 0) {
          const computerMove = moves[Math.floor(Math.random() * moves.length)];
          board.move(computerMove);
          setFen(board.fen());
        }
      }, 200);

      setFen(board.fen());
    }
  };

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
      <Chessboard
        position={fen}
        width={400}
        dropSquareStyle={{boxShadow: 'inset 0 0 1px 4px rgba(0, 0, 0, 0.2)'}}
        onDrop={(move) =>
          handleMove({
            from: move.sourceSquare,
            to: move.targetSquare,
            promotion: "q",
          })
        }
      />
    </Box>
    <NotationMenu
      notation="1.e4 e5 2.nf3 ne6"
    />
    </>
  );
}

export default TrashChess
