/**
 * Uses binary search to find the index of a element in a list sorted in ascending order.
 *
 * @param list The list to search
 * @param element The element to search for
 * @returns The index of the element of null if not found
 */
export function findElementInSortedList(
  list: number[],
  element: number,
  start: number,
  end: number
): number | null {
  if (end <= start) return null;

  const middle = Math.floor((end - start) / 2);

  if (element == list[middle]) {
    return middle;
  }

  if (list[middle] > element)
    return findElementInSortedList(list, element, start, middle - 1);
  return findElementInSortedList(list, element, middle + 1, end);
}
