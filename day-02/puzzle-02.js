const fs = require("fs");
const filename = "./input.txt";
const inputList = fs.readFileSync(filename, "utf8").trim().split("\n");

const answer = inputList.map((row) => {
  let rowArr = row.split(":");
  let obj = { r: 0, g: 0, b: 0 };

  const values = rowArr[1]
    .replaceAll(";", ",")
    .split(",")
    .map((x) => x.trim());

  values.map((value) => {
    const valArr = value.split(" ");
    switch (valArr[1]) {
      case "red":
        obj.r = Number(valArr[0]) > obj.r ? Number(valArr[0]) : obj.r;
        break;
      case "green":
        obj.g = Number(valArr[0]) > obj.g ? Number(valArr[0]) : obj.g;
        break;
      case "blue":
        obj.b = Number(valArr[0]) > obj.b ? Number(valArr[0]) : obj.b;
        break;
    }
  });

  return obj.r * obj.g * obj.b;
});

// output answer
console.log(answer.reduce((a, b) => a + b));
