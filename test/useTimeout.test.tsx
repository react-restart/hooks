import { describe, it, vi, expect } from 'vitest'
import useTimeout from '../src/useTimeout.js'
import { render, act } from '@testing-library/react'

describe('useTimeout', () => {
  it('should set a timeout', () => {
    vi.useFakeTimers()

    let spy = vi.fn()
    let timeout!: ReturnType<typeof useTimeout>

    function Wrapper() {
      timeout = useTimeout()

      return <span />
    }

    render(<Wrapper />)

    act(() => {
      timeout.set(spy, 100)
    })

    expect(timeout.isPending).toBe(true)
    expect(spy).not.toHaveBeenCalled()

    act(() => {
      vi.runAllTimers()
    })

    expect(timeout.isPending).toBe(false)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should clear a timeout', () => {
    vi.useFakeTimers()

    let spy = vi.fn()

    let timeout!: ReturnType<typeof useTimeout>

    function Wrapper() {
      timeout = useTimeout()

      return <span />
    }

    render(<Wrapper />)

    act(() => {
      timeout.set(spy, 100)
    })

    expect(timeout.isPending).toBe(true)

    act(() => {
      timeout!.clear()
    })

    vi.runAllTimers()
    expect(timeout.isPending).toBe(false)
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should clear a timeout on unmount', () => {
    vi.useFakeTimers()

    let spy = vi.fn()
    let timeout: ReturnType<typeof useTimeout>

    function Wrapper() {
      timeout = useTimeout()

      return <span />
    }

    const wrapper = render(<Wrapper />)

    act(() => {
      timeout!.set(spy, 100)
    })

    wrapper.unmount()

    act(() => {
      vi.runAllTimers()
    })

    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should handle very large timeouts', () => {
    vi.useFakeTimers()

    let spy = vi.fn()
    let timeout: ReturnType<typeof useTimeout>

    function Wrapper() {
      timeout = useTimeout()

      return <span />
    }

    render(<Wrapper />)

    const MAX = 2 ** 31 - 1

    act(() => {
      timeout!.set(spy, MAX + 100)
    })

    // some time to check that it didn't overflow and fire immediately
    vi.advanceTimersByTime(100)

    expect(spy).toHaveBeenCalledTimes(0)

    act(() => {
      vi.runAllTimers()
    })

    expect(spy).toHaveBeenCalledTimes(1)
  })
})
