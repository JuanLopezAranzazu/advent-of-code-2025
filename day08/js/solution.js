import fs from "fs";

const points = fs
  .readFileSync("../input.txt", "utf-8")
  .trim()
  .split("\n")
  .map((line) => line.split(",").map(Number));

function solve(points, connectionsLimit = 1000) {
  const n = points.length;

  const parent = Array.from({ length: n }, (_, i) => i);
  const size = Array(n).fill(1);

  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }

  function union(a, b) {
    let ra = find(a),
      rb = find(b);
    if (ra === rb) return;
    if (size[ra] < size[rb]) [ra, rb] = [rb, ra];
    parent[rb] = ra;
    size[ra] += size[rb];
  }

  const edges = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const [x1, y1, z1] = points[i];
      const [x2, y2, z2] = points[j];
      const d = (x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2;
      edges.push([d, i, j]);
    }
  }

  edges.sort((a, b) => a[0] - b[0]);

  for (let i = 0; i < connectionsLimit; i++) {
    const [, a, b] = edges[i];
    union(a, b);
  }

  const comps = {};
  for (let i = 0; i < n; i++) {
    const r = find(i);
    comps[r] = (comps[r] || 0) + 1;
  }

  const sizes = Object.values(comps).sort((a, b) => b - a);
  while (sizes.length < 3) sizes.push(1);

  return sizes[0] * sizes[1] * sizes[2];
}

console.log("Result:", solve(points));
