import fs from "fs";

const input = fs.readFileSync("../input.txt", "utf-8").trimEnd();
const [rangesBlock, idsBlock] = input.split(/\r?\n\s*\r?\n/);

const ranges = rangesBlock
  .split("\n")
  .map(line => line.split("-").map(Number));

const ids = idsBlock
  .split("\n")
  .map(Number);

function isFresh(id, ranges) {
  return ranges.some(([start, end]) => id >= start && id <= end);
}

function solve(ranges, ids) {
  return ids.filter(id => isFresh(id, ranges)).length;
}

console.log("Result:", solve(ranges, ids));
