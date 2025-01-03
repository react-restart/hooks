import { renderHook, act } from '@testing-library/react'
import { describe, it, vi, expect } from 'vitest'
import useInterval from '../src/useInterval.js'

describe('useTimeout', () => {
  it('should set an interval', () => {
    vi.useFakeTimers()

    let spy = vi.fn()

    function Wrapper() {
      useInterval(spy, 100)

      return <span />
    }

    renderHook(() => useInterval(spy, 100))

    expect(spy).not.toHaveBeenCalled()
    act(() => {
      vi.runOnlyPendingTimers()
    })
    expect(spy).toHaveBeenCalledTimes(1)
    act(() => {
      vi.runOnlyPendingTimers()
    })
    expect(spy).toHaveBeenCalledTimes(2)
  })

  it('should run immediately when argument is set', () => {
    vi.useFakeTimers()
    let spy = vi.fn()

    renderHook(() => useInterval(spy, 100, false, true))

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should not run when paused', () => {
    vi.useFakeTimers()
    let spy = vi.fn()

    renderHook(() => useInterval(spy, 100, true))

    vi.runOnlyPendingTimers()
    expect(spy).not.toHaveBeenCalled()
  })

  it('should stop running on unmount', () => {
    vi.useFakeTimers()
    let spy = vi.fn()

    const { unmount } = renderHook(() => useInterval(spy, 100))

    unmount()

    vi.runOnlyPendingTimers()
    expect(spy).not.toHaveBeenCalled()
  })
})
