import React from 'react'
import { describe, it, expect } from 'vitest'
import useCallbackRef from '../src/useCallbackRef.js'
import useMergedRefs from '../src/useMergedRefs.js'
import { render } from '@testing-library/react'

describe('useMergedRefs', () => {
  it('should work with forwardRef', () => {
    let innerRef: HTMLButtonElement
    const outerRef = React.createRef<HTMLButtonElement>()

    const Button = React.forwardRef<HTMLButtonElement, any>((props, ref) => {
      const [buttonEl, attachRef] = useCallbackRef<HTMLButtonElement>()
      innerRef = buttonEl!

      const mergedRef = useMergedRefs(ref, attachRef)

      return <button ref={mergedRef} {...props} />
    })

    render(<Button ref={outerRef} />)

    expect(innerRef!.tagName).toEqual('BUTTON')
    expect(outerRef.current!.tagName).toEqual('BUTTON')
  })

  it('should work with plain function component', () => {
    let innerRef: HTMLButtonElement
    const outerRef = React.createRef<HTMLButtonElement>()

    const Button = ({ ref }: { ref: React.Ref<HTMLButtonElement> }) => {
      const [buttonEl, attachRef] = useCallbackRef<HTMLButtonElement>()
      innerRef = buttonEl!

      const mergedRef = useMergedRefs(ref, attachRef)

      return <button ref={mergedRef} />
    }

    render(<Button ref={outerRef} />)

    expect(innerRef!.tagName).toEqual('BUTTON')
    expect(outerRef.current!.tagName).toEqual('BUTTON')
  })

  it('should call refs with null when unmounting', () => {
    let innerRef: HTMLButtonElement | null = null

    const outerRef = React.createRef<HTMLButtonElement>()

    function Button({ ref }: { ref: React.Ref<HTMLButtonElement> }) {
      const mergedRef = useMergedRefs(ref, (value) => {
        innerRef = value
      })

      return <button ref={mergedRef} />
    }

    const result = render(<Button ref={outerRef} />)

    expect(innerRef!.tagName).toEqual('BUTTON')
    expect(outerRef.current!.tagName).toEqual('BUTTON')

    result.unmount()

    expect(innerRef).toBeNull()
    expect(outerRef.current).toBeNull()
  })

  it('should call refs cleanup functions', () => {
    let innerRef: HTMLButtonElement | null = null

    const outerRef = React.createRef<HTMLButtonElement>()

    function Button({ ref }: { ref: React.Ref<HTMLButtonElement> }) {
      const mergedRef = useMergedRefs(ref, (value) => {
        innerRef = value

        return () => {
          innerRef = 'hi' as any
        }
      })

      return <button ref={mergedRef} />
    }

    const result = render(<Button ref={outerRef} />)

    expect(innerRef!.tagName).toEqual('BUTTON')
    expect(outerRef.current!.tagName).toEqual('BUTTON')

    result.unmount()

    expect(innerRef).toEqual('hi')
    expect(outerRef.current).toBeNull()
  })
})
