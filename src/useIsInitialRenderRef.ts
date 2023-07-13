import { useEffect, useLayoutEffect, useRef } from 'react'

/**
 * Returns ref that is `true` on the initial render and `false` on subsequent renders. It
 * is StrictMode safe, so will reset correctly if the component is unmounted and remounted
 */
export default function useIsInitialRenderRef() {
  const isInitialRenderRef = useRef(true)

  useLayoutEffect(() => {
    isInitialRenderRef.current = false
  })

  // Strict mode handling in React 18
  useEffect(
    () => () => {
      isInitialRenderRef.current = true
    },
    [],
  )

  return isInitialRenderRef
}
