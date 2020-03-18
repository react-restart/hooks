import useCustomEffect, { IsEqual } from './useCustomEffect'
import isEqual from 'lodash/isEqual'
import useImmediateUpdateEffect from './useImmediateUpdateEffect'
import useMountEffect from './useMountEffect'
import useEventCallback from './useEventCallback'
import { useRef } from 'react'

type Deps = [Element | null | undefined, MutationObserverInit]

function isDepsEqual(
  [nextElement, nextConfig]: Deps,
  [prevElement, prevConfig]: Deps,
) {
  return (
    nextElement === prevElement &&
    isEqual(nextConfig, prevConfig)
  );
}

/**
 * Observe mutations on a DOM node or tree of DOM nodes.
 * Depends on the `MutationObserver` api.
 *
 * ```ts
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
): void {
  const observerRef = useRef<MutationObserver | null>()
  const fn = useEventCallback(callback)

  useMountEffect(() => {
    if (!element) return

    observerRef.current = new MutationObserver(fn)
  })

  useCustomEffect(
    () => {
      if (!element) return

      const observer = observerRef.current || new MutationObserver(fn)
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
      effectHook: useImmediateUpdateEffect,
    },
  )
}

export default useMutationObserver
