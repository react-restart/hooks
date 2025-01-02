import React, { useState } from 'react'
import useSafeState from '../src/useSafeState'
import useStateAsync from '../src/useStateAsync'
import { act, renderHook, waitFor } from '@testing-library/react'

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

    act(() => {
      result.current[1](true)
    })

    await waitFor(() => {
      expect(result.current[0]).toEqual(true)
    })

    expect(result.current[0]).toEqual(true)

    unmount()

    act(() => result.current[1](true))

    await waitFor(() => {
      expect(result.current[0]).toEqual(true)
    })
  })
})
