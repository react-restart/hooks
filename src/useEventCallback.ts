import { useCallback } from 'react'
import useCommittedRef from './useCommittedRef'

type CallbackWrapper<TCallback extends (...args: any) => any> = (
  this: ThisParameterType<TCallback>,
  ...args: Parameters<TCallback>
) => ReturnType<TCallback> | null | undefined

export default function useEventCallback<
  TCallback extends (...args: any[]) => any
>(fn?: TCallback | null): CallbackWrapper<TCallback> {
  const ref = useCommittedRef(fn)

  return useCallback(
    function (...args) {
      return ref.current && ref.current.apply(this, args)
    },
    [ref],
  )
}
