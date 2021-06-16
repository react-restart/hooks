import { useState } from 'react'

import useStableMemo from './useStableMemo'
import useEffect from './useIsomorphicEffect'
import useEventCallback from './useEventCallback'

/**
 * Setup an [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) on
 * a DOM Element. This overload does not trigger component updates when receiving new
 * entries. This allows for finer grained performance optimizations by the consumer.
 *
 * @param element The DOM element to observe
 * @param callback A listener for intersection updates.
 * @param init IntersectionObserver options
 */
function useIntersectionObserver<TElement extends Element>(
  element: TElement | null | undefined,
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit,
): void
/**
 * Setup an [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) on
 * a DOM Element that returns it's entries as they arrive.
 *
 * @param element The DOM element to observe
 * @param init IntersectionObserver options
 */
function useIntersectionObserver<TElement extends Element>(
  element: TElement | null | undefined,
  options: IntersectionObserverInit,
): IntersectionObserverEntry[]
function useIntersectionObserver<TElement extends Element>(
  element: TElement | null | undefined,
  callbackOrOptions: IntersectionObserverCallback | IntersectionObserverInit,
  maybeOptions?: IntersectionObserverInit,
): void | IntersectionObserverEntry[] {
  let callback: IntersectionObserverCallback | undefined
  let options: IntersectionObserverInit
  if (typeof callbackOrOptions === 'function') {
    callback = callbackOrOptions
    options = maybeOptions || {}
  } else {
    options = callbackOrOptions || {}
  }
  const { threshold, root, rootMargin } = options
  const [entries, setEntry] = useState<IntersectionObserverEntry[] | null>(null)

  const handler = useEventCallback(callback || setEntry)

  const observer = useStableMemo(
    () =>
      typeof IntersectionObserver !== 'undefined' &&
      new IntersectionObserver(handler, {
        threshold,
        root,
        rootMargin,
      }),

    [handler, root, rootMargin, threshold && JSON.stringify(threshold)],
  )

  useEffect(() => {
    if (!element || !observer) return

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [observer, element])

  return callback ? undefined : entries || []
}

export default useIntersectionObserver
