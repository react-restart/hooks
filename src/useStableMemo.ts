import { useCommittedRef } from '.'
import { DependencyList, useMemo, useState, useRef, useEffect } from 'react'

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

export default function useStableMemo<T>(
  factory: () => T,
  deps?: DependencyList
): T {
  let isValid: boolean = true

  const valueRef = useRef<DepsCache<T>>()
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

  useEffect(() => {
    valueRef.current = cache
  })

  return cache.result
}
