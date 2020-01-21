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

/**
 * Returns a controller object for setting a timeout that is properly cleaned up
 * once the component unmounts. New timeouts cancel and replace existing ones.
 */
export default function useTimeout() {
  const isMounted = useMounted()
  // types are confused between node and web here IDK
  const handle = useRef<any>()

  useWillUnmount(() => clearTimeout(handle.current))

  return useMemo(() => {
    const clear = () => clearTimeout(handle.current)

    function set(fn: () => void, ms = 0): void {
      if (!isMounted()) return
      const maxAt = Date.now() + MAX_DELAY_MS
      const leftMs = ms - MAX_DELAY_MS

      clear()
      handle.current =
        ms > MAX_DELAY_MS
          ? setTimeout(
              () => set(fn, leftMs - (Date.now() - maxAt)),
              MAX_DELAY_MS,
            )
          : setTimeout(fn, ms)
    }

    return {
      set,
      clear,
    }
  }, [])
}
