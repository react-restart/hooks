import { render, act } from '@testing-library/react'
import useDebouncedState from '../src/useDebouncedState.js'
import { describe, it, vi, expect } from 'vitest'

describe('useDebouncedState', () => {
  it('should return a function that debounces input callback', () => {
    vi.useFakeTimers()

    let outerSetValue

    function Wrapper() {
      const [value, setValue] = useDebouncedState(0, 500)
      outerSetValue = setValue
      return <span>{value}</span>
    }

    const wrapper = render(<Wrapper />)
    expect(wrapper.getByText('0')).toBeTruthy()

    act(() => {
      outerSetValue((cur: number) => cur + 1)
      outerSetValue((cur: number) => cur + 1)
      outerSetValue((cur: number) => cur + 1)
      outerSetValue((cur: number) => cur + 1)
      outerSetValue((cur: number) => cur + 1)
    })

    expect(wrapper.getByText('0')).toBeTruthy()

    act(() => {
      vi.runOnlyPendingTimers()
    })
    expect(wrapper.getByText('1')).toBeTruthy()
  })
})
