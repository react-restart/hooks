import React from 'react'
import { mount } from 'enzyme'
import useDebouncedCallback from '../src/useDebouncedCallback'

describe('useDebouncedCallback', () => {
  it('should return a function that debounces input callback', () => {
    jest.useFakeTimers()
    const spy = jest.fn()

    let debouncedFn;

    function Wrapper() {
      debouncedFn = useDebouncedCallback(spy, 500)
      return <span />
    }

    mount(<Wrapper />)

    debouncedFn(1)
    debouncedFn(2)
    debouncedFn(3)
    expect(spy).not.toHaveBeenCalled()

    jest.runOnlyPendingTimers()
    
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(3)
  })
})
