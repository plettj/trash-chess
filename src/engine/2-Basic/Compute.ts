import * as ChessJS from "chess.js";

const PIECE_VALUES = {
  "p": 1,
  "n": 3,
  "b": 3,
  "r": 5,
  "q": 9,
  "k": 0,
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

  if (moves.length === 0) {
    return ["", pieceValueDiff(board)];
  }

  let bestProspect = 0;
  depth++;
  console.log("Depth:" + depth + " - alpha:" + alpha + " - beta:" + beta + " - turn:" + board.turn());

  if (board.turn() === "w") {
    let best = -112;

    for (let i = 0; i < moves.length; i++) {
      board.move(moves[i]);
      let result = minMax(board, depth, alpha, beta);
      board.undo();
      
      if (best < result[1]) {
        console.log(depth + " | update best-alpha to: " + result[1]);
        bestProspect = i;
      }
      best = best > result[1] ? best : result[1];
      alpha = alpha > beta ? alpha : beta;

      if (beta <= alpha) break;
    }

    return [moves[bestProspect], alpha];
  } else {
    let best = 112;

    for (let i = 0; i < moves.length; i++) {
      board.move(moves[i]);
      let result = minMax(board, depth, alpha, beta);
      board.undo();
      
      if (best > result[1]) {
        console.log(depth + " | update best-beta to: " + result[1]);
        bestProspect = i;
      }
      best = best < result[1] ? best : result[1];
      beta = beta < best ? beta : best;

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
        console.log("||| white wins at the end of this");
        return 112;
      } else {
        console.log("||| black wins at the end of this");
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