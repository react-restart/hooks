import React, { useEffect } from 'react'
import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'

import useCallbackRef from '../src/useCallbackRef'

describe('useCallbackRef', () => {
  it('should update value and be fresh in an effect', () => {
    const effectSpy = jest.fn()

    function Wrapper({ toggle }) {
      const [ref, attachRef] = useCallbackRef<
        HTMLDivElement | HTMLSpanElement
      >()

      useEffect(() => {
        effectSpy(ref)
      }, [ref])

      return toggle ? <div ref={attachRef} /> : <span ref={attachRef} />
    }

    const wrapper = mount(<Wrapper toggle={false} />)

    expect(wrapper.children().type()).toEqual('span')
    expect(effectSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({ tagName: 'SPAN' }),
    )

    act(() => {
      wrapper.setProps({ toggle: true })
    })

    expect(wrapper.children().type()).toEqual('div')
    expect(effectSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({ tagName: 'DIV' }),
    )
  })
})
