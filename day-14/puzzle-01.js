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

for (let x = 0; x < rockPos.length; x++) {
  const rock = rockPos[x];

  for (let upRow = rock[0] - 1; upRow >= 0; upRow--) {
    if (inputList[upRow][rock[1]] === "#") {
      break;
    } else if (!rockPos.find((r) => r[0] === upRow && r[1] === rock[1])) {
      rockPos[x] = [upRow, rock[1]];
    }
  }
}

let sum = 0;
for (let x = inputList.length - 1; x >= 0; x--) {
  const multiplier = inputList.length - x;
  const count = rockPos.filter((rock) => rock[0] === x).length;
  sum += count * multiplier;
}

console.log(sum);
