import React, { useEffect } from 'react'
import { mount } from 'enzyme'
import useCommittedRef from '../src/useCommittedRef'

describe('useMergeStateFromProps', () => {
  it('should use fresh value', () => {
    function Foo({ fn }: any) {
      const fnRef = useCommittedRef(fn)

      useEffect(() => {
        fnRef.current()
      }, [])

      return null
    }

    const spyA = jest.fb()
    const spyB = jest.fb()
    const wrapper = mount(<Foo fn={spyA} />)

    wrapper.setProps({ fn: spyB })
    expect(spyA).toHaveBeenCalled(1)
    expect(spyB).toHaveBeenCalled(1)
  })
})
