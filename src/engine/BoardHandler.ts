import { ChessInstance, ShortMove } from "chess.js";
import ChooseMove1 from "./1-Random/ChooseMove";
import ChooseMove2 from "./2-MinimaxABPruning/ChooseMove";
import ChooseMove3 from "./3-PositionHeuristics/ChooseMove";

export function doMove(board: ChessInstance, move: ShortMove, blackEngine: number, whiteEngine: number): string {

  if ((!whiteEngine && board.turn() === "w") || (!blackEngine && board.turn() === "b")) {
    // Player is playing a move!
    const success = board.move(move);

    if (success) {
      // TODO: this has problems for when i make it have async functions :)
      return doMove(board, move, blackEngine, whiteEngine);
    } else {
      return board.fen();
    }
  }

  return board.fen();

}

export function doComputerMove(board: ChessInstance, blackEngine: number, whiteEngine: number): Promise<string> {
  if ((!whiteEngine && board.turn() === "w") || (!blackEngine && board.turn() === "b")) {
    return Promise.resolve(board.fen());
  }

  const engineType = board.turn() === "w" ? whiteEngine : blackEngine;
  const chooseMoveFunction = (
    engineType === 1
      ? (board: ChessInstance) => ChooseMove1(board)
      : (
        engineType === 2
          ? (board: ChessInstance) => ChooseMove2(board)
          : (board: ChessInstance) => ChooseMove3(board)
      )
  );


  return Promise.resolve(chooseMoveFunction(board)).then(() => board.fen());
}

