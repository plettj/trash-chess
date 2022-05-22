import { ChessInstance, ShortMove } from "chess.js";
import ChooseMove from "./3-PositionHeuristics/ChooseMove";

export default function DoMove(board: ChessInstance, move: ShortMove): string {
  return board.move(move) ? ChooseMove(board) : board.fen();
}

