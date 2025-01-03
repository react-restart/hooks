import React, { useEffect, useState } from 'react'

import useDebouncedValue from '../src/useDebouncedValue.js'
import { act, render, renderHook, waitFor } from '@testing-library/react'

describe('useDebouncedValue', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  it('should return a function that debounces input callback', async () => {
    let count = 0

    const { rerender, result } = renderHook(
      ({ value }) => {
        const debouncedValue = useDebouncedValue(value, 500)

        useEffect(() => {
          count++
        }, [debouncedValue])

        return debouncedValue
      },
      { initialProps: { value: 0 } },
    )

    act(() => {
      expect(result.current).toBe(0)

      rerender({ value: 1 })
      rerender({ value: 2 })
      rerender({ value: 3 })
      rerender({ value: 4 })
      rerender({ value: 5 })

      expect(result.current).toBe(0)

      jest.runAllTimers()
    })

    await waitFor(() => expect(result.current).toBe(5))

    expect(count).toBe(2)
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
