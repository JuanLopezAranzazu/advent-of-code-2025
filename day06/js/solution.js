import fs from "fs";

const lines = fs.readFileSync("../input.txt", "utf-8").split("\n");

function solve(lines) {
  const width = Math.max(...lines.map(l => l.length));
  const grid = lines.map(l => l.padEnd(width, " "));

  const lastRow = grid.length - 1;
  let total = 0;

  let c = 0;
  while (c < width) {
    if (grid.every(row => row[c] === " ")) {
      c++;
      continue;
    }

    const start = c;
    while (c < width && !grid.every(row => row[c] === " ")) {
      c++;
    }
    const end = c;

    const nums = [];
    for (let r = 0; r < lastRow; r++) {
      const val = grid[r].slice(start, end).trim();
      if (val) nums.push(Number(val));
    }

    const op = grid[lastRow].slice(start, end).trim();

    let result;
    if (op === "+") {
      result = nums.reduce((a, b) => a + b, 0);
    } else {
      result = nums.reduce((a, b) => a * b, 1);
    }

    total += result;
  }

  return total;
}

console.log("Result:", solve(lines));
