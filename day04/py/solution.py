from pathlib import Path

grid = Path("../input.txt").read_text().strip().splitlines()

DIRECTIONS = [
    (-1, -1), (-1, 0), (-1, 1),
    ( 0, -1),          ( 0, 1),
    ( 1, -1), ( 1, 0), ( 1, 1),
]

def count_accessible_rolls(grid):
    rows = len(grid)
    cols = len(grid[0])
    count = 0

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] != "@":
                continue

            neighbors = 0
            for dr, dc in DIRECTIONS:
                nr, nc = r + dr, c + dc
                if (
                    0 <= nr < rows and
                    0 <= nc < cols and
                    grid[nr][nc] == "@"
                ):
                    neighbors += 1

            if neighbors < 4:
                count += 1

    return count

print("Result:", count_accessible_rolls(grid))
