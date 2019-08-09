import { useState } from 'react'

import useStableMemo from './useStableMemo'
import useEffect from './useIsomorphicEffect'

/**
 * Setup an [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) on
 * a DOM Element.
 *
 * @param element The DOM element to observe
 * @param init IntersectionObserver options
 */
export default function useIntersectionObserver<TElement extends Element>(
  element: TElement | null | undefined,
  { threshold, root, rootMargin }: IntersectionObserverInit = {},
) {
  const [entries, setEntry] = useState<IntersectionObserverEntry[] | null>(null)

  const observer = useStableMemo(
    () =>
      typeof IntersectionObserver !== 'undefined' &&
      new IntersectionObserver(entries => setEntry(entries), {
        threshold,
        root,
        rootMargin,
      }),

    [root, rootMargin, threshold && JSON.stringify(threshold)],
  )

  useEffect(() => {
    if (!element || !observer) return

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [observer, element])

  return entries || []
}
