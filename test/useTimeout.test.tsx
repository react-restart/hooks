import React from 'react'
import useTimeout from '../src/useTimeout'
import { render, act } from '@testing-library/react'

describe('useTimeout', () => {
  it('should set a timeout', () => {
    jest.useFakeTimers()

    let spy = jest.fn()
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
      jest.runAllTimers()
    })

    expect(timeout.isPending).toBe(false)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should clear a timeout', () => {
    jest.useFakeTimers()

    let spy = jest.fn()
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
      jest.runAllTimers()
    })

    expect(timeout.isPending).toBe(false)
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should clear a timeout on unmount', () => {
    jest.useFakeTimers()

    let spy = jest.fn()
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
      jest.runAllTimers()
    })

    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should handle very large timeouts', () => {
    jest.useFakeTimers()

    let spy = jest.fn()
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
    jest.advanceTimersByTime(100)

    expect(spy).toHaveBeenCalledTimes(0)

    act(() => {
      jest.runAllTimers()
    })

    expect(spy).toHaveBeenCalledTimes(1)
  })
})
