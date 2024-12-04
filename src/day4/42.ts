import { getPuzzleInput } from "../shared/readPuzzleInput.ts";

const valid = ["MAS", "SAM"];

/**
 * Checks for MAS by starting left up and left down.
 */
function checkForMas(i: number, j: number, input: string[]) {
  let counter = 0;
  let left = "";
  let right = "";
  let h = i + 2;
  while (counter < 3) {
    try {
      const leftValue = input[i][j];
      if (leftValue) {
        left += leftValue;
      }
    } catch (error) {
      console.error(error);
    }

    try {
      const rightValue = input[h][j];
      if (rightValue) {
        right += rightValue;
      }
    } catch (error) {
      console.error(error);
    }

    h--;
    i++;
    j++;
    counter++;
  }

  if (valid.includes(left) && valid.includes(right)) {
    return 1;
  }
  return 0;
}

export async function _41() {
  const input = await getPuzzleInput("./src/day4/input.txt");
  let numberOfXmas = 0;

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] == "M" || input[i][j] == "S") {
        numberOfXmas += checkForMas(i, j, input);
      }
    }
  }

  console.log(numberOfXmas);
}

if (import.meta.main) {
  _41();
}
