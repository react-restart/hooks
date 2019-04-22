import React, { useEffect } from 'react'
import { mount } from 'enzyme'
import useCommittedRef from '../src/useCommittedRef'

describe('useCommittedRef', () => {
  it('should use fresh value', () => {
    function Foo({ fn }) {
      const fnRef = useCommittedRef(fn)

      useEffect(() => {
        fnRef.current()
      })

      return null
    }

    const spyA = jest.fn()
    const spyB = jest.fn()
    const wrapper = mount(<Foo fn={spyA} />)

    wrapper.setProps({ fn: spyB })
    expect(spyA).toHaveBeenCalledTimes(1)
    expect(spyB).toHaveBeenCalledTimes(1)
  })
})
