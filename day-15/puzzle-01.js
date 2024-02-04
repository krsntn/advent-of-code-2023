const fs = require("fs");
const filename = "./input.txt";
let inputList = fs.readFileSync(filename, "utf8").trim().split(",");

const calculateAsciiSum = (str) => {
  return str
    .split("")
    .reduce((ascii, char) => ((char.charCodeAt(0) + ascii) * 17) % 256, 0);
};

const arr = inputList.map(calculateAsciiSum);

const result = arr.reduce((a, b) => a + b, 0);

console.log(result);
