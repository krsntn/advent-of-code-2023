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

  if (winningNums.size > 0) {
    return Math.pow(2, winningNums.size - 1);
  }
  return 0;
});

// output answer
console.log(answer.reduce((a, b) => a + b, 0));
