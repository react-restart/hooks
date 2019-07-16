import { useEffect } from 'react'
import useCommittedRef from './useCommittedRef'

/**
 * Creates a `setInterval` that is properly cleaned up when a component unmounted
 *
 * @param fn an function run on each interval
 * @param ms The milliseconds duration of the interval
 */
function useInterval(fn: () => void, ms: number): void
/**
 * Creates a pasuable `setInterval` that is properly cleaned up when a component unmounted
 *
 * @param fn an function run on each interval
 * @param ms The milliseconds duration of the interval
 * @param paused Whether or not the interval is currently running
 */
function useInterval(fn: () => void, ms: number, paused: boolean): void
function useInterval(
  fn: () => void,
  ms: number,
  paused: boolean = false
): void {
  let handle: number
  const fnRef = useCommittedRef(fn)
  // this ref is necessary b/c useEffect will sometimes miss a paused toggle
  // orphaning a setTimeout chain in the aether, so relying on it's refresh logic is not reliable.
  const pausedRef = useCommittedRef(paused)
  const tick = () => {
    if (pausedRef.current) return
    fnRef.current()
    schedule() // eslint-disable-line no-use-before-define
  }

  const schedule = () => {
    clearTimeout(handle)
    handle = setTimeout(tick, ms) as any
  }

  useEffect(() => {
    schedule()
    return () => clearTimeout(handle)
  }, [paused])
}

export default useInterval
