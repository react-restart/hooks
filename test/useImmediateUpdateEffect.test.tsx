import useImmediateUpdateEffect from '../src/useImmediateUpdateEffect'
import { renderHook } from './helpers'

describe('useImmediateUpdateEffect', () => {
  it('should run update after value changes', () => {
    const teardown = jest.fn()
    const spy = jest.fn().mockImplementation(() => teardown)

    const [, wrapper] = renderHook(
      ({ value }) => {
        useImmediateUpdateEffect(spy, [value])
      },
      { value: 1, other: false },
    )

    expect(spy).not.toHaveBeenCalled()

    wrapper.setProps({ value: 2 })

    expect(spy).toHaveBeenCalledTimes(1)

    // update that doesn't change the deps Array
    wrapper.setProps({ value: 2, other: true })

    expect(spy).toHaveBeenCalledTimes(1)

    // second update
    wrapper.setProps({ value: 4, other: true })

    expect(teardown).toBeCalledTimes(1)
    expect(spy).toHaveBeenCalledTimes(2)

    wrapper.unmount()
    expect(teardown).toBeCalledTimes(2)
  })
})
