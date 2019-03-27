import { useEffect, useCallback } from 'react'

import useEventCallback from './useEventCallback'

type DocumentEventHandler<K extends keyof DocumentEventMap> = (
  this: Document,
  ev: DocumentEventMap[K]
) => any

export default function useGlobalListener<K extends keyof DocumentEventMap>(
  event: K,
  listener: DocumentEventHandler<K>,
  capture: boolean = false
) {
  const handler = useEventCallback(listener)

  useEffect(() => {
    document.addEventListener(event, handler, capture)
    return () => document.removeEventListener(event, handler, capture)
  }, [])
}
