import fs from "fs";

const input = fs.readFileSync("../input.txt", "utf-8").trim().split("\n");

function solve(rotations) {
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

console.log("Password:", solve(input));
