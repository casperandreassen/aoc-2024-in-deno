import { getPuzzleInput } from "../shared/readPuzzleInput.ts";

const valid = ["XMAS", "SAMX"];

/**
 * Searches horisontally
 *
 * @param i
 * @param j
 * @param input
 * @param dir -1 for backwards and 1 for forwards
 * @returns number of valid xmas.
 */
function searchHorizontal(i: number, j: number, input: string[], dir: -1 | 1) {
  let str = "";
  let counter = 0;
  while (counter < 4) {
    try {
      str += input[i][j];
    } catch (error) {
      console.error(error);
    }
    j += dir;
    counter++;
  }
  return valid.includes(str) ? 1 : 0;
}

/**
 * Searches vertically either upwards or downwards
 *
 * @param i
 * @param j
 * @param input
 * @param dir -1 for upwards and 1 for downwards
 * @returns the number of XMAS occurences in the search.
 */
function searchVertical(
  i: number,
  j: number,
  input: string[],
  dir: -1 | 1
): number {
  let strLeft = "";
  let strVert = "";
  let strRight = "";
  let counter = 0;
  while (counter < 4) {
    try {
      const leftValue = input[i][j - counter];
      if (leftValue) {
        strLeft += leftValue;
      }
    } catch (error) {
      console.error(error);
    }

    try {
      const vertValue = input[i][j];
      if (vertValue) {
        strVert += vertValue;
      }
    } catch (error) {
      console.error(error);
    }

    try {
      const rightValue = input[i][j + counter];
      if (rightValue) {
        strRight += rightValue;
      }
    } catch (error) {
      console.error(error);
    }

    i += dir;
    counter++;
  }
  let rightCount = 0;
  if (valid.includes(strLeft)) rightCount++;
  if (valid.includes(strRight)) rightCount++;
  if (valid.includes(strVert)) rightCount++;
  return rightCount;
}

export async function _41() {
  const input = await getPuzzleInput("./src/day4/input.txt");
  let numberOfXmas = 0;

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] == "X") {
        const backwards = searchHorizontal(i, j, input, -1);
        const forwards = searchHorizontal(i, j, input, 1);
        const diagUp = searchVertical(i, j, input, -1);
        const diagDown = searchVertical(i, j, input, 1);
        numberOfXmas += backwards + forwards + diagUp + diagDown;
      }
    }
  }

  console.log(numberOfXmas);
}

if (import.meta.main) {
  _41();
}
