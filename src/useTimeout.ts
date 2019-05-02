import { useRef } from 'react'
import useWillUnmount from './useWillUnmount'
import useMounted from './useMounted'

/**
 * Returns a controller object for setting a timeout that is properly cleaned up
 * once the component unmounts. New timeouts cancel and replace existing ones.
 */
export default function useTimeout() {
  const isMounted = useMounted()
  const handle = useRef<number | undefined>()

  const clear = () => clearTimeout(handle.current)

  useWillUnmount(clear)

  return {
    set(fn: () => void, ms?: number) {
      if (!isMounted()) return

      clear()
      handle.current = setTimeout(fn, ms)
    },
    clear,
  }
}
