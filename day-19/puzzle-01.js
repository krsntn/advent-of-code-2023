const fs = require("fs");
const filename = "./input.txt";
let inputList = fs.readFileSync(filename, "utf8").trim().split("\n");

const workflows = inputList.slice(0, inputList.indexOf(""));
const line = inputList.slice(inputList.indexOf("") + 1, inputList.length);

const map = new Map();
const allNames = [];

for (let i = 0; i < workflows.length; i++) {
  const line = workflows[i];
  const name = line.slice(0, line.indexOf("{"));
  const instructions = line
    .slice(line.indexOf("{") + 1, line.indexOf("}"))
    .split(",");

  const ins = instructions.map((x) => {
    if (x.indexOf(":") !== -1) {
      allNames.push(x.slice(x.indexOf(":") + 1));
      return {
        variable: x.slice(0, 1),
        operator: x.slice(1, 2),
        value: Number(x.slice(x.indexOf(x.slice(1, 2)) + 1, x.indexOf(":"))),
        to: x.slice(x.indexOf(":") + 1),
      };
    }

    allNames.push(x);
    return {
      to: x,
    };
  });
  map.set(name, ins);
}

const startPoint = Array.from(map.keys()).find((x) => !allNames.includes(x));

const data = line.map((x) => {
  const ratings = x.replace("{", "").replace("}", "").split(",");
  return ratings.map((y) => ({
    variable: y.slice(0, 1),
    value: Number(y.slice(y.indexOf("=") + 1)),
  }));
});

let result = 0;
for (let i = 0; i < data.length; i++) {
  const row = data[i];
  let targetName = startPoint;

  while (!["A", "R"].includes(targetName)) {
    const targetMap = map.get(targetName);
    for (let z = 0; z < targetMap.length; z++) {
      const rule = targetMap[z];
      if (rule.variable) {
        const a = row.find((r) => r.variable === rule.variable);
        if (a && rule.operator === ">" && a.value > rule.value) {
          targetName = rule.to;
          break;
        }
        if (a && rule.operator === "<" && a.value < rule.value) {
          targetName = rule.to;
          break;
        }
      } else {
        targetName = rule.to;
      }
    }
  }

  if (targetName === "A") {
    result += row.reduce((a, c) => (a += c.value), 0);
  }
}

console.log(result);
