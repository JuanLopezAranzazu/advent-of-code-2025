from pathlib import Path

input_data = Path("../input.txt").read_text().strip()

def is_invalid_part1(n):
    s = str(n)
    if len(s) % 2 != 0:
        return False

    half = len(s) // 2
    return s[:half] == s[half:]

def is_invalid_part2(n):
    s = str(n)
    L = len(s)

    for size in range(1, L // 2 + 1):
        if L % size != 0:
            continue

        pattern = s[:size]
        if pattern * (L // size) == s:
            return True

    return False

def solve(input_data, is_invalid):
    total = 0
    ranges = input_data.split(",")

    for r in ranges:
        start, end = map(int, r.split("-"))

        for n in range(start, end + 1):
            if is_invalid(n):
                total += n

    return total

def part1(input_data):
    return solve(input_data, is_invalid_part1)


def part2(input_data):
    return solve(input_data, is_invalid_part2)

print("Part 1:", part1(input_data))
print("Part 2:", part2(input_data))
