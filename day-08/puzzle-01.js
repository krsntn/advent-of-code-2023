const fs = require("fs");
const filename = "./input.txt";
let inputList = fs.readFileSync(filename, "utf8").trim().split("\n");

const instruction = inputList[0].split("");

inputList = inputList.slice(2);

const node = inputList.map((line) => {
  line = line.split(" = ");
  return [line[0], line[1].replace(/[\(\)]/g, "").split(", ")];
});

let step = 0;
let reach = "AAA";
while (reach !== "ZZZ") {
  const ins = instruction[step % instruction.length];
  const [left, right] = node.find((n) => n[0] === reach)[1];

  if (ins === "R") {
    reach = right;
  } else if (ins === "L") {
    reach = left;
  }
  step++;
}

console.log(step);
