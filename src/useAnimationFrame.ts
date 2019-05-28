import { useRef } from 'react'
import useWillUnmount from './useWillUnmount'
import useMounted from './useMounted'

/**
 * Returns a controller object for requesting and cancelling an animation freame that is properly cleaned up
 * once the component unmounts. New requests cancel and replace existing ones.
 */
export default function useAnimationFrame() {
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
