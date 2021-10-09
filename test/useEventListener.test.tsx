import { act, renderHook } from '@testing-library/react-hooks'
import userEvent from '@testing-library/user-event'
import useEventListener from '../src/useEventListener'

describe('useEventListener', () => {
  it('should firen on event', () => {
    const button = document.createElement('button')

    const doClick = () => {
      userEvent.click(button)
    }

    let spy = jest.fn()

    renderHook(() => useEventListener(button, 'click', spy))

    expect(spy).not.toHaveBeenCalled()

    act(doClick)

    expect(spy).toHaveBeenCalledTimes(1)

    act(doClick)
    expect(spy).toHaveBeenCalledTimes(2)
  })

  it('should remove event listener on unmount', () => {
    const button = document.createElement('button')

    const doClick = () => {
      userEvent.click(button)
    }

    let spy = jest.fn()

    const { unmount } = renderHook(() => useEventListener(button, 'click', spy))

    unmount()

    act(doClick)

    expect(spy).not.toHaveBeenCalled()
  })

  it('should handle event listener change', () => {
    const button = document.createElement('button')

    const doClick = () => {
      userEvent.click(button)
    }

    const spy1 = jest.fn()
    const spy2 = jest.fn()

    const { rerender } = renderHook(
      ({ listener }) => useEventListener(button, 'click', listener),
      { initialProps: { listener: spy1 } },
    )

    expect(spy1).not.toHaveBeenCalled()
    expect(spy2).not.toHaveBeenCalled()

    act(doClick)

    expect(spy1).toHaveBeenCalledTimes(1)
    expect(spy2).not.toHaveBeenCalled()

    rerender({ listener: spy2 })

    expect(spy1).toHaveBeenCalledTimes(1)
    expect(spy2).not.toHaveBeenCalled()

    act(doClick)

    expect(spy1).toHaveBeenCalledTimes(1)
    expect(spy2).toHaveBeenCalledTimes(1)
  })
})
