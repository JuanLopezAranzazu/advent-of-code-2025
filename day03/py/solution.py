from pathlib import Path

lines = Path("../input.txt").read_text().strip().splitlines()

def max_joltage(line):
    digits = list(map(int, line))
    best = 0

    for i in range(len(digits) - 1):
        max_right = max(digits[i+1:])
        best = max(best, digits[i] * 10 + max_right)

    return best

def solve(lines):
    return sum(max_joltage(line) for line in lines)

print("Result:", solve(lines))
