import React from 'react'
import useCallbackRef from '../src/useCallbackRef'
import useMergedRefs from '../src/useMergedRefs'
import { render } from '@testing-library/react'

describe('useMergedRefs', () => {
  it('should return a function that returns mount state', () => {
    let innerRef: HTMLButtonElement
    const outerRef = React.createRef<HTMLButtonElement>()

    const Button = React.forwardRef((props, ref) => {
      const [buttonEl, attachRef] = useCallbackRef<HTMLButtonElement>()
      innerRef = buttonEl!

      const mergedRef = useMergedRefs(ref, attachRef)

      return <button ref={mergedRef} {...props} />
    })

    const result = render(<Button ref={outerRef} />)

    expect(innerRef!.tagName).toEqual('BUTTON')
    expect(outerRef.current!.tagName).toEqual('BUTTON')
  })
})
