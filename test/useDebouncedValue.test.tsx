import React, { useEffect } from 'react'

import useDebouncedValue from '../src/useDebouncedValue'
import { act, render } from '@testing-library/react'

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

    const { rerender, getByText } = render(<Wrapper value={0} />)

    act(() => {
      expect(getByText('0')).toBeTruthy()

      rerender(<Wrapper value={1} />)
      rerender(<Wrapper value={2} />)
      rerender(<Wrapper value={3} />)
      rerender(<Wrapper value={4} />)
      rerender(<Wrapper value={5} />)
    })

    expect(getByText('0')).toBeTruthy()

    act(() => {
      jest.runAllTimers()
    })

    expect(getByText('5')).toBeTruthy()
    expect(count).toBe(2)
  })
})
