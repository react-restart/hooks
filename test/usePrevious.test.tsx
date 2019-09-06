import React from 'react'
import { mount } from 'enzyme'
import usePrevious from '../src/usePrevious'

describe('usePrevious', () => {
  it('should return a function that returns mount state', () => {
    let prevFoo

    function Wrapper({ foo }) {
      prevFoo = usePrevious(foo)
      return <span />
    }

    const wrapper = mount(<Wrapper foo={true} />)

    expect(prevFoo).toEqual(null)

    wrapper.setProps({ foo: false })

    expect(prevFoo).toEqual(true)
  })
})
