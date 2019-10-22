import { mount } from 'enzyme'
import React, { useEffect, useState } from 'react'
import { act } from 'react-dom/test-utils'
import useSafeState from '../src/useSafeState'
import useStateAsync from '../src/useStateAsync'

describe('useSafeState', () => {
  it('should work transparently', () => {
    let state

    function Wrapper() {
      state = useSafeState(useState(false))
      return null
    }

    const wrapper = mount(<Wrapper />)

    expect(state[0]).toEqual(false)

    act(() => {
      state[1](true)
    })
    expect(state[0]).toEqual(true)

    wrapper.unmount()

    act(() => {
      state[1](false)
    })
    expect(state[0]).toEqual(true)
  })

  it('should work with async setState', async () => {
    let state

    function Wrapper() {
      state = useSafeState(useStateAsync(false))
      return null
    }

    const wrapper = mount(<Wrapper />)

    expect(state[0]).toEqual(false)

    await act(async () => {
      await state[1](true)
    })

    expect(state[0]).toEqual(true)

    wrapper.unmount()

    await act(async () => {
      await state[1](true)
    })

    expect(state[0]).toEqual(true)
  })
})
