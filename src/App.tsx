import React, { useState } from "react";
import "./App.css";
import Chessboard from "chessboardjsx";
import { ChessInstance, ShortMove } from "chess.js";
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
    <div className="screen-box">
      <h1>Trash Chess Engine</h1>
      <section className="middle">
        <Chessboard
          position={fen}
          dropSquareStyle={{boxShadow: 'inset 0 0 1px 4px rgba(0, 0, 0, 0.2)'}}
          onDrop={(move) =>
            handleMove({
              from: move.sourceSquare,
              to: move.targetSquare,
              promotion: "q",
            })
          }
        />
      </section>
    </div>
  );
}

export default TrashChess;
