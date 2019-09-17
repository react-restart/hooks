import { mount } from 'enzyme'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { useAsyncSetState } from '../src/useAsyncSetState'

describe('useAsyncSetState', () => {
  it('should increment counter', async () => {
    let asyncState

    type TestState = {
      counter: number
      label: string
    }

    function Wrapper() {
      asyncState = useAsyncSetState<TestState>({ label: 'hey', counter: 0 })
      return null
    }

    mount(<Wrapper />)

    const incrementAsync = async () => {
      await act(() =>
        asyncState[1]({
          ...asyncState[0],
          counter: asyncState[0].counter + 1,
        }),
      )
    }

    expect(asyncState[0].counter).toEqual(0)
    await incrementAsync()
    expect(asyncState[0].counter).toEqual(1)
    await incrementAsync()
    expect(asyncState[0].counter).toEqual(2)
    await incrementAsync()
    expect(asyncState[0].counter).toEqual(3)

    expect(asyncState[0].label).toEqual('hey')
  })
})
