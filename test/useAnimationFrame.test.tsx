import { renderHook, act } from '@testing-library/react'
import useAnimationFrame from '../src/useAnimationFrame.js'
import { describe, it, beforeAll, afterAll, vi, expect } from 'vitest'

describe('useAnimationFrame', () => {
  let rafSpy, rafCancelSpy

  beforeAll(() => {
    rafSpy = vi
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((cb) => {
        return setTimeout(() => cb(1)) as any
      })

    rafCancelSpy = vi
      .spyOn(window, 'cancelAnimationFrame')
      .mockImplementation((handle) => {
        clearTimeout(handle)
      })
  })

  afterAll(() => {
    rafSpy.mockRestore()
    rafCancelSpy.mockRestore()
  })

  it('should requestAnimationFrame', () => {
    vi.useFakeTimers()

    let spy = vi.fn()

    const { result } = renderHook(useAnimationFrame)

    act(() => result.current!.request(spy))

    expect(spy).not.toHaveBeenCalled()

    vi.runAllTimers()

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should cancel a request', () => {
    vi.useFakeTimers()

    let spy = vi.fn()
    const { result } = renderHook(useAnimationFrame)

    act(() => {
      result.current.request(spy)

      result.current.cancel()
    })
    vi.runAllTimers()

    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should cancel a request on unmount', () => {
    vi.useFakeTimers()

    let spy = vi.fn()
    const { result, unmount } = renderHook(useAnimationFrame)

    act(() => result.current!.request(spy))

    unmount()

    vi.runAllTimers()

    expect(spy).toHaveBeenCalledTimes(0)
  })
})
