from pathlib import Path

rotations = Path("../input.txt").read_text().strip().splitlines()

def solve(rotations):
    pos = 50
    count = 0

    for r in rotations:
        direction = r[0]
        value = int(r[1:])

        if direction == "R":
            pos = (pos + value) % 100
        else:
            pos = (pos - value) % 100

        if pos == 0:
            count += 1

    return count

print("Password:", solve(rotations))
