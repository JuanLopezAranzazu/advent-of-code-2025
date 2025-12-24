import fs from "fs";

const input = fs.readFileSync("../input.txt", "utf-8").trim();

function isInvalidID(n) {
  const s = n.toString();
  const len = s.length;

  if (len % 2 !== 0) return false;

  const half = len / 2;
  return s.slice(0, half) === s.slice(half);
}

function solve(input) {
  let sum = 0;
  const ranges = input.split(",");

  for (const r of ranges) {
    const [start, end] = r.split("-").map(Number);

    for (let n = start; n <= end; n++) {
      if (isInvalidID(n)) {
        sum += n;
      }
    }
  }

  return sum;
}

console.log("Result:", solve(input));
