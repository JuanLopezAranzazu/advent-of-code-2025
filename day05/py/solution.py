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


def solve(ranges, ids):
    return sum(1 for id_ in ids if is_fresh(id_, ranges))


print("Result:", solve(ranges, ids))
