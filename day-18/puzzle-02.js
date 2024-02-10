const fs = require("fs");
const filename = "./input.txt";
let inputList = fs.readFileSync(filename, "utf8").trim().split("\n");

const instructions = inputList.map((l) => l.split(" "));

const pos = { x: 0, y: 0 };
const positions = instructions.map((i) => {
  const amount = parseInt(i[2].slice(2, 7), 16);
  const direction = i[2].slice(7, 8);
  const obj = { x: pos.x, y: pos.y, dist: amount };
  // 0 = right, 1 = down, 2 = left, 3 = up
  pos.x =
    pos.x + (direction === "0" ? amount : direction === "2" ? -amount : 0);
  pos.y =
    pos.y + (direction === "3" ? amount : direction === "1" ? -amount : 0);
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
