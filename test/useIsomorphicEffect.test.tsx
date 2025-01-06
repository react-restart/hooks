import { useLayoutEffect } from 'react'
import { describe, it, vi, expect } from 'vitest'

import { renderHook } from '@testing-library/react'
import useIsomorphicEffect from '../src/useIsomorphicEffect.js'

describe('useIsomorphicEffect', () => {
  it('should not run or warn', () => {
    let spy = vi.fn()

    expect(useIsomorphicEffect).toEqual(useLayoutEffect)

    renderHook(() => {
      useIsomorphicEffect(spy)
    })

    expect(spy).toBeCalled()
  })
})
