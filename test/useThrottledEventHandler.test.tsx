import useThrottledEventHandler from '../src/useThrottledEventHandler'
import { renderHook } from './helpers'

describe('useThrottledEventHandler', () => {
  it('should throttle and use return the most recent event', done => {
    const spy = jest.fn()

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

    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(1)

      expect(spy).toHaveBeenCalledWith(events[events.length - 1])

      wrapper.unmount()

      handler(new MouseEvent('pointermove'))

      setTimeout(() => {
        expect(spy).toHaveBeenCalledTimes(1)

        done()
      }, 20)
    }, 20)
  })

  it('should clear pending handler calls', done => {
    const spy = jest.fn()

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

    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(0)
      done()
    }, 20)
  })
})
