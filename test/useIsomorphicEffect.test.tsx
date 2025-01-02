import { useLayoutEffect } from 'react'

import { renderHook } from '@testing-library/react'
import useIsomorphicEffect from '../src/useIsomorphicEffect'

describe('useIsomorphicEffect', () => {
  it('should not run or warn', () => {
    let spy = jest.fn()

    expect(useIsomorphicEffect).toEqual(useLayoutEffect)

    renderHook(() => {
      useIsomorphicEffect(spy)
    })

    expect(spy).toBeCalled()
  })
})
