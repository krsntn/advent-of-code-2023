const fs = require("fs");
const filename = "./input.txt";
let inputList = fs.readFileSync(filename, "utf8").trim().split("\n");

const rockPos = [];

for (let line = 0; line < inputList.length; line++) {
  for (let x = 0; x < inputList[line].length; x++) {
    if (inputList[line][x] === "O") {
      rockPos.push([line, x]);
    }
  }
}

let seen = [];
let final = "";

const LOOP = 1000000000;

for (let i = 0; i < LOOP; i++) {
  const result = JSON.stringify(tilt(rockPos));
  if (seen.includes(result)) {
    const unusedFrontLen = seen.indexOf(result);
    seen = seen.slice(unusedFrontLen);
    final = seen[(LOOP - 1 - unusedFrontLen) % seen.length];
    break;
  } else {
    seen.push(result);
  }
}

const sum = calcAns(JSON.parse(final));
console.log(sum);

// functions =========================================================

function tilt(rocks) {
  for (let x = 0; x < rocks.length; x++) {
    const rock = rocks[x];

    // north
    for (let upRow = rock[0] - 1; upRow >= 0; upRow--) {
      if (inputList[upRow][rock[1]] === "#") {
        break;
      } else if (!rocks.find((r) => r[0] === upRow && r[1] === rock[1])) {
        rocks[x] = [upRow, rock[1]];
      }
    }
  }

  rocks = rocks.sort((a, b) => a[0] - b[0]).sort((a, b) => a[1] - b[1]);

  // west
  for (let x = 0; x < rocks.length; x++) {
    const rock = rocks[x];
    for (let leftCol = rock[1] - 1; leftCol >= 0; leftCol--) {
      if (inputList[rock[0]][leftCol] === "#") {
        break;
      } else if (!rocks.find((r) => r[0] === rock[0] && r[1] === leftCol)) {
        rocks[x] = [rock[0], leftCol];
      }
    }
  }

  rocks = rocks.sort((a, b) => a[1] - b[1]).sort((a, b) => a[0] - b[0]);

  // south
  for (let x = rocks.length - 1; x >= 0; x--) {
    const rock = rocks[x];
    for (
      let downRow = rock[0] + 1;
      downRow <= inputList.length - 1;
      downRow++
    ) {
      if (inputList[downRow][rock[1]] === "#") {
        break;
      } else if (!rocks.find((r) => r[0] === downRow && r[1] === rock[1])) {
        rocks[x] = [downRow, rock[1]];
      }
    }
  }

  rocks = rocks.sort((a, b) => a[0] - b[0]).sort((a, b) => a[1] - b[1]);

  // east
  for (let x = rocks.length - 1; x >= 0; x--) {
    const rock = rocks[x];
    for (
      let rightCol = rock[1] + 1;
      rightCol <= inputList[0].length - 1;
      rightCol++
    ) {
      if (inputList[rock[0]][rightCol] === "#") {
        break;
      } else if (rocks.find((r) => r[0] === rock[0] && r[1] === rightCol)) {
        break;
      } else {
        rocks[x] = [rock[0], rightCol];
      }
    }
  }

  return rocks;
}

function calcAns(arr) {
  let sum = 0;
  for (let x = inputList.length - 1; x >= 0; x--) {
    const multiplier = inputList.length - x;
    const count = arr.filter((rock) => rock[0] === x).length;
    sum += count * multiplier;
  }

  return sum;
}

function print(rocks) {
  let print = [];
  for (let x = 0; x < inputList.length; x++) {
    let p = "";
    for (let y = 0; y < inputList[0].length; y++) {
      if (rocks.find((r) => r[0] === x && r[1] === y)) {
        p += "O";
      } else if (inputList[x][y] === "#") {
        p += "#";
      } else {
        p += ".";
      }
    }
    print.push(p);
  }
  console.log(print.join("\n"));
  console.log();
}
