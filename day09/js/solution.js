import fs from "fs";

const points = fs
  .readFileSync("../input.txt", "utf-8")
  .trim()
  .split("\n")
  .map(line => line.split(",").map(Number));

function part1(points) {
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

function rectArea(a, b) {
  return (Math.abs(a[0] - b[0]) + 1) * (Math.abs(a[1] - b[1]) + 1);
}

function less(a, b) {
  return a[0] < b[0] || (a[0] === b[0] && a[1] < b[1]);
}


function buildEdges(points) {
  const n = points.length;
  const edges = [];

  for (let i = 0; i < n; i++) {
    let a = points[i];
    let b = points[(i - 1 + n) % n];
    if (less(b, a)) [a, b] = [b, a];
    edges.push([a, b]);
  }

  return edges;
}


function buildRects(points) {
  const rects = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      let a = points[i];
      let b = points[j];
      if (less(b, a)) [a, b] = [b, a];
      rects.push({
        a,
        b,
        area: rectArea(a, b)
      });
    }
  }
  return rects;
}


function isCovered(edges, x1, x2, y1, y2) {
  for (const [[x3, y3], [x4, y4]] of edges) {
    if (x4 > x1 && x3 < x2 && y4 > y1 && y3 < y2) {
      return true;
    }
  }
  return false;
}


function part2(points) {
  const edges = buildEdges(points);
  const rects = buildRects(points);

  rects.sort((a, b) => b.area - a.area);

  for (const r of rects) {
    let [x1, y1] = r.a;
    let [x2, y2] = r.b;
    if (y1 > y2) [y1, y2] = [y2, y1];

    if (!isCovered(edges, x1, x2, y1, y2)) {
      return r.area;
    }
  }

  return 0;
}

console.log("Part 1:", part1(points));
console.log("Part 2:", part2(points));
