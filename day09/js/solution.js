import fs from "fs";

const points = fs
  .readFileSync("../input.txt", "utf-8")
  .trim()
  .split("\n")
  .map(line => line.split(",").map(Number));

function solve(points) {
  let maxArea = 0;

  for (let i = 0; i < points.length; i++) {
    const [x1, y1] = points[i];

    for (let j = i + 1; j < points.length; j++) {
      const [x2, y2] = points[j];

      const area =
        (Math.abs(x1 - x2) + 1) *
        (Math.abs(y1 - y2) + 1);

      if (area > maxArea) {
        maxArea = area;
      }
    }
  }

  return maxArea;
}

console.log("Result:", solve(points));
