import * as ChessJS from "chess.js";

const PIECE_VALUES = {
  "p": 1,
  "n": 3,
  "b": 3,
  "r": 5,
  "q": 9,
  "k": 0,
}

const TURN = {
  "w": 1,
  "b": 0
}

const COMP_DEPTH = 3;


// Pre: board.game_over() !== true
export default function ComputeMove(board: ChessJS.ChessInstance): string {
  console.log("absolute score is: " + pieceValueDiff(board));

  // Min Max time with Alpha Beta pruning!!!

  // Alpha: best choice so far for the player "MAX"
  // Beta: best choice so far for the player "MIN"

  // depth of three...

  let move:[string, number] = minMax(board, 0, 112, -112);

  console.log(move[0] + " is best! Its value is: " + move[1]);

  board.move(move[0]);

  return board.fen();
}



// Returns [bestMove, newAlphaOrBetaValue]
function minMax(board: ChessJS.ChessInstance, depth: number, alpha: number, beta: number): [string, number] {
  if (depth >= COMP_DEPTH) {
    return ["", pieceValueDiff(board)];
  }

  let moves = board.moves();

  let bestProspect = 0;
  depth++;

  for (let i = 0; i < moves.length; i++) {
    board.move(moves[i]);
    // begin alpha-beta pruning logic, based on pieceValueDiff!

    let result = minMax(board, depth, alpha, beta);

    board.undo();
    
    if (board.turn() === "w") {
      if (result[1] < alpha) {
        beta = result[1];
        bestProspect = i;
      } else if (alpha <= beta) {
        return [moves[i], alpha];
      }
    } else {
      if (result[1] < beta) {
        alpha = result[1];
        bestProspect = i;
      } else if (beta <= alpha) {
        return [moves[i], beta];
      }
    }
  }

  return [moves[bestProspect], [alpha, beta][TURN[board.turn()]]];
}


function pieceValueDiff(chessBoard: ChessJS.ChessInstance): number {
  let score:number = 0;

  if (chessBoard.game_over()) {
    if (chessBoard.in_checkmate()) {
      if (chessBoard.turn() === "w") {
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