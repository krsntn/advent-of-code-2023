const fs = require("fs");
const filename = "./input.txt";
let inputList = fs.readFileSync(filename, "utf8").trim().split("\n");

const workflows = inputList.slice(0, inputList.indexOf(""));

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

const pending = [
  { x: [1, 4000], m: [1, 4000], a: [1, 4000], s: [1, 4000], to: startPoint },
];
const complete = [];

while (pending.length > 0) {
  const cur = pending.shift();
  const rules = map.get(cur.to);

  const newData = calc(cur, rules);
  newData.map((x) => {
    if (x.to === "A") {
      complete.push(x);
    } else {
      pending.push(x);
    }
  });
}

function calc(data, rules) {
  const newObjs = [];
  const remainObj = { ...data };

  if (rules.every((x) => x.to === "A")) {
    remainObj.to = "A";
    return [remainObj];
  }
  if (rules.every((x) => x.to === "R")) {
    return [];
  }

  for (const ins of rules) {
    if (ins.variable && ins.operator === ">") {
      const obj = { ...remainObj };
      obj[ins.variable] = [ins.value + 1, obj[ins.variable][1]];
      obj.to = ins.to;
      newObjs.push(obj);
      remainObj[ins.variable] = [remainObj[ins.variable][0], ins.value];
    } else if (ins.variable && ins.operator === "<") {
      const obj = { ...remainObj };
      obj[ins.variable] = [obj[ins.variable][0], ins.value - 1];
      obj.to = ins.to;
      newObjs.push(obj);
      remainObj[ins.variable] = [ins.value, remainObj[ins.variable][1]];
    } else if (!ins.variable) {
      remainObj.to = ins.to;
      newObjs.push(remainObj);
    }
  }

  return newObjs.filter((x) => x.to !== "R");
}

function sum(obj) {
  const x = obj.x[1] - obj.x[0] + 1;
  const m = obj.m[1] - obj.m[0] + 1;
  const a = obj.a[1] - obj.a[0] + 1;
  const s = obj.s[1] - obj.s[0] + 1;
  return x * m * a * s;
}

const result = complete.reduce((a, c) => (a += sum(c)), 0);
console.log(result);
