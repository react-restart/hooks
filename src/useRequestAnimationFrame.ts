import { useRef } from 'react'
import useWillUnmount from './useWillUnmount'
import useMounted from './useMounted'

/**
 * Returns a controller object for setting a timeout that is properly cleaned up
 * once the component unmounts. New timeouts cancel and replace existing ones.
 */
export default function useRequestAnimationFrame() {
  const isMounted = useMounted()
  const handle = useRef<number | undefined>()

  const cancel = () => {
    if (handle.current != null) {
      cancelAnimationFrame(handle.current)
    }
  }

  useWillUnmount(cancel)

  return {
    request(fn: FrameRequestCallback) {
      if (!isMounted()) return

      cancel()
      handle.current = requestAnimationFrame(fn)
    },
    cancel,
  }
}
