const fs = require("fs");
const filename = "./input.txt";
let inputList = fs.readFileSync(filename, "utf8").trim().split("\n");

// find seeds
let values = inputList[0]
  .replace("seeds: ", "")
  .split(" ")
  .map((el) => Number(el));
inputList = inputList.slice(2);

function calc(inputList, i) {
  let map = [];
  for (let j = i + 1; inputList[j] && inputList[j].length > 0; j++) {
    const eleArr = inputList[j].split(" ").map((el) => Number(el));
    map.push([eleArr[1], eleArr[1] + (eleArr[2] - 1), eleArr[0] - eleArr[1]]);
  }

  for (let index = 0; index < values.length; index++) {
    for (let i = 0; i < map.length; i++) {
      if (values[index] >= map[i][0] && values[index] <= map[i][1]) {
        values[index] = values[index] + map[i][2];
        break;
      }
    }
  }
}

for (let i = 0; i < inputList.length; i++) {
  const value = inputList[i];
  if (value.endsWith("map:")) {
    calc(inputList, i);
  }
}

// output answer
console.log(Math.min(...values));
