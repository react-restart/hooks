import { useEffect } from 'react'
import useEventCallback from './useEventCallback'

type TargetArg<T extends EventTarget = EventTarget> = T | (() => T)

type EnventHandler<T extends EventTarget = EventTarget, E extends Event = Event> =
  | ((this: T, event: E) => void)
  | { handleEvent: (object: E) => void }

// Here can be added other event maps.
type GetEventMap<T> = T extends Window
  ? WindowEventMap
  : T extends Document
  ? DocumentEventMap
  : T extends HTMLElement
  ? HTMLElementEventMap
  : T extends Element
  ? ElementEventMap
  : T extends AbortSignal
  ? AbortSignalEventMap
  : Record<string, Event>

/**
 * Attaches an event handler outside directly to specified DOM element
 * bypassing the react synthetic event system.
 *
 * @param element The target to listen for events on
 * @param event The DOM event name
 * @param listener An event handler
 * @param options  If `boolean` is whether or not to listen during the capture event phase.
 *                 Otherwise are the options for add event listener
 *
 *
 * ```ts
 * useEventListener(
 *   document,
 *   'click',
 *   () => {
 *     console.log('You clicked the document')
 *   }
 * )
 * ```
 */
export default function useEventListener<
  T extends EventTarget,
  EventType extends keyof GetEventMap<T>
>(
  eventTarget: TargetArg<T>,
  event: EventType,
  listener: EnventHandler<T, GetEventMap<T>[EventType]>,
  options?: boolean | AddEventListenerOptions,
): void
export default function useEventListener(
  eventTarget: TargetArg,
  event: string,
  listener: EnventHandler,
  options: boolean | AddEventListenerOptions = false,
): void {
  const handler = useEventCallback(function (this: EventTarget, event: Event) {
    if (typeof listener === 'function') {
      listener.call(this, event)
    } else {
      listener.handleEvent.call(this, event)
    }
  })

  useEffect(() => {
    const target =
      typeof eventTarget === 'function' ? eventTarget() : eventTarget

    target.addEventListener(event, handler, options)
    return () => target.removeEventListener(event, handler, options)
  }, [eventTarget])
}
