import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import matchMediaPolyfill from 'mq-polyfill'

Enzyme.configure({ adapter: new Adapter() })

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

let expectedErrors = 0
let actualErrors = 0
function onError(e) {
  if (expectedErrors) {
    e.preventDefault()
  }
  actualErrors += 1
}

expect.errors = num => {
  expectedErrors = num
}

beforeEach(() => {
  expectedErrors = 0
  actualErrors = 0
  if (typeof window !== 'undefined') {
    window.addEventListener('error', onError)
  }
})

afterEach(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('error', onError)
  }
  if (expectedErrors) {
    expect(actualErrors).toBe(expectedErrors)
  }

  expectedErrors = 0
})
