import { getPuzzleInput } from "../shared/readPuzzleInput.ts";

export async function _21() {
  const data = await getPuzzleInput("./src/day2/input.txt");
  const levels = data.map((s) => s.split(" ").map((v) => Number.parseInt(v)));
  let numberOfValidLevels = 0;

  for (const level of levels) {
    let latestDigit = level[0];
    let validLevel = true;
    const acending = level[0] < level[1];
    for (let i = 1; i < level.length; i++) {
      const diff = Math.abs(latestDigit - level[i]);
      if (acending) {
        if (latestDigit >= level[i] || diff > 3) {
          validLevel = false;
          break;
        }
      } else {
        if (latestDigit <= level[i] || diff > 3) {
          validLevel = false;
          break;
        }
      }
      latestDigit = level[i];
    }
    if (validLevel) {
      numberOfValidLevels++;
    }
  }

  console.log(numberOfValidLevels);
}

if (import.meta.main) {
  _21();
}
