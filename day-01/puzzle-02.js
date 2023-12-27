const fs = require("fs");
const filename = "./input.txt";
const inputList = fs.readFileSync(filename, "utf8").trim().split("\n");

const reg = "one|two|three|four|five|six|seven|eight|nine";

const num = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

function rev(input) {
  return input.split("").reverse().join("");
}

const list = inputList.map((row) => {
  const rowArr = row.split(/(\d+)/).filter((el) => el);

  let rowValue = row;

  let haveNum = false;
  let i = 0;
  while (!haveNum) {
    if (rowArr[i] && !isNaN(Number(rowArr[i]))) {
      haveNum = true;
    } else {
      const regex = new RegExp(reg);
      const matched = rowArr[i].match(regex);

      if (matched) {
        rowArr[i] = rowArr[i].replace(matched[0], num[matched[0]]);
        haveNum = true;
        rowValue = rowArr.join("");
      } else {
        i++;
      }
    }
  }

  // check from backward
  const regexB = new RegExp(rev(reg));
  const matchedB = rev(rowValue).match(regexB);

  if (matchedB) {
    rowValue = rev(rev(rowValue).replace(matchedB[0], num[rev(matchedB[0])]));
  }

  return rowValue;
});

const filteredList = list.map((row) => {
  const rowArr = row.split("");
  return (
    Number(rowArr.find((char) => !Number.isNaN(Number(char)))) * 10 +
    Number(rowArr.findLast((char) => !Number.isNaN(Number(char))))
  );
});

const answer = filteredList.reduce((acc, row) => acc + row, 0);

// output answer
console.log(answer);
