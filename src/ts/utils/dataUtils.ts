// Utility functions for working with arrays

/**
 * Returns the first element of an array, or throws if the array is empty.
 */
export function first<T>(arr: T[]): T {
  if (arr.length === 0) throw new Error("Array is empty");
  return arr[0]!;
}

/**
 * Returns the element at the given index, or throws if out of bounds.
 */
export function atIndex<T>(arr: T[], index: number): T {
  if (index < 0 || index >= arr.length) throw new Error("Index out of bounds");
  return arr[index]!;
}

/**
 * Deep copy of any object provided
 */
export function deepCopy<T, U = T extends Array<infer V> ? V : never>(source: T): T {
  if (Array.isArray(source)) {
    return source.map((item) => deepCopy(item)) as T & U[];
  }
  if (source instanceof Date) {
    return new Date(source.getTime()) as T & Date;
  }
  if (source && typeof source === "object") {
    return (Object.getOwnPropertyNames(source) as (keyof T)[]).reduce<T>((o, prop) => {
      Object.defineProperty(o, prop, Object.getOwnPropertyDescriptor(source, prop)!);
      o[prop] = deepCopy(source[prop]);
      return o;
    }, Object.create(Object.getPrototypeOf(source)));
  }
  return source;
}
