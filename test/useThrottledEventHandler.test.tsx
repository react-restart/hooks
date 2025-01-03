import { describe, it, vi, expect } from 'vitest'
import { renderHook } from './helpers.js'
import useThrottledEventHandler from '../src/useThrottledEventHandler.js'
import { waitFor } from '@testing-library/dom'

describe('useThrottledEventHandler', () => {
  it('should throttle and use return the most recent event', async () => {
    const spy = vi.fn()

    const [handler, wrapper] = renderHook(() =>
      useThrottledEventHandler<MouseEvent>(spy),
    )

    const events = [
      new MouseEvent('pointermove'),
      new MouseEvent('pointermove'),
      new MouseEvent('pointermove'),
    ]

    events.forEach(handler)

    expect(spy).not.toHaveBeenCalled()

    await waitFor(() => {
      expect(spy).toHaveBeenCalledTimes(1)
    })

    expect(spy).toHaveBeenCalledWith(events[events.length - 1])

    wrapper.unmount()

    handler(new MouseEvent('pointermove'))

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        expect(spy).toHaveBeenCalledTimes(1)

        resolve()
      }, 20)
    })
  })

  it('should clear pending handler calls', async () => {
    const spy = vi.fn()

    const [handler, wrapper] = renderHook(() =>
      useThrottledEventHandler<MouseEvent>(spy),
    )
    ;[
      new MouseEvent('pointermove'),
      new MouseEvent('pointermove'),
      new MouseEvent('pointermove'),
    ].forEach(handler)

    expect(spy).not.toHaveBeenCalled()

    handler.clear()

    await waitFor(() => {
      expect(spy).toHaveBeenCalledTimes(0)
    })
  })
})
