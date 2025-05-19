/**
 * Utility to get an item from localStorage.
 * @param key - The key of the item to retrieve.
 * @returns The parsed value or null if not found.
 */
export const getFromLocalStorage = (key: string): any => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

/**
 * Utility to set an item in localStorage.
 * @param key - The key of the item to store.
 * @param value - The value to store.
 */
export const setInLocalStorage = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * Utility to remove an item from localStorage.
 * @param key - The key of the item to remove.
 */
export const removeFromLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};