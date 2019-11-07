import { ReactWrapper, mount } from 'enzyme'
import React from 'react'

export function renderHook<T extends (props: P) => any, P = any>(
  fn: T,
  initialProps?: P,
): [ReturnType<T>, ReactWrapper<P>] {
  const result = Array(2) as any

  function Wrapper(props: any) {
    result[0] = fn(props)
    return <span />
  }

  result[1] = mount(<Wrapper {...initialProps} />)

  return result
}
