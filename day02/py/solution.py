from pathlib import Path

input_data = Path("../input.txt").read_text().strip()

def is_invalid_id(n):
    s = str(n)
    if len(s) % 2 != 0:
        return False

    half = len(s) // 2
    return s[:half] == s[half:]

def solve(data):
    total = 0
    ranges = data.split(",")

    for r in ranges:
        start, end = map(int, r.split("-"))

        for n in range(start, end + 1):
            if is_invalid_id(n):
                total += n

    return total

print("Result:", solve(input_data))
