import { describe, it, vi, expect } from 'vitest'
import { renderHook } from './helpers.js'

import useUpdateLayoutEffect from '../src/useUpdateLayoutEffect.js'

describe('useUpdateLayoutEffect', () => {
  it('should run update after value changes', () => {
    const teardown = vi.fn()
    const spy = vi.fn(() => teardown)

    const [, wrapper] = renderHook(
      ({ value }) => {
        useUpdateLayoutEffect(spy, [value])
      },
      { value: 1, other: false },
    )

    expect(spy).not.toHaveBeenCalled()
    expect(teardown).not.toHaveBeenCalled()

    wrapper.setProps({ value: 2 })

    expect(spy).toHaveBeenCalledTimes(1)
    expect(teardown).not.toHaveBeenCalled()

    // unrelated render
    wrapper.setProps({ value: 2, other: true })

    expect(spy).toHaveBeenCalledTimes(1)

    wrapper.setProps({ value: 3, other: true })

    expect(spy).toHaveBeenCalledTimes(2)
    expect(teardown).toHaveBeenCalledTimes(1)
  })
})
