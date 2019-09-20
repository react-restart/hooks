import { mount } from 'enzyme'
import React from 'react'
import { act } from 'react-dom/test-utils'
import useStateAsync, { AsyncSetState } from '../src/useStateAsync'

describe('useStateAsync', () => {
  it('should increment counter', async () => {
    let asyncState: [number, AsyncSetState<number>]

    function Wrapper() {
      asyncState = useStateAsync<number>(0)
      return null
    }

    mount(<Wrapper />)

    expect.assertions(4)

    const incrementAsync = async () => {
      await act(() => asyncState[1](prev => prev + 1))
    }

    expect(asyncState![0]).toEqual(0)

    await incrementAsync()
    expect(asyncState![0]).toEqual(1)

    await incrementAsync()
    expect(asyncState![0]).toEqual(2)

    await incrementAsync()
    expect(asyncState![0]).toEqual(3)
  })

  it('should reject on error', async () => {
    let asyncState: [number, AsyncSetState<number>]

    function Wrapper() {
      asyncState = useStateAsync<number>(1)
      return null
    }
    class CatchError extends React.Component {
      static getDerivedStateFromError() {}
      componentDidCatch() {}
      render() {
        return this.props.children
      }
    }

    mount(
      <CatchError>
        <Wrapper />
      </CatchError>,
    )

    // @ts-ignore
    expect.errors(1)

    await act(async () => {
      const p = asyncState[1](() => {
        throw new Error('yo')
      })
      return expect(p).rejects.toThrow('yo')
    })
  })

  it('should resolve even if no update happens', async () => {
    let asyncState: [number, AsyncSetState<number>]

    function Wrapper() {
      asyncState = useStateAsync<number>(1)
      return null
    }

    mount(<Wrapper />)

    expect.assertions(3)

    expect(asyncState![0]).toEqual(1)

    await act(() => expect(asyncState[1](1)).resolves.toEqual(1))

    expect(asyncState![0]).toEqual(1)
  })

  it('should resolve after update if already pending', async () => {
    let asyncState: [number, AsyncSetState<number>]

    function Wrapper() {
      asyncState = useStateAsync<number>(0)
      return null
    }

    mount(<Wrapper />)

    expect.assertions(5)

    expect(asyncState![0]).toEqual(0)

    const setAndAssert = async (n: number) =>
      expect(asyncState[1](n)).resolves.toEqual(2)

    await act(() =>
      Promise.all([setAndAssert(1), setAndAssert(1), setAndAssert(2)]),
    )

    expect(asyncState![0]).toEqual(2)
  })
})
