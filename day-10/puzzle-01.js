const fs = require("fs");
const filename = "./input.txt";
let inputList = fs.readFileSync(filename, "utf8").trim().split("\n");

let locS = null;
for (let i = 0; i < inputList.length; i++) {
  if (inputList[i].includes("S")) {
    locS = [i, inputList[i].indexOf("S"), 0];
    break;
  }
}

const array = [locS];
const visited = new Set([`${locS[0]},${locS[1]}`]);

function explore(position) {
  const arr = [];

  // up
  if (
    position[0] > 0 &&
    ["|", "7", "F"].includes(inputList[position[0] - 1][position[1]])
  ) {
    if (["|", "L", "J", "S"].includes(inputList[position[0]][position[1]])) {
      arr.push([position[0] - 1, position[1], position[2] + 1]);
    }
  }

  // down
  if (
    position[0] < inputList.length - 1 &&
    ["|", "L", "J"].includes(inputList[position[0] + 1][position[1]])
  ) {
    if (["|", "7", "F", "S"].includes(inputList[position[0]][position[1]])) {
      arr.push([position[0] + 1, position[1], position[2] + 1]);
    }
  }

  // left
  if (
    position[1] > 0 &&
    ["-", "L", "F"].includes(inputList[position[0]][position[1] - 1])
  ) {
    if (["-", "J", "7", "S"].includes(inputList[position[0]][position[1]])) {
      arr.push([position[0], position[1] - 1, position[2] + 1]);
    }
  }

  // right
  if (
    position[1] < inputList[position[0]].length - 1 &&
    ["-", "7", "J"].includes(inputList[position[0]][position[1] + 1])
  ) {
    if (["-", "F", "L", "S"].includes(inputList[position[0]][position[1]])) {
      arr.push([position[0], position[1] + 1, position[2] + 1]);
    }
  }

  return arr;
}

let furthest = 0;
while (array.length > 0) {
  let tile = array.shift();
  furthest = Math.max(furthest, tile[2]);
  visited.add(`${tile[0]},${tile[1]}`);

  const arr = explore(tile);
  for (const [newX, newY, distance] of arr) {
    if (!visited.has(`${newX},${newY}`)) {
      array.push([newX, newY, distance]);
    }
  }
}

console.log(furthest);
