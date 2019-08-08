import React, { useEffect } from 'react'
import { act } from 'react-dom/test-utils'

import { mount } from 'enzyme'

import useMap, { ObservableMap } from '../src/useMap'

describe('useMap', () => {
  describe('ObservableMap', () => {
    it('should implement a Map', () => {
      const map = new ObservableMap([['baz', false]])

      expect(map.size).toEqual(1)

      map.clear()
      expect(map.size).toEqual(0)

      expect(map.set('foo', true)).toEqual(map)

      expect(map.get('foo')).toEqual(true)

      expect(map.size).toEqual(1)

      for (const item of map) {
        expect(item[0]).toEqual('foo')
        expect(item[1]).toEqual(true)
      }

      map.set('bar', false)

      expect(Array.from(map.values())).toEqual([true, false])
      expect(Array.from(map.keys())).toEqual(['foo', 'bar'])

      expect(map[Symbol.iterator]).toBeDefined()

      expect(map.delete('bar')).toEqual(true)

      expect(map.size).toEqual(1)

      map.clear()
      expect(map.size).toEqual(0)
    })

    it('should be observable', () => {
      const map = new ObservableMap()
      const spy = jest.fn()

      map.observe(spy)

      map.set('foo', true)
      expect(spy).toHaveBeenCalledTimes(1)

      map.set('baz', 3)
      expect(spy).toHaveBeenCalledTimes(2)

      map.delete('baz')
      expect(spy).toHaveBeenCalledTimes(3)

      map.clear()
      expect(spy).toHaveBeenCalledTimes(4)
    })

    it('should return an unobserve fn', () => {
      const map = new ObservableMap()
      const spy = jest.fn()

      const fn = map.observe(spy)

      fn()

      map.set({}, true)
      expect(spy).not.toBeCalled()
    })

    it('should clear all listeners', () => {
      const map = new ObservableMap()
      const spy = jest.fn()
      const spyB = jest.fn()

      map.observe(spy)
      map.observe(spyB)

      map.set({}, true)
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spyB).toHaveBeenCalledTimes(1)

      map.unobserve()
      map.set('baz', 3)

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spyB).toHaveBeenCalledTimes(1)
    })
  })

  it('should rerender when the map is updated', () => {
    let map
    function Wrapper() {
      map = useMap()
      return <span>{JSON.stringify(Array.from(map.entries()))}</span>
    }

    const wrapper = mount(<Wrapper />)

    act(() => {
      map.set('foo', true)
    })

    expect(wrapper.text()).toEqual('[["foo",true]]')

    act(() => {
      map.set('bar', true)
    })

    expect(wrapper.text()).toEqual('[["foo",true],["bar",true]]')

    act(() => {
      map.clear()
    })

    expect(wrapper.text()).toEqual('[]')
  })
})
