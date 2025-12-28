import fs from "fs";


const lines = fs.readFileSync("../input.txt", "utf8").trim().split("\n");

function parseLine(line) {
  const diagram = line.match(/\[([.#]+)\]/)[1];

  const buttons = [...line.matchAll(/\(([^)]*)\)/g)]
    .map(m => m[1])
    .filter(s => s.length > 0)
    .map(s => s.split(",").map(Number));

  const joltages = line
    .match(/\{([^}]+)\}/)[1]
    .split(",")
    .map(Number);

  return { diagram, buttons, joltages };
}

function minPressesXOR(target, buttonMasks) {
  const m = buttonMasks.length;
  let best = Infinity;

  for (let mask = 0; mask < (1 << m); mask++) {
    let cur = 0;
    let presses = 0;

    for (let i = 0; i < m; i++) {
      if (mask & (1 << i)) {
        cur ^= buttonMasks[i];
        presses++;
        if (presses >= best) break;
      }
    }

    if (cur === target) best = Math.min(best, presses);
  }

  return best;
}

function part1(lines) {
  let total = 0;

  for (const line of lines) {
    const { diagram, buttons } = parseLine(line);

    let target = 0;
    [...diagram].forEach((c, i) => {
      if (c === "#") target |= (1 << i);
    });

    const buttonMasks = buttons.map(btn =>
      btn.reduce((mask, i) => mask | (1 << i), 0)
    );

    total += minPressesXOR(target, buttonMasks);
  }

  return total;
}


function buildPatterns(coeffs) {
  const m = coeffs.length;
  const n = coeffs[0].length;
  const out = new Map();

  function parityKey(arr) {
    return arr.map(v => v % 2).join(",");
  }

  for (let mask = 0; mask < (1 << m); mask++) {
    let pattern = Array(n).fill(0);
    let cost = 0;

    for (let i = 0; i < m; i++) {
      if (mask & (1 << i)) {
        cost++;
        for (let j = 0; j < n; j++) {
          pattern[j] += coeffs[i][j];
        }
      }
    }

    const key = parityKey(pattern);
    if (!out.has(key)) out.set(key, new Map());

    const patKey = pattern.join(",");

    if (!out.get(key).has(patKey)) {
      out.get(key).set(patKey, cost);
    } else {
      out.get(key).set(
        patKey,
        Math.min(out.get(key).get(patKey), cost)
      );
    }
  }

  return out;
}

function solveSingle(coeffs, goal) {
  const patterns = buildPatterns(coeffs);
  const memo = new Map();

  function dfs(goal) {
    const key = goal.join(",");
    if (memo.has(key)) return memo.get(key);

    if (goal.every(x => x === 0)) return 0;

    let best = Infinity;
    const parityKey = goal.map(x => x % 2).join(",");

    const bucket = patterns.get(parityKey);
    if (!bucket) return Infinity;

    for (const [pKey, cost] of bucket.entries()) {
      const pattern = pKey.split(",").map(Number);

      let ok = true;
      for (let i = 0; i < goal.length; i++) {
        if (pattern[i] > goal[i]) {
          ok = false;
          break;
        }
      }
      if (!ok) continue;

      const newGoal = goal.map((g, i) => (g - pattern[i]) / 2);
      const sub = dfs(newGoal);
      if (sub !== Infinity) {
        best = Math.min(best, cost + 2 * sub);
      }
    }

    memo.set(key, best);
    return best;
  }

  return dfs(goal);
}

function part2(lines) {
  let total = 0;

  for (const line of lines) {
    const { buttons, joltages } = parseLine(line);
    const n = joltages.length;

    const coeffs = buttons.map(btn =>
      Array.from({ length: n }, (_, i) => btn.includes(i) ? 1 : 0)
    );

    total += solveSingle(coeffs, joltages);
  }

  return total;
}

console.log("Part 1:", part1(lines));
console.log("Part 2:", part2(lines));
