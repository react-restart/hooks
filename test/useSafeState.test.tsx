import React, { useState } from 'react'
import useSafeState from '../src/useSafeState'
import useStateAsync from '../src/useStateAsync'
import { act, renderHook } from '@testing-library/react-hooks'

describe('useSafeState', () => {
  it('should work transparently', () => {
    const { result, unmount } = renderHook(() => useSafeState(useState(false)))

    expect(result.current[0]).toEqual(false)

    act(() => {
      result.current[1](true)
    })
    expect(result.current[0]).toEqual(true)

    unmount()

    act(() => {
      result.current[1](false)
    })
    expect(result.current[0]).toEqual(true)
  })

  it('should work with async setState', async () => {
    const { result, unmount } = renderHook(() =>
      useSafeState(useStateAsync(false)),
    )

    expect(result.current[0]).toEqual(false)

    await act(async () => {
      await result.current[1](true)
    })

    expect(result.current[0]).toEqual(true)

    unmount()

    await act(async () => {
      await result.current[1](true)
    })

    expect(result.current[0]).toEqual(true)
  })
})
