const fs = require("fs");
const filename = "./input.txt";
let inputList = fs.readFileSync(filename, "utf8").trim().split("\n");

let emptyRows = [];
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

// add empty rows
for (let i = inputList.length - 1; i >= 0; i--) {
  if (emptyRows.includes(i)) {
    inputList.splice(i, 0, ".".repeat(inputList[0].length));
  }
}

// add empty cols
const set = new Set(galaxies.map((x) => x[1]));
for (let i = inputList[0].length - 1; i >= 0; i--) {
  if (!set.has(i)) {
    for (let j = 0; j < inputList.length; j++) {
      inputList[j] =
        inputList[j].slice(0, i + 1) + "." + inputList[j].slice(i + 1);
    }
  }
}

// find all galaxies position
galaxies = [];
for (let i = 0; i < inputList.length; i++) {
  if (inputList[i].indexOf("#") !== -1) {
    inputList[i]
      .split("")
      .map((x, index) => x === "#" && galaxies.push([i, index]));
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
