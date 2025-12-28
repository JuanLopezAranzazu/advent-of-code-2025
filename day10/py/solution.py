from pathlib import Path
import re
from functools import cache
from itertools import combinations, product


lines = Path("../input.txt").read_text().splitlines()


def parse_line(line):
    diagram = re.search(r"\[([.#]+)\]", line).group(1)

    buttons = [
        tuple(map(int, b.split(",")))
        for b in re.findall(r"\(([^)]*)\)", line)
        if b.strip()
    ]

    joltages = tuple(
        map(int, re.search(r"\{([^}]+)\}", line).group(1).split(","))
    )

    return diagram, buttons, joltages


def min_presses_xor(target_mask, button_masks):
    m = len(button_masks)
    best = float("inf")

    for mask in range(1 << m):
        cur = 0
        presses = 0

        for i in range(m):
            if mask & (1 << i):
                cur ^= button_masks[i]
                presses += 1
                if presses >= best:
                    break

        if cur == target_mask:
            best = min(best, presses)

    return best


def part1(lines):
    total = 0

    for line in lines:
        diagram, buttons, _ = parse_line(line)

        target = 0
        for i, c in enumerate(diagram):
            if c == "#":
                target |= 1 << i

        button_masks = []
        for b in buttons:
            mask = 0
            for i in b:
                mask |= 1 << i
            button_masks.append(mask)

        total += min_presses_xor(target, button_masks)

    return total



def patterns(coeffs):
    m = len(coeffs)
    n = len(coeffs[0])
    out = {p: {} for p in product(range(2), repeat=n)}

    for k in range(m + 1):
        for combo in combinations(range(m), k):
            pattern = [0] * n
            for i in combo:
                for j in range(n):
                    pattern[j] += coeffs[i][j]
            pattern = tuple(pattern)
            parity = tuple(x % 2 for x in pattern)
            out[parity].setdefault(pattern, k)

    return out


def solve_single(coeffs, goal):
    pattern_costs = patterns(coeffs)

    @cache
    def dfs(goal):
        if all(x == 0 for x in goal):
            return 0

        best = 10**18
        parity = tuple(x % 2 for x in goal)

        for pattern, cost in pattern_costs[parity].items():
            if all(p <= g for p, g in zip(pattern, goal)):
                new_goal = tuple((g - p) // 2 for p, g in zip(pattern, goal))
                best = min(best, cost + 2 * dfs(new_goal))

        return best

    return dfs(goal)


def part2(lines):
    total = 0

    for line in lines:
        _, buttons, joltages = parse_line(line)

        n = len(joltages)
        coeffs = [
            tuple(1 if i in b else 0 for i in range(n))
            for b in buttons
        ]

        total += solve_single(coeffs, joltages)

    return total


print("Part 1:", part1(lines))
print("Part 2:", part2(lines))
