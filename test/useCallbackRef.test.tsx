import React, { useEffect } from 'react'
import { render, act } from '@testing-library/react'

import useCallbackRef from '../src/useCallbackRef.js'

describe('useCallbackRef', () => {
  it('should update value and be fresh in an effect', () => {
    const effectSpy = jest.fn()

    function Wrapper({ toggle }) {
      const [ref, attachRef] = useCallbackRef<
        HTMLDivElement | HTMLSpanElement
      >()

      useEffect(() => {
        effectSpy(ref)
      }, [ref])

      return toggle ? <div ref={attachRef} /> : <span ref={attachRef} />
    }

    const wrapper = render(<Wrapper toggle={false} />)

    expect(wrapper.container.getElementsByTagName('span')).toHaveLength(1)
    expect(effectSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({ tagName: 'SPAN' }),
    )

    act(() => {
      wrapper.rerender(<Wrapper toggle={true} />)
    })

    expect(wrapper.container.getElementsByTagName('div')).toHaveLength(1)
    expect(effectSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({ tagName: 'DIV' }),
    )
  })
})
