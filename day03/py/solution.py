from pathlib import Path

lines = Path("../input.txt").read_text().strip().splitlines()

def max_joltage_part1(line):
    digits = list(map(int, line))
    best = 0

    for i in range(len(digits) - 1):
        max_right = max(digits[i+1:])
        best = max(best, digits[i] * 10 + max_right)

    return best

def max_joltage_part2(line: str, k: int = 12) -> int:
    digits = list(map(int, line))
    stack = []
    to_remove = len(digits) - k

    for d in digits:
        while stack and to_remove > 0 and stack[-1] < d:
            stack.pop()
            to_remove -= 1
        stack.append(d)

    return int("".join(map(str, stack[:k])))

def solve(lines, max_joltage):
    return sum(max_joltage(line) for line in lines)

def part1(lines):
    return solve(lines, max_joltage_part1)

def part2(lines):
    return solve(lines, max_joltage_part2)

print("Part 1:", part1(lines))
print("Part 2:", part2(lines))
