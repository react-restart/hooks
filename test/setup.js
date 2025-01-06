import matchMediaPolyfill from 'mq-polyfill'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(cleanup)

// https://github.com/bigslycat/mq-polyfill

if (typeof window !== 'undefined') {
  matchMediaPolyfill(window)

  /**
   * For dispatching resize event
   * we must implement window.resizeTo in jsdom
   */
  window.resizeTo = function resizeTo(width, height) {
    Object.assign(this, {
      innerWidth: width,
      innerHeight: height,
      outerWidth: width,
      outerHeight: height,
    }).dispatchEvent(new this.Event('resize'))
  }
}
