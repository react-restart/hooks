import React from 'react'

import useWillUnmount from '../src/useWillUnmount.js'
import { renderHook } from '@testing-library/react'

describe('useWillUnmount', () => {
  it('should return a function that returns mount state', () => {
    let spy = jest.fn()

    const wrapper = renderHook(() => useWillUnmount(spy))

    expect(spy).not.toHaveBeenCalled()

    wrapper.unmount()

    expect(spy).toHaveBeenCalledTimes(1)
  })
})
