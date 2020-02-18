import useMountEffect from '../src/useMountEffect'
import { renderHook } from './helpers'

describe('useMountEffect', () => {
  it('should run update only on mount', () => {
    const teardown = jest.fn()
    const spy = jest.fn(() => teardown)

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
