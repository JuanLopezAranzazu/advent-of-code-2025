from pathlib import Path
from itertools import combinations

points = [
    tuple(map(int, line.split(",")))
    for line in Path("../input.txt").read_text().splitlines()
]

def solve(points):
    max_area = 0
    for (x1, y1), (x2, y2) in combinations(points, 2):
        area = (abs(x1 - x2) + 1) * (abs(y1 - y2) + 1)
        max_area = max(max_area, area)
    return max_area


print("Result:", solve(points))

