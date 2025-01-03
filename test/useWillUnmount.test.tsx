import { describe, it, vi, expect } from 'vitest'
import { renderHook } from '@testing-library/react'

import useWillUnmount from '../src/useWillUnmount.js'

describe('useWillUnmount', () => {
  it('should return a function that returns mount state', () => {
    let spy = vi.fn()

    const wrapper = renderHook(() => useWillUnmount(spy))

    expect(spy).not.toHaveBeenCalled()

    wrapper.unmount()

    expect(spy).toHaveBeenCalledTimes(1)
  })
})
