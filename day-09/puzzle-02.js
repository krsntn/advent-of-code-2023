const fs = require("fs");
const filename = "./input.txt";
let inputList = fs.readFileSync(filename, "utf8").trim().split("\n");

const input = inputList.map((x) => x.split(" ").map(Number));

const history = input.map((line) => {
  let arr = [[...line]];

  while (!arr.some((x) => x.every((y) => y === 0))) {
    let tempArr = [];
    for (let i = arr[arr.length - 1].length - 1; i > 0; i--) {
      const diff = arr[arr.length - 1][i] - arr[arr.length - 1][i - 1];
      tempArr.push(diff);
    }
    arr.push(tempArr.reverse());
  }

  arr = arr.reverse().map((line) => line.shift());
  let value = arr[0];
  for (let i = 0; i < arr.length - 1; i++) {
    value = arr[i + 1] - value;
  }
  return value;
});

console.log(history.reduce((a, b) => a + b));
