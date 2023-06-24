import { isPlainObject, mapValues, forEach } from 'lodash-es';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DeepMapValue = any;

export function deepMap<C, T, R = T>(
  object: T,
  iteratee: (this: C | undefined, value: T[keyof T], keyPath: string[], object: T) => DeepMapValue,
  options?: { context?: C; iterateCollections?: boolean; iteratePrimitives?: boolean }
): R {
  const { context, iterateCollections = true, iteratePrimitives = true } = options || {};

  function _mapDeep(value: DeepMapValue, keyPath: string[]) {
    const invokeIteratee = isPlainObject(value) || Array.isArray(value) ? iterateCollections : iteratePrimitives;
    if (invokeIteratee) {
      value = iteratee.call(context, value, keyPath, object);
    }
    if (isPlainObject(value)) {
      value = mapValues(value, (val, key) => _mapDeep(val, keyPath?.concat(key) ?? [key]));
    } else if (Array.isArray(value)) {
      value = value.map((val, key) => _mapDeep(val, keyPath?.concat(key.toString()) ?? [key.toString()]));
    }
    return value;
  }

  return _mapDeep(object, []);
}

export function deepForEach<T extends object>(object: T, iteratee: (value: unknown, key: string) => void | boolean): boolean {
  let processed = true;

  forEach(object, (v, k) => {
    let res = iteratee(v, k);
    if (res === false) {
      processed = false;
      return false;
    }

    if (v && (Array.isArray(v) || (typeof v === 'object' && !(v instanceof Date)))) {
      res = deepForEach(v, iteratee);
      if (res === false) {
        return false;
      }
    }
  });

  return processed;
}
