import fs from "fs";

const grid = fs.readFileSync("../input.txt", "utf-8").trimEnd().split("\n");

function solve(grid) {
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
      } 
      else if (cell === "^") {
        splits++;
        nextActive.add(c - 1);
        nextActive.add(c + 1);
      }
    }

    active = nextActive;
  }

  return splits;
}

console.log("Result:", solve(grid));
