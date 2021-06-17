import { renderHook, act } from '@testing-library/react-hooks'
import useAnimationFrame from '../src/useAnimationFrame'

describe('useAnimationFrame', () => {
  let rafSpy, rafCancelSpy

  beforeAll(() => {
    rafSpy = jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((cb) => {
        return setTimeout(() => cb(1)) as any
      })

    rafCancelSpy = jest
      .spyOn(window, 'cancelAnimationFrame')
      .mockImplementation((handle) => {
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

    const { result } = renderHook(useAnimationFrame)

    act(() => result.current!.request(spy))

    expect(spy).not.toHaveBeenCalled()

    jest.runAllTimers()

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should cancel a request', () => {
    jest.useFakeTimers()

    let spy = jest.fn()
    const { result } = renderHook(useAnimationFrame)

    act(() => {
      result.current.request(spy)

      result.current.cancel()
    })
    jest.runAllTimers()

    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should cancel a request on unmount', () => {
    jest.useFakeTimers()

    let spy = jest.fn()
    const { result, unmount } = renderHook(useAnimationFrame)

    act(() => result.current!.request(spy))

    unmount()

    jest.runAllTimers()

    expect(spy).toHaveBeenCalledTimes(0)
  })
})
