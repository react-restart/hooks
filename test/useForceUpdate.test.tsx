import { act, renderHook } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import useForceUpdate from '../src/useForceUpdate.js'

describe('useForceUpdate', () => {
  it('should return a function that returns mount state', () => {
    let count = 0

    const { result } = renderHook(() => {
      count++
      return useForceUpdate()
    })

    expect(count).toEqual(1)
    act(() => {
      result.current()
    })

    expect(count).toEqual(2)
  })
})
