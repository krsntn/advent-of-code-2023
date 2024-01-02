const fs = require("fs");
const filename = "./input.txt";
let inputList = fs.readFileSync(filename, "utf8").trim().split("\n");

const map = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"];

const type = new Map([
  ["five", []],
  ["four", []],
  ["full", []],
  ["three", []],
  ["two", []],
  ["one", []],
  ["high", []],
]);

inputList = inputList.map((x) => x.split(" "));

for (const [value, bet] of inputList) {
  let vArr = value.split("");
  let counts = {};
  vArr.forEach((e) => {
    counts[e] = (counts[e] || 0) + 1;
  });

  const entries = Object.entries(counts);

  for (const card of vArr) {
    if (card === "J") {
      const highest = entries
        .filter((x) => x[0] !== "J")
        .sort((a, b) => b[1] - a[1])[0];

      if (highest && highest[0]) {
        vArr = vArr.join("").replaceAll("J", highest[0]).split("");
        counts["J"]--;
        counts[highest[0]]++;
      }
    }
  }

  const vType = new Set(vArr);

  switch (vType.size) {
    case 1:
      type.get("five").push([value, bet]);
      break;
    case 2:
      if (Math.max(...Object.values(counts)) === 4) {
        type.get("four").push([value, bet]);
      } else {
        type.get("full").push([value, bet]);
      }
      break;
    case 3:
      if (Math.max(...Object.values(counts)) === 3) {
        type.get("three").push([value, bet]);
      } else {
        type.get("two").push([value, bet]);
      }
      break;
    case 4:
      type.get("one").push([value, bet]);
      break;
    case 5:
      type.get("high").push([value, bet]);
      break;
  }
}

const answers = [];

let multiplier = inputList.length;

for (const [_, values] of type) {
  const sorted = values.sort((a, b) => {
    const a1 = a[0].split("");
    const b1 = b[0].split("");

    for (let i = 0; i < a1.length; i++) {
      if (a1[i] !== b1[i]) {
        return map.indexOf(a1[i]) - map.indexOf(b1[i]);
      }
    }
  });

  for (let j = 0; j < sorted.length; j++) {
    const [_, bet] = sorted[j];
    answers.push(Number(bet) * multiplier--);
  }
}

console.log(answers.reduce((a, b) => a + b, 0));
