const fs = require("fs");
const filename = "./input.txt";
const inputList = fs.readFileSync(filename, "utf8").trim().split("\n");

const splitList = inputList.map((row) => {
  const rowArr = row.split("");
  return rowArr;
});

const answer = [];

const map = new Map();

for (let x = 0; x < splitList.length; x++) {
  for (let y = 0; y < splitList[x].length; y++) {
    if (!isNaN(Number(splitList[x][y]))) {
      let n = "";
      let yStart = y;
      while (!isNaN(Number(splitList[x][y]))) {
        n = n.concat(splitList[x][y]);
        y++;
      }

      // check number's top
      if (splitList[x - 1]) {
        for (let i = yStart - 1; i < y + 1; i++) {
          if (splitList[x - 1][i] === "*") {
            if (map.get(`${x - 1},${i}`)) {
              map.set(`${x - 1},${i}`, [...map.get(`${x - 1},${i}`), n]);
            } else {
              map.set(`${x - 1},${i}`, [n]);
            }
          }
        }
      }

      // check number's left
      if (splitList[x][yStart - 1] === "*") {
        if (map.get(`${x},${yStart - 1}`)) {
          map.set(`${x},${yStart - 1}`, [...map.get(`${x},${yStart - 1}`), n]);
        } else {
          map.set(`${x},${yStart - 1}`, [n]);
        }
      }

      // check number's right
      if (splitList[x][y] === "*") {
        if (map.get(`${x},${y}`)) {
          map.set(`${x},${y}`, [...map.get(`${x},${y}`), n]);
        } else {
          map.set(`${x},${y}`, [n]);
        }
      }

      // check number's bottom
      if (splitList[x + 1]) {
        for (let i = yStart - 1; i < y + 1; i++) {
          if (splitList[x + 1][i] === "*") {
            if (map.get(`${x + 1},${i}`)) {
              map.set(`${x + 1},${i}`, [...map.get(`${x + 1},${i}`), n]);
            } else {
              map.set(`${x + 1},${i}`, [n]);
            }
          }
        }
      }
    }
  }
}

for (const [_, value] of map) {
  if (value.length === 2) {
    answer.push(Number(value[0]) * Number(value[1]));
  }
}

// output answer
console.log(answer.reduce((a, b) => a + b, 0));
