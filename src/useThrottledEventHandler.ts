import { useRef, SyntheticEvent } from 'react'
import useMounted from './useMounted'
import useEventCallback from './useEventCallback'

const isSyntheticEvent = (event: any): event is SyntheticEvent =>
  typeof event.persist === 'function'

export type ThrottledHandler<TEvent> = ((event: TEvent) => void) & {
  clear(): void
}

/**
 * Creates a event handler function throttled by `requestAnimationFrame` that
 * returns the **most recent** event. Useful for noisy events that update react state.
 *
 * ```tsx
 * function Component() {
 *   const [position, setPosition] = useState();
 *   const handleMove = useThrottledEventHandler<React.PointerEvent>(
 *     (event) => {
 *       setPosition({
 *         top: event.clientX,
 *         left: event.clientY,
 *       })
 *     }
 *   )
 *
 *   return (
 *     <div onPointerMove={handleMove}>
 *        <div style={position} />
 *     </div>
 *   );
 * }
 * ```
 *
 * @param handler An event handler function
 * @typeParam TEvent The event object passed to the handler function
 * @returns The event handler with a `clear` method attached for clearing any in-flight handler calls
 *
 */
export default function useThrottledEventHandler<TEvent = SyntheticEvent>(
  handler: (event: TEvent) => void,
): ThrottledHandler<TEvent> {
  const isMounted = useMounted()
  const eventHandler = useEventCallback(handler)

  const nextEventInfoRef = useRef<{
    event: TEvent | null
    handle: null | number
  }>({
    event: null,
    handle: null,
  })

  const clear = () => {
    cancelAnimationFrame(nextEventInfoRef.current.handle!)
    nextEventInfoRef.current.handle = null
  }

  const handlePointerMoveAnimation = () => {
    const { current: next } = nextEventInfoRef

    if (next.handle && next.event) {
      if (isMounted()) {
        next.handle = null
        eventHandler(next.event)
      }
    }
    next.event = null
  }

  const throttledHandler = (event: TEvent) => {
    if (!isMounted()) return

    if (isSyntheticEvent(event)) {
      event.persist()
    }
    // Special handling for a React.Konva event which reuses the
    // event object as it bubbles, setting target
    else if ('evt' in event) {
      event = { ...event }
    }

    nextEventInfoRef.current.event = event
    if (!nextEventInfoRef.current.handle) {
      nextEventInfoRef.current.handle = requestAnimationFrame(
        handlePointerMoveAnimation,
      )
    }
  }

  throttledHandler.clear = clear

  return throttledHandler
}
