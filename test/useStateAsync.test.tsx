import React from 'react'
import useStateAsync, { AsyncSetState } from '../src/useStateAsync'
import { renderHook, act } from '@testing-library/react-hooks'
import { render, act as renderAct } from '@testing-library/react'

describe('useStateAsync', () => {
  it('should increment counter', async () => {
    const { result } = renderHook(() => useStateAsync<number>(0))

    expect.assertions(4)

    const incrementAsync = async () => {
      await act(async () => {
        await result.current[1]((prev) => prev + 1)
      })
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

    await act(async () => {
      const p = result.current[1](() => {
        throw new Error('yo')
      })

      await expect(p).rejects.toThrow('yo')
    })
  })

  it('should resolve even if no update happens', async () => {
    const { result } = renderHook(() => useStateAsync<number>(1))

    expect.assertions(3)

    expect(result.current![0]).toEqual(1)

    await renderAct(() => expect(result.current[1](1)).resolves.toEqual(1))

    expect(result.current![0]).toEqual(1)
  })

  it('should resolve after update if already pending', async () => {
    const { result } = renderHook(() => useStateAsync<number>(0))

    expect.assertions(5)

    expect(result.current![0]).toEqual(0)

    const setAndAssert = async (n: number) => {
      expect(result.current[1](n)).resolves.toEqual(2)
    }

    await act(async () => {
      await Promise.all([setAndAssert(1), setAndAssert(1), setAndAssert(2)])
    })

    expect(result.current![0]).toEqual(2)
  })
})
