import React, { useEffect, useState } from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import useDebouncedValue from '../src/useDebouncedValue'

describe('useDebouncedValue', () => {
  it('should return a function that debounces input callback', () => {
    jest.useFakeTimers()

    let count = 0
    function Wrapper({ value }) {
      const debouncedValue = useDebouncedValue(value, 500)

      useEffect(() => {
        count++
      }, [debouncedValue])

      return <span>{debouncedValue}</span>
    }

    act(() => {
      const wrapper = mount(<Wrapper value={0} />)
      expect(wrapper.text()).toBe('0')

      wrapper.setProps({ value: 1 })
      wrapper.setProps({ value: 2 })
      wrapper.setProps({ value: 3 })
      wrapper.setProps({ value: 4 })
      wrapper.setProps({ value: 5 })

      expect(wrapper.text()).toBe('0')

      jest.runAllTimers()

      expect(wrapper.text()).toBe('5')
      expect(count).toBe(2)
    })
  })
})
