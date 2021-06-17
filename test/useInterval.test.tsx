import React, { useEffect } from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import useInterval from '../src/useInterval'

describe('useTimeout', () => {
  it('should set an interval', () => {
    jest.useFakeTimers()

    let spy = jest.fn()

    function Wrapper() {
      useInterval(spy, 100)

      return <span />
    }

    renderHook(() => useInterval(spy, 100))

    expect(spy).not.toHaveBeenCalled()
    act(() => {
      jest.runOnlyPendingTimers()
    })
    expect(spy).toHaveBeenCalledTimes(1)
    act(() => {
      jest.runOnlyPendingTimers()
    })
    expect(spy).toHaveBeenCalledTimes(2)
  })

  it('should run immediately when argument is set', () => {
    jest.useFakeTimers()
    let spy = jest.fn()

    renderHook(() => useInterval(spy, 100, false, true))

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should not run when paused', () => {
    jest.useFakeTimers()
    let spy = jest.fn()

    renderHook(() => useInterval(spy, 100, true))

    jest.runOnlyPendingTimers()
    expect(spy).not.toHaveBeenCalled()
  })

  it('should stop running on unmount', () => {
    jest.useFakeTimers()
    let spy = jest.fn()

    const { unmount } = renderHook(() => useInterval(spy, 100))

    unmount()

    jest.runOnlyPendingTimers()
    expect(spy).not.toHaveBeenCalled()
  })
})
