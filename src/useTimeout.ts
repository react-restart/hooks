import { useMemo, useRef } from 'react'
import useMounted from './useMounted'
import useWillUnmount from './useWillUnmount'

/*
 * Browsers including Internet Explorer, Chrome, Safari, and Firefox store the
 * delay as a 32-bit signed integer internally. This causes an integer overflow
 * when using delays larger than 2,147,483,647 ms (about 24.8 days),
 * resulting in the timeout being executed immediately.
 *
 * via: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
 */
const MAX_DELAY_MS = 2 ** 31 - 1

function setChainedTimeout(handleRef, fn, timeoutAtMs) {
  const delayMs = timeoutAtMs - Date.now()

  handleRef.current =
    delayMs <= MAX_DELAY_MS
      ? setTimeout(fn, delayMs)
      : setTimeout(
          () => setChainedTimeout(handleRef, fn, timeoutAtMs),
          MAX_DELAY_MS,
        )
}

/**
 * Returns a controller object for setting a timeout that is properly cleaned up
 * once the component unmounts. New timeouts cancel and replace existing ones.
 */
export default function useTimeout() {
  const isMounted = useMounted()

  // types are confused between node and web here IDK
  const handleRef = useRef<any>()

  useWillUnmount(() => clearTimeout(handleRef.current))

  return useMemo(() => {
    const clear = () => clearTimeout(handleRef.current)

    function set(fn: () => void, delayMs = 0): void {
      if (!isMounted()) return

      clear()

      if (delayMs <= MAX_DELAY_MS) {
        // For simplicity, if the timeout is short, just set a normal timeout.
        handleRef.current = setTimeout(fn, delayMs)
      } else {
        setChainedTimeout(handleRef, fn, Date.now() + delayMs)
      }

    }

    return {
      set,
      clear,
    }
  }, [])
}
