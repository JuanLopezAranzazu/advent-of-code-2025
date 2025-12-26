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

function part1(ranges, ids) {
  return ids.filter(id => isFresh(id, ranges)).length;
}

function part2(ranges) {
  ranges.sort((a, b) => a[0] - b[0]);

  let total = 0;
  let [curStart, curEnd] = ranges[0];

  for (let i = 1; i < ranges.length; i++) {
    const [start, end] = ranges[i];

    if (start <= curEnd + 1) {
      curEnd = Math.max(curEnd, end);
    } else {
      total += curEnd - curStart + 1;
      [curStart, curEnd] = [start, end];
    }
  }

  total += curEnd - curStart + 1;

  return total;
}

console.log("Part 1:", part1(ranges, ids));
console.log("Part 2:", part2(ranges));
