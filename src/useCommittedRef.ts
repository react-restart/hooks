import { useLayoutEffect, useRef } from 'react'

function useCommittedRef<TValue>(value: TValue): React.RefObject<TValue> {
  const ref = useRef(value)
  useLayoutEffect(
    () => {
      ref.current = value
    },
    [value]
  )
  return ref
}

export default useCommittedRef
