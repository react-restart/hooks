import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import useDebouncedState from '../src/useDebouncedState'

describe('useDebouncedState', () => {
  it('should return a function that debounces input callback', () => {
    jest.useFakeTimers()

    let outerSetValue

    function Wrapper() {
      const [value, setValue] = useDebouncedState(0, 500)
      outerSetValue = setValue
      return <span>{value}</span>
    }

    const wrapper = mount(<Wrapper />)
    expect(wrapper.text()).toBe('0')

    outerSetValue((cur: number) => cur + 1)
    outerSetValue((cur: number) => cur + 1)
    outerSetValue((cur: number) => cur + 1)
    outerSetValue((cur: number) => cur + 1)
    outerSetValue((cur: number) => cur + 1)

    expect(wrapper.text()).toBe('0')

    act(() => {
      jest.runOnlyPendingTimers()
    })
    
    expect(wrapper.text()).toBe('1')
  })
})
