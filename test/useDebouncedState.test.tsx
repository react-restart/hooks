import React from 'react'
import { render, act } from '@testing-library/react'
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

    const wrapper = render(<Wrapper />)
    expect(wrapper.getByText('0')).toBeTruthy()

    outerSetValue((cur: number) => cur + 1)
    outerSetValue((cur: number) => cur + 1)
    outerSetValue((cur: number) => cur + 1)
    outerSetValue((cur: number) => cur + 1)
    outerSetValue((cur: number) => cur + 1)

    expect(wrapper.getByText('0')).toBeTruthy()

    act(() => {
      jest.runOnlyPendingTimers()
    })
    expect(wrapper.getByText('1')).toBeTruthy()
  })
})
