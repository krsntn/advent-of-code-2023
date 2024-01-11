const fs = require("fs");
const filename = "./input.txt";
let inputList = fs.readFileSync(filename, "utf8").trim().split("\n");

let emptyRows = [];
let emptyCols = [];
let galaxies = [];

// find all empty rows
for (let i = 0; i < inputList.length; i++) {
  if (inputList[i].indexOf("#") === -1) {
    emptyRows.push(i);
  } else {
    inputList[i]
      .split("")
      .map((x, index) => x === "#" && galaxies.push([i, index]));
  }
}

// find all empty cols
const set = new Set(galaxies.map((x) => x[1]));
for (let i = 0; i < inputList[0].length; i++) {
  if (!set.has(i)) {
    emptyCols.push(i);
  }
}

// find galaxies position
galaxies = [];
for (let i = 0; i < inputList.length; i++) {
  if (inputList[i].indexOf("#") !== -1) {
    inputList[i].split("").map((x, index) => {
      if (x === "#") {
        const rowMul = emptyRows.filter((r) => i > r).length;
        const addRows = (1000000 - 1) * rowMul;

        const colMul = emptyCols.filter((c) => index > c).length;
        const addCols = (1000000 - 1) * colMul;

        galaxies.push([i + addRows, index + addCols]);
      }
    });
  }
}

// calc distance
const distance = [];
for (let i = 0; i < galaxies.length; i++) {
  for (let j = i + 1; j < galaxies.length; j++) {
    distance.push(
      Math.abs(galaxies[i][0] - galaxies[j][0]) +
        Math.abs(galaxies[i][1] - galaxies[j][1]),
    );
  }
}

console.log(distance.reduce((a, b) => a + b, 0));
