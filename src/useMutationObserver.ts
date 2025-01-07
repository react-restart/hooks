import useCustomEffect from './useCustomEffect.js'
import { dequal } from 'dequal'
import useImmediateUpdateEffect from './useImmediateUpdateEffect.js'
import useEventCallback from './useEventCallback.js'
import { useState } from 'react'

type Deps = [Element | null | undefined, MutationObserverInit]

function isDepsEqual(
  [nextElement, nextConfig]: Deps,
  [prevElement, prevConfig]: Deps,
) {
  return nextElement === prevElement && dequal(nextConfig, prevConfig)
}

/**
 * Observe mutations on a DOM node or tree of DOM nodes.
 * Depends on the `MutationObserver` api.
 *
 * ```tsx
 * const [element, attachRef] = useCallbackRef(null);
 *
 * useMutationObserver(element, { subtree: true }, (records) => {
 *
 * });
 *
 * return (
 *   <div ref={attachRef} />
 * )
 * ```
 *
 * @param element The DOM element to observe
 * @param config The observer configuration
 * @param callback A callback fired when a mutation occurs
 */
function useMutationObserver(
  element: Element | null | undefined,
  config: MutationObserverInit,
  callback: MutationCallback,
): void
/**
 * Observe mutations on a DOM node or tree of DOM nodes.
 * use a `MutationObserver` and return records as the are received.
 *
 * ```tsx
 * const [element, attachRef] = useCallbackRef(null);
 *
 * const records = useMutationObserver(element, { subtree: true });
 *
 * return (
 *   <div ref={attachRef} />
 * )
 * ```
 *
 * @param element The DOM element to observe
 * @param config The observer configuration
 */
function useMutationObserver(
  element: Element | null | undefined,
  config: MutationObserverInit,
): MutationRecord[]
function useMutationObserver(
  element: Element | null | undefined,
  config: MutationObserverInit,
  callback?: MutationCallback,
): MutationRecord[] | void {
  const [records, setRecords] = useState<MutationRecord[] | null>(null)
  const handler = useEventCallback(callback || setRecords)

  useCustomEffect(
    () => {
      if (!element) return

      // The behavior around reusing mutation observers is confusing
      // observing again _should_ disable the last listener but doesn't
      // seem to always be the case, maybe just in JSDOM? In any case the cost
      // to redeclaring it is gonna be fairly low anyway, so make it simple
      const observer = new MutationObserver(handler)

      observer.observe(element, config)

      return () => {
        observer.disconnect()
      }
    },
    [element, config],
    {
      isEqual: isDepsEqual,
      // Intentionally done in render, otherwise observer will miss any
      // changes made to the DOM during this update
      effectHook: useImmediateUpdateEffect as any,
    },
  )

  return callback ? void 0 : records || []
}

export default useMutationObserver
