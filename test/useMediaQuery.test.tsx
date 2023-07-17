import useMediaQuery from '../src/useMediaQuery'
import { renderHook, act } from '@testing-library/react'

describe('useMediaQuery', () => {
  it('should match immediately if possible', () => {
    const wrapper = renderHook(useMediaQuery, {
      initialProps: 'min-width: 100px',
    })

    expect(window.innerWidth).toBeGreaterThanOrEqual(100)
    expect(wrapper.result.current).toEqual(true)

    act(() => {
      wrapper.rerender('min-width: 2000px')
    })

    expect(window.innerWidth).toBeLessThanOrEqual(2000)
    expect(wrapper.result.current).toEqual(false)
  })

  it('should clear if no media is passed', () => {
    const wrapper = renderHook(useMediaQuery, {
      initialProps: null,
    })

    expect(wrapper.result.current).toEqual(false)

    act(() => {
      wrapper.rerender('')
    })

    expect(wrapper.result.current).toEqual(false)
  })
})
