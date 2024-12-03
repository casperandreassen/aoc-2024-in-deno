/**
 * Increment the key of a map. Sets it to one if the key does not exists.
 *
 * @param key The key to increment
 * @param map
 */
export function incrementMap<T>(key: T, map: Map<T, number>) {
  if (map.has(key)) {
    const originalValue = map.get(key);
    if (originalValue == undefined) {
      throw new Error("Could not get value of key.");
    }
    map.set(key, originalValue + 1);
  } else {
    map.set(key, 1); // Initialize with 1 if it's the first time
  }
}
