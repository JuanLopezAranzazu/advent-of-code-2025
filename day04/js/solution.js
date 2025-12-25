import fs from "fs";

const grid = fs
  .readFileSync("../input.txt", "utf-8")
  .trim()
  .split("\n");

const directions = [
  [-1, -1], [-1, 0], [-1, 1],
  [ 0, -1],          [ 0, 1],
  [ 1, -1], [ 1, 0], [ 1, 1],
];

function countAccessibleRolls(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] !== "@") continue;

      let neighbors = 0;

      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;

        if (
          nr >= 0 && nr < rows &&
          nc >= 0 && nc < cols &&
          grid[nr][nc] === "@"
        ) {
          neighbors++;
        }
      }

      if (neighbors < 4) {
        count++;
      }
    }
  }

  return count;
}

console.log("Result:", countAccessibleRolls(grid));
