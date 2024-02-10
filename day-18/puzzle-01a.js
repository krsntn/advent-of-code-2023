const fs = require("fs");
const filename = "./input.txt";
let inputList = fs.readFileSync(filename, "utf8").trim().split("\n");

const instructions = inputList.map((l) => l.split(" "));

const pos = { x: 0, y: 0 };
const positions = instructions.map((i) => {
  const direction = i[0];
  const amount = Number(i[1]);
  const obj = { x: pos.x, y: pos.y, dist: amount };
  pos.x =
    pos.x + (direction === "R" ? amount : direction === "L" ? -amount : 0);
  pos.y =
    pos.y + (direction === "U" ? amount : direction === "D" ? -amount : 0);
  return obj;
});

// [START] shoelace formula ================
const xy = positions.reduce(
  (sum, pos, i) =>
    sum + pos.x * positions[i === positions.length - 1 ? 0 : i + 1].y,
  0,
);
const yx = positions.reduce(
  (sum, pos, i) =>
    sum + pos.y * positions[i === positions.length - 1 ? 0 : i + 1].x,
  0,
);

const area = Math.abs((xy - yx) / 2);
// [END] shoelace formula ================

const perimeter = positions.reduce((sum, p) => sum + p.dist, 0);
const outerBorderArea = (perimeter - 4) / 2 + 3;

const answer = area + outerBorderArea;

console.log(answer);
