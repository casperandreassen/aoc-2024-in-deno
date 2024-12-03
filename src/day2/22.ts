import { getPuzzleInput } from "../shared/readPuzzleInput.ts";

export async function _22() {
  const data = await getPuzzleInput("./src/day2/input.txt");
  const levels = data.map((s) => s.split(" ").map((v) => Number.parseInt(v)));
  let numberOfValidLevels = 0;

  for (const level of levels) {
    const validLevel = checkLevel(level);
    if (validLevel) {
      numberOfValidLevels++;
    }
  }

  console.log(numberOfValidLevels);
}

function checkLevel(level: number[], removedItem = false): boolean {
  let latestDigit = level[0];
  let validLevel = true;
  const acending = level[0] < level[1];

  for (let i = 1; i < level.length; i++) {
    const diff = Math.abs(latestDigit - level[i]);
    if (acending) {
      if (latestDigit >= level[i] || diff > 3) {
        if (!removedItem) {
          for (let j = 0; j < level.length; j++) {
            const leftArray = Array.from(level);
            leftArray.splice(j, 1);
            const left = checkLevel(leftArray, true);
            if (left) return true;
          }
          return false;
        } else {
          validLevel = false;
          break;
        }
      }
    } else {
      if (latestDigit <= level[i] || diff > 3) {
        if (!removedItem) {
          for (let j = 0; j < level.length; j++) {
            const leftArray = Array.from(level);
            leftArray.splice(j, 1);
            const left = checkLevel(leftArray, true);
            if (left) return left;
          }
          return false;
        } else {
          validLevel = false;
          break;
        }
      }
    }
    latestDigit = level[i];
  }

  return validLevel;
}

if (import.meta.main) {
  _22();
}
