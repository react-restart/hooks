import useIntersectionObserver from '../src/useIntersectionObserver.js'
import { describe, it, vi, beforeEach, afterEach, Mock, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'

describe('useIntersectionObserver', () => {
  let observers: any[] = []
  beforeEach(() => {
    ;(window as any).IntersectionObserver = class IntersectionObserverMock {
      observe: Mock<any>
      unobserve: Mock<any>
      args: [IntersectionObserverCallback, IntersectionObserverInit]
      constructor(handler: any, init: any) {
        this.args = [handler, init]
        this.observe = vi.fn()
        this.unobserve = vi.fn()
        observers.push(this)
      }
    }
  })

  afterEach(() => {
    observers = []
  })

  it('should observe element', async () => {
    const element = document.createElement('span')

    const { result } = renderHook(() => useIntersectionObserver(element))
    const entry = {}
    expect(result.current).toEqual([])

    act(() => {
      observers[0].args[0]([entry])
    })

    expect(result.current[0]).toStrictEqual(entry)
  })

  it('should wait for element', async () => {
    const element = document.createElement('span')

    const { result, rerender, unmount } = renderHook(
      ({ element }) => useIntersectionObserver(element),
      { initialProps: { element: null as any } },
    )

    expect(result.current).toEqual([])

    expect(observers[0].observe).not.toBeCalled()

    rerender({ element })

    expect(observers[0].observe).toBeCalledTimes(1)

    unmount()

    expect(observers[0].unobserve).toBeCalledTimes(1)
  })

  it('should wait for root to set up observer', async () => {
    const root = document.createElement('div')
    const element = document.createElement('span')

    const { result, rerender } = renderHook(
      (root: any) => useIntersectionObserver(element, { root }),
      { initialProps: null as null | HTMLElement },
    )

    expect(observers).toHaveLength(0)

    rerender(root)

    expect(observers).toHaveLength(1)
    expect(observers[0].observe).toBeCalledTimes(1)
  })

  it('should accept a callback', async () => {
    const spy = vi.fn()
    const element = document.createElement('span')

    const { result } = renderHook(() => useIntersectionObserver(element, spy))

    expect(result.current).toEqual(undefined)

    const entry = {}
    act(() => {
      observers[0].args[0]([entry, observers[0]])
    })

    expect(spy).toBeCalledTimes(1)
    expect(spy).toHaveBeenLastCalledWith([entry, observers[0]])
  })
})
