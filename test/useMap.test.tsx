import useMap, { ObservableMap } from '../src/useMap'

import React from 'react'
import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'

describe('useMap', () => {
  describe('ObservableMap', () => {
    it('should implement a Map', () => {
      const map = new ObservableMap(() => {}, [['baz', false]])

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
      const spy = jest.fn()
      const map = new ObservableMap(spy)

      map.set('foo', true)
      expect(spy).toHaveBeenCalledTimes(1)

      map.set('baz', 3)
      expect(spy).toHaveBeenCalledTimes(2)

      map.delete('baz')
      expect(spy).toHaveBeenCalledTimes(3)

      map.clear()
      expect(spy).toHaveBeenCalledTimes(4)
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
