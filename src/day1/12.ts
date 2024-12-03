import { incrementMap } from "../shared/incrementMap.ts";
import { getPuzzleInput } from "../shared/readPuzzleInput.ts";

export async function _12() {
  const data = await getPuzzleInput("./src/day1/input.txt");
  const list1 = [];
  const list2 = [];
  for (const line of data) {
    const lineData = line.split("   ");
    list1.push(Number.parseInt(lineData[0]));
    list2.push(Number.parseInt(lineData[1]));
  }
  list1.sort((a, b) => {
    if (a < b) return -1;
    if (b < a) return 1;
    return 0;
  });
  list2.sort((a, b) => {
    if (a < b) return -1;
    if (b < a) return 1;
    return 0;
  });
  if (list1.length !== list2.length) {
    throw new Error("Lists are not of the same length");
  }

  const multiple = new Map(list1.map((v) => [v, 0]));

  // Slow af, but since there can be multiple binsearch does not work for example.
  for (let i = 0; i < list1.length; i++) {
    for (let j = 0; j < list2.length; j++) {
      if (list1[i] == list2[j]) {
        incrementMap(list1[i], multiple);
      }
    }
  }

  let sum = 0;

  for (let i = 0; i < list1.length; i++) {
    const occurences = multiple.get(list1[i]);

    if (occurences == undefined)
      throw new Error(
        `Could not get the number of occurences for key ${list1[i]}`
      );

    sum += list1[i] * occurences;
  }

  console.log(sum);
}

if (import.meta.main) {
  _12();
}
