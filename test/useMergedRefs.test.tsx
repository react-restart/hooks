import React from 'react'
import { mount } from 'enzyme'
import { useCallbackRef } from '../src'
import useMergedRefs from '../src/useMergedRefs'

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

    // enzyme swallows the ref
    function Wrapper() {
      return <Button ref={outerRef} />
    }
    mount(<Wrapper />)

    expect(innerRef!.tagName).toEqual('BUTTON')
    expect(outerRef.current!.tagName).toEqual('BUTTON')
  })
})
