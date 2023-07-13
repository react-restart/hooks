import useDebouncedCallback from '../src/useDebouncedCallback'
import { renderHook, act } from '@testing-library/react-hooks'

describe('useDebouncedCallback', () => {
  it('should return a function that debounces input callback', () => {
    jest.useFakeTimers()
    const spy = jest.fn()

    const { result } = renderHook(() => useDebouncedCallback(spy, 500))

    act(() => {
      result.current(1)
      result.current(2)
      result.current(3)
    })

    expect(spy).not.toHaveBeenCalled()

    jest.runOnlyPendingTimers()

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(3)
  })
})
