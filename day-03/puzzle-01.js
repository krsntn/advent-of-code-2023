const fs = require("fs");
const filename = "./input.txt";
const inputList = fs.readFileSync(filename, "utf8").trim().split("\n");

const splitList = inputList.map((row) => {
  const rowArr = row.split("");
  return rowArr;
});

const answer = [];

for (let x = 0; x < splitList.length; x++) {
  for (let y = 0; y < splitList[x].length; y++) {
    if (!isNaN(Number(splitList[x][y]))) {
      let n = "";
      let yStart = y;
      while (!isNaN(Number(splitList[x][y]))) {
        n = n.concat(splitList[x][y]);
        y++;
      }

      const top = splitList[x - 1]
        ? splitList[x - 1].join("").substring(yStart - 1, y + 1)
        : "";
      const mid = (splitList[x][yStart - 1] || "") + (splitList[x][y] || "");
      const bot = splitList[x + 1]
        ? splitList[x + 1].join("").substring(yStart - 1, y + 1)
        : "";

      if (
        top.split("").some((x) => isNaN(x) && x !== ".") ||
        mid.split("").some((x) => isNaN(x) && x !== ".") ||
        bot.split("").some((x) => isNaN(x) && x !== ".")
      ) {
        answer.push(Number(n));
      }
    }
  }
}

// output answer
console.log(answer.reduce((a, b) => a + b, 0));
