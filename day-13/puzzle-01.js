const fs = require("fs");
const filename = "./input.txt";
let inputList = fs.readFileSync(filename, "utf8").trim().split("\n");

const groups = [];
for (let i = 0, group = []; i <= inputList.length; i++) {
  if (inputList[i] === "" || i === inputList.length) {
    groups.push(group);
    group = [];
  } else {
    group.push(inputList[i]);
  }
}

let sum = 0;

for (let i = 0; i < groups.length; i++) {
  let match = true;
  for (let mid = groups[i][0].length - 1; mid > 0; mid--) {
    match = true;
    for (let line = 0; line < groups[i].length; line++) {
      const splits = [
        groups[i][line].substring(0, mid),
        groups[i][line].substring(mid),
      ];

      let len = Math.min(splits[0].length, splits[1].length);

      splits[0] = splits[0].slice(len * -1);
      splits[1] = splits[1].slice(0, len).split("").reverse().join("");

      if (splits[0] !== splits[1]) {
        match = false;
        break;
      }
    }

    if (match) {
      sum += mid;
    }
  }

  if (!match) {
    for (let mid = groups[i].length - 1; mid > 0; mid--) {
      let top = groups[i].slice(0, mid);
      let bot = groups[i].slice(mid);
      const len = Math.min(top.length, bot.length);

      top = top.slice(len * -1);
      bot = bot.slice(0, len).reverse();

      if (top.join("") === bot.join("")) {
        sum += mid * 100;
      }
    }
  }
}

console.log(sum);
