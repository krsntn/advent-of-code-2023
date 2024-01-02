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
let reach = node.filter((x) => x[0].endsWith("A")).map((x) => x[0]);
const zStep = [];

while (!reach.every((x) => x.endsWith("Z"))) {
  const ins = instruction[step++ % instruction.length];

  for (let i = 0; i < reach.length; i++) {
    const [left, right] = node.find((n) => n[0] === reach[i])[1];

    if (ins === "R") {
      reach[i] = right;
    } else if (ins === "L") {
      reach[i] = left;
    }
  }

  for (let i = 0; i < reach.length; i++) {
    if (reach[i].endsWith("Z")) {
      zStep.push(step);
      reach = reach.filter((x) => !x.endsWith("Z"));
    }
  }
}

function lcm(arr) {
  const gcd = (a, b) => {
    return b ? gcd(b, a % b) : a;
  };
  return arr.reduce((a, b) => {
    return (a * b) / gcd(a, b);
  });
}

console.log(lcm(zStep));
