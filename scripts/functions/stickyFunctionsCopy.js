// import { displayMessage } from "../..";
// import { audio } from "../fileImports";
// import {
//   game,
//   win,
//   grid,
//   touch,
//   INTERACTIVE_TYPES,
//   CLEARING_TYPES,
//   blockIsSolid,
//   blockVacOrClearing,
//   outOfRange,
//   SOLID_TYPES,
//   debug,
//   vacantBlockBelow,
// } from "../global";
// import { playAudio } from "./audioFunctions";
// import { pause } from "./pauseFunctions";

// // export const SelectedBlock = {
// //   Actual: JSON.parse(undefBlock),
// //   Above: JSON.parse(undefBlock),
// //   Below: JSON.parse(undefBlock),
// //   L: JSON.parse(undefBlock),
// //   R: JSON.parse(undefBlock),
// //   pairsWith: ""
// // };
// const undefBlock =
//   '{"name": "undefinedBlock", "x": -1, "y": -1, "color": "vacant", "type": "normal"}';
// export let SelectedBlock = JSON.parse(undefBlock);
// // export let TouchOrders[0] = JSON.parse(undefBlock);

// export const TouchOrder = {
//   active: false,
//   target: [-1, -1],
//   Main: JSON.parse(undefBlock),
//   KeySquare: {
//     Highest: JSON.parse(undefBlock),
//     Lowest: JSON.parse(undefBlock),
//   },
//   First: JSON.parse(undefBlock),
//   Second: JSON.parse(undefBlock),
//   Third: JSON.parse(undefBlock),
//   matches: [
//     [-1, -1],
//     [-1, -1],
//     [-1, -1],
//   ],
//   pair: "",
//   solidGroundArray: [],
// };

// export let TouchOrders = [];
// for (let i = 0; i < 4; i++) {
//   TouchOrders[i] = JSON.parse(JSON.stringify(TouchOrder));
// }
// // console.log(TouchOrders);
// // export const orders = [
// //   JSON.parse(JSON.stringify(TouchOrders[0])),
// //   JSON.parse(JSON.stringify(TouchOrders[0])),
// //   JSON.parse(JSON.stringify(TouchOrders[0])),
// //   JSON.parse(JSON.stringify(TouchOrders[0]))
// // ];

// export let match = [[], [], []];

// export function ThreeBlocksMatch() {
//   for (let i = 0; i < match[0].length; i++) {
//     if (match[i][0] === -1) return false;
//     for (let j = i + 1; j < match.length; j++) {
//       if (JSON.stringify(match[i]) === JSON.stringify(match[j])) {
//         return false;
//       }
//     }
//   }
//   return true;
// }

// export function checkBufferedSwap(x, y) {
//   let FirstBlock = game.board[x][y];
//   let SecondBlock, ThirdBlock;
//   if (y - 1 < 0 || y + 1 >= grid.ROWS) return false;
//   if (
//     game.board[x][y - 1].color === "vacant" &&
//     game.board[x][y + 1].color === "vacant"
//   ) {
//     // there are two cases. First check if above solid block is a pair.
//     SecondBlock = findSolidBlockAbove(x, y - 1);
//     if (SecondBlock.x === -1) return false;
//     match[1] = [x, SecondBlock.y];
//     // playAudio(audio.announcerGo);
//     if (FirstBlock.color === SecondBlock.color) {
//       // check directly one above for solid pair 1
//       if (SecondBlock.y - 1 >= 0) {
//         // playAudio(audio.announcer1);
//         ThirdBlock = game.board[x][SecondBlock.y - 1];
//         if (blockIsSolid(ThirdBlock)) {
//           if (FirstBlock.color === ThirdBlock.color) {
//             ThirdBlock = game.board[x][SecondBlock.y - 1];
//             match[2] = [x, y - 1];
//             return "Abv1 Abv2 |Main|";
//           }
//         }
//       }
//       if (SecondBlock.y + 1 < grid.ROWS) {
//         ThirdBlock = findSolidBlockBelow(x, ThirdBlock.y);
//         if (ThirdBlock.x === -1) return false;
//         // playAudio(audio.announcer2);
//         if (FirstBlock.color === ThirdBlock.color) {
//           match[2] = [x, ThirdBlock.y];
//           return "Abv1 |Main| Bel1";
//         } else return false;
//       }
//     } else return false;
//   } else return false;
// }

// export function stickyCheck(x, y) {
//   if (game.board[x][y].airborne) return false;
//   if (outOfRange(x, y)) return false;
//   if (!blockIsSolid(game.board[x][y])) return false;
//   match[0] = [x, y];
//   match[1] = [-1, -1];
//   match[2] = [-1, -1];

//   SelectedBlock = game.board[x][y];

//   if ((result = checkBufferedSwap(x, y))) {
//     return !!result;
//   }
//   if ((result = checkIfFallingBlockMatches(SelectedBlock))) {
//     // if (debug.enabled) playAudio(audio.chain9);
//     return !!result;
//   }
//   let [clearLine, lowKey, highKey] = findClearLine(x, y);
//   // console.log("clear line info:", clearLine, lowKey, highKey);
//   let dir;
//   if (!clearLine) return false;
//   TouchOrders[0].KeySquare.Lowest = game.board[lowKey[0]][lowKey[1]];
//   if (highKey[1] - 1 < 0) return false;
//   TouchOrders[0].KeySquare.Highest = game.board[highKey[0]][highKey[1]];

//   let result = "";
//   let MainBlock;
//   let FirstBlock, SecondBlock, ThirdBlock;
//   let pair;
//   switch (clearLine[0]) {
//     case "a":
//       if (
//         isSolidPair(SelectedBlock, game.board[x][y - 1]) &&
//         (0 === 0 || containsSolidBlockPairOnRow(SelectedBlock, highKey[1] - 1))
//       ) {
//         match[1] = [x, y - 1];
//         // result = "TPair Main |A|";
//         result = checkAboveMatch(true);
//       } else if (
//         isSolidPair(SelectedBlock, game.board[x][y + 1]) &&
//         (0 === 0 || containsSolidBlockPairOnRow(SelectedBlock, highKey[1] - 1))
//       ) {
//         match[1] = [x, y + 1];
//         // result = "Main BPair |A|";
//         result = checkAboveMatch(true);
//       } else {
//         result = checkAboveMatch(false);
//       }
//       if (debug.enabled && result) playAudio(audio.announcer1);
//       break;
//     case "s":
//       dir = clearLine === "sideL" ? -1 : 1;
//       MainBlock = Math.abs(
//         TouchOrders[0].KeySquare.Lowest.x - SelectedBlock.x === dir
//       )
//         ? game.board[SelectedBlock.x][SelectedBlock.y]
//         : game.board[SelectedBlock.x + dir][SelectedBlock.y];
//       if (MainBlock.x !== SelectedBlock.x) {
//         if (!isSolidPair(MainBlock, SelectedBlock)) break;
//         match[0] = [MainBlock.x, MainBlock.y];
//       }
//       if (
//         MainBlock.x - dir >= 0 &&
//         MainBlock.x - dir < grid.COLS &&
//         isSolidPair(SelectedBlock, game.board[MainBlock.x - dir][y])
//       ) {
//         // pair is left, but clear line is right
//         match[1] = [MainBlock.x - dir, y];
//         result = checkSideMatch(true, dir);
//       } else {
//         // pair is right, but clear line is left
//         result = checkSideMatch(false, dir);
//       }
//       if (debug.enabled && result) playAudio(audio.announcer2);
//       break;
//     case "b":
//       MainBlock = game.board[x][y];
//       if (y > grid.ROWS - 2) break; // must be at minimum third row from bottom
//       if (debug.enabled) playAudio(audio.announcerGo);
//       result = checkBelowMatch(MainBlock);
//       break;
//   }
//   if (match[2][0] !== -1 && match[1][0] !== -1 && !ThreeBlocksMatch()) {
//     if (debug.enabled) console.log("fake match detected:", match);
//     // if (debug.enabled) pause("Fake match detected, check console");
//     result = false;
//   }
//   return !!result; // send true if not falsy value
// }

// function checkBelowMatch(FirstBlock) {
//   let [x, y] = [FirstBlock.x, FirstBlock.y];
//   let lowKeyX = TouchOrders[0].KeySquare.Lowest.x;
//   let lowKeyY = TouchOrders[0].KeySquare.Lowest.y;
//   let result = "";
//   let ThirdBlock;

//   let [SecondBlock, pair] = determinePair(FirstBlock, "vertical");
//   // do vertical pair cases
//   if (pair === "B") {
//     match[1] = [SecondBlock.x, SecondBlock.y];
//     if (CLEARING_TYPES.includes(game.board[x][y + 2].type)) {
//       ThirdBlock = findSolidBlockBelow(x, y + 2);
//       if (isSolidPair(FirstBlock, ThirdBlock)) {
//         match[2] = [ThirdBlock.x, ThirdBlock.y];
//         TouchOrders[0].pair = pair;
//         return "Main + BPair |B| Bot1";
//       }
//     }
//   } else if (pair === "A") {
//     match[1] = [SecondBlock.x, SecondBlock.y];
//     ThirdBlock = findSolidBlockBelow(lowKeyX, lowKeyY);
//     if (isSolidPair(FirstBlock, ThirdBlock)) {
//       match[2] = [ThirdBlock.x, ThirdBlock.y];
//       TouchOrders[0].pair = pair;
//       return "TPair + Main |B| Bot1";
//     }
//   }

//   [SecondBlock, pair] = determinePair(FirstBlock, "horizontal");

//   if (pair) {
//     match[1] = [SecondBlock.x, SecondBlock.y];
//     let dir = pair == "L" ? -1 : 1;
//     if (x + 2 * dir >= 0 && x + 2 * dir < grid.COLS) {
//       ThirdBlock = game.board[x + 2 * dir][lowKeyY];
//       if (isSolidPair(FirstBlock, ThirdBlock)) {
//         match[2] = [ThirdBlock.x, ThirdBlock.y];
//         TouchOrders[0].pair = pair;
//         return pair == "L" ? "LPair + Main |B| Lef1" : "Main + RPair |B| Rgt1";
//       }
//     }

//     if (x - 1 * dir >= 0 && x - 1 * dir < grid.COLS) {
//       ThirdBlock = game.board[x - 1 * dir][lowKeyY];
//       if (isSolidPair(FirstBlock, ThirdBlock)) {
//         match[2] = [ThirdBlock.x, ThirdBlock.y];
//         TouchOrders[0].pair = pair;
//         return pair == "L" ? "LPair + Main |B| Rgt1" : "Main + RPair |B| Lef1";
//       }
//     }
//   }

//   TouchOrders[0].pair = pair; // pair is empty

//   // do tasks that involve no pairs. lowkey is very important

//   // do vertical one. Second block must be at minimum on second row
//   if (lowKeyY < grid.ROWS - 2) {
//     SecondBlock = findSolidBlockBelow(lowKeyX, lowKeyY);
//     if (isSolidPair(FirstBlock, SecondBlock)) {
//       match[1] = [SecondBlock.x, SecondBlock.y];
//       ThirdBlock = game.board[SecondBlock.x][SecondBlock.y + 1];
//       if (isSolidPair(FirstBlock, ThirdBlock)) {
//         match[2] = [ThirdBlock.x, ThirdBlock.y];
//         return "Main |B| Bot1 Bot2";
//       }
//     }
//   }

//   // now do horizontal, which has 3 cases.
//   let solidGroundArray = checkSolidGround(lowKeyX, lowKeyY);
//   if (solidGroundArray.includes(-1) && solidGroundArray.includes(1)) {
//     SecondBlock = game.board[lowKeyX - 1][lowKeyY];
//     ThirdBlock = game.board[lowKeyX + 1][lowKeyY];
//     if (
//       isSolidPair(FirstBlock, SecondBlock) &&
//       isSolidPair(FirstBlock, ThirdBlock)
//     ) {
//       match[1] = [SecondBlock.x, SecondBlock.y];
//       match[2] = [ThirdBlock.x, ThirdBlock.y];
//       return "Main |B| Lef1 Lef2";
//     }
//   }

//   if (solidGroundArray.includes(-1) && solidGroundArray.includes(-2)) {
//     SecondBlock = game.board[lowKeyX - 1][lowKeyY];
//     ThirdBlock = game.board[lowKeyX - 2][lowKeyY];
//     if (
//       isSolidPair(FirstBlock, SecondBlock) &&
//       isSolidPair(FirstBlock, ThirdBlock)
//     ) {
//       match[1] = [SecondBlock.x, SecondBlock.y];
//       match[2] = [ThirdBlock.x, ThirdBlock.y];
//       return "Main |B| Lef1 Lef2";
//     }
//   }

//   if (solidGroundArray.includes(1) && solidGroundArray.includes(2)) {
//     SecondBlock = game.board[lowKeyX + 1][lowKeyY];
//     ThirdBlock = game.board[lowKeyX + 2][lowKeyY];
//     if (
//       isSolidPair(FirstBlock, SecondBlock) &&
//       isSolidPair(FirstBlock, ThirdBlock)
//     ) {
//       match[1] = [SecondBlock.x, SecondBlock.y];
//       match[2] = [ThirdBlock.x, ThirdBlock.y];
//       return "Main |B| Lef1 Lef2";
//     }
//   }

//   // let SolidBlockBelow_1 = findSolidBlockBelow(x, y);
//   // let SolidBlockBelow_2;

//   // if (pair === "BPair" || pair === "TPair") {
//   //   if (isSolidPair(FirstBlock, SolidBlockBelow_1)) {
//   //     match[2] = [x, SolidBlockBelow_1.y];
//   //     result =
//   //       pair === "BPair" ? "Main + BPair |B| Bot" : "TPair + Main |B| Bot";
//   //   }
//   //   // if a solid block exists between main block, no need to check any more cases.
//   //   else if (pair === "BPair") return false;
//   // }

//   // TouchOrders[0].solidGroundArray = checkSolidGround(
//   //   TouchOrders[0].KeySquare.Lowest.x,
//   //   TouchOrders[0].KeySquare.Lowest.y
//   // );
//   // if (!TouchOrders[0].solidGroundArray) return false;
//   // console.log(
//   //   game.frames,
//   //   "Solid ground array:",
//   //   TouchOrders[0].solidGroundArray
//   // );
//   // ThirdBlock;

//   // while (true) {
//   //   if (pair === "LPair" && TouchOrders[0].solidGroundArray.includes(-2)) {
//   //     // playAudio(audio.announcer1);
//   //     ThirdBlock = findSolidBlockAbove(
//   //       x - 2,
//   //       TouchOrders[0].KeySquare.Lowest.y
//   //     );
//   //     if (isSolidPair(FirstBlock, ThirdBlock)) {
//   //       match[2] = [x - 2, ThirdBlock.y];
//   //       result = "LPair + Main |B| Lef2";
//   //       break;
//   //     }
//   //   }
//   //   if (pair === "LPair" && TouchOrders[0].solidGroundArray.includes(1)) {
//   //     // playAudio(audio.announcer2);
//   //     ThirdBlock = findSolidBlockAbove(
//   //       x + 1,
//   //       TouchOrders[0].KeySquare.Lowest.y
//   //     );
//   //     if (isSolidPair(FirstBlock, ThirdBlock)) {
//   //       match[2] = [x + 1, ThirdBlock.y];
//   //       result = "LPair + Main |B| Rgt1";
//   //       break;
//   //     }
//   //   }
//   //   if (pair === "RPair" && TouchOrders[0].solidGroundArray.includes(-1)) {
//   //     // playAudio(audio.announcer3);
//   //     ThirdBlock = findSolidBlockAbove(
//   //       x - 1,
//   //       TouchOrders[0].KeySquare.Lowest.y
//   //     );
//   //     if (isSolidPair(FirstBlock, ThirdBlock)) {
//   //       match[2] = [x - 1, ThirdBlock.y];
//   //       result = "Main + RPair |B| Lef1";
//   //       break;
//   //     }
//   //   }
//   //   if (pair === "RPair" && TouchOrders[0].solidGroundArray.includes(2)) {
//   //     // playAudio(audio.announcer4);
//   //     ThirdBlock = findSolidBlockAbove(
//   //       x + 2,
//   //       TouchOrders[0].KeySquare.Lowest.y
//   //     );
//   //     if (isSolidPair(FirstBlock, ThirdBlock)) {
//   //       match[2] = [x + 2, ThirdBlock.y];
//   //       result = "Main + RPair |B| Rgt2";
//   //       break;
//   //     }
//   //   }

//   //   // Now check no pair versions
//   //   let SecondBlock, ThirdBlock;

//   //   // First check below
//   //   if (TouchOrders[0].KeySquare.Lowest.y + 1 < grid.ROWS) {
//   //     SecondBlock = game.board[x][TouchOrders[0].KeySquare.Lowest.y + 1];
//   //     if (isSolidPair(FirstBlock, SecondBlock)) {
//   //       match[1] = [SecondBlock.x, SecondBlock.y];
//   //       ThirdBlock = findSolidBlockBelow(SecondBlock.x, SecondBlock.y);
//   //       if (ThirdBlock.x !== -1 && isSolidPair(FirstBlock, ThirdBlock)) {
//   //         match[2] = [ThirdBlock.x, ThirdBlock.y];
//   //         result = "Main |B| Bel1 Bel2";
//   //         // playAudio(audio.announcer1);
//   //         break;
//   //       }
//   //     }
//   //   }

//   //   // then check left and right 2
//   //   let [leftIsSolidPair, rightIsSolidPair] = [false, false];
//   //   for (let dir = -1; dir < 2; dir += 2) {
//   //     console.log("for loop dir:", dir);
//   //     if (TouchOrders[0].solidGroundArray.includes(dir)) {
//   //       SecondBlock = game.board[x + dir][TouchOrders[0].KeySquare.Lowest.y];
//   //       if (SecondBlock.x !== -1 && isSolidPair(FirstBlock, SecondBlock)) {
//   //         match[1] = [SecondBlock.x, SecondBlock.y];
//   //         dir === -1 ? (leftIsSolidPair = true) : (rightIsSolidPair = true);
//   //         if (TouchOrders[0].solidGroundArray.includes(2 * dir)) {
//   //           ThirdBlock =
//   //             game.board[x + 2 * dir][TouchOrders[0].KeySquare.Lowest.y];
//   //           if (ThirdBlock.x !== -1 && isSolidPair(FirstBlock, ThirdBlock)) {
//   //             match[2] = [ThirdBlock.x, ThirdBlock.y];
//   //             result = `Main |B| ${dir === -1 ? "Lef1 + Lef2" : "Rgt1 + Rgt2"}`;
//   //             // playAudio(audio.announcer2);
//   //             break;
//   //           }
//   //         }
//   //       }
//   //     }
//   //   }
//   //   console.log(leftIsSolidPair, rightIsSolidPair);
//   //   // then check left 1 right 1
//   //   if (leftIsSolidPair && rightIsSolidPair) {
//   //     SecondBlock = game.board[x - 1][TouchOrders[0].KeySquare.Lowest.y];
//   //     match[1] = [SecondBlock.x, SecondBlock.y];
//   //     ThirdBlock = game.board[x + 1][TouchOrders[0].KeySquare.Lowest.y];
//   //     match[2] = [ThirdBlock.x, ThirdBlock.y];
//   //     // playAudio(audio.announcer3);
//   //     result = "Main |B| Lef1 + Rgt1";
//   //     break;
//   //   }
//   //   break;
//   // }
//   return result;
// }

// function checkAboveMatch(single = false) {
//   let [keyX, keyY] = [
//     TouchOrders[0].KeySquare.Highest.x,
//     TouchOrders[0].KeySquare.Highest.y,
//   ];
//   let AboveBlock_1 = findSolidBlockAbove(keyX, keyY);
//   if (!AboveBlock_1) return false;
//   if (
//     isSolidPair(SelectedBlock, AboveBlock_1) ||
//     chainableBlockPairAbove(SelectedBlock)
//   ) {
//     if (single) {
//       match[2] = [AboveBlock_1.x, AboveBlock_1.y];
//       // cancel sticky if a three is already ready to chain
//       if (
//         SelectedBlock.color ===
//         game.board[SelectedBlock.x][SelectedBlock.y - 1].color
//       ) {
//         if (
//           isSolidPair(
//             SelectedBlock,
//             game.board[AboveBlock_1.x][AboveBlock_1.y - 1]
//           )
//         ) {
//           return false;
//         }
//       }
//       return "Pair |A| Abv1";
//     }
//     match[1] = [AboveBlock_1.x, AboveBlock_1.y];
//     let AboveBlock_2 = findSolidBlockAbove(AboveBlock_1.x, AboveBlock_1.y - 1);
//     if (isSolidPair(SelectedBlock, AboveBlock_2)) {
//       match[2] = [AboveBlock_2.x, AboveBlock_2.y];
//       return "Single |A| Abv1 Abv2";
//     }
//   }
//   return false;
// }

// function checkSideMatch(single = false, dir) {
//   let [highKeyX, highKeyY] = [
//     TouchOrders[0].KeySquare.Highest.x,
//     TouchOrders[0].KeySquare.Highest.y,
//   ];
//   let [lowKeyX, lowKeyY] = [
//     TouchOrders[0].KeySquare.Lowest.x,
//     TouchOrders[0].KeySquare.Lowest.y,
//   ];
//   let MainBlock = Math.abs(
//     TouchOrders[0].KeySquare.Lowest.x - SelectedBlock.x === dir
//   )
//     ? game.board[SelectedBlock.x][SelectedBlock.y]
//     : game.board[SelectedBlock.x + dir][SelectedBlock.y];
//   // make sure that the lowest key square is on same level as selected block
//   if (MainBlock.y !== lowKeyY) return false;
//   if (highKeyX < 0 || highKeyX >= grid.COLS) return false;
//   let SideBlock_1 = findSolidBlockAbove(highKeyX, highKeyY);
//   if (!SideBlock_1) return false;
//   if (
//     isSolidPair(MainBlock, SideBlock_1) ||
//     chainableBlockPairAbove(SideBlock_1)
//   ) {
//     if (single) {
//       match[2] = [SideBlock_1.x, SideBlock_1.y];
//       // If swapping with same block and already paired, cancel redundant sticky
//       // if (MainBlock.x === SelectedBlock.x) return false;
//       // if (MainBlock.x !== SelectedBlock.x && MainBlock.swapDirection === -dir)
//       //   return false;
//       let s = dir === -1 ? "L" : "R";
//       let t = dir === -1 ? "R" : "L";
//       return `${t}Pair |${s}| Abv${s}1`;
//     }
//     match[1] = [SideBlock_1.x, SideBlock_1.y];
//     if (SideBlock_1.x + dir < 0 || SideBlock_1.x + dir >= grid.COLS)
//       return false;
//     // the y level needs to be the same as the original block
//     let SideBlock_2 = findSolidBlockAbove(SideBlock_1.x + dir, lowKeyY);
//     if (!SideBlock_2) return false;
//     if (isSolidPair(MainBlock, SideBlock_2)) {
//       match[2] = [SideBlock_2.x, SideBlock_2.y];
//       let s = dir === -1 ? "L" : "R";
//       return `Main |${s}| Abv${s}1 + ${s}2`;
//     }
//   }
//   return false;
// }

// function findSolidBlockAbove(x, y, stopAtClearing = false) {
//   if (outOfRange(x, y)) return JSON.parse(undefBlock);

//   // checks at and above the defined y height
//   for (let j = y; j >= 0; j--) {
//     if (blockIsSolid(game.board[x][j])) return game.board[x][j];
//     if (stopAtClearing && CLEARING_TYPES.includes(game.board[x][j])) {
//       return JSON.parse(undefBlock);
//     }
//   }
//   return JSON.parse(undefBlock);
// }

// function findSolidBlockBelow(x, y, stopAtClearing = false) {
//   if (outOfRange(x, y)) return JSON.parse(undefBlock);
//   for (let j = y + 1; j < grid.ROWS; j++) {
//     if (blockIsSolid(game.board[x][j])) return game.board[x][j];
//     if (stopAtClearing && CLEARING_TYPES.includes(game.board[x][j])) {
//       return JSON.parse(undefBlock);
//     }
//   }
//   return JSON.parse(undefBlock);
// }

// function findClearLine(x, y) {
//   let keySquare = [];
//   let highestClearSquare = [];
//   let clearLine = "";

//   // check above (Must be at least 2 rows from A)
//   if (y >= 1) {
//     // if first square is vacant, that will be the key square.
//     let useOriginalSquare = game.board[x][y].color === "vacant";
//     for (let j = y - 1; j >= 0; j--) {
//       if (blockIsSolid(game.board[x][j])) {
//         if (SelectedBlock.color !== game.board[x][j].color) break;
//       }
//       if (CLEARING_TYPES.includes(game.board[x][j].type)) {
//         keySquare = useOriginalSquare ? [x, y] : [x, j];
//         clearLine = "a";
//         if (j === 0) {
//           highestClearSquare = [x, 0];
//         }
//         // now find the highest clearing square
//         for (let k = j - 1; k >= 0; k--) {
//           if (!CLEARING_TYPES.includes(game.board[x][k].type)) {
//             highestClearSquare = [x, k + 1];
//             return [clearLine, keySquare, highestClearSquare];
//           }
//         }
//       }
//     }
//   }

//   // check below
//   if (y < grid.ROWS - 1) {
//     let firstClearingSquare;
//     let clearFound = false;
//     for (let j = y + 1; j < grid.ROWS; j++) {
//       if (CLEARING_TYPES.includes(game.board[x][j].type)) {
//         clearLine = "b";
//         highestClearSquare = [x, j];
//         clearFound = true;
//         // determine B of clear zone
//         if (j === grid.ROWS - 1) {
//           keySquare = [x, j];
//           return [clearLine, keySquare, highestClearSquare];
//         }
//         for (let k = j + 1; k < grid.ROWS; k++) {
//           if (!blockVacOrClearing(game.board[x][k])) {
//             keySquare = [x, k - 1];
//             return [clearLine, keySquare, highestClearSquare];
//           }
//         }
//         // we have k at B of grid, so key square is on B row
//         keySquare = [x, grid.ROWS - 1];
//         return [clearLine, keySquare, highestClearSquare];
//       } else if (j - y == 2) break;
//     }
//   }

//   // check both sides, two squares.
//   for (let dir = -1; dir <= 1; dir += dir === -1 ? 2 : 1) {
//     // One-time While loop used for quick breakage
//     while (true) {
//       // end loop if out of x range, block is solid, or block below is vacant
//       if (x + dir < 0 || x + dir >= grid.COLS) break;

//       // if (blockIsSolid(game.board[x + dir][y])) break;
//       for (let i = 1; i <= 2; i++) {
//         if (
//           (y === grid.ROWS - 1 ||
//             !blockVacOrClearing(game.board[x + dir][y + 1])) &&
//           x + i * dir >= 0 &&
//           x + i * dir < grid.COLS
//         ) {
//           keySquare = [x + i * dir, y]; // key square is directly next to clearing side
//           for (let j = y + 1; j < grid.ROWS; j++) {
//             if (!blockVacOrClearing(game.board[x + i * dir][j])) {
//               keySquare = [x + i * dir, j - 1];
//               break;
//             }
//             if (j === grid.ROWS - 1) keySquare = [x + i * dir, grid.ROWS - 1];
//           }
//           if (CLEARING_TYPES.includes(game.board[x + i * dir][y].type)) {
//             clearLine = dir === -1 ? "sideL" : "sideR"; // side left, side right
//             if (y - 1 < 0) highestClearSquare = [x + i * dir, 0];
//             else {
//               highestClearSquare = [x + i * dir, y];
//               for (let j = y - 1; j >= 0; j--) {
//                 if (!CLEARING_TYPES.includes(game.board[x + i * dir][j].type)) {
//                   highestClearSquare = [x + i * dir, j + 1];
//                   break;
//                 }
//               }
//             }
//             return [clearLine, keySquare, highestClearSquare];
//           } // end clearing condition
//         } // end main condition
//       } // end for loop

//       break;
//     } // end while
//   }
//   return [false, false, false];
// }

// function isSolidPair(Square_1, Square_2) {
//   return (
//     !outOfRange(Square_1.x, Square_1.y) &&
//     !outOfRange(Square_2.x, Square_2.y) &&
//     Square_1.color === Square_2.color &&
//     blockIsSolid(Square_1) &&
//     blockIsSolid(Square_2)
//   );
// }

// function checkPairWithFirstNonVacantBlock(Square) {
//   if (!Square) return JSON.parse(undefBlock);
//   let [x, y] = [Square.x, Square.y];
//   if (y !== grid.ROWS - 1) {
//     for (let j = y + 1; j < grid.ROWS; j++) {
//       if (game.board[x][j].color !== "vacant") {
//         if (
//           !isSolidPair(Square, game.board[x][j]) ||
//           j >= TouchOrders[0].KeySquare.Highest.y
//         ) {
//           break;
//         } else {
//           return [game.board[x][j], "BPair"];
//         }
//       }
//     }
//   }
//   if (y !== 0) {
//     for (let j = y - 1; j >= 0; j--) {
//       if (game.board[x][j].color !== "vacant") {
//         if (!isSolidPair(Square, game.board[x][j])) break;
//         else return [game.board[x][j], "TPair"];
//       }
//     }
//   }

//   if (x !== 0 && isSolidPair(Square, game.board[x - 1][y])) {
//     return [game.board[x - 1][y], "LPair"];
//   }
//   if (x !== grid.COLS - 1 && isSolidPair(Square, game.board[x + 1][y])) {
//     return [game.board[x + 1][y], "RPair"];
//   }
//   return [JSON.parse(undefBlock), ""];
// }

// function chainableBlockPairAbove(Square) {
//   if (Square.y - 1 < 0) return false;
//   let result = false;
//   let [x, y] = [Square.x, Square.y];

//   for (let j = y - 1; j >= 0; j--) {
//     let PairBlock = game.board[x][j];
//     if (PairBlock.availForPrimaryChain || PairBlock.availForSecondaryChain) {
//       if (isSolidPair(Square, game.board[x][j])) result = true;
//     }
//   }
//   return result;
// }

// function containsSolidBlockPairOnRow(Square, row) {
//   if (row < 0 || row >= grid.ROWS) return false;
//   for (let x = Square.x; x < grid.COLS; x++) {
//     if (CLEARING_TYPES.includes(game.board[x][row].type)) break;
//     if (Square.color === game.board[x][row].color) return [x, row];
//   }
//   for (let x = Square.x; x >= 0; x--) {
//     if (CLEARING_TYPES.includes(game.board[x][row].type)) break;
//     if (Square.color === game.board[x][row].color) return [x, row];
//   }
//   return false;
// }

// function checkSolidGround(keyX, keyY) {
//   // this function tests if a clear line is on the same row as a solid

//   let solidGroundCasesPassed = [0];
//   // console.log(
//   //   "x:",
//   //   keyX,
//   //   "y:",
//   //   keyY,
//   //   game.board[keyX][keyY],
//   //   blockVacOrClearing(game.board[keyX - 2][keyY]),
//   //   blockVacOrClearing(game.board[keyX - 1][keyY]),
//   //   blockVacOrClearing(game.board[keyX][keyY]),
//   //   blockVacOrClearing(game.board[keyX + 1][keyY]),
//   //   blockVacOrClearing(game.board[keyX + 2][keyY])
//   // );
//   if (
//     keyX - 1 >= 0 &&
//     (keyY === grid.ROWS - 1 || !game.board[keyX - 1][keyY + 1].airborne)
//   ) {
//     solidGroundCasesPassed.unshift(-1);
//   }
//   if (
//     keyX + 1 < grid.COLS &&
//     (keyY === grid.ROWS - 1 || !game.board[keyX + 1][keyY + 1].airborne)
//   ) {
//     solidGroundCasesPassed.push(1);
//   }
//   if (
//     keyX - 2 >= 0 &&
//     (keyY === grid.ROWS - 1 || !game.board[keyX - 2][keyY + 1].airborne)
//   ) {
//     solidGroundCasesPassed.unshift(-2);
//   }
//   if (
//     keyX + 2 < grid.COLS &&
//     (keyY === grid.ROWS - 1 || !game.board[keyX + 2][keyY + 1].airborne)
//   ) {
//     solidGroundCasesPassed.push(2);
//   }
//   return solidGroundCasesPassed;
// }

// function checkIfFallingBlockMatches(MainBlock) {
//   if (game.currentChain === 0) return false;
//   let x = MainBlock.x;
//   let y = MainBlock.y;
//   let [PairBlock, pair] = determinePair(MainBlock, "vertical");
//   let FirstBlock, SecondBlock, ThirdBlock;
//   let checkLeft1 = false;
//   let checkLeft2 = false;
//   let checkRight1 = false;
//   let checkRight2 = false;
//   let checkAbove = false;
//   let result = "";

//   if (
//     (y - 1 >= 0 && game.board[x][y - 1].color === "vacant") ||
//     (y - 2 >= 0 && game.board[x][y - 2].color === "vacant")
//   )
//     checkAbove = true;

//   // check for match of falling block AND either pair or

//   if (checkAbove) {
//     // Main Block is the first square directly under vacant blocks
//     FirstBlock = pair === "A" ? game.board[x][y - 1] : game.board[x][y];
//     for (let j = FirstBlock.y - 1; j >= 0; j--) {
//       if (blockIsSolid(game.board[x][j])) {
//         if (FirstBlock.color === game.board[x][j].color) {
//           if (pair) {
//             ThirdBlock = game.board[x][j];
//             match[2] = [x, j];
//             return "single match above found vac";
//           } else {
//             SecondBlock = game.board[x][j];
//             for (let k = SecondBlock.y - 1; k >= 0; k--) {
//               match[1] = [x, j];
//               if (blockIsSolid(game.board[x][k])) {
//                 if (FirstBlock.color === game.board[x][k].color) {
//                   ThirdBlock = game.board[x][k];
//                   match[2] = [x, k];
//                   return "double match above found vac";
//                 } else break; // solid block but not pair, end search
//               }
//             }
//           }
//         } else break; // block is solid but not a pair, so end search
//       }
//     }
//     match[1] = match[2] = [-1, -1];
//   }

//   // look for horizontal pairs
//   [PairBlock, pair] = determinePair(MainBlock, "horizontal");

//   if (
//     x - 1 >= 0 &&
//     game.board[x - 1][y].color === "vacant" &&
//     !vacantBlockBelow(game.board[x - 1][y])
//   ) {
//     checkLeft1 = true;
//   }
//   if (
//     x - 2 >= 0 &&
//     game.board[x - 2][y].color == "vacant" &&
//     pair == "L" &&
//     !vacantBlockBelow(game.board[x - 2][y])
//   ) {
//     checkLeft2 = true;
//   }

//   if (
//     x + 1 < grid.COLS &&
//     game.board[x + 1][y].color === "vacant" &&
//     !vacantBlockBelow(game.board[x + 1][y])
//   ) {
//     checkRight1 = true;
//   }
//   if (
//     x + 2 < grid.COLS &&
//     game.board[x + 2][y].color == "vacant" &&
//     pair == "R" &&
//     !vacantBlockBelow(game.board[x + 2][y])
//   ) {
//     checkRight2 = true;
//   }

//   // if (
//   //   debug.enabled &&
//   //   (checkLeft1 || checkLeft2 || checkRight1 || checkRight2 || checkAbove)
//   // ) {
//   //   playAudio(audio.announcerInvincible);
//   //   console.log(
//   //     `L1: ${checkLeft1}, L2: ${checkLeft2}, R1: ${checkRight1}, R2: ${checkRight2}, Abv: ${checkAbove}, Pair: ${pair}`
//   //   );
//   // }

//   if (checkLeft1) {
//     FirstBlock = game.board[x][y];
//     SecondBlock = findSolidBlockAbove(x - 1, y);
//     if (isSolidPair(FirstBlock, SecondBlock)) {
//       if (pair) {
//         match[1] = [SecondBlock.x, SecondBlock.y];
//         ThirdBlock = game.board[x + 1][y];
//         match[2] = [ThirdBlock.x, ThirdBlock.y];
//         return "single match L1, pair block R1 vac";
//       } else {
//         match[1] = [SecondBlock.x, SecondBlock.y];
//         ThirdBlock = findSolidBlockAbove(x - 2, y);
//         if (isSolidPair(FirstBlock, ThirdBlock)) {
//           match[2] = [ThirdBlock.x, ThirdBlock.y];
//           return "double match L1 L2 vac";
//         }
//       }
//       // no three match has been found. Moving on.
//     }
//     match[1] = match[2] = [-1, -1];
//   }
//   if (checkLeft2) {
//     // it has already been determined that pair is on left.
//     FirstBlock = game.board[x][y];
//     SecondBlock = game.board[x - 1][y];
//     match[1] = [x - 1, y];
//     ThirdBlock = findSolidBlockAbove(x - 2, y - 1);
//     if (isSolidPair(FirstBlock, ThirdBlock)) {
//       match[2] = [x - 2, ThirdBlock.y];
//       return "single match L2, pair block L1, vac";
//     }
//     match[1] = match[2] = [-1, -1];
//   }

//   if (checkRight1) {
//     FirstBlock = game.board[x][y];
//     SecondBlock = findSolidBlockAbove(x + 1, y);
//     if (isSolidPair(FirstBlock, SecondBlock)) {
//       if (pair) {
//         match[1] = [SecondBlock.x, SecondBlock.y];
//         ThirdBlock = game.board[x - 1][y];
//         match[2] = [ThirdBlock.x, ThirdBlock.y];
//         return "single match R1, pair block L1, vac";
//       } else {
//         match[1] = [SecondBlock.x, SecondBlock.y];
//         ThirdBlock = findSolidBlockAbove(x + 2, y);
//         if (isSolidPair(FirstBlock, ThirdBlock)) {
//           match[2] = [ThirdBlock.x, ThirdBlock.y];
//           return "double match R1 R2 vac";
//         }
//       }
//       // no three match has been found. Moving on.
//     }
//     match[1] = match[2] = [-1, -1];
//   }

//   if (checkRight2) {
//     // it has already been determined that a pair is on right.
//     FirstBlock = game.board[x][y];
//     SecondBlock = game.board[x + 1][y];
//     match[1] = [x + 1, y];
//     ThirdBlock = findSolidBlockAbove(x + 2, y);
//     if (isSolidPair(FirstBlock, ThirdBlock)) {
//       match[2] = [x + 2, ThirdBlock.y];
//       return "single match R2, pair block R1, vac";
//     }
//     match[1] = match[2] = [-1, -1];
//   }
//   // no vacant matches found
//   return false;
// }

// function determinePair(Square, type) {
//   let x = Square.x,
//     y = Square.y;
//   let PairBlock;
//   let pair = "";
//   if (type === "vertical") {
//     if (y - 1 >= 0 && isSolidPair(Square, (PairBlock = game.board[x][y - 1]))) {
//       match[1] = [x, PairBlock.y];
//       return [PairBlock, "A"];
//     }

//     if (
//       y + 1 < grid.ROWS &&
//       isSolidPair(Square, (PairBlock = game.board[x][y + 1]))
//     ) {
//       match[1] = [x, PairBlock.y];
//       return [PairBlock, "B"];
//     }
//   } else {
//     if (
//       x - 1 >= 0 &&
//       !game.board[x - 1][y].airborne &&
//       isSolidPair(Square, (PairBlock = game.board[x - 1][y])) &&
//       !vacantBlockBelow(PairBlock)
//     ) {
//       match[1] = [x, PairBlock.y];
//       return [PairBlock, "L"];
//     }
//     if (
//       x + 1 < grid.COLS &&
//       !game.board[x + 1][y].airborne &&
//       isSolidPair(Square, (PairBlock = game.board[x + 1][y])) &&
//       !vacantBlockBelow(PairBlock)
//     ) {
//       match[1] = [x, PairBlock.y];
//       return [PairBlock, "R"];
//     }
//   }

//   return [JSON.parse(undefBlock), ""];
// }

// function checkChainableBlockAbove(x, y) {
//   let ResultingSquare = undefBlock;
//   for (let j = y - 1; j >= 0; j--) {
//     let NextSquare = game.board[x][j];
//     if (
//       NextSquare.availForPrimaryChain ||
//       (NextSquare.availForSecondaryChain && !NextSquare.touched)
//     ) {
//       ResultingSquare = NextSquare;
//       break;
//     }
//   }
//   return ResultingSquare;
// }

// function firstVacantOrClearingBlockAbove(x, y) {
//   if (y - 1 < 0) return JSON.parse(undefBlock);
//   if (!blockVacOrClearing(game.board[x][y - 1])) return JSON.parse(undefBlock);
//   for (let j = y - 1; j >= 0; j--) {
//     if (blockVacOrClearing(game.board[x][j])) return game.board[x][j];
//   }
//   return JSON.parse(undefBlock);
// }

// function lastVacantOrClearingBlockAbove(FirstClearBlock) {
//   let x = FirstClearBlock.x;
//   for (let j = FirstClearBlock.y - 1; j >= 0; j--) {
//     if (
//       game.board[x][j].color !== "vacant" &&
//       !CLEARING_TYPES.includes(game.board[x][j].type)
//     ) {
//       return game.board[x][j + 1];
//     }
//   }
//   return JSON.parse(undefBlock);
// }
