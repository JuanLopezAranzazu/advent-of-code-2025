const fs = require("fs");

const lines = fs.readFileSync("../input.txt", "utf8").trim().split("\n");

function parseLine(line) {
  const diagram = line.match(/\[([.#]+)\]/)[1];

  const buttons = [];
  const matches = line.matchAll(/\(([^)]*)\)/g);
  for (const m of matches) {
    if (m[1].trim() === "") continue;
    buttons.push(m[1].split(",").map(Number));
  }

  return { diagram, buttons };
}

function minPresses(target, buttons) {
  const m = buttons.length;
  let best = Infinity;

  for (let mask = 0; mask < 1 << m; mask++) {
    let cur = 0;
    let presses = 0;

    for (let i = 0; i < m; i++) {
      if (mask & (1 << i)) {
        cur ^= buttons[i];
        presses++;
        if (presses >= best) break;
      }
    }

    if (cur === target) {
      best = Math.min(best, presses);
    }
  }

  return best;
}

function solve(lines) {
  let total = 0;

  for (const line of lines) {
    const { diagram, buttons } = parseLine(line);

    let target = 0;
    for (let i = 0; i < diagram.length; i++) {
      if (diagram[i] === "#") target |= 1 << i;
    }

    const buttonMasks = buttons.map((btn) => {
      let mask = 0;
      for (const i of btn) mask |= 1 << i;
      return mask;
    });

    total += minPresses(target, buttonMasks);
  }

  return total;
}

console.log("Result:", solve(lines));
