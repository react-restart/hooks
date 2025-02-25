import { useState } from 'react'
import { describe, it, expect } from 'vitest'
import { act, renderHook, waitFor } from '@testing-library/react'

import useSafeState from '../src/useSafeState.js'
import useStateAsync from '../src/useStateAsync.js'

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
