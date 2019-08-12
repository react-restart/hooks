import React from 'react'
import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import useMediaQuery from '../src/useMediaQuery'

describe('useMediaQuery', () => {
  it('should match immediately if possible', () => {
    let matches
    const Wrapper = ({ media }) => {
      matches = useMediaQuery(media)
      return null
    }

    const wrapper = mount(<Wrapper media="min-width: 100px" />)

    expect(window.innerWidth).toBeGreaterThanOrEqual(100)
    expect(matches).toEqual(true)

    wrapper.setProps({ media: 'min-width: 2000px' })

    expect(window.innerWidth).toBeLessThanOrEqual(2000)
    expect(matches).toEqual(false)
  })

  it('should clear if no media is passed', () => {
    let matches
    const Wrapper = ({ media }) => {
      matches = useMediaQuery(media)
      return null
    }

    const wrapper = mount(<Wrapper media={null} />)

    expect(matches).toEqual(false)

    wrapper.setProps({ media: '' })

    expect(matches).toEqual(false)
  })
})
