import * as ChessJS from "chess.js";

const PIECE_VALUES = {
  "p": 1,
  "n": 3,
  "b": 3,
  "r": 5,
  "q": 9,
  "k": 0,
}

const COMP_DEPTH = 4;


// Pre: board.game_over() !== true
export default function ComputeMove(board: ChessJS.ChessInstance): string {

  // Min Max with Alpha Beta pruning!!!

  let move:[string, number] = minMax(board);

  console.log(move[0] + " is best! Its value is: " + move[1]);

  board.move(move[0]);

  return board.fen();
}

function minMax(board: ChessJS.ChessInstance, depth:number = 0, alpha:number = -112, beta:number = 112): [string, number] {
  if (depth >= COMP_DEPTH) {
    return ["", pieceValueDiff(board)];
  }

  let moves = board.moves();

  if (moves.length === 0) {
    return ["", pieceValueDiff(board)];
  }

  let bestProspect = Math.floor(Math.random() * moves.length);
  depth++;

  if (board.turn() === "w") {
    for (let i = 0; i < moves.length; i++) {
      board.move(moves[i]);
      let result = minMax(board, depth, alpha, beta);
      board.undo();
      
      if (result[1] > alpha) {
        alpha = result[1];
        bestProspect = i;
      }
      if (alpha >= beta) break;
    }

    return [moves[bestProspect], alpha];
  } else {
    for (let i = 0; i < moves.length; i++) {
      board.move(moves[i]);
      let result = minMax(board, depth, alpha, beta);
      board.undo();
      
      if (result[1] < beta) {
        beta = result[1];
        bestProspect = i;
      }
      if (alpha >= beta) break;
    }

    return [moves[bestProspect], beta];
  }

}

function pieceValueDiff(chessBoard: ChessJS.ChessInstance): number {
  let score:number = 0;

  if (chessBoard.game_over()) {
    if (chessBoard.in_checkmate()) {
      if (chessBoard.turn() === "b") {
        return 112;
      } else {
        return -112;
      }
    } else {
      return 0;
    }
  }

  let board = chessBoard.board();

  for (let i:number = 0; i < 8; i++) {
    for (let j:number = 0; j < 8; j++) {
      let cell = board[i][j];
      if (cell !== null) {
        if (cell.color === "w") {
          score += PIECE_VALUES[cell.type];
        } else {
          score -= PIECE_VALUES[cell.type];
        }
      }
    }
  }

  return score;
}