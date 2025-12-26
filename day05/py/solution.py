from pathlib import Path
import re

text = Path("../input.txt").read_text().strip()
ranges_block, ids_block = re.split(r"\r?\n\s*\r?\n", text)

ranges = [
    tuple(map(int, line.split("-")))
    for line in ranges_block.splitlines()
]

ids = list(map(int, ids_block.splitlines()))


def is_fresh(id_, ranges):
    return any(start <= id_ <= end for start, end in ranges)


def part1(ranges, ids):
    return sum(1 for id_ in ids if is_fresh(id_, ranges))


def part2(ranges):
    ranges.sort()
    total = 0

    cur_start, cur_end = ranges[0]

    for start, end in ranges[1:]:
        if start <= cur_end + 1:
            cur_end = max(cur_end, end)
        else:
            total += cur_end - cur_start + 1
            cur_start, cur_end = start, end

    total += cur_end - cur_start + 1
    return total

print("Part 1:", part1(ranges, ids))
print("Part 2:", part2(ranges))
