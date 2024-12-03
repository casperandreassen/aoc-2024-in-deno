import { getPuzzleInput } from "../shared/readPuzzleInput.ts";

export async function _11() {
  const data = await getPuzzleInput("./src/day1/input.txt");
  const list1 = [];
  const list2 = [];
  for (const line of data) {
    const lineData = line.split("   ");
    list1.push(Number.parseInt(lineData[0]));
    list2.push(Number.parseInt(lineData[1]));
  }

  list1.sort((a, b) => {
    if (a < b) return 1;
    if (b < a) return -1;
    return 0;
  });
  list2.sort((a, b) => {
    if (a < b) return 1;
    if (b < a) return -1;
    return 0;
  });
  if (list1.length !== list2.length) {
    throw new Error("Lists are not of the same length");
  }

  let sum = 0;

  for (let i = 0; i < list1.length; i++) {
    sum += Math.abs(list1[i] - list2[i]);
  }

  console.log(sum);
}

if (import.meta.main) {
  _11();
}
