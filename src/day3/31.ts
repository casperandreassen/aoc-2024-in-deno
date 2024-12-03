import { getPuzzleString } from "../shared/readPuzzleInput.ts";

export async function _31() {
  const input = await getPuzzleString("./src/day3/input.txt");
  const regex = new RegExp(
    "mul\\(\\d{1,3},\\d{1,3}\\)|don't\\(\\)|do\\(\\)",
    "g"
  ); // Using new RegExp constructor
  const operations = input.match(regex);
  if (!operations) throw new Error("Could not match any operations.");
  let sum = 0;
  let disabled = false;
  for (const operation of operations) {
    if (operation === "do()") {
      disabled = false;
      continue;
    }
    if (operation === "don't()") {
      disabled = true;
      continue;
    }

    if (disabled) continue;
    const digits = operation
      .match(new RegExp("\\d{1,3}", "g"))
      ?.map((v) => Number.parseInt(v));

    if (!digits || digits.length !== 2) throw new Error("Parse error");
    sum += digits[0] * digits[1];
  }

  console.log(sum);
}

if (import.meta.main) {
  _31();
}
