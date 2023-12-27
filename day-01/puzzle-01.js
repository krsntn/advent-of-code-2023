const fs = require("fs");
const filename = "./input.txt";
const inputList = fs.readFileSync(filename, "utf8").trim().split("\n");

const list = inputList.map((row) => {
  const rowArr = row.split("");
  return (
    Number(rowArr.find((char) => !Number.isNaN(Number(char)))) * 10 +
    Number(rowArr.findLast((char) => !Number.isNaN(Number(char))))
  );
});

const answer = list.reduce((acc, row) => acc + row);

// output answer
console.log(answer);
