import React, { useEffect } from 'react'

import { mount } from 'enzyme'

import useWillUnmount from '../src/useWillUnmount'

describe('useWillUnmount', () => {
  it('should return a function that returns mount state', () => {
    let spy = jest.fn()

    function Wrapper() {
      useWillUnmount(spy)
      return <span />
    }

    const wrapper = mount(<Wrapper />)

    expect(spy).not.toHaveBeenCalled()

    wrapper.unmount()

    expect(spy).toHaveBeenCalledTimes(1)
  })
})
