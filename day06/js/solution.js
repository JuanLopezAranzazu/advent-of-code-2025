import fs from "fs";

const lines = fs.readFileSync("../input.txt", "utf-8").trimEnd().split("\n");

function extractPart1(grid, start, end, lastRow) {
  const nums = [];

  for (let r = 0; r < lastRow; r++) {
    const val = grid[r].slice(start, end).trim();
    if (val) nums.push(Number(val));
  }

  return nums;
}

function extractPart2(grid, start, end, lastRow) {
  const nums = [];

  for (let col = end - 1; col >= start; col--) {
    let digits = "";
    for (let row = 0; row < lastRow; row++) {
      const ch = grid[row][col];
      if (ch >= "0" && ch <= "9") {
        digits += ch;
      }
    }
    if (digits) nums.push(Number(digits));
  }

  return nums;
}

function solve(lines, extractNumbers) {
  const width = Math.max(...lines.map((l) => l.length));
  const grid = lines.map((l) => l.padEnd(width, " "));

  const lastRow = grid.length - 1;
  let total = 0;
  let c = 0;

  while (c < width) {
    if (grid.every((row) => row[c] === " ")) {
      c++;
      continue;
    }

    const start = c;
    while (c < width && !grid.every((row) => row[c] === " ")) {
      c++;
    }
    const end = c;

    const nums = extractNumbers(grid, start, end, lastRow);

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

console.log("Part 1:", solve(lines, extractPart1));
console.log("Part 2:", solve(lines, extractPart2));
