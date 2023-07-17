import { renderHook } from '@testing-library/react'
import useIsInitialRenderRef from '../src/useIsInitialRenderRef'
import React, { StrictMode, useLayoutEffect } from 'react'

describe('useIsInitialRenderRef', () => {
  it('should not be true until the second committed render', () => {
    let count = 0

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

  it('[STRICT MODE] should not be true until the second committed render', () => {
    let count = 0

    const { rerender } = renderHook(
      () => {
        const ref = useIsInitialRenderRef()

        useLayoutEffect(() => {
          if (ref.current) return

          count++
        })
      },
      {
        wrapper: ({ children }) => <StrictMode>{children}</StrictMode>,
      },
    )

    expect(count).toEqual(0)

    rerender()

    expect(count).toEqual(1)
  })
})
