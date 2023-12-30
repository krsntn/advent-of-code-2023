const fs = require("fs");
const filename = "./input.txt";
const inputList = fs.readFileSync(filename, "utf8").trim().split("\n");

const answer = inputList.map((row) => {
  const rowArr = row.split(":");

  const filteredNums = rowArr[1]
    .replace("|", "")
    .split(" ")
    .filter((x) => x);

  const winningNums = new Set(
    filteredNums.filter((x) => {
      return filteredNums.indexOf(x) !== filteredNums.lastIndexOf(x);
    }),
  );

  return winningNums.size;
});

const map = new Map();

for (let i = 0; i < answer.length; i++) {
  if (map.has(i + 1)) {
    map.set(i + 1, map.get(i + 1) + 1);
  } else {
    map.set(i + 1, 1);
  }

  if (answer[i] > 0) {
    for (let x = 0; x < answer[i]; x++) {
      if (map.has(x + i + 2)) {
        map.set(x + i + 2, map.get(x + i + 2) + map.get(i + 1));
      } else {
        map.set(x + i + 2, map.get(i + 1));
      }
    }
  }
}

console.log([...map.values()].reduce((a, b) => a + b, 0));
