import { useEffect, useCallback, useRef } from 'react'

function useEventCallback(fn, dependencies) {
  const ref = useRef(() => {
    throw new Error('Cannot call an event handler while rendering.')
  })

  useEffect(
    () => {
      ref.current = fn
    },
    [fn, ...dependencies]
  )

  return useCallback(
    () => {
      return ref.current()
    },
    [ref]
  )
}
