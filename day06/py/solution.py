from pathlib import Path

lines = Path("../input.txt").read_text().splitlines()

def extract_part1(grid, start, end, last_row):
    nums = []
    for r in range(last_row):
        val = grid[r][start:end].strip()
        if val:
            nums.append(int(val))
    return nums

def extract_part2(grid, start, end, last_row):
    nums = []

    for col in range(end - 1, start - 1, -1):
        digits = ""
        for row in range(last_row):
            ch = grid[row][col]
            if ch != " ":
                digits += ch
        if digits:
            nums.append(int(digits))

    return nums

def solve(lines, extract_numbers):
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

        nums = extract_numbers(grid, start, end, last_row)

        op = grid[last_row][start:end].strip()

        if op == "+":
            result = sum(nums)
        elif op == "*":
            result = 1
            for n in nums:
                result *= n

        total += result

    return total

print("Part 1:", solve(lines, extract_part1))
print("Part 2:", solve(lines, extract_part2))
