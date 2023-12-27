const fs = require("fs");
const filename = "./input.txt";
const inputList = fs.readFileSync(filename, "utf8").trim().split("\n");

let total = 0;

const numberMappings = {
  one: "one1one",
  two: "two2two",
  three: "three3three",
  four: "four4four",
  five: "five5five",
  six: "six6six",
  seven: "seven7seven",
  eight: "eight8eight",
  nine: "nine9nine",
};

for (let line of inputList) {
  for (let num of Object.keys(numberMappings)) {
    line = line.replaceAll(num, numberMappings[num]);
  }

  const numbers = line.split("").filter((el) => !isNaN(parseInt(el)));
  console.log(`${numbers[0]}${numbers[numbers.length - 1]}`);
  total += parseInt(`${numbers[0]}${numbers[numbers.length - 1]}`);
}

console.log(total);
