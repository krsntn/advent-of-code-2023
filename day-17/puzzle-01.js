const fs = require("fs");
const filename = "./input.txt";
let inputList = fs.readFileSync(filename, "utf8").trim().split("\n");

const GRID = inputList.map((line) => line.split("").map((num) => Number(num)));
const ROWS = GRID.length;
const COLS = GRID[0].length;
const TARGET = [ROWS - 1, COLS - 1];

const POSSIBLE_DIRECTIONS = [
  { row: 1, col: 0 },
  { row: -1, col: 0 },
  { row: 0, col: 1 },
  { row: 0, col: -1 },
];

const visited = new Set();

function visit(lead) {
  const key = `${lead.col},${lead.row},${lead.deltaColumn},${lead.deltaRow},${lead.count}`;
  if (visited.has(key)) return;
  visited.add(key);

  const coordinate = `${lead.row},${lead.col}`;
  if (lead.visited.has(coordinate)) return;
  lead.visited.add(coordinate);

  leads.push(lead);
}

const leads = pqueue();

visit({
  col: 0,
  row: 0,
  deltaColumn: 0,
  deltaRow: 1,
  heatLoss: 0,
  count: 0,
  visited: new Set(),
});
visit({
  col: 0,
  row: 0,
  deltaColumn: 1,
  deltaRow: 0,
  heatLoss: 0,
  count: 0,
  visited: new Set(),
});

searchLeastHeatLoss: while (true) {
  const currentLead = leads.pop();

  for (const direction of POSSIBLE_DIRECTIONS) {
    if (
      direction.row === -currentLead.deltaRow &&
      direction.col === -currentLead.deltaColumn
    ) {
      continue;
    }

    const nextCol = currentLead.col + direction.col;
    const nextRow = currentLead.row + direction.row;
    if (nextCol < 0 || nextRow < 0 || nextCol >= COLS || nextRow >= ROWS) {
      continue;
    }

    const isSameDirection =
      currentLead.deltaColumn === direction.col &&
      currentLead.deltaRow === direction.row;

    if (isSameDirection && currentLead.count === 3) {
      continue;
    }

    const nextCount = isSameDirection ? currentLead.count + 1 : 1;

    if (nextCol === TARGET[1] && nextRow === TARGET[0]) {
      console.log(currentLead.heatLoss + GRID[nextRow][nextCol]);
      break searchLeastHeatLoss;
    }

    visit({
      col: nextCol,
      row: nextRow,
      deltaColumn: direction.col,
      deltaRow: direction.row,
      heatLoss: currentLead.heatLoss + GRID[nextRow][nextCol],
      count: nextCount,
      visited: new Set(currentLead.visited),
    });
  }
}

function pqueue() {
  const bucket = new Map();
  const heatLossValues = [];
  return {
    bucket,
    push(item) {
      if (bucket.has(item.heatLoss)) {
        bucket.get(item.heatLoss).push(item);
      } else {
        heatLossValues.push(item.heatLoss);
        heatLossValues.sort((a, b) => a - b);
        bucket.set(item.heatLoss, [item]);
      }
    },
    pop() {
      const minHeatLoss = heatLossValues[0];
      const result = bucket.get(minHeatLoss).pop();
      if (bucket.get(minHeatLoss).length === 0) {
        bucket.delete(minHeatLoss);
        heatLossValues.shift();
      }
      return result;
    },
  };
}
