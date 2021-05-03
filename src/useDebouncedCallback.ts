import { useCallback } from 'react'
import useTimeout from './useTimeout'

/**
 * Creates a debounced function that will invoke the input function after the
 * specified delay.
 *
 * @param fn a function that will be debounced
 * @param delay The milliseconds delay before invoking the function
 */
export default function useDebouncedCallback<
  TCallback extends (...args: any[]) => any
>(fn: TCallback, delay: number): TCallback {
  const timeout = useTimeout()
  return useCallback(
    (...args: any[]) => {
      timeout.set(() => {
        fn(...args)
      }, delay)
    },
    [fn, delay],
  ) as any
}
