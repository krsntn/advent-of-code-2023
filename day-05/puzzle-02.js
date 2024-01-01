const fs = require("fs");
const filename = "./input.txt";
let inputList = fs.readFileSync(filename, "utf8").trim().split("\n");

// find seeds
let seed = inputList[0]
  .replace("seeds: ", "")
  .split(" ")
  .map((el) => Number(el));

let values = [];
for (let i = 0; i < seed.length; i++) {
  if (i % 2 === 0) {
    values.push([seed[i], seed[i] + (seed[i + 1] - 1)]);
  }
}
values = values.sort((a, b) => a[0] - b[0]);

inputList = inputList.slice(2);

function calc(inputList, i) {
  let map = [];
  for (let j = i + 1; inputList[j] && inputList[j].length > 0; j++) {
    const eleArr = inputList[j].split(" ").map((el) => Number(el));
    map.push([eleArr[1], eleArr[1] + (eleArr[2] - 1), eleArr[0] - eleArr[1]]);
  }

  let newV = [];

  while (values.length > 0) {
    const seed = values.pop();
    let mod = false;

    for (let i = 0; i < map.length; i++) {
      // |------------|
      //        |------------|
      if (seed[0] < map[i][0] && seed[1] >= map[i][0] && seed[1] <= map[i][1]) {
        newV.push([map[i][0], seed[1]]);
        values.push([seed[0], map[i][0] - 1]);
        mod = true;
        continue;
      }

      //        |------------|
      // |------------|
      else if (
        seed[0] >= map[i][0] &&
        seed[0] <= map[i][1] &&
        seed[1] > map[i][1]
      ) {
        newV.push([seed[0], map[i][1]]);
        values.push([map[i][1] + 1, seed[1]]);
        mod = true;
        continue;
      }

      // |------------|
      //    |-------|
      else if (seed[0] < map[i][0] && seed[1] > map[i][1]) {
        values.push([seed[0], map[i][0] - 1]);
        newV.push([map[i][0], map[i][1]]);
        values.push([map[i][1] + 1, seed[1]]);
        mod = true;
        continue;
      }
    }

    if (!mod) {
      newV.push([seed[0], seed[1]]);
    }
  }

  newV = [...new Set(newV.map(JSON.stringify))].map(JSON.parse);

  for (let index = 0; index < newV.length; index++) {
    for (let i = 0; i < map.length; i++) {
      if (newV[index][0] >= map[i][0] && newV[index][1] <= map[i][1]) {
        newV[index][0] = newV[index][0] + map[i][2];
        newV[index][1] = newV[index][1] + map[i][2];
        break;
      }
    }
  }

  values = newV.sort((a, b) => a[0] - b[0]);
}

for (let i = 0; i < inputList.length; i++) {
  const value = inputList[i];
  if (value.endsWith("map:")) {
    calc(inputList, i);
  }
}

// output answer
console.log(values[0][0]);
