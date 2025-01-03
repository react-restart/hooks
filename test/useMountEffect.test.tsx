import { renderHook } from './helpers.js'
import { describe, it, vi, expect } from 'vitest'

import useMountEffect from '../src/useMountEffect.js'

describe('useMountEffect', () => {
  it('should run update only on mount', () => {
    const teardown = vi.fn()
    const spy = vi.fn(() => teardown)

    const [, wrapper] = renderHook(
      () => {
        useMountEffect(spy)
      },
      { value: 1, other: false },
    )

    expect(spy).toHaveBeenCalledTimes(1)

    wrapper.setProps({ value: 2 })

    expect(spy).toHaveBeenCalledTimes(1)

    wrapper.setProps({ value: 2, other: true })

    expect(spy).toHaveBeenCalledTimes(1)

    wrapper.unmount()

    expect(teardown).toHaveBeenCalledTimes(1)
  })
})
