import * as ChessJS from "chess.js";

/**
 * Piece Square Tables are adapted from Sunfish.py:
 * https://github.com/thomasahle/sunfish/blob/master/sunfish.py
 */

const WEIGHTS:Weights = {
  "p": 100,
  "n": 280,
  "b": 320,
  "r": 479,
  "q": 929,
  "k": 60000,
}


const COMP_DEPTH = 3;

const HEURISTIC_W:Heuristic = {
  'p':[
    [ 100, 100, 100, 100, 105, 100, 100,  100],
    [  78,  83,  86,  73, 102,  82,  85,  90],
    [   7,  29,  21,  44,  40,  31,  44,   7],
    [ -17,  16,  -2,  15,  14,   0,  15, -13],
    [ -26,   3,  10,   9,   6,   1,   0, -23],
    [ -22,   9,   5, -11, -10,  -2,   3, -19],
    [ -31,   8,  -7, -37, -36, -14,   3, -31],
    [   0,   0,   0,   0,   0,   0,   0,   0]
  ],
  'n': [ 
    [-66, -53, -75, -75, -10, -55, -58, -70],
    [ -3,  -6, 100, -36,   4,  62,  -4, -14],
    [ 10,  67,   1,  74,  73,  27,  62,  -2],
    [ 24,  24,  45,  37,  33,  41,  25,  17],
    [ -1,   5,  31,  21,  22,  35,   2,   0],
    [-18,  10,  13,  22,  18,  15,  11, -14],
    [-23, -15,   2,   0,   2,   0, -23, -20],
    [-74, -23, -26, -24, -19, -35, -22, -69]
  ],
  'b': [ 
    [-59, -78, -82, -76, -23,-107, -37, -50],
    [-11,  20,  35, -42, -39,  31,   2, -22],
    [ -9,  39, -32,  41,  52, -10,  28, -14],
    [ 25,  17,  20,  34,  26,  25,  15,  10],
    [ 13,  10,  17,  23,  17,  16,   0,   7],
    [ 14,  25,  24,  15,   8,  25,  20,  15],
    [ 19,  20,  11,   6,   7,   6,  20,  16],
    [ -7,   2, -15, -12, -14, -15, -10, -10]
  ],
  'r': [  
    [ 35,  29,  33,   4,  37,  33,  56,  50],
    [ 55,  29,  56,  67,  55,  62,  34,  60],
    [ 19,  35,  28,  33,  45,  27,  25,  15],
    [  0,   5,  16,  13,  18,  -4,  -9,  -6],
    [-28, -35, -16, -21, -13, -29, -46, -30],
    [-42, -28, -42, -25, -25, -35, -26, -46],
    [-53, -38, -31, -26, -29, -43, -44, -53],
    [-30, -24, -18,   5,  -2, -18, -31, -32]
  ],
  'q': [   
    [  6,   1,  -8,-104,  69,  24,  88,  26],
    [ 14,  32,  60, -10,  20,  76,  57,  24],
    [ -2,  43,  32,  60,  72,  63,  43,   2],
    [  1, -16,  22,  17,  25,  20, -13,  -6],
    [-14, -15,  -2,  -5,  -1, -10, -20, -22],
    [-30,  -6, -13, -11, -16, -11, -16, -27],
    [-36, -18,   0, -19, -15, -15, -21, -38],
    [-39, -30, -31, -13, -31, -36, -34, -42]
  ],
  'k': [  
    [  4,  54,  47, -99, -99,  60,  83, -62],
    [-32,  10,  55,  56,  56,  55,  10,   3],
    [-62,  12, -57,  44, -67,  28,  37, -31],
    [-55,  50,  11,  -4, -19,  13,   0, -49],
    [-55, -43, -52, -28, -51, -47,  -8, -50],
    [-47, -42, -43, -79, -64, -32, -29, -32],
    [ -4,   3, -14, -50, -57, -18,  13,   4],
    [ 17,  30,  -3, -14,   6,  -1,  40,  18]
  ],
};
const HEURISTIC_B:Heuristic = {
  'p': HEURISTIC_W['p'].slice().reverse(),
  'n': HEURISTIC_W['n'].slice().reverse(),
  'b': HEURISTIC_W['b'].slice().reverse(),
  'r': HEURISTIC_W['r'].slice().reverse(),
  'q': HEURISTIC_W['q'].slice().reverse(),
  'k': HEURISTIC_W['k'].slice().reverse(),
}

interface Move {
  color: string,
  from: string,
  to: string,
  flags: string,
  piece: string,
  san: string,
  captured?: string,
  promotion?: string,
}

interface Weights {
  [key:string]: number
}

interface Heuristic {
  [key:string]: number[][]
}

export default function ComputeMove(board: ChessJS.ChessInstance): string {

  // Min Max with Alpha Beta pruning with Position Heuristics!

  let lastMove:Move = board.history({ verbose: true })[board.history().length - 1];
  let currentEval = boardValue(board, 0, lastMove, true);
  let move:[Move, number] = minMax(board, lastMove, currentEval);

  console.log(move[1] + " | <-- current Eval");

  board.move(move[0].san);

  return board.fen();
}

function minMax(board: ChessJS.ChessInstance, lastMove:Move, lastEval:number, depth:number = 0, alpha:number = -60000, beta:number = 60000): [Move, number] {
  let currentEval = boardValue(board, lastEval, lastMove, lastMove === undefined);

  if (Math.abs(currentEval) === 60000) { // This position is finished already!
    if (currentEval > 0) return [lastMove, currentEval - depth];
    else return [lastMove, currentEval + depth];
  }

  if (depth >= COMP_DEPTH) {
    return [lastMove, currentEval];
  }

  let moves = board.moves({ verbose: true });

  if (moves.length === 0) {
    return [lastMove, currentEval];
  }

  let bestProspect = Math.floor(Math.random() * moves.length);
  depth++;

  if (board.turn() === "w") {
    for (let i = 0; i < moves.length; i++) {
      board.move(moves[i]);
      let result = minMax(board, moves[i], currentEval, depth, alpha, beta);
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
      let result = minMax(board, moves[i], currentEval, depth, alpha, beta);
      board.undo();
      
      if (result[1] < beta) {
        beta = result[1];
        bestProspect = i;
      }
      if (alpha >= beta) {
        break;
      }
    }

    return [moves[bestProspect], beta];
  }

}

/**
 * boardValue function adapted from Zhang Zeyu's work:
 * https://javascript.plainenglish.io/build-a-simple-chess-ai-in-javascript-22b350abb31
 */

function boardValue(chessBoard: ChessJS.ChessInstance, lastEval: number, lastMove: Move, fullEval:boolean = false): number {
  let newEval:number = lastEval;

  if (chessBoard.game_over()) {
    if (chessBoard.in_checkmate()) {
      if (chessBoard.turn() === "b") {
        return 60000;
      } else {
        return -60000;
      }
    } else {
      return 0;
    }
  }

  let board = chessBoard.board();
  if (fullEval) {
    for (let i:number = 0; i < 8; i++) {
      for (let j:number = 0; j < 8; j++) {
        let cell = board[i][j];
        if (cell !== null) {
          if (cell.color === "w") {
            newEval += WEIGHTS[cell.type] + HEURISTIC_W[cell.type][i][j];
          } else {
            newEval -= WEIGHTS[cell.type] + HEURISTIC_B[cell.type][i][j];
          }
        }
      }
    }
  } else {

    const toSquare:number[] = [8 - parseInt(lastMove.to[1]), lastMove.to.charCodeAt(0) - 'a'.charCodeAt(0)];
    const fromSquare:number[] = [8 - parseInt(lastMove.from[1]), lastMove.from.charCodeAt(0) - 'a'.charCodeAt(0)];

    const ourHeuristic:Heuristic = lastMove.color === "w" ? HEURISTIC_W : HEURISTIC_B;
    const otherHeuristic:Heuristic = lastMove.color === "w" ? HEURISTIC_B : HEURISTIC_W;

    if (lastMove.promotion !== undefined) { // Piece was promoted!
      let promotionType:string = lastMove.promotion;

      if (lastMove.color === "w") {
        newEval -= (WEIGHTS[lastMove.piece] + ourHeuristic[lastMove.piece][fromSquare[0]][fromSquare[1]]);
        newEval += (WEIGHTS[promotionType] + ourHeuristic[promotionType][toSquare[0]][toSquare[1]]);
      } else {
        newEval += (WEIGHTS[lastMove.piece] + ourHeuristic[lastMove.piece][fromSquare[0]][fromSquare[1]]);
        newEval -= (WEIGHTS[promotionType] + ourHeuristic[promotionType][toSquare[0]][toSquare[1]]);
      }
    } else { // Piece still exists!
      if (lastMove.color === "w") {
        newEval -= ourHeuristic[lastMove.piece][fromSquare[0]][fromSquare[1]];
        newEval += ourHeuristic[lastMove.piece][toSquare[0]][toSquare[1]];
      } else {
        newEval += ourHeuristic[lastMove.piece][fromSquare[0]][fromSquare[1]];
        newEval -= ourHeuristic[lastMove.piece][toSquare[0]][toSquare[1]];
      }
    }

    if (lastMove.captured !== undefined) { // Piece was captured!
      if (lastMove.color === "w") {
        newEval += (WEIGHTS[lastMove.captured] + otherHeuristic[lastMove.captured][toSquare[0]][toSquare[1]]);
      } else {
        newEval -= (WEIGHTS[lastMove.captured] + otherHeuristic[lastMove.captured][toSquare[0]][toSquare[1]]);
      }
    } else if (lastMove.flags === "k") { // Kingside Castled!
      if (lastMove.color === "w") {
        newEval -= ourHeuristic["r"][7][7];
        newEval += ourHeuristic["r"][7][5];
      } else {
        newEval += otherHeuristic["r"][0][7];
        newEval -= otherHeuristic["r"][0][5];
      }
    } else if (lastMove.flags === "q") { // Queenside Castled!
      if (lastMove.color === "w") {
        newEval -= ourHeuristic["r"][7][0];
        newEval += ourHeuristic["r"][7][3];
      } else {
        newEval += otherHeuristic["r"][0][0];
        newEval -= otherHeuristic["r"][0][3];
      }
    }

  }

  return newEval;
}

/*
function evaluateBoard(move: string, prevEval: number) {
    var from = [8 - parseInt(move.from[1]), move.from.charCodeAt(0) - 'a'.charCodeAt(0)];
    var to = [8 - parseInt(move.to[1]), move.to.charCodeAt(0) - 'a'.charCodeAt(0)];

    // Change endgame behavior for kings

    if ('captured' in move)
    {
        // Opponent piece was captured (good for us)
        if (move.color === color)
        {
            prevEval += (weights[move.captured] + pstOpponent[move.color][move.captured][to[0]][to[1]]);
        }
        // Our piece was captured (bad for us)
        else
        {
            prevEval -= (weights[move.captured] + pstSelf[move.color][move.captured][to[0]][to[1]]);
        }
    }

    if (move.flags.includes('p'))
    {
        // NOTE: promote to queen for simplicity
        move.promotion = 'q';

        // Our piece was promoted (good for us)
        if (move.color === color)
        {
            prevEval -= (weights[move.piece] + pstSelf[move.color][move.piece][from[0]][from[1]]);
            prevEval += (weights[move.promotion] + pstSelf[move.color][move.promotion][to[0]][to[1]]);
        }
        // Opponent piece was promoted (bad for us)
        else
        {
            prevEval += (weights[move.piece] + pstSelf[move.color][move.piece][from[0]][from[1]]);
            prevEval -= (weights[move.promotion] + pstSelf[move.color][move.promotion][to[0]][to[1]]);
        }
    }
    else
    {
        // The moved piece still exists on the updated board, so we only need to update the position value
        if (move.color !== color)
        {
            prevEval += pstSelf[move.color][move.piece][from[0]][from[1]];
            prevEval -= pstSelf[move.color][move.piece][to[0]][to[1]];
        }
        else
        {
            prevEval -= pstSelf[move.color][move.piece][from[0]][from[1]];
            prevEval += pstSelf[move.color][move.piece][to[0]][to[1]];
        }
    }
    
    return prevEval;
}
*/
