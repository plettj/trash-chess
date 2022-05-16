import { ChessInstance, ShortMove } from "chess.js";
//import * as ChessJS from "chess.js";


export default function DoMove(board: ChessInstance, move: ShortMove): string {
  return board.move(move) ? ChooseMove(board) : board.fen();
}

export function ChooseMove(board: ChessInstance): string {
      const moves = board.moves();

      if (moves.length > 0) {
        const computerMove = moves[Math.floor(Math.random() * moves.length)];
        board.move(computerMove);
        return board.fen();
      }

      console.log("No Legal Moves");
      return board.fen();
}
