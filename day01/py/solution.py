from pathlib import Path

rotations = Path("../input.txt").read_text().strip().splitlines()

def part1(rotations):
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

def part2(rotations):
    pos = 50
    count = 0

    for r in rotations:
        direction = r[0]
        steps = int(r[1:])

        for _ in range(steps):
            if direction == "R":
                pos = (pos + 1) % 100
            else:
                pos = (pos - 1) % 100

            if pos == 0:
                count += 1

    return count

print("Part 1:", part1(rotations))
print("Part 2:", part2(rotations))
