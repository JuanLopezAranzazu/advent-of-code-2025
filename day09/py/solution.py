from pathlib import Path
from itertools import combinations

points = [
    tuple(map(int, line.split(",")))
    for line in Path("../input.txt").read_text().splitlines()
]


def part1(points):
    max_area = 0
    for (x1, y1), (x2, y2) in combinations(points, 2):
        area = (abs(x1 - x2) + 1) * (abs(y1 - y2) + 1)
        max_area = max(max_area, area)
    return max_area


def rect_area(a, b):
    return (abs(a[0] - b[0]) + 1) * (abs(a[1] - b[1]) + 1)


def less(a, b):
    return a[0] < b[0] or (a[0] == b[0] and a[1] < b[1])


def build_edges(points):
    n = len(points)
    edges = []

    for i in range(n):
        a = points[i]
        b = points[(i - 1) % n]
        if less(b, a):
            a, b = b, a
        edges.append((a, b))

    return edges


def build_rects(points):
    rects = []
    for a, b in combinations(points, 2):
        if less(b, a):
            a, b = b, a
        rects.append({
            "a": a,
            "b": b,
            "area": rect_area(a, b)
        })
    return rects


def is_covered(edges, x1, x2, y1, y2):
    for (x3, y3), (x4, y4) in edges:
        if x4 > x1 and x3 < x2 and y4 > y1 and y3 < y2:
            return True
    return False


def part2(points):
    edges = build_edges(points)
    rects = build_rects(points)

    rects.sort(key=lambda r: -r["area"])

    for r in rects:
        (x1, y1), (x2, y2) = r["a"], r["b"]
        if y1 > y2:
            y1, y2 = y2, y1

        if not is_covered(edges, x1, x2, y1, y2):
            return r["area"]

    return 0

print("Part 1:", part1(points))
print("Part 2:", part2(points))

