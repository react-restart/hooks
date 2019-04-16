import { useLayoutEffect, useState } from 'react'

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
    new window.ResizeObserver(entries => {
      entries.forEach(entry => {
        const handler = targetMap.get(entry.target)
        if (handler) handler(entry.contentRect as any)
      })
    }))
}

export default function useResizeObserver<TElement extends Element>(
  element: TElement | null | undefined
): Rect | null {
  const [rect, setRect] = useState<Rect | null>(null)

  useLayoutEffect(() => {
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
