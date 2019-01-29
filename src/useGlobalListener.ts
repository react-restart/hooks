import { useEffect, useCallback } from 'react'

import useEventCallback from './useEventCallback'

export default function useGlobalListener(
  event: string,
  listener: EventListener,
  capture: boolean = false
) {
  const handler = useEventCallback(listener)

  useEffect(() => {
    document.addEventListener(event, handler, capture)
    return () => document.removeEventListener(event, handler, capture)
  }, [])
}
