from pathlib import Path
from collections import defaultdict

grid = Path("../input.txt").read_text().splitlines()

def part1(grid):
  rows = len(grid)
  cols = len(grid[0])

  start_col = grid[0].index("S")

  active = {start_col}
  splits = 0

  for r in range(1, rows):
      next_active = set()

      for c in active:
          if c < 0 or c >= cols:
              continue

          cell = grid[r][c]

          if cell == ".":
              next_active.add(c)

          elif cell == "^":
              splits += 1
              next_active.add(c - 1)
              next_active.add(c + 1)

      active = next_active

  return splits


def part2(grid):
    rows = len(grid)
    cols = len(grid[0])

    start_col = grid[0].index("S")

    current = {start_col: 1}

    for r in range(1, rows):
        next_state = defaultdict(int)

        for c, count in current.items():
            if c < 0 or c >= cols:
                continue

            cell = grid[r][c]

            if cell == ".":
                next_state[c] += count

            elif cell == "^":
                next_state[c - 1] += count
                next_state[c + 1] += count

        current = next_state

    total = sum(current.values())

    return total

print("Part 1:", part1(grid))
print("Part 2:", part2(grid))
