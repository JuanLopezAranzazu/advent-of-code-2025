import fs from "fs";

const points = fs
  .readFileSync("../input.txt", "utf-8")
  .trim()
  .split("\n")
  .map((line) => line.split(",").map(Number));

class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.size = Array(n).fill(1);
    this.components = n;
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(a, b) {
    let ra = this.find(a);
    let rb = this.find(b);
    if (ra === rb) return false;

    if (this.size[ra] < this.size[rb]) {
      [ra, rb] = [rb, ra];
    }

    this.parent[rb] = ra;
    this.size[ra] += this.size[rb];
    this.components--;
    return true;
  }
}

function buildEdges(points) {
  const edges = [];
  const n = points.length;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const [x1, y1, z1] = points[i];
      const [x2, y2, z2] = points[j];
      const d = (x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2;
      edges.push([d, i, j]);
    }
  }

  edges.sort((a, b) => a[0] - b[0]);
  return edges;
}

function part1(points, connectionsLimit = 1000) {
  const edges = buildEdges(points);
  const uf = new UnionFind(points.length);

  for (let i = 0; i < connectionsLimit; i++) {
    const [, a, b] = edges[i];
    uf.union(a, b);
  }

  const comps = {};
  for (let i = 0; i < points.length; i++) {
    const r = uf.find(i);
    comps[r] = (comps[r] || 0) + 1;
  }

  const sizes = Object.values(comps).sort((a, b) => b - a);
  while (sizes.length < 3) sizes.push(1);

  return sizes[0] * sizes[1] * sizes[2];
}

function part2(points) {
  const edges = buildEdges(points);
  const uf = new UnionFind(points.length);

  for (const [, a, b] of edges) {
    if (uf.union(a, b) && uf.components === 1) {
      return points[a][0] * points[b][0];
    }
  }
}

console.log("Part 1:", part1(points));
console.log("Part 2:", part2(points));
