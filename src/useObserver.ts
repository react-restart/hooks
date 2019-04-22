import { useLayoutEffect, useState } from 'react'
import useEventCallback from './useEventCallback'

export interface Rect {
  width: number
  height: number
  x?: number
  y?: number
}

type Handler = (entry: any) => void

const targetMap = new WeakMap<Element, Handler>()

let observer: Observer<any>

interface ObserverCallback<TEntry> {
  (entries: TEntry[], observer: Observer<TEntry>): void
}

interface Observer<TEntry = any> {
  // @ts-ignore
  new (callback: ObserverCallback<TEntry>)

  observe: (target: Element) => void

  /**
   * Removes target from the list of observed elements.
   */
  unobserve: (target: Element) => void

  /**
   * Clears both the observationTargets and activeTargets lists.
   */
  disconnect: () => void
}

function getObserver<TObserver extends Observer>(Observer: TObserver) {
  // eslint-disable-next-line no-return-assign
  return (observer =
    observer ||
    new Observer(entries => {
      entries.forEach(entry => {
        const handler = targetMap.get(entry.target)
        if (handler) handler(entry)
      })
    }))
}

export default function useObserver<TEntry, TElement extends Element>(
  MyObserver: Observer<TEntry>,
  element: TElement | null | undefined,
  handler: (entry: TEntry) => void,
  leadingHandler?: (element: TElement) => void
) {
  const handlerCallback = useEventCallback(handler)

  useLayoutEffect(() => {
    if (!element) return

    getObserver(MyObserver).observe(element)

    if (leadingHandler) leadingHandler(element)

    targetMap.set(element, handlerCallback)

    return () => {
      targetMap.delete(element)
    }
  }, [element])
}
