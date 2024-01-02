const fs = require("fs");
const filename = "./input.txt";
let inputList = fs.readFileSync(filename, "utf8").trim().split("\n");

const time = Number(
  inputList[0]
    .replace(/\w+:/, "")
    .trim()
    .split(" ")
    .filter((el) => el)
    .join(""),
);

const distance = Number(
  inputList[1]
    .replace(/\w+:/, "")
    .trim()
    .split(" ")
    .filter((el) => el)
    .join(""),
);

const disArr = [];

for (let j = 1; j <= Math.floor(time / 2); j++) {
  disArr.push((time - j) * j);
}

const answers =
  disArr.filter((x) => x > distance).length * 2 - (time % 2 === 0 ? 1 : 0);

console.log(answers);
