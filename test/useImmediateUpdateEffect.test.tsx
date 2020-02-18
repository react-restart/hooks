import useImmediateUpdateEffect from '../src/useImmediateUpdateEffect'
import { renderHook } from './helpers'

describe('useImmediateUpdateEffect', () => {
  it('should run update after value changes', () => {
    const spy = jest.fn()

    const [, wrapper] = renderHook(
      ({ value }) => {
        useImmediateUpdateEffect(spy, [value])
      },
      { value: 1, other: false },
    )

    expect(spy).not.toHaveBeenCalled()

    wrapper.setProps({ value: 2 })

    expect(spy).toHaveBeenCalledTimes(1)

    wrapper.setProps({ value: 2, other: true })

    expect(spy).toHaveBeenCalledTimes(1)
  })
})
