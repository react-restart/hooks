import React, { useState } from 'react'
import useSafeState from '../src/useSafeState'
import useStateAsync from '../src/useStateAsync'
import { act, renderHook } from '@testing-library/react'

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
    const { result, unmount } = renderHook(() => useSafeState(useStateAsync(0)))

    expect(result.current[0]).toEqual(0)

    const incrementAsync = async () => {
      let promise: Promise<any>

      act(() => {
        promise = result.current[1]((prev) => prev + 1)
      })

      await promise!
    }

    await incrementAsync()

    expect(result.current[0]).toEqual(1)

    unmount()

    await incrementAsync()

    expect(result.current[0]).toEqual(1)
  })
})
