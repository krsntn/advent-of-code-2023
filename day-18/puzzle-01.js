const fs = require("fs");
const filename = "./input.txt";
let inputList = fs.readFileSync(filename, "utf8").trim().split("\n");

let pos = [0, 0];
const wall = new Map();
wall.set(JSON.stringify(pos), 1);

function explore(direction) {
  switch (direction) {
    case "R":
      pos = [pos[0], pos[1] + 1];
      wall.set(
        JSON.stringify(pos),
        wall.has([pos[0], pos[1] + 1]) ? wall.get([pos[0], pos[1] + 1]) + 1 : 1,
      );
      break;
    case "L":
      pos = [pos[0], pos[1] - 1];
      wall.set(
        JSON.stringify(pos),
        wall.has([pos[0], pos[1] - 1]) ? wall.get([pos[0], pos[1] - 1]) + 1 : 1,
      );
      break;
    case "U":
      pos = [pos[0] - 1, pos[1]];
      wall.set(
        JSON.stringify(pos),
        wall.has([pos[0] - 1, pos[1]]) ? wall.get([pos[0] - 1, pos[1]]) + 1 : 1,
      );
      break;
    case "D":
      pos = [pos[0] + 1, pos[1]];
      wall.set(
        JSON.stringify(pos),
        wall.has([pos[0] + 1, pos[1]]) ? wall.get([pos[0] + 1, pos[1]]) + 1 : 1,
      );
      break;
  }
}

function isPosInLoop(row, col) {
  let isInLoop = false;
  let fromTile = null;
  for (let i = col + 1; i <= maxCol; i++) {
    if (!wall.has(JSON.stringify([row, i]))) {
      continue;
    }

    if (
      wall.has(JSON.stringify([row - 1, i])) &&
      wall.has(JSON.stringify([row + 1, i]))
    ) {
      isInLoop = !isInLoop;
      continue;
    }

    if (fromTile === null) {
      if (
        wall.has(JSON.stringify([row - 1, i])) &&
        !wall.has(JSON.stringify([row + 1, i]))
      ) {
        fromTile = [row - 1, i];
        continue;
      }
      if (
        wall.has(JSON.stringify([row + 1, i])) &&
        !wall.has(JSON.stringify([row - 1, i]))
      ) {
        fromTile = [row + 1, i];
        continue;
      }
    }

    if (wall.has(JSON.stringify([row - 1, i]))) {
      if (fromTile[0] === row + 1) {
        isInLoop = !isInLoop;
      }
      fromTile = null;
      continue;
    }

    if (wall.has(JSON.stringify([row + 1, i]))) {
      if (fromTile[0] === row - 1) {
        isInLoop = !isInLoop;
      }
      fromTile = null;
      continue;
    }
  }
  return isInLoop;
}

for (let i = 0; i < inputList.length; i++) {
  const split = inputList[i].split(" ");
  const [direction, value] = split;
  for (let j = 0; j < parseInt(value); j++) {
    explore(direction);
  }
}

let minRow = 0;
let minCol = 0;
let maxRow = 0;
let maxCol = 0;

wall.forEach((_, key) => {
  const [row, col] = key
    .replace("[", "")
    .replace("]", "")
    .split(",")
    .map(Number);
  if (row < minRow) {
    minRow = row;
  }
  if (row > maxRow) {
    maxRow = row;
  }
  if (col < minCol) {
    minCol = col;
  }
  if (col > maxCol) {
    maxCol = col;
  }
});

// for (let row = minRow; row <= maxRow; row++) {
//   let printRow = `${row}`;
//   for (let col = minCol; col <= maxCol; col++) {
//     if (wall.has(JSON.stringify([row, col]))) {
//       printRow += "#";
//     } else {
//       if (isPosInLoop(row, col)) {
//         printRow += "@";
//       } else {
//         printRow += ".";
//       }
//     }
//   }
//   // console.log(printRow);
// }

let count = 0;
for (let row = minRow; row <= maxRow; row++) {
  for (let col = minCol; col <= maxCol; col++) {
    if (!wall.has(JSON.stringify([row, col]))) {
      if (isPosInLoop(row, col)) {
        count++;
      }
    }
  }
}

console.log(count + wall.size);
