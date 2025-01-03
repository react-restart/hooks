import { renderHook } from '@testing-library/react'
import useIsInitialRenderRef from '../src/useIsInitialRenderRef.js'
import { useLayoutEffect } from 'react'

describe('useIsInitialRenderRef', () => {
  it('should not be true until the second committed render', () => {
    let count = 0

    // TODO: test with strict mode
    const { rerender } = renderHook(() => {
      const ref = useIsInitialRenderRef()

      useLayoutEffect(() => {
        if (ref.current) return

        count++
      })
    })

    expect(count).toEqual(0)

    rerender()

    expect(count).toEqual(1)
  })
})
