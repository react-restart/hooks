import React from 'react'
import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import useMounted from '../src/useMounted'

describe('useMounted', () => {
  it('should return a function that returns mount state', () => {
    let isMounted

    function Wrapper() {
      isMounted = useMounted()
      return <span />
    }

    const wrapper = mount(<Wrapper />)

    expect(isMounted()).toEqual(true)

    wrapper.unmount()

    expect(isMounted()).toEqual(false)
  })
})
