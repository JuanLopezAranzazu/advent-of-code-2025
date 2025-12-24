import fs from "fs";

const input = fs.readFileSync("../input.txt", "utf-8").trim();

function isInvalidPart1(n) {
  const s = n.toString();
  if (s.length % 2 !== 0) return false;

  const half = s.length / 2;
  return s.slice(0, half) === s.slice(half);
}

function isInvalidPart2(n) {
  const s = n.toString();
  const L = s.length;

  for (let size = 1; size <= L / 2; size++) {
    if (L % size !== 0) continue;

    const pattern = s.slice(0, size);
    if (pattern.repeat(L / size) === s) {
      return true;
    }
  }
  return false;
}

function solve(input, isInvalid) {
  let sum = 0;
  const ranges = input.split(",");

  for (const r of ranges) {
    const [start, end] = r.split("-").map(Number);

    for (let n = start; n <= end; n++) {
      if (isInvalid(n)) {
        sum += n;
      }
    }
  }

  return sum;
}

function part1(input) {
  return solve(input, isInvalidPart1);
}

function part2(input) {
  return solve(input, isInvalidPart2);
}

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
