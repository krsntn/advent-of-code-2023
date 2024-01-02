const fs = require("fs");
const filename = "./input.txt";
let inputList = fs.readFileSync(filename, "utf8").trim().split("\n");

const timeArr = inputList[0]
  .replace(/\w+:/, "")
  .trim()
  .split(" ")
  .filter((el) => el)
  .map((el) => Number(el));

const distanceArr = inputList[1]
  .replace(/\w+:/, "")
  .trim()
  .split(" ")
  .filter((el) => el)
  .map((el) => Number(el));

const map = [];
for (let i = 0; i < timeArr.length; i++) {
  map.push([timeArr[i], distanceArr[i]]);
}

const answers = [];
for (let i = 0; i < map.length; i++) {
  const [time, distance] = map[i];
  const disArr = [];

  for (let j = 1; j <= Math.floor(time / 2); j++) {
    disArr.push((time - j) * j);
  }

  answers.push(
    disArr.filter((x) => x > distance).length * 2 - (time % 2 === 0 ? 1 : 0),
  );
}

console.log(answers.reduce((a, b) => a * b));
