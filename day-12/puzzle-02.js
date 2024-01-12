const fs = require("fs");
const filename = "./input.txt";
let inputList = fs.readFileSync(filename, "utf8").trim().split("\n");

let cache = {};

function advance(options, char) {
  const { len, groups, i, left } = options;
  let update = {};
  if (char === "#") {
    update = { len: len + 1, left: left - 1 };
  } else if (char === "." && len > 0) {
    update = { len: 0, groups: [...groups, len] };
  }
  return { ...options, ...update, i: i + 1 };
}

const solve = (pattern, counts, options) => {
  if (JSON.stringify(options) in cache) {
    return cache[JSON.stringify(options)];
  }

  if (options.i === pattern.length) {
    if (options.len > 0) options.groups = [...options.groups, options.len];
    if (options.groups.length !== counts.length) {
      cache[JSON.stringify(options)] = 0;
      return 0;
    }
    if (options.groups.every((x, i) => x === counts[i])) {
      cache[JSON.stringify(options)] = 1;
      return 1;
    } else {
      cache[JSON.stringify(options)] = 0;
      return 0;
    }
  } else {
    if (options.groups.some((x, i) => x !== counts[i])) {
      cache[JSON.stringify(options)] = 0;
      return 0;
    }
    if (options.len > counts[options.groups.length]) {
      cache[JSON.stringify(options)] = 0;
      return 0;
    }
  }

  let result = 0;
  const c = pattern[options.i];
  if (c === "." || c === "?")
    result += solve(pattern, counts, advance(options, "."));
  if (c === "#" || c === "?")
    result += solve(pattern, counts, advance(options, "#"));

  cache[JSON.stringify(options)] = result;
  return result;
};

const answer = inputList
  .map((line) => {
    let [pattern, counts] = line.split(" ");
    pattern = new Array(5).fill().map(() => pattern);
    counts = new Array(5).fill().map(() => counts);
    pattern = pattern.join("?");
    counts = counts.join(",").split(",").map(Number);
    cache = {};

    return solve(pattern, counts, {
      groups: [],
      len: 0,
      i: 0,
      left: counts.reduce((a, b) => a + b, 0),
    });
  })
  .reduce((a, b) => a + b, 0);

console.log(answer);
