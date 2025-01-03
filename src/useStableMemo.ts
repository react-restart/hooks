import { DependencyList, useRef } from 'react'

function isEqual(a: DependencyList, b: DependencyList) {
  if (a.length !== b.length) return false

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false
    }
  }
  return true
}

type DepsCache<T> = {
  deps?: DependencyList
  result: T
}

/**
 * Identical to `useMemo` _except_ that it provides a semantic guarantee that
 * values will not be invalidated unless the dependencies change. This is unlike
 * the built in `useMemo` which may discard memoized values for performance reasons.
 *
 * @param factory A function that returns a value to be memoized
 * @param deps A dependency array
 */
export default function useStableMemo<T>(
  factory: () => T,
  deps?: DependencyList,
): T {
  let isValid: boolean = true

  const valueRef = useRef<DepsCache<T>>(undefined)
  // initial hook call
  if (!valueRef.current) {
    valueRef.current = {
      deps,
      result: factory(),
    }
    // subsequent calls
  } else {
    isValid = !!(
      deps &&
      valueRef.current.deps &&
      isEqual(deps, valueRef.current.deps)
    )
  }

  const cache = isValid ? valueRef.current : { deps, result: factory() }
  // must update immediately so any sync renders here don't cause an infinite loop
  valueRef.current = cache

  return cache.result
}
