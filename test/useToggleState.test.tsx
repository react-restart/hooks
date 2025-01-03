import { describe, it, vi, expect } from 'vitest'
import useToggleState from '../src/useToggleState.js'
import { act, renderHook } from '@testing-library/react'

describe('useToggleState', () => {
  it('should toggle', () => {
    let { result } = renderHook(() => useToggleState(false))

    expect(result.current![0]).toEqual(false)

    act(() => result.current[1]())

    expect(result.current![0]).toEqual(true)

    act(() => result.current[1](true))

    expect(result.current![0]).toEqual(true)

    act(() => result.current[1]())

    expect(result.current![0]).toEqual(false)
  })
})
