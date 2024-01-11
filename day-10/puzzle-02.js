const fs = require("fs");
const filename = "./input.txt";
let inputList = fs.readFileSync(filename, "utf8").trim().split("\n");

let locS = null;
for (let i = 0; i < inputList.length; i++) {
  if (inputList[i].includes("S")) {
    locS = [i, inputList[i].indexOf("S")];
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
      arr.push([position[0] - 1, position[1]]);
    }
  }

  // down
  if (
    position[0] < inputList.length - 1 &&
    ["|", "L", "J"].includes(inputList[position[0] + 1][position[1]])
  ) {
    if (["|", "7", "F", "S"].includes(inputList[position[0]][position[1]])) {
      arr.push([position[0] + 1, position[1]]);
    }
  }

  // left
  if (
    position[1] > 0 &&
    ["-", "L", "F"].includes(inputList[position[0]][position[1] - 1])
  ) {
    if (["-", "J", "7", "S"].includes(inputList[position[0]][position[1]])) {
      arr.push([position[0], position[1] - 1]);
    }
  }

  // right
  if (
    position[1] < inputList[position[0]].length - 1 &&
    ["-", "7", "J"].includes(inputList[position[0]][position[1] + 1])
  ) {
    if (["-", "F", "L", "S"].includes(inputList[position[0]][position[1]])) {
      arr.push([position[0], position[1] + 1]);
    }
  }

  return arr;
}

while (array.length > 0) {
  let tile = array.shift();
  visited.add(`${tile[0]},${tile[1]}`);

  const arr = explore(tile);
  for (const [newX, newY] of arr) {
    if (!visited.has(`${newX},${newY}`)) {
      array.push([newX, newY]);
    }
  }
}

// -----------------------------------------------------------

// replace S
const surroundS = explore(locS);

if (surroundS.length === 2) {
  const x = surroundS[0][0] + surroundS[1][0] - locS[0] * 2;
  const y = surroundS[0][1] + surroundS[1][1] - locS[1] * 2;

  if (x === 1) {
    if (y === 1) {
      inputList[locS[0]] = inputList[locS[0]].replace("S", "F");
    } else {
      inputList[locS[0]] = inputList[locS[0]].replace("S", "7");
    }
  } else if (x === -1) {
    if (y === 1) {
      inputList[locS[0]] = inputList[locS[0]].replace("S", "J");
    } else {
      inputList[locS[0]] = inputList[locS[0]].replace("S", "L");
    }
  } else if (surroundS.find((x) => x[0] > locS[0])) {
    inputList[locS[0]] = inputList[locS[0]].replace("S", "|");
  } else if (surroundS.filter((x) => x[0] === locS[0]).length === 2) {
    inputList[locS[0]] = inputList[locS[0]].replace("S", "-");
  }
}

let total = 0;
for (let i = 0; i < inputList.length; i++) {
  for (let j = 0; j < inputList[i].length; j++) {
    if (!visited.has(`${i},${j}`)) {
      total += calcTile(i, j);
    }
  }
}

function calcTile(x, y) {
  let isInLoop = false;
  let fromTile = null;
  for (let i = y + 1; i < inputList[0].length; i++) {
    if (visited.has(`${x},${i}`)) {
      if (inputList[x][i] == "|") {
        isInLoop = !isInLoop;
      } else if (inputList[x][i] === "L" || inputList[x][i] === "F") {
        fromTile = inputList[x][i];
      } else if (fromTile === "L") {
        if (inputList[x][i] === "7" || inputList[x][i] === "S") {
          isInLoop = !isInLoop;
          fromTile = null;
        } else if (inputList[x][i] === "J" || inputList[x][i] === "S") {
          fromTile = null;
        }
      } else if (fromTile === "F") {
        if (inputList[x][i] === "J" || inputList[x][i] === "S") {
          isInLoop = !isInLoop;
          fromTile = null;
        } else if (inputList[x][i] === "7" || inputList[x][i] === "S") {
          fromTile = null;
        }
      }
    }
  }

  return isInLoop ? 1 : 0;
}

console.log(total);
