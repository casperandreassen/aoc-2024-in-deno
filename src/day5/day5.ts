import { incrementMap } from "../shared/incrementMap.ts";
import { getPuzzleInput } from "../shared/readPuzzleInput.ts";

/**
 * Creates a topographical ordering based on the ruleset. It filteres out all irrelevant rules in the ruleset, where a irrelevant rule contains a number that does not occur in the printing order.
 *
 * @param values
 * @returns The top order list.
 */
async function get_top_order(values: Set<number>): Promise<number[]> {
  const input = await getPuzzleInput("./src/day5/rules.txt");

  // Build out the dependencies
  const edges = new Map<number, number[]>();
  const in_degree = new Map<number, number>();

  for (const rule of input) {
    const numbers = rule.split("|").map((v) => Number.parseInt(v));

    // Filter out rules that are not relevant for this print.
    if (!numbers.every((n) => values.has(n))) continue;

    if (edges.has(numbers[0])) {
      const pre = edges.get(numbers[0]);
      if (!pre) throw new Error("Could not get edges");
      pre?.push(numbers[1]);
      edges.set(numbers[0], pre);
    } else {
      edges.set(numbers[0], [numbers[1]]);
    }
    if (!in_degree.has(numbers[0])) {
      in_degree.set(numbers[0], 0);
    }

    incrementMap(numbers[1], in_degree);
  }

  const queue = [];
  for (const key of in_degree.keys()) {
    if (in_degree.get(key) == 0) {
      queue.push(key);
    }
  }

  const top_order = [];

  while (queue.length > 0) {
    const node = queue.shift();

    if (node == undefined) throw new Error("No node returned");
    top_order.push(node);

    const node_edges = edges.get(node);

    if (node_edges == undefined) {
      continue;
    }

    for (const neighour of node_edges) {
      const pre = in_degree.get(neighour);
      if (!pre) throw new Error("Could not get in degree of neigbour");
      in_degree.set(neighour, pre - 1);
      if (in_degree.get(neighour) == 0) {
        queue.push(neighour);
      }
    }
  }

  if (top_order.length == in_degree.keys().toArray().length) {
    return top_order;
  } else {
    return [];
  }
}

/**
 * Checks if the list of numbers adheres to the ordering given by top order.
 *
 * @param numbers
 * @param top_oder
 * @returns a boolean indicating if the list is ok.
 */
function check_adherence(numbers: number[], top_oder: number[]) {
  const index_map = new Map(top_oder.map((elm, index) => [elm, index]));

  for (let i = 0; i < numbers.length - 1; i++) {
    // @ts-expect-error this is fine
    if (index_map.get(numbers[i]) > index_map.get(numbers[i + 1])) {
      return false;
    }
  }
  return true;
}

/**
 * Tries to sort the list according to the top oder given.
 *
 * @param top_order
 * @param list
 * @returns the middle number of the list sorted in top order, null otherwise.
 */
function sort_by_topographic_order(
  top_order: number[],
  list: number[]
): number | null {
  // Mapping of value and rank.
  const top_order_index = new Map<number, number>(
    top_order.map((n, idx) => {
      return [n, idx];
    })
  );

  // Create a copy of our list and sort it according to the rank from the top ordering.
  const list_copy = Array.from(list).sort((a: number, b: number) => {
    const a_idx = top_order_index.get(a);
    const b_idx = top_order_index.get(b);
    if (a_idx == undefined || b_idx == undefined)
      throw new Error("Could not get the rank");

    if (a_idx > b_idx) return 1;
    if (b_idx > a_idx) return -1;
    return 0;
  });

  if (check_adherence(list_copy, top_order)) {
    return list_copy[Math.floor(list_copy.length / 2)];
  }
  return null;
}

async function day5() {
  const inputs = await getPuzzleInput("./src/day5/docs.txt");
  const input_list = inputs.map((v) =>
    v.split(",").map((d) => Number.parseInt(d))
  );

  let sum = 0;
  let part_2_sum = 0;
  for (const input of input_list) {
    const top_order = await get_top_order(new Set(input));
    if (top_order.length == 0)
      throw new Error("There was no topographic ordering for the ruleset.");
    if (check_adherence(input, top_order)) {
      sum += input[Math.floor(input.length / 2)];
    } else {
      const value = sort_by_topographic_order(top_order, input);
      if (value) {
        part_2_sum += value;
      }
    }
  }
  console.log(`Part 1 sum is: ${sum}`);
  console.log(`Part 2 sum is: ${part_2_sum}`);
}

if (import.meta.main) {
  day5();
}
