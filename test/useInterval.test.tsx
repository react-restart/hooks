import React, { useEffect } from 'react'

import { mount } from 'enzyme'

import useInterval from '../src/useInterval'

describe('useTimeout', () => {
  it('should set an interval', () => {
    jest.useFakeTimers()

    let spy = jest.fn()

    function Wrapper() {
      useInterval(spy, 100);

      return <span />
    }

    mount(<Wrapper />)

    expect(spy).not.toHaveBeenCalled()
    jest.runOnlyPendingTimers()
    expect(spy).toHaveBeenCalledTimes(1)
    jest.runOnlyPendingTimers()
    expect(spy).toHaveBeenCalledTimes(2)
  })

  it('should run immediately when argument is set', () => {
    jest.useFakeTimers()
    let spy = jest.fn()

    function Wrapper() {
      useInterval(spy, 100, false, true);

      return <span />
    }

    mount(<Wrapper />)

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should not run when paused', () => {
    jest.useFakeTimers()
    let spy = jest.fn()

    function Wrapper() {
      useInterval(spy, 100, true);

      return <span />
    }

    mount(<Wrapper />)

    jest.runOnlyPendingTimers()
    expect(spy).not.toHaveBeenCalled()
  })

  it('should stop running on unmount', () => {
    jest.useFakeTimers()
    let spy = jest.fn()

    function Wrapper() {
      useInterval(spy, 100);

      return <span />
    }

    const wrapper = mount(<Wrapper />)
    wrapper.unmount()

    jest.runOnlyPendingTimers()
    expect(spy).not.toHaveBeenCalled()
  })
})
