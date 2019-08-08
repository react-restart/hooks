import React, { useEffect } from 'react'
import { act } from 'react-dom/test-utils'

import { mount } from 'enzyme'

import useSet, { ObservableSet } from '../src/useSet'

describe('useSet', () => {
  describe('ObservableSet', () => {
    it('should implement a Set', () => {
      const set = new ObservableSet(['baz'])

      expect(set.size).toEqual(1)

      set.clear()
      expect(set.size).toEqual(0)

      expect(set.add('foo')).toEqual(set)

      expect(set.has('foo')).toEqual(true)

      expect(set.size).toEqual(1)

      for (const item of set) {
        expect(item).toEqual('foo')
      }

      set.add('bar')

      expect(Array.from(set.values())).toEqual(['foo', 'bar'])
      expect(Array.from(set.keys())).toEqual(['foo', 'bar'])

      expect(set[Symbol.iterator]).toBeDefined()

      expect(set.delete('bar')).toEqual(true)

      expect(set.size).toEqual(1)

      set.clear()
      expect(set.size).toEqual(0)
    })

    it('should be observable', () => {
      const set = new ObservableSet()
      const spy = jest.fn()

      set.observe(spy)

      set.add('foo')
      expect(spy).toHaveBeenCalledTimes(1)

      set.add('baz')
      expect(spy).toHaveBeenCalledTimes(2)

      set.delete('baz')
      expect(spy).toHaveBeenCalledTimes(3)

      set.clear()
      expect(spy).toHaveBeenCalledTimes(4)
    })

    it('should return an unobserve fn', () => {
      const set = new ObservableSet()
      const spy = jest.fn()

      const fn = set.observe(spy)

      fn()

      set.add({})
      expect(spy).not.toBeCalled()
    })

    it('should clear all listeners', () => {
      const set = new ObservableSet()
      const spy = jest.fn()
      const spyB = jest.fn()

      set.observe(spy)
      set.observe(spyB)

      set.add({})
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spyB).toHaveBeenCalledTimes(1)

      set.unobserve()
      set.add('baz')

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spyB).toHaveBeenCalledTimes(1)
    })
  })

  it('should rerender when the set is updated', () => {
    let set
    function Wrapper() {
      set = useSet()
      return <span>{JSON.stringify(Array.from(set))}</span>
    }

    const wrapper = mount(<Wrapper />)

    act(() => {
      set.add('foo')
    })

    expect(wrapper.text()).toEqual('["foo"]')

    act(() => {
      set.add('bar')
    })

    expect(wrapper.text()).toEqual('["foo","bar"]')

    act(() => {
      set.clear()
    })

    expect(wrapper.text()).toEqual('[]')
  })
})
