import { mount } from 'enzyme'
import React, { useEffect } from 'react'
import useTimeout from '../src/useTimeout'

describe('useTimeout', () => {
  it('should set a timeout', () => {
    jest.useFakeTimers()

    let spy = jest.fn()
    let timeout: ReturnType<typeof useTimeout>

    function Wrapper() {
      timeout = useTimeout()

      return <span />
    }

    mount(<Wrapper />)

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

  it('should handle very large timeouts', () => {
    jest.useFakeTimers()

    let spy = jest.fn()
    let timeout: ReturnType<typeof useTimeout>

    function Wrapper() {
      timeout = useTimeout()

      return <span />
    }

    mount(<Wrapper />)

    const MAX = 2 ** 31 - 1

    timeout!.set(spy, MAX + 100)

    // some time to check that it didn't overflow and fire immediately
    jest.runTimersToTime(100)

    expect(spy).toHaveBeenCalledTimes(0)

    jest.runAllTimers()

    expect(spy).toHaveBeenCalledTimes(1)
  })
})
