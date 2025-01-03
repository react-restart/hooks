import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'

import useStateAsync from '../src/useStateAsync.js'

describe('useStateAsync', () => {
  it('should increment counter', async () => {
    const { result } = renderHook(() => useStateAsync<number>(0))

    expect.assertions(4)

    const incrementAsync = async () => {
      let promise
      act(() => {
        promise = result.current[1]((prev) => prev + 1)
      })

      await promise
    }

    expect(result.current![0]).toEqual(0)

    await incrementAsync()
    expect(result.current![0]).toEqual(1)

    await incrementAsync()
    expect(result.current![0]).toEqual(2)

    await incrementAsync()

    expect(result.current![0]).toEqual(3)
  })

  it('should reject on error', async () => {
    const { result } = renderHook(() => useStateAsync<number>(1))

    let promise = act(() =>
      result.current[1](() => {
        throw new Error('yo')
      }),
    )

    await expect(promise).rejects.toThrow('yo')
  })

  it('should resolve even if no update happens', async () => {
    const { result } = renderHook(() => useStateAsync<number>(1))

    expect.assertions(3)

    expect(result.current![0]).toEqual(1)

    await act(() => expect(result.current[1](1)).resolves.toEqual(1))

    expect(result.current![0]).toEqual(1)
  })

  it('should resolve after update if already pending', async () => {
    const { result } = renderHook(() => useStateAsync<number>(0))

    expect.assertions(5)

    expect(result.current![0]).toEqual(0)

    const setAndAssert = (n: number) =>
      expect(result.current[1](n)).resolves.toEqual(2)

    let promise

    act(() => {
      promise = Promise.all([setAndAssert(1), setAndAssert(1), setAndAssert(2)])
    })

    await promise

    expect(result.current![0]).toEqual(2)
  })
})
