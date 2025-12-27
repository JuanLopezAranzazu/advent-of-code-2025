import fs from "fs";

const grid = fs.readFileSync("../input.txt", "utf-8").trimEnd().split("\n");

function part1(grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  const startCol = grid[0].indexOf("S");

  let active = new Set([startCol]);
  let splits = 0;

  for (let r = 1; r < rows; r++) {
    const nextActive = new Set();

    for (const c of active) {
      if (c < 0 || c >= cols) continue;

      const cell = grid[r][c];

      if (cell === ".") {
        nextActive.add(c);
      } else if (cell === "^") {
        splits++;
        nextActive.add(c - 1);
        nextActive.add(c + 1);
      }
    }

    active = nextActive;
  }

  return splits;
}

function part2(grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  const startCol = grid[0].indexOf("S");

  let current = new Map();
  current.set(startCol, 1);

  for (let r = 1; r < rows; r++) {
    const next = new Map();

    for (const [c, count] of current.entries()) {
      if (c < 0 || c >= cols) continue;

      const cell = grid[r][c];

      if (cell === ".") {
        next.set(c, (next.get(c) ?? 0) + count);
      } else if (cell === "^") {
        next.set(c - 1, (next.get(c - 1) ?? 0) + count);
        next.set(c + 1, (next.get(c + 1) ?? 0) + count);
      }
    }

    current = next;
  }

  let total = 0;
  for (const v of current.values()) {
    total += v;
  }

  return total;
}

console.log("Part 1:", part1(grid));
console.log("Part 2:", part2(grid));
