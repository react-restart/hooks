import React from 'react'
import { mount } from 'enzyme'
import useMergeStateFromProps from '../src/useMergeStateFromProps'

describe('useMergeStateFromProps', () => {
  it('should adjust state when props change', () => {
    const updates = [] as Array<{ props: any; state: any }>

    const getDerivedStateFromProps = (
      nextProps: { foo: any },
      prevState: { lastFoo: any },
    ) => {
      if (nextProps.foo === prevState.lastFoo) return null

      return { bar: 3, lastFoo: nextProps.foo }
    }

    function Foo(props: { foo: any }) {
      const [state] = useMergeStateFromProps(props, getDerivedStateFromProps, {
        lastFoo: props.foo,
      })

      updates.push({ props, state })
      return <div>{JSON.stringify(state)}</div>
    }

    const wrapper = mount(<Foo foo={1} />)

    expect(updates[0].state).toEqual({ lastFoo: 1 })
    wrapper.setProps({ foo: 2 })

    // render with new props, rerender with state change
    expect(updates).toHaveLength(3)
    expect(updates[2].state).toEqual({ lastFoo: 2, bar: 3 })

    wrapper.setProps({ foo: 2, biz: true })

    // render with props, no update
    expect(updates).toHaveLength(4)

    wrapper.setProps({ foo: 3 })

    // render with new props, rerender with state change
    expect(updates).toHaveLength(6)
  })

  it('should adjust state when props change', () => {
    type Props = { foo: number }
    type State = { lastFoo: number }
    const updates = []

    function Foo(props: { foo: any }) {
      const [state, setState] = useMergeStateFromProps<Props, State>(
        props,
        (nextProps, prevState, prevProps: any) => {
          if (nextProps.foo === prevState.lastFoo) return null

          return { bar: 3, lastFoo: nextProps.foo }
        },
        { lastFoo: props.foo },
      )

      updates.push({ props, state })
      return <div>{JSON.stringify(state)}</div>
    }

    const wrapper = mount(<Foo foo={1} />)

    wrapper.setProps({ foo: 2 })
  })
})
