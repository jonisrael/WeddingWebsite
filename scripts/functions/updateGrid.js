import { audio } from "../fileImports";
import {
  blockVacOrClearing,
  CLEARING_TYPES,
  debug,
  game,
  grid,
  INTERACTIVE_TYPES,
  touch
} from "../global";
import { playAudio } from "./audioFunctions";
import { isBlockAirborne } from "./gravity";
import { trySwappingBlocks } from "./swapBlock";

export function updateGrid(frameAdvance = false) {
  game.panicking = game.highestRow <= game.panicIndex && game.raiseDelay < 60;
  game.boardIsClearing = false;
  game.boardHasAirborneBlock = false;
  game.boardHasSwappingBlock = false;
  // touch.moveOrderExists = false;
  touch.moveOrderList.length = 0;
  let highestRowFound = false;
  game.pauseStack = false;
  game.highestCols = [];
  if (touch.doubleClickTimer > 0) {
    touch.doubleClickTimer -= 1;
    if (touch.doubleClickTimer === 0) touch.doubleClickCounter = 0;
  }
  for (let y = 0; y < grid.ROWS + 2; y++) {
    for (let x = 0; x < grid.COLS; x++) {
      let Square = game.board[x][y];
      Square.airborne = isBlockAirborne(Square);
      if (Square.airborne) {
        game.boardHasAirborneBlock = true;
      }
      if (Square.type === "swapping") game.boardHasSwappingBlock = true;
      if (Square.swapOrders.active) {
        touch.moveOrderExists = true;
        if (touch.disableAllMoveOrders) Square.swapOrders.active = false;
        else touch.moveOrderList.push([x, y]);
      }
      if (!Square.airborne && Square.type !== "landing") {
        game.availForPrimaryChain = false;
        game.availForSecondaryChain = false;
        Square.touched = false;
      }
      if (Square.color === "vacant") {
        Square.availForPrimaryChain = false;
        Square.availForSecondaryChain = false;
        Square.touched = false;
        Square.timer = 0;
      }
      if (!highestRowFound && Square.color !== "vacant") {
        game.highestRow = y;
        highestRowFound = true;
      }
      if (highestRowFound && Square.color !== "vacant") {
        if (game.highestRow === y) game.highestCols.push(x);
      }
      // Check to see if a block is still legally in a landing animation
      if (Square.type === "landing") {
        game.pauseStack = true;
        if (Square.timer < 9) {
          Square.addToPrimaryChain = false;
          Square.addToSecondaryChain = false;
          Square.touched = false;
        }
        for (let j = grid.ROWS - 1; j > y; j--) {
          if (game.board[x][j].color === "vacant") {
            Square.type = "normal";
            Square.addToPrimaryChain = false;
            Square.addToSecondaryChain = false;
            Square.touched = false;
            Square.airborne = true;
            Square.timer = 0;
            break;
            /* A "vacant" block below a "landed" block was detected,
                           so the animation will be cancelled. */
          }
        }
      }

      if (Square.availForPrimaryChain || Square.availForSecondaryChain) {
        if (
          Square.color == "vacant" ||
          (Square.type == "landing" && Square.timer < 9)
        ) {
          Square.availForPrimaryChain = false;
          Square.availForSecondaryChain = false;
        }
      }
      if (Square.timer === -1) {
        Square.timer = 0;
      } else if (Square.timer > 0) {
        Square.timer -= 1;
        if (Square.type !== "swapping") {
          Square.swapDirection = 0;
          game.boardRiseDisabled = true;
        }
      }

      if (Square.lightTimer > 0) {
        Square.lightTimer--;
        // if (blockVacOrClearing(Square)) Square.lightTimer = 0;
      }

      if (Square.type === "stalling" && Square.timer === 0) {
        Square.type = "normal";
      }

      if (Square.type === "swapping" && Square.timer === 0) {
        Square.type = "normal";
        Square.swapDirection = 0;
        if (Square.airborne) {
          Square.type = "stalling";
          Square.timer = game.blockStallTime;
          Square.touched = true;
          Square.availForPrimaryChain = false;
          Square.availForSecondaryChain = false;
        }
        if (Square.color === "vacant") {
          for (let j = Square.y - 1; j >= 0; j--) {
            let nextAboveSquare = game.board[Square.x][j];
            nextAboveSquare.touched = true;
            nextAboveSquare.availForPrimaryChain = false;
            nextAboveSquare.availForSecondaryChain = false;
            if (!INTERACTIVE_TYPES.includes(nextAboveSquare.type)) break;
          }
        }
      } else if (
        !debug.freeze &&
        (Square.type === "blinking" ||
          Square.type === "face" ||
          Square.type === "popped")
      ) {
        game.pauseStack = true;
        game.boardRiseDisabled = true;
        // console.log(x, y, Square);
        switch (Square.timer) {
          case Square.switchToPoppedFrame + 2:
            playAudio(audio.blockClear);
            game.scoreUpdate = Math.round(game.scoreMultiplier * 10);
            game.score += game.scoreUpdate;
            break;
          case 0:
            Square.color = "vacant";
            Square.type = "normal";
            // Square.switchToFaceFrame = 0;
            // Square.switchToPoppedFrame = 0;
            // console.log("do delay timer");
            if (
              y > 0 &&
              game.board[x][y - 1].color != "vacant" &&
              INTERACTIVE_TYPES.includes(game.board[x][y - 1].type)
            ) {
              // Give interactive pieces a slight delay timer
              // console.log("do delay timer");
              for (let j = y - 1; j >= 0; j--) {
                if (!blockVacOrClearing(game.board[x][j])) {
                  game.board[x][j].timer = game.blockStallTime + 4;
                  game.board[x][j].type = "stalling";
                } else break;
              }
            }
            game.boardRiseDisabled = false;
            for (let j = y - 1; j >= 0; j--) {
              // create chain available blocks above current
              // If clearing piece detected, break loop since no more chainable blocks.
              if (game.board[x][j].type === "stalling") {
                if (Square.availForPrimaryChain) {
                  game.board[x][j].availForPrimaryChain = true;
                  // game.board[x][j].touched = false;
                } else if (Square.availForSecondaryChain) {
                  game.board[x][j].availForSecondaryChain = true;
                  // game.board[x][j].touched = false;
                }
              } else break; // stop iterating since this clearing block shields the other blocks
            }
            break;
          case Square.switchToFaceFrame:
            Square.type = "face";
            break;
          case Square.switchToPoppedFrame:
            Square.type = "popped";
            break;
        }
        if (CLEARING_TYPES.includes(Square.type)) game.boardIsClearing = true;
      }

      if (game.panicking && game.highestCols.includes(x)) {
        if (Square.type === "normal") Square.type = "panicking";
      } else {
        if (Square.type === "panicking") Square.type = "normal";
      }
    } // end x
  } // end y
  touch.disableAllMoveOrders = false;
}
