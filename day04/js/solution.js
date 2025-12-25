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

function countNeighbors(grid, r, c) {
  let count = 0;
  for (const [dr, dc] of directions) {
    const nr = r + dr;
    const nc = c + dc;
    if (
      nr >= 0 && nr < grid.length &&
      nc >= 0 && nc < grid[0].length &&
      grid[nr][nc] === "@"
    ) {
      count++;
    }
  }
  return count;
}

function part1(grid) {
  let result = 0;

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === "@" && countNeighbors(grid, r, c) < 4) {
        result++;
      }
    }
  }

  return result;
}

function part2(originalGrid) {
  const grid = originalGrid.map(row => [...row]);
  let totalRemoved = 0;

  while (true) {
    const toRemove = [];

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[0].length; c++) {
        if (grid[r][c] === "@" && countNeighbors(grid, r, c) < 4) {
          toRemove.push([r, c]);
        }
      }
    }

    if (toRemove.length === 0) break;

    for (const [r, c] of toRemove) {
      grid[r][c] = ".";
    }

    totalRemoved += toRemove.length;
  }

  return totalRemoved;
}

console.log("Part 1:", part1(grid));
console.log("Part 2:", part2(grid));