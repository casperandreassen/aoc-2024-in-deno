/**
 * Returns the puzzle input line by line in an array.
 *
 * @param path Path of the file to read from the repository root.
 * @returns and array of lines.
 */
export async function getPuzzleInput(path: string): Promise<string[]> {
  const realPath = await Deno.realPath(path);
  const input = await Deno.readTextFile(realPath);
  return input.split("\n");
}
