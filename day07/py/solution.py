from pathlib import Path

grid = Path("../input.txt").read_text().splitlines()

def solve(grid):
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

print("Result:", solve(grid))
