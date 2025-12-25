import fs from "fs";

const input = fs
  .readFileSync("../input.txt", "utf-8")
  .trim()
  .split("\n")
  .map((line) => line.trim());

function maxJoltagePart1(line) {
  const digits = line.split("").map(Number);
  let best = 0;

  for (let i = 0; i < digits.length - 1; i++) {
    let maxRight = 0;

    for (let j = i + 1; j < digits.length; j++) {
      maxRight = Math.max(maxRight, digits[j]);
    }

    best = Math.max(best, digits[i] * 10 + maxRight);
  }

  return best;
}

function maxJoltagePart2(line, k = 12) {
  const digits = line.split("").map(Number);
  const stack = [];
  let toRemove = digits.length - k;

  for (const d of digits) {
    while (stack.length > 0 && toRemove > 0 && stack[stack.length - 1] < d) {
      stack.pop();
      toRemove--;
    }
    stack.push(d);
  }

  return Number(stack.slice(0, k).join(""));
}

function solve(lines, maxJoltage) {
  return lines.reduce((sum, line) => sum + maxJoltage(line), 0);
}

function part1(lines) {
  return solve(lines, maxJoltagePart1);
}

function part2(lines) {
  return solve(lines, maxJoltagePart2);
}

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
