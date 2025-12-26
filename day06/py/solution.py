from pathlib import Path

lines = Path("../input.txt").read_text().splitlines()

def solve(lines):
    width = max(len(line) for line in lines)
    grid = [line.ljust(width) for line in lines]

    last_row = len(grid) - 1
    total = 0

    c = 0
    while c < width:
        if all(grid[r][c] == " " for r in range(len(grid))):
            c += 1
            continue

        start = c
        while c < width and not all(grid[r][c] == " " for r in range(len(grid))):
            c += 1
        end = c

        nums = []
        for r in range(last_row):
            val = grid[r][start:end].strip()
            if val:
                nums.append(int(val))

        op = grid[last_row][start:end].strip()

        if op == "+":
            result = sum(nums)
        elif op == "*":
            result = 1
            for n in nums:
                result *= n

        total += result

    return total

print("Result:", solve(lines))
