import { useEffect, useCallback, useRef } from 'react'
import useCommittedRef from './useCommittedRef'

export default function useEventCallback<
  TCallback extends (...args: any[]) => any
>(fn: TCallback): TCallback {
  const ref = useCommittedRef(fn)
  return useCallback(
    function(...args) {
      return ref.current!(...args)
    },
    [ref]
  ) as any
}
