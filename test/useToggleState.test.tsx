import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import useToggleState from '../src/useToggleState'

describe('useToggleState', () => {
  it('should toggle', () => {
    let toggleState: ReturnType<typeof useToggleState>

    function Wrapper({ initial }: { initial?: boolean }) {
      toggleState = useToggleState(initial)
      return <span />
    }

    const wrapper = mount(<Wrapper />)

    expect(toggleState![0]).toEqual(false)

    act(() => toggleState[1]())

    expect(toggleState![0]).toEqual(true)

    act(() => toggleState[1](true))

    expect(toggleState![0]).toEqual(true)

    act(() => toggleState[1]())

    expect(toggleState![0]).toEqual(false)
  })
})
