import { useEffect } from 'react'

import useCommittedRef from './useCommittedRef'

function useRafInterval(fn: () => void, ms: number): void
function useRafInterval(
  fn: () => void,
  ms: number,
  paused: boolean = false,
): void {
  let handle: number
  let start = new Date().getTime()

  const fnRef = useCommittedRef(fn)
  // this ref is necessary b/c useEffect will sometimes miss a paused toggle
  // orphaning a setTimeout chain in the aether, so relying on it's refresh logic is not reliable.
  const pausedRef = useCommittedRef(paused)

  function loop() {
    const current = new Date().getTime()
    const delta = current - start

    if (pausedRef.current) return

    if (delta >= ms && fnRef.current) {
      fnRef.current()
      start = new Date().getTime()
    }

    cancelAnimationFrame(handle)
    handle = requestAnimationFrame(loop)
  }

  useEffect(() => {
    handle = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(handle)
  }, [])
}

export default useRafInterval
