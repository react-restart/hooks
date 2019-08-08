import React, { useEffect } from 'react'
import { act } from 'react-dom/test-utils'

import { mount } from 'enzyme'

import useForceUpdate from '../src/useForceUpdate'

describe('useForceUpdate', () => {
  it('should return a function that returns mount state', () => {
    let forceUpdate: ReturnType<typeof useForceUpdate>
    let count = 0
    function Wrapper() {
      forceUpdate = useForceUpdate()
      count++
      return <span />
    }

    mount(<Wrapper />)

    expect(count).toEqual(1)
    act(() => {
      forceUpdate()
    })

    expect(count).toEqual(2)
  })
})
