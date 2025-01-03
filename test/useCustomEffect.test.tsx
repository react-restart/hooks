import { describe, it, vi, expect } from 'vitest'
import useCustomEffect from '../src/useCustomEffect.js'
import useImmediateUpdateEffect from '../src/useImmediateUpdateEffect.js'
import { renderHook } from './helpers.js'

describe('useCustomEffect', () => {
  it('should run custom isEqual logic', () => {
    const teardown = vi.fn()

    const spy = vi.fn().mockImplementation(() => teardown)
    const isEqual = vi.fn((next, prev) => next[0].foo === prev[0].foo)

    const [, wrapper] = renderHook(
      ({ value }) => {
        useCustomEffect(spy, [value], isEqual)
      },
      { value: { foo: true } },
    )

    expect(spy).toHaveBeenCalledTimes(1)

    // matches isEqual
    wrapper.setProps({ value: { foo: true } })

    expect(spy).toHaveBeenCalledTimes(1)

    // update that should trigger
    wrapper.setProps({ value: { foo: false } })

    expect(spy).toHaveBeenCalledTimes(2)
    expect(isEqual).toHaveBeenCalledTimes(2)

    expect(teardown).toBeCalledTimes(1)
    expect(spy).toHaveBeenCalledTimes(2)

    wrapper.unmount()
    expect(teardown).toBeCalledTimes(2)
  })

  it('should accept different hooks', () => {
    const spy = vi.fn()
    const hookSpy = vi.fn().mockImplementation(useImmediateUpdateEffect)

    renderHook(
      ({ value }) => {
        useCustomEffect(spy, [value], {
          isEqual: (next, prev) => next[0].foo === prev[0].foo,
          effectHook: hookSpy,
        })
      },
      { value: { foo: true } },
    )

    // the update and unmount hook setup
    expect(hookSpy).toHaveBeenCalledTimes(1)
    // not called b/c useImmediateUpdateEffect doesn't run on initial render
    expect(spy).toHaveBeenCalledTimes(0)
  })
})
