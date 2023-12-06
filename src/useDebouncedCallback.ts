import { useCallback, useMemo, useRef } from 'react'
import useTimeout from './useTimeout'
import useMounted from './useMounted'

export interface UseDebouncedCallbackOptions {
  wait: number
  leading?: boolean
  trailing?: boolean
  maxWait?: number
}

export interface UseDebouncedCallbackOptionsLeading
  extends UseDebouncedCallbackOptions {
  leading: true
}

/**
 * Creates a debounced function that will invoke the input function after the
 * specified wait.
 *
 * @param fn a function that will be debounced
 * @param waitOrOptions a wait in milliseconds or a debounce configuration
 */
function useDebouncedCallback<TCallback extends (...args: any[]) => any>(
  fn: TCallback,
  options: UseDebouncedCallbackOptionsLeading,
): (...args: Parameters<TCallback>) => ReturnType<TCallback>

/**
 * Creates a debounced function that will invoke the input function after the
 * specified wait.
 *
 * @param fn a function that will be debounced
 * @param waitOrOptions a wait in milliseconds or a debounce configuration
 */
function useDebouncedCallback<TCallback extends (...args: any[]) => any>(
  fn: TCallback,
  waitOrOptions: number | UseDebouncedCallbackOptions,
): (...args: Parameters<TCallback>) => ReturnType<TCallback> | undefined

function useDebouncedCallback<TCallback extends (...args: any[]) => any>(
  fn: TCallback,
  waitOrOptions: number | UseDebouncedCallbackOptions,
): (...args: Parameters<TCallback>) => ReturnType<TCallback> | undefined {
  const lastCallTimeRef = useRef<number | null>(null)
  const lastInvokeTimeRef = useRef(0)
  const returnValueRef = useRef<ReturnType<TCallback>>()

  const isTimerSetRef = useRef(false)
  const lastArgsRef = useRef<unknown[] | null>(null)

  const {
    wait,
    maxWait,
    leading = false,
    trailing = true,
  } = typeof waitOrOptions === 'number'
    ? ({ wait: waitOrOptions } as UseDebouncedCallbackOptions)
    : waitOrOptions

  const timeout = useTimeout()

  return useMemo(() => {
    const hasMaxWait = !!maxWait

    function leadingEdge(time: number) {
      // Reset any `maxWait` timer.
      lastInvokeTimeRef.current = time

      // Start the timer for the trailing edge.
      isTimerSetRef.current = true
      timeout.set(timerExpired, wait)

      if (!leading) {
        return returnValueRef.current
      }

      return invokeFunc(time)
    }

    function trailingEdge(time: number) {
      isTimerSetRef.current = false

      // Only invoke if we have `lastArgs` which means `func` has been
      // debounced at least once.
      if (trailing && lastArgsRef.current) {
        return invokeFunc(time)
      }

      lastArgsRef.current = null
      return returnValueRef.current
    }

    function timerExpired() {
      var time = Date.now()

      if (shouldInvoke(time)) {
        return trailingEdge(time)
      }

      const timeSinceLastCall = time - (lastCallTimeRef.current ?? 0)
      const timeSinceLastInvoke = time - lastInvokeTimeRef.current
      const timeWaiting = wait - timeSinceLastCall

      // Restart the timer.
      timeout.set(
        timerExpired,
        hasMaxWait
          ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
          : timeWaiting,
      )
    }

    function invokeFunc(time: number) {
      const args = lastArgsRef.current ?? []

      lastArgsRef.current = null
      lastInvokeTimeRef.current = time

      const retValue = fn(...args)
      returnValueRef.current = retValue
      return retValue
    }

    function shouldInvoke(time: number) {
      const timeSinceLastCall = time - (lastCallTimeRef.current ?? 0)
      const timeSinceLastInvoke = time - lastInvokeTimeRef.current

      // Either this is the first call, activity has stopped and we're at the
      // trailing edge, the system time has gone backwards and we're treating
      // it as the trailing edge, or we've hit the `maxWait` limit.
      return (
        lastCallTimeRef.current === null ||
        timeSinceLastCall >= wait ||
        timeSinceLastCall < 0 ||
        (hasMaxWait && timeSinceLastInvoke >= maxWait)
      )
    }

    return (...args: any[]) => {
      const time = Date.now()
      const isInvoking = shouldInvoke(time)

      lastArgsRef.current = args
      lastCallTimeRef.current = time

      if (isInvoking) {
        if (!isTimerSetRef.current) {
          return leadingEdge(lastCallTimeRef.current)
        }

        if (hasMaxWait) {
          // Handle invocations in a tight loop.
          isTimerSetRef.current = true
          setTimeout(timerExpired, wait)
          return invokeFunc(lastCallTimeRef.current)
        }
      }

      if (!isTimerSetRef.current) {
        isTimerSetRef.current = true
        setTimeout(timerExpired, wait)
      }

      return returnValueRef.current
    }
  }, [fn, wait, maxWait, leading, trailing])
}

export default useDebouncedCallback
