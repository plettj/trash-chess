import { ChessInstance } from "chess.js";

export default function ChooseMove(board: ChessInstance): Promise<string> {
  const moves = board.moves();

  if (moves.length > 0) {
    const computerMove = moves[Math.floor(Math.random() * moves.length)];
    board.move(computerMove);
    return Promise.resolve(board.fen());
  }

  console.log("RANDOM says: No Legal Moves");

  return Promise.resolve(board.fen());
}