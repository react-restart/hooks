import React, { useLayoutEffect } from 'react'

import { mount } from 'enzyme'
import useIsomorphicEffect from '../src/useIsomorphicEffect'

describe('useIsomorphicEffect', () => {
  it('should not run or warn', () => {
    let spy = jest.fn()

    expect(useIsomorphicEffect).toEqual(useLayoutEffect)

    const Wrapper = () => {
      useIsomorphicEffect(spy)
      return null
    }

    mount(<Wrapper />)
    expect(spy).toBeCalled()
  })
})
