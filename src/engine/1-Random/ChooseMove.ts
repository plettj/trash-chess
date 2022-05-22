import { ChessInstance } from "chess.js";

export default function ChooseMove(board: ChessInstance): string {
  const moves = board.moves();

  if (moves.length > 0) {
    const computerMove = moves[Math.floor(Math.random() * moves.length)];
    board.move(computerMove);
    return board.fen();
  }

  console.log("RANDOM says: No Legal Moves");
  return board.fen();
}