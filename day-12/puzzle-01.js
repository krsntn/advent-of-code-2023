const fs = require("fs");
const filename = "./input.txt";
let inputList = fs.readFileSync(filename, "utf8").trim().split("\n");

let sum = 0;
let groupStr = "";

for (const line of inputList) {
  const [puz, groupString] = line.split(" ");
  groupStr = groupString;
  numberOfArrangement(
    puz,
    puz
      .split("")
      .map((x, i) => x === "?" && i)
      .filter((x) => x !== false),
  );
}

function numberOfArrangement(puzzle, qPos) {
  const newPuz = puzzle.replaceAll("?", ".");
  checkArrangement(newPuz);

  function arrangment(newPuz, puzzleIndex) {
    for (let i = puzzleIndex; i < qPos.length; i++) {
      const newPuzHash =
        newPuz.slice(0, qPos[i]) + "#" + newPuz.slice(qPos[i] + 1);
      checkArrangement(newPuzHash);
      arrangment(newPuzHash, i + 1);
    }
  }
  return arrangment(newPuz, 0);
}

function checkArrangement(newPuz) {
  const test = newPuz.split(".").filter((x) => x);
  if (test.map((x) => x.length).join(",") === groupStr) {
    return sum++;
  }
}

console.log(sum);
