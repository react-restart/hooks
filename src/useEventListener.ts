import { useEffect, useCallback } from 'react'

import useEventCallback from './useEventCallback'

type EventHandler<T, K extends keyof DocumentEventMap> = (
  this: T,
  ev: DocumentEventMap[K]
) => any

/**
 * Attaches an event handler outside directly to specified DOM element
 * bypassing the react synthetic event system.
 *
 * @param element The target to listen for events on
 * @param event The DOM event name
 * @param handler An event handler
 * @param capture Whether or not to listen during the capture event phase
 */
export default function useEventListener<
  T extends Element | Document | Window,
  K extends keyof DocumentEventMap
>(
  element: T,
  event: K,
  listener: EventHandler<T, K>,
  capture: boolean = false
) {
  const handler = useEventCallback(listener)

  useEffect(() => {
    element.addEventListener(event, handler, capture)
    return () => element.removeEventListener(event, handler, capture)
  }, [])
}
