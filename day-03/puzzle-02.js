const fs = require("fs");
const filename = "./input.txt";
const inputList = fs.readFileSync(filename, "utf8").trim().split("\n");

const answer = [];

const splitList = inputList.map((row) => {
  const rowArr = row.split("");
  return rowArr;
});

for (let x = 0; x < splitList.length; x++) {
  for (let y = 0; y < splitList[x].length; y++) {
    if (splitList[x][y] === "*") {
      let yLeft = -1;
      let yRight = 1;
      let top = false,
        bottom = false;
      const nums = [];

      // check top
      if (!isNaN(Number(splitList[x - 1][y]))) {
        let n = splitList[x - 1][y];
        while (!isNaN(Number(splitList[x - 1][y + yLeft]))) {
          n = n.replace(/^/, splitList[x - 1][y + yLeft]);
          yLeft--;
        }

        while (!isNaN(Number(splitList[x - 1][y + yRight]))) {
          n = n.replace(/$/, splitList[x - 1][y + yRight]);
          yRight++;
        }

        top = true;
        nums.push(n);
      }

      // check left
      if (!isNaN(Number(splitList[x][y - 1]))) {
        let n = "";
        yLeft = -1;
        while (!isNaN(Number(splitList[x][y + yLeft]))) {
          n = n.replace(/^/, splitList[x][y + yLeft]);
          yLeft--;
        }
        nums.push(n);
      }

      // check right
      if (!isNaN(Number(splitList[x][y + 1]))) {
        let n = "";
        yRight = 1;
        while (!isNaN(Number(splitList[x][y + yRight]))) {
          n = n.replace(/$/, splitList[x][y + yRight]);
          yRight++;
        }
        nums.push(n);
      }

      // check bot
      if (!isNaN(Number(splitList[x + 1][y]))) {
        let n = splitList[x + 1][y];
        yLeft = -1;
        while (!isNaN(Number(splitList[x + 1][y + yLeft]))) {
          n = n.replace(/^/, splitList[x + 1][y + yLeft]);
          yLeft--;
        }

        yRight = 1;
        while (!isNaN(Number(splitList[x + 1][y + yRight]))) {
          n = n.replace(/$/, splitList[x + 1][y + yRight]);
          yRight++;
        }

        bottom = true;
        nums.push(n);
      }

      if (!top) {
        if (!isNaN(Number(splitList[x - 1][y - 1]))) {
          let n = "";
          yLeft = -1;
          while (!isNaN(Number(splitList[x - 1][y + yLeft]))) {
            n = n.replace(/^/, splitList[x - 1][y + yLeft]);
            yLeft--;
          }
          nums.push(n);
        }

        if (!isNaN(Number(splitList[x - 1][y + 1]))) {
          let n = "";
          yRight = 1;
          while (!isNaN(Number(splitList[x - 1][y + yRight]))) {
            n = n.replace(/$/, splitList[x - 1][y + yRight]);
            yRight++;
          }
          nums.push(n);
        }
      }

      if (!bottom) {
        if (!isNaN(Number(splitList[x + 1][y - 1]))) {
          let n = "";
          yLeft = -1;
          while (!isNaN(Number(splitList[x + 1][y + yLeft]))) {
            n = n.replace(/^/, splitList[x + 1][y + yLeft]);
            yLeft--;
          }
          nums.push(n);
        }

        if (!isNaN(Number(splitList[x + 1][y + 1]))) {
          let n = "";
          yRight = 1;
          while (!isNaN(Number(splitList[x + 1][y + yRight]))) {
            n = n.replace(/$/, splitList[x + 1][y + yRight]);
            yRight++;
          }
          nums.push(n);
        }
      }

      if (nums.length === 2) {
        answer.push(Number(nums[0]) * Number(nums[1]));
      }
    }
  }
}

// output answer
console.log(answer.reduce((a, b) => a + b, 0));
