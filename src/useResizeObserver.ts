import { useState } from 'react'
import useEffect from './useIsomorphicEffect'

export interface Rect {
  width: number
  height: number
  x?: number
  y?: number
}

type Handler = (contentRect: Rect) => void

const targetMap = new WeakMap<Element, Handler>()
let resizeObserver: ResizeObserver

function getResizeObserver() {
  // eslint-disable-next-line no-return-assign
  return (resizeObserver =
    resizeObserver ||
    new window.ResizeObserver((entries: ResizeObserverEntry[]) => {
      entries.forEach(entry => {
        const handler = targetMap.get(entry.target)
        if (handler) handler(entry.contentRect)
      })
    }))
}

/**
 * Efficiently observe size changes on an element. Depends on the `ResizeObserver` api,
 * and polyfills are needed in older browsers.
 *
 * ```ts
 * const [ref, attachRef] = useCallbackRef(null);
 *
 * const rect = useResizeObserver(ref);
 *
 * return (
 *  <div ref={attachRef}>
 *    {JSON.stringify(rect)}
 *  </div>
 * )
 * ```
 *
 * @param element The DOM element to observe
 */
export default function useResizeObserver<TElement extends Element>(
  element: TElement | null | undefined,
): Rect | null {
  const [rect, setRect] = useState<Rect | null>(null)

  useEffect(() => {
    if (!element) return

    getResizeObserver().observe(element)

    setRect(element.getBoundingClientRect())

    targetMap.set(element, rect => {
      setRect(rect)
    })

    return () => {
      targetMap.delete(element)
    }
  }, [element])

  return rect
}
