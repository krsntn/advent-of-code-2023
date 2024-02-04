const fs = require("fs");
const filename = "./input.txt";
let inputList = fs.readFileSync(filename, "utf8").trim().split(",");

const calcHashValue = (str) => {
  return str
    .split("")
    .reduce((ascii, char) => ((char.charCodeAt(0) + ascii) * 17) % 256, 0);
};

const map = new Map();

for (let i = 0; i < inputList.length; i++) {
  const array =
    inputList[i].indexOf("-") > -1
      ? inputList[i].split("-")
      : inputList[i].split("=");
  const operation = inputList[i].indexOf("-") > -1 ? "-" : "=";

  const hash = calcHashValue(array[0]);

  if (operation === "-") {
    if (map.get(hash)) {
      map.set(
        hash,
        map.get(hash).filter((x) => x[0] !== array[0]),
      );
    }
    continue;
  }

  if (map.has(hash)) {
    const arr = map.get(hash);
    const index = arr.findIndex((x) => x[0] === array[0]);
    if (index > -1) {
      arr.splice(index, 1, array);
      map.set(hash, arr);
    } else {
      map.set(hash, [...map.get(hash), array]);
    }
  } else {
    map.set(hash, [array]);
  }
}

const result = [];
map.forEach((value, key) => {
  if (value.length > 0) {
    value.forEach((x, i) => {
      result.push((key + 1) * (i + 1) * Number(x[1]));
    });
  }
});

console.log(result.reduce((a, b) => a + b, 0));
