import useMutationObserver from '../src/useMutationObserver'
import useCallbackRef from '../src/useCallbackRef'
import React from 'react'
import { mount } from 'enzyme'

describe('useMutationObserver', () => {
  it('should add a mutation observer', async () => {
    const teardown = jest.fn()
    const spy = jest.fn(() => teardown)

    function Wrapper(props) {
      const [el, attachRef] = useCallbackRef()

      useMutationObserver(el, { attributes: true }, spy)

      return <div ref={attachRef} {...props} />
    }

    const wrapper = mount(<Wrapper />)

    expect(spy).toHaveBeenCalledTimes(0)

    wrapper.setProps({ role: 'button' })

    await Promise.resolve()

    expect(spy).toHaveBeenCalledTimes(1)

    expect(spy).toHaveBeenCalledWith(
      [
        expect.objectContaining({
          type: 'attributes',
          attributeName: 'role',
        }),
      ],
      expect.anything(),
    )
    // coverage on the teardown
    wrapper.unmount()
  })
})
