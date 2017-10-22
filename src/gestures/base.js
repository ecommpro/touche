import evented from 'touche/mixins/evented'

import {
  STATE_READY as READY,
  STATE_PROCESSING as PROCESSING,
  STATE_CHANGE as CHANGE,
  STATE_END as END,
  STATE_FAIL as FAIL,
} from './constants'

import {
  POINTER_START
} from 'touche/input/constants'

let _instanceId = 0;

export default Object.assign({}, evented, {
  initialize() {
    evented.initialize.call(this)
    this.instanceId = ++_instanceId
    this.reset()
    return this
  },

  state: READY,
  result: undefined,
  autoreset: true,

  doCheck(input, session) {
    this.input = input
    this.session = session

    if (this.preCheck(input, session)) {
      this.check(input, session)
      this.postCheck(input, session)
    } else {
      console.log('NOT CHECK')
    }

    return this
  },
  preCheck(input, session) {
    let 
      {state} = this,
      {isLast, isFirst} = input
    
    if (state & (PROCESSING | CHANGE | END)) {
      return true
    }

    if (state & READY && isFirst) {
      this.setState(PROCESSING)
      return true
    }

    return false
  },

  postCheck(input, session) {
    if (input.isLast && this.state & (CHANGE)) {
      this.end()
      return false
    }
  },
  check() {
  },
  reset() {
    this.setState(READY)
    this.result = undefined
    this.trigger('reset')
    return this
  },
  change(data = {}) {
    this.setState(CHANGE)
    this.setResult(data)
    this.trigger('change', data)
    return this
  },
  end() {
    console.log('END')
    this.setState(END)
    this.trigger('end')
    if (this.autoreset) {
      this.reset()
    }
    return this
  },
  fail() {
    this.setState(FAIL)
    this.trigger('fail')
    if (this.autoreset) {
      this.reset()
    }
    return this
  },
  setResult(data) {
    Object.assign(data, {
      event: this.options.event,
      gesture: this,
      input: this.input,
      session: this.session,
    })
    this.result = data
    return this
  },
  setState(state) {
    this.state = state
    return this
  },
  isProcessing() {
    return this.state & PROCESSING
  },
  isChange() {
    return this.state & CHANGE
  },
  trigger(event, data) {
    return evented.trigger.call(this, event, event, this.state, data)
  }
})