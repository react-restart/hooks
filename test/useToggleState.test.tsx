import React from 'react'
import useToggleState from '../src/useToggleState'
import { act, renderHook } from '@testing-library/react-hooks'

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
