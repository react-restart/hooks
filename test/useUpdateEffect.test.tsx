import useUpdateEffect from '../src/useUpdateEffect.js'
import { renderHook } from './helpers.js'

describe('useUpdateEffect', () => {
  it('should run update after value changes', () => {
    const teardown = jest.fn()
    const spy = jest.fn(() => teardown)

    const [, wrapper] = renderHook(
      ({ value }) => {
        useUpdateEffect(spy, [value])
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
