import fs from "fs";

const input = fs.readFileSync("../input.txt", "utf-8").trim().split("\n");

function part1(rotations) {
  let pos = 50;
  let count = 0;

  for (const r of rotations) {
    const dir = r[0];
    const value = parseInt(r.slice(1), 10);

    if (dir === "R") {
      pos = (pos + value) % 100;
    } else {
      pos = (pos - value + 100) % 100;
    }

    if (pos === 0) count++;
  }

  return count;
}

function part2(rotations) {
  let pos = 50;
  let count = 0;

  for (const r of rotations) {
    const dir = r[0];
    const steps = parseInt(r.slice(1), 10);

    for (let i = 0; i < steps; i++) {
      if (dir === "R") {
        pos = (pos + 1) % 100;
      } else {
        pos = (pos - 1 + 100) % 100;
      }

      if (pos === 0) count++;
    }
  }

  return count;
}

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));

