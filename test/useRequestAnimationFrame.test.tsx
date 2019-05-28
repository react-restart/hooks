import React, { useEffect } from 'react'
import { mount } from 'enzyme'

import useRequestAnimationFrame from '../src/useRequestAnimationFrame'

describe('useRequestAnimationFrame', () => {
  let rafSpy, rafCancelSpy

  beforeAll(() => {
    rafSpy = jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation(cb => {
        return setTimeout(() => cb(1))
      })

    rafCancelSpy = jest
      .spyOn(window, 'cancelAnimationFrame')
      .mockImplementation(handle => {
        clearTimeout(handle)
      })
  })

  afterAll(() => {
    rafSpy.mockRestore()
    rafCancelSpy.mockRestore()
  })

  it('should requestAnimationFrame', () => {
    jest.useFakeTimers()

    let spy = jest.fn()
    let timeout: ReturnType<typeof useRequestAnimationFrame>

    function Wrapper() {
      timeout = useRequestAnimationFrame()

      return <span />
    }

    mount(<Wrapper />)

    timeout!.request(spy)

    expect(spy).not.toHaveBeenCalled()

    jest.runAllTimers()

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should cancel a request', () => {
    jest.useFakeTimers()

    let spy = jest.fn()
    let timeout: ReturnType<typeof useRequestAnimationFrame>

    function Wrapper() {
      timeout = useRequestAnimationFrame()

      return <span />
    }

    mount(<Wrapper />)

    timeout!.request(spy)

    timeout!.cancel()

    jest.runAllTimers()

    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should cancel a request on unmount', () => {
    jest.useFakeTimers()

    let spy = jest.fn()
    let timeout: ReturnType<typeof useRequestAnimationFrame>

    function Wrapper() {
      timeout = useRequestAnimationFrame()

      return <span />
    }

    const wrapper = mount(<Wrapper />)

    timeout!.request(spy)

    wrapper.unmount()

    jest.runAllTimers()

    expect(spy).toHaveBeenCalledTimes(0)
  })
})
