import React, { useEffect, useState } from 'react'

import useDebouncedValue from '../src/useDebouncedValue'
import { act, render } from '@testing-library/react'

describe('useDebouncedValue', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  it('should return a function that debounces input callback', () => {
    let count = 0
    function Wrapper({ value }) {
      const debouncedValue = useDebouncedValue(value, 500)

      useEffect(() => {
        count++
      }, [debouncedValue])

      return <span>{debouncedValue}</span>
    }

    const { rerender, getByText } = render(<Wrapper value={0} />)

    act(() => {
      expect(getByText('0')).toBeTruthy()

      rerender(<Wrapper value={1} />)
      rerender(<Wrapper value={2} />)
      rerender(<Wrapper value={3} />)
      rerender(<Wrapper value={4} />)
      rerender(<Wrapper value={5} />)

      expect(getByText('0')).toBeTruthy()

      jest.runAllTimers()

      expect(getByText('5')).toBeTruthy()
      expect(count).toBe(2)
    })
  })

  it('will update value immediately if leading is set to true', () => {
    function Wrapper({ text }) {
      const value = useDebouncedValue(text, { wait: 1000, leading: true })
      return <div role="test">{value}</div>
    }
    const { rerender, getByText } = render(<Wrapper text={'Hello'} />)

    expect(getByText('Hello')).toBeTruthy()

    act(() => {
      rerender(<Wrapper text={'Hello world'} />)
    })

    expect(getByText('Hello world')).toBeTruthy()

    act(() => {
      rerender(<Wrapper text={'Hello again'} />)
    })

    // timeout shouldn't have been called yet after leading call was executed
    expect(getByText('Hello world')).toBeTruthy()

    act(() => {
      jest.runAllTimers()
    })

    expect(getByText('Hello again')).toBeTruthy()
  })

  it('should use isEqual function if supplied', () => {
    const isEqual = jest.fn((_left: string, _right: string): boolean => true)

    function Wrapper({ text }) {
      const value = useDebouncedValue(text, { wait: 1000, isEqual })
      return <div role="test">{value}</div>
    }

    const { rerender, getByRole } = render(<Wrapper text={'Hello'} />)

    expect(isEqual).toHaveBeenCalledTimes(1)

    act(() => {
      rerender(<Wrapper text="Test" />)

      jest.runAllTimers()
    })

    expect(isEqual).toHaveBeenCalledTimes(2)
    expect(isEqual).toHaveBeenCalledWith('Hello', 'Test')

    expect(getByRole('test').textContent).toEqual('Hello')
  })
})
