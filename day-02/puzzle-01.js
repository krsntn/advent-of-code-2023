const fs = require("fs");
const filename = "./input.txt";
const inputList = fs.readFileSync(filename, "utf8").trim().split("\n");

const RULE = {
  r: 12,
  g: 13,
  b: 14,
};

const map = new Map();

inputList.map((row) => {
  let rowArr = row.split(":");

  const id = Number(rowArr[0].replace("Game ", ""));

  const values = rowArr[1]
    .replaceAll(";", ",")
    .split(",")
    .map((x) => x.trim());

  const r = Math.max(
    ...values
      .filter((x) => x.includes("red"))
      .map((x) => Number(x.replace(" red", ""))),
  );
  const g = Math.max(
    ...values
      .filter((x) => x.includes("green"))
      .map((x) => Number(x.replace(" green", ""))),
  );
  const b = Math.max(
    ...values
      .filter((x) => x.includes("blue"))
      .map((x) => Number(x.replace(" blue", ""))),
  );

  map.set(id, { r, g, b });
});

let answer = 0;
for (const [key, value] of map) {
  if (value.r <= RULE.r && value.g <= RULE.g && value.b <= RULE.b) {
    answer += key;
  }
}

// output answer
console.log(answer);
