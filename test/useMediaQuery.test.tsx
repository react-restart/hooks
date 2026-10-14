import useMediaQuery from '../src/useMediaQuery.js'
import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

describe('useMediaQuery', () => {
  it('moves its listener when the target window changes', () => {
    const query = '(min-width: 100px)'
    const createTarget = (matches: boolean) => {
      const listeners = new Set<() => void>()
      const matcher = {
        media: query,
        matches,
        addListener: vi.fn((listener: () => void) => listeners.add(listener)),
        removeListener: vi.fn((listener: () => void) =>
          listeners.delete(listener),
        ),
      }
      const target = { matchMedia: vi.fn(() => matcher) } as unknown as Window
      return { target, matcher, listeners }
    }
    const first = createTarget(true)
    const second = createTarget(false)
    const hook = renderHook((target) => useMediaQuery(query, target), {
      initialProps: first.target,
    })
    expect(hook.result.current).toBe(true)
    hook.rerender(second.target)
    expect(hook.result.current).toBe(false)
    expect(first.matcher.removeListener).toHaveBeenCalledTimes(1)
    expect(first.listeners.size).toBe(0)
    expect(second.listeners.size).toBe(1)

    act(() => {
      second.matcher.matches = true
      second.listeners.forEach((listener) => listener())
    })
    expect(hook.result.current).toBe(true)
    hook.rerender(second.target)
    expect(second.matcher.addListener).toHaveBeenCalledTimes(1)
    hook.unmount()
    expect(second.matcher.removeListener).toHaveBeenCalledTimes(1)
    expect(second.listeners.size).toBe(0)
  })

  it('should match immediately if possible', () => {
    const wrapper = renderHook(useMediaQuery, {
      initialProps: 'min-width: 100px',
    })

    expect(window.innerWidth).toBeGreaterThanOrEqual(100)
    expect(wrapper.result.current).toEqual(true)

    act(() => {
      wrapper.rerender('min-width: 2000px')
    })

    expect(window.innerWidth).toBeLessThanOrEqual(2000)
    expect(wrapper.result.current).toEqual(false)
  })

  it('should clear if no media is passed', () => {
    const wrapper = renderHook(useMediaQuery, {
      initialProps: null as string | null,
    })

    expect(wrapper.result.current).toEqual(false)

    act(() => {
      wrapper.rerender('')
    })

    expect(wrapper.result.current).toEqual(false)
  })
})
