import { useRef, useEffect } from 'react'

/**
 * Track whether a component is current mounted. Generally less preferable than
 * properlly canceling effects so they don't run after a component is unmounted,
 * but helpful in cases where that isn't feasible, such as a `Promise` resolution.
 *
 * @returns a function that returns the current isMounted state of the component
 */
export default function useMounted() {
  const mounted = useRef(true)
  useEffect(
    () => () => {
      mounted.current = false
    },
    []
  )
  return () => mounted.current
}
