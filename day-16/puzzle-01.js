const fs = require("fs");
const filename = "./input.txt";
let inputList = fs.readFileSync(filename, "utf8").trim().split("\n");

function isWithinBound(x, y) {
  return (
    x >= 0 &&
    x <= inputList[0].length - 1 &&
    y >= 0 &&
    y <= inputList.length - 1
  );
}

const energized = new Set();
let beams = [
  {
    x: 0,
    y: 0,
    direction: "r",
  },
];

while (
  beams.some(({ x, y, direction }) => !energized.has(`${x},${y},${direction}`))
) {
  const newBeams = [];

  beams.forEach((b) => {
    curPos = inputList[b.y][b.x];
    if (energized.has(`${b.x},${b.y},${b.direction}`)) {
      return;
    }

    energized.add(`${b.x},${b.y},${b.direction}`);

    switch (b.direction) {
      case "r":
        if ([".", "-"].includes(curPos)) {
          b.x++;
        } else if (curPos === "\\") {
          b.y++;
          b.direction = "d";
        } else if (curPos === "/") {
          b.y--;
          b.direction = "u";
        } else if (curPos === "|") {
          b.y--;
          b.direction = "u";
          newBeams.push({
            x: b.x,
            y: b.y + 1,
            direction: "d",
          });
        }
        break;
      case "d":
        if ([".", "|"].includes(curPos)) {
          b.y++;
        } else if (curPos === "\\") {
          b.x++;
          b.direction = "r";
        } else if (curPos === "/") {
          b.x--;
          b.direction = "l";
        } else if (curPos === "-") {
          b.x++;
          b.direction = "r";
          newBeams.push({
            x: b.x - 1,
            y: b.y,
            direction: "l",
          });
        }
        break;
      case "l":
        if ([".", "-"].includes(curPos)) {
          b.x--;
        } else if (curPos === "\\") {
          b.y--;
          b.direction = "u";
        } else if (curPos === "/") {
          b.y++;
          b.direction = "d";
        } else if (curPos === "|") {
          b.y--;
          b.direction = "u";
          newBeams.push({
            x: b.x,
            y: b.y + 1,
            direction: "d",
          });
        }
        break;
      case "u":
        if ([".", "|"].includes(curPos)) {
          b.y--;
        } else if (curPos === "\\") {
          b.x--;
          b.direction = "l";
        } else if (curPos === "/") {
          b.x++;
          b.direction = "r";
        } else if (curPos === "-") {
          b.x--;
          b.direction = "l";
          newBeams.push({
            x: b.x + 1,
            y: b.y,
            direction: "r",
          });
        }
    }
  });

  if (newBeams.length > 0) {
    newBeams.map((x) => beams.push(x));
  }

  beams = beams.filter(({ x, y }) => isWithinBound(x, y));
}

let result = Array.from(energized).map((x) => x.slice(0, x.lastIndexOf(",")));
console.log(new Set(result.map((x) => x)).size);
