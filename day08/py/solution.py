from pathlib import Path
from itertools import combinations

points = [
    tuple(map(int, line.split(",")))
    for line in Path("../input.txt").read_text().splitlines()
]


def solve(points, connections_limit=1000):

    n = len(points)

    parent = list(range(n))
    size = [1] * n

    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    def union(a, b):
        ra, rb = find(a), find(b)
        if ra == rb:
            return
        if size[ra] < size[rb]:
            ra, rb = rb, ra
        parent[rb] = ra
        size[ra] += size[rb]


    edges = []
    for i, j in combinations(range(n), 2):
        x1, y1, z1 = points[i]
        x2, y2, z2 = points[j]
        d = (x1-x2)**2 + (y1-y2)**2 + (z1-z2)**2
        edges.append((d, i, j))

    edges.sort()

    for _, a, b in edges[:connections_limit]:
        union(a, b)


    comps = {}
    for i in range(n):
        r = find(i)
        comps[r] = comps.get(r, 0) + 1

    largest = sorted(comps.values(), reverse=True)


    while len(largest) < 3:
        largest.append(1)

    return largest[0] * largest[1] * largest[2]


print("Result:", solve(points))
