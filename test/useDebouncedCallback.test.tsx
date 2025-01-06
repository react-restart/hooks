/*! tests an impl adapted from https://github.com/xnimorz/use-debounce/blob/master/test/useDebouncedCallback.test.tsx itself adapted from lodash*/
import { describe, it, vi, expect, afterEach, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'

import useDebouncedCallback from '../src/useDebouncedCallback.js'

describe('useDebouncedCallback', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should return a function that debounces input callback', () => {
    const callback = vi.fn()

    const { result } = renderHook(() => useDebouncedCallback(callback, 500))

    act(() => {
      result.current(1)
      result.current(2)
      result.current(3)
    })

    expect(callback).not.toHaveBeenCalled()

    act(() => {
      vi.runOnlyPendingTimers()
    })

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(3)
  })

  it('will call leading callback immediately (but only once, as trailing is set to false)', () => {
    const callback = vi.fn()

    const { result } = renderHook(() =>
      useDebouncedCallback(callback, {
        wait: 1000,
        leading: true,
        trailing: false,
      }),
    )

    act(() => {
      result.current(1)
    })

    expect(callback).toHaveBeenCalledTimes(1)

    act(() => {
      vi.runOnlyPendingTimers()
    })
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('will call leading callback as well as next debounced call', () => {
    const callback = vi.fn()

    const { result } = renderHook(() =>
      useDebouncedCallback(callback, {
        wait: 1000,
        leading: true,
      }),
    )

    act(() => {
      result.current()
      result.current()
      result.current()
    })

    expect(callback).toHaveBeenCalledTimes(1)

    act(() => {
      vi.runOnlyPendingTimers()
    })

    expect(callback).toHaveBeenCalledTimes(2)
  })

  it('will call three callbacks if no debounced callbacks are pending', () => {
    const callback = vi.fn()

    const { result } = renderHook(() =>
      useDebouncedCallback(callback, {
        wait: 1000,
        leading: true,
      }),
    )

    act(() => {
      result.current()
      result.current()
      result.current()
    })

    expect(callback).toHaveBeenCalledTimes(1)

    act(() => {
      vi.advanceTimersByTime(1001)
      result.current()
    })

    expect(callback).toHaveBeenCalledTimes(3)
  })

  it('will call a second leading callback if no debounced callbacks are pending with trailing false', () => {
    const callback = vi.fn()

    const { result } = renderHook(() =>
      useDebouncedCallback(callback, {
        wait: 1000,
        leading: true,
        trailing: false,
      }),
    )

    act(() => {
      result.current()

      setTimeout(() => {
        result.current()
      }, 1001)
    })

    expect(callback).toHaveBeenCalledTimes(1)

    act(() => {
      vi.advanceTimersByTime(1001)
    })

    expect(callback).toHaveBeenCalledTimes(2)
  })

  it('Subsequent calls to the debounced function return the result of the last func invocation.', () => {
    const callback = vi.fn(() => 42)

    const { result } = renderHook(() => useDebouncedCallback(callback, 1000))
    let retVal

    act(() => {
      retVal = result.current()
    })

    expect(callback).toHaveBeenCalledTimes(0)
    expect(retVal).toBeUndefined()

    act(() => {
      vi.runAllTimers()
    })

    expect(callback).toHaveBeenCalledTimes(1)

    let subsequentResult
    act(() => {
      subsequentResult = result.current()
    })

    expect(callback).toHaveBeenCalledTimes(1)
    expect(subsequentResult).toBe(42)
  })

  it('Returns the value when leading  immediately', () => {
    const callback = vi.fn(() => 42)

    const { result } = renderHook(() =>
      useDebouncedCallback(callback, { wait: 1000, leading: true }),
    )

    let retVal
    act(() => {
      retVal = result.current()
    })

    expect(callback).toHaveBeenCalledTimes(1)
    expect(retVal).toEqual(42)
  })

  it("won't call both on the leading edge and on the trailing edge if leading and trailing are set up to true and function call is only once", () => {
    const callback = vi.fn()

    const { result } = renderHook(() =>
      useDebouncedCallback(callback, {
        wait: 1000,
        leading: true,
      }),
    )

    act(() => {
      result.current()
    })

    expect(callback).toHaveBeenCalledTimes(1)

    act(() => {
      vi.runAllTimers()
    })

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('will call both on the leading edge and on the trailing edge if leading and trailing are set up to true and there are more than 1 function call', () => {
    const callback = vi.fn()

    const { result } = renderHook(() =>
      useDebouncedCallback(callback, {
        wait: 1000,
        leading: true,
      }),
    )

    act(() => {
      result.current()
      result.current()
    })

    expect(callback).toHaveBeenCalledTimes(1)

    act(() => {
      vi.runAllTimers()
    })

    expect(callback).toHaveBeenCalledTimes(2)
  })

  it.skip('will call callback if maxWait time exceed', async () => {
    const callback = vi.fn()

    const { result } = renderHook(() =>
      useDebouncedCallback(callback, {
        wait: 500,
        maxWait: 600,
      }),
    )

    expect(callback).toHaveBeenCalledTimes(0)

    act(() => {
      result.current()
      console.log('ran 1')
    })

    act(() => {
      vi.advanceTimersByTime(700)
    })

    expect(callback).toHaveBeenCalledTimes(1)

    act(() => {
      console.log('run 2')
      result.current()
      vi.advanceTimersByTime(1000)
    })

    // await act(async () => {
    //   await
    // })

    await waitFor(() => expect(callback).toHaveBeenCalledTimes(1))
  })
})
