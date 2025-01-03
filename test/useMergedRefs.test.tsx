import React from 'react'
import useCallbackRef from '../src/useCallbackRef.js'
import useMergedRefs from '../src/useMergedRefs.js'
import { render } from '@testing-library/react'

describe('useMergedRefs', () => {
  it('should return a function that returns mount state', () => {
    let innerRef: HTMLButtonElement
    const outerRef = React.createRef<HTMLButtonElement>()

    const Button = React.forwardRef<HTMLButtonElement, any>((props, ref) => {
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
