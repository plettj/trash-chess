import { ChessInstance, ShortMove } from "chess.js";
import ChooseMove1 from "./1-Random/ChooseMove";
import ChooseMove2 from "./2-MinimaxABPruning/ChooseMove";
import ChooseMove3 from "./3-PositionHeuristics/ChooseMove";

export default function DoMove(board: ChessInstance, move: ShortMove, blackEngine: number, whiteEngine: number): string {

  if ((!whiteEngine && board.turn() === "w") || (!blackEngine && board.turn() === "b")) {
    // Player is playing a move!
    const success = board.move(move);

    if (success) {
      return DoMove(board, move, blackEngine, whiteEngine);
    } else {
      return board.fen();
    }
  }
      
  let newBoard:string = board.fen();

  switch (board.turn() === "w" ? whiteEngine : blackEngine) {
    case 1:
      newBoard = ChooseMove1(board);
      break;
    case 2:
      newBoard = ChooseMove2(board);
      break;
    case 3:
      newBoard = ChooseMove3(board);
      break;
  }

  return newBoard;

}

