from pathlib import Path

grid = [list(line) for line in Path("../input.txt").read_text().splitlines()]

DIRECTIONS = [
    (-1, -1), (-1, 0), (-1, 1),
    ( 0, -1),          ( 0, 1),
    ( 1, -1), ( 1, 0), ( 1, 1),
]

def count_neighbors(grid, r, c):
    rows, cols = len(grid), len(grid[0])
    count = 0
    for dr, dc in DIRECTIONS:
        nr, nc = r + dr, c + dc
        if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == "@":
            count += 1
    return count

def part1(grid):
    result = 0
    for r in range(len(grid)):
        for c in range(len(grid[0])):
            if grid[r][c] == "@" and count_neighbors(grid, r, c) < 4:
                result += 1
    return result

def part2(original_grid):
    grid = [row[:] for row in original_grid]
    total_removed = 0

    while True:
        to_remove = []

        for r in range(len(grid)):
            for c in range(len(grid[0])):
                if grid[r][c] == "@" and count_neighbors(grid, r, c) < 4:
                    to_remove.append((r, c))

        if not to_remove:
            break

        for r, c in to_remove:
            grid[r][c] = "."

        total_removed += len(to_remove)

    return total_removed

print("Part 1:", part1(grid))
print("Part 2:", part2(grid))
