import { useEffect, useRef } from 'react'

function useCommittedRef<TValue>(
  value: TValue
): React.MutableRefObject<TValue> {
  const ref = useRef(value)
  useEffect(
    () => {
      ref.current = value
    },
    [value]
  )
  return ref
}

export default useCommittedRef
