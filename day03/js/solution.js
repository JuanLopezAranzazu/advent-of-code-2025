import fs from "fs";

const input = fs
  .readFileSync("../input.txt", "utf-8")
  .trim()
  .split("\n")
  .map((line) => line.trim());

function maxJoltage(line) {
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

function solve(lines) {
  return lines.reduce((sum, line) => sum + maxJoltage(line), 0);
}

console.log("Result:", solve(input));
