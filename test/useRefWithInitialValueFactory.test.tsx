import { describe, it, vi, expect } from 'vitest'
import { renderHook } from './helpers.js'
import useRefWithInitialValueFactory from '../src/useRefWithInitialValueFactory.js'

describe('useRefWithInitialValueFactory', () => {
  it('should set a ref value using factory once', () => {
    const spy = vi.fn((v: number) => v)

    const [ref, wrapper] = renderHook(
      ({ value }) => {
        return useRefWithInitialValueFactory(() => spy(value))
      },
      { value: 2 },
    )

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(2)

    expect(ref.current).toEqual(2)

    wrapper.setProps({ value: 1 })

    expect(spy).toHaveBeenCalledTimes(1)
    expect(ref.current).toEqual(2)
  })
})
