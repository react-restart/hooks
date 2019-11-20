import React, { useEffect } from 'react'

import { mount } from 'enzyme'

import useTimeout from '../src/useTimeout'

describe('useTimeoue', () => {
  it('should set a timeout', () => {
    jest.useFakeTimers()

    let spy = jest.fn()
    let timeout: ReturnType<typeof useTimeout>

    function Wrapper() {
      timeout = useTimeout()

      return <span />
    }

    const wrapper = mount(<Wrapper />)

    timeout!.set(spy, 100)

    expect(spy).not.toHaveBeenCalled()

    jest.runAllTimers()

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should clear a timeout', () => {
    jest.useFakeTimers()

    let spy = jest.fn()
    let timeout: ReturnType<typeof useTimeout>

    function Wrapper() {
      timeout = useTimeout()

      return <span />
    }

    mount(<Wrapper />)

    timeout!.set(spy, 100)

    timeout!.clear()

    jest.runAllTimers()

    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should clear a timeout on unmount', () => {
    jest.useFakeTimers()

    let spy = jest.fn()
    let timeout: ReturnType<typeof useTimeout>

    function Wrapper() {
      timeout = useTimeout()

      return <span />
    }

    const wrapper = mount(<Wrapper />)

    timeout!.set(spy, 100)

    wrapper.unmount()

    jest.runAllTimers()

    expect(spy).toHaveBeenCalledTimes(0)
  })
})
