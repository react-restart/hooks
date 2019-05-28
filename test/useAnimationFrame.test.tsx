import React, { useEffect } from 'react'
import { mount } from 'enzyme'

import useAnimationFrame from '../src/useAnimationFrame'

describe('useAnimationFrame', () => {
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
    let animationFrame: ReturnType<typeof useAnimationFrame>

    function Wrapper() {
      animationFrame = useAnimationFrame()

      return <span />
    }

    mount(<Wrapper />)

    animationFrame!.request(spy)

    expect(spy).not.toHaveBeenCalled()

    jest.runAllTimers()

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should cancel a request', () => {
    jest.useFakeTimers()

    let spy = jest.fn()
    let animationFrame: ReturnType<typeof useAnimationFrame>

    function Wrapper() {
      animationFrame = useAnimationFrame()

      return <span />
    }

    mount(<Wrapper />)

    animationFrame!.request(spy)

    animationFrame!.cancel()

    jest.runAllTimers()

    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should cancel a request on unmount', () => {
    jest.useFakeTimers()

    let spy = jest.fn()
    let animationFrame: ReturnType<typeof useAnimationFrame>

    function Wrapper() {
      animationFrame = useAnimationFrame()

      return <span />
    }

    const wrapper = mount(<Wrapper />)

    animationFrame!.request(spy)

    wrapper.unmount()

    jest.runAllTimers()

    expect(spy).toHaveBeenCalledTimes(0)
  })
})
