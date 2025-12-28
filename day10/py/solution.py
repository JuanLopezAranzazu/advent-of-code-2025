from pathlib import Path
import re


lines = Path("../input.txt").read_text().strip().split("\n")

def parse_line(line):
    diagram = re.search(r"\[([.#]+)\]", line).group(1)

    buttons = []
    for match in re.findall(r"\(([^)]*)\)", line):
        if match.strip() == "":
            continue
        buttons.append(tuple(map(int, match.split(","))))

    return diagram, buttons


def min_presses(target, buttons):
    m = len(buttons)
    best = float("inf")

    for mask in range(1 << m):
        cur = 0
        presses = 0

        for i in range(m):
            if mask & (1 << i):
                cur ^= buttons[i]
                presses += 1
                if presses >= best:
                    break

        if cur == target:
            best = min(best, presses)

    return best


def solve(lines):
    total = 0

    for line in lines:
        diagram, btns = parse_line(line)

        target = 0
        for i, c in enumerate(diagram):
            if c == "#":
                target |= 1 << i

        button_masks = []
        for b in btns:
            mask = 0
            for i in b:
                mask |= 1 << i
            button_masks.append(mask)

        total += min_presses(target, button_masks)

    return total


print("Result:", solve(lines))
