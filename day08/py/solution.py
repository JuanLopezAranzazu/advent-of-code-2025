from pathlib import Path
from itertools import combinations

points = [
    tuple(map(int, line.split(",")))
    for line in Path("../input.txt").read_text().splitlines()
]

class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.size = [1] * n
        self.components = n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, a, b):
        ra, rb = self.find(a), self.find(b)
        if ra == rb:
            return False
        if self.size[ra] < self.size[rb]:
            ra, rb = rb, ra
        self.parent[rb] = ra
        self.size[ra] += self.size[rb]
        self.components -= 1
        return True

def build_edges(points):
    edges = []
    for i, j in combinations(range(len(points)), 2):
        x1, y1, z1 = points[i]
        x2, y2, z2 = points[j]
        d = (x1-x2)**2 + (y1-y2)**2 + (z1-z2)**2
        edges.append((d, i, j))
    edges.sort()
    return edges

def part1(points, connections_limit=1000):

    edges = build_edges(points)
    uf = UnionFind(len(points))

    for _, a, b in edges[:connections_limit]:
        uf.union(a, b)

    comps = {}
    for i in range(len(points)):
        r = uf.find(i)
        comps[r] = comps.get(r, 0) + 1

    largest = sorted(comps.values(), reverse=True)
    while len(largest) < 3:
        largest.append(1)

    return largest[0] * largest[1] * largest[2]


def part2(points):
    edges = build_edges(points)
    uf = UnionFind(len(points))

    for _, a, b in edges:
        if uf.union(a, b) and uf.components == 1:
            return points[a][0] * points[b][0]

print("Part 1:", part1(points))
print("Part 2:", part2(points))
