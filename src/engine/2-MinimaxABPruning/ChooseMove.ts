import { ChessInstance } from "chess.js";
import ComputeMove from "./Compute";

export default function ChooseMove(board: ChessInstance): string {
  let fen = board.fen();

  if (!board.game_over()) {
    fen = ComputeMove(board);
  } else {
    console.log("Game over... ");
    console.log("Checkmate: " + board.in_checkmate + " | Stalemate: " + board.in_stalemate + " | Draw: " + board.in_draw + " | Three-move: " + board.in_threefold_repetition);
  }

  return fen;
}