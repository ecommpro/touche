import evented from 'touche/mixins/evented'

import {
  STATE_READY as READY,
  STATE_PROCESSING as PROCESSING,
  STATE_WAITING_FOR_CONDITIONS as WAITING_FOR_CONDITIONS,
  STATE_STARTED as STARTED,
  STATE_ENDED as ENDED,
  STATE_FAILED as FAILED,
} from './constants'

let _instanceId = 0;

export default Object.assign({}, evented, {
  state: READY,
  result: undefined,
  autoreset: true,
  conditions: [],

  initialize() {
    evented.initialize.call(this)
    this.instanceId = ++_instanceId
    this.conditions = []
    this.reset()
    return this
  },  
  doCheck(input, session) {
    input = input || this.input
    session = session || this.session

    this.input = input
    this.session = session

    if (this.state & WAITING_FOR_CONDITIONS) {
      this.start()
    }
    
    if (this.preCheck(input, session)) {
      this.check(input, session)
      this.postCheck(input, session)
    }    
    return this
  },
  preCheck(input, session) {
    let 
      {state} = this,
      {isLast, isFirst} = input
    
    if (state & (PROCESSING | STARTED | WAITING_FOR_CONDITIONS | ENDED)) {
      return true
    }

    if (state & READY && isFirst) {
      this.setState(PROCESSING)
      return true
    }

    return false
  },
  postCheck(input, session) {
    if (input.isLast && this.state & (STARTED)) {
      this.end()
      return false
    }
  },
  check() {},
  reset() {
    this.setState(READY)
    this.result = undefined
    this.trigger('reset')
    return this
  },
  start(data = {}) {
    const canStart = this.conditions.every(fn => fn())
    if (!canStart) {
      this.setState(WAITING_FOR_CONDITIONS)
    } else {
      this.setState(STARTED)
      this.trigger('start', data)
    }
    return this
  },
  end() {
    this.setState(ENDED)
    this.trigger('end')
    if (this.autoreset) {
      this.reset()
    }
    return this
  },
  fail() {
    this.setState(FAILED)
    this.trigger('fail')
    if (this.autoreset) {
      this.reset()
    }
    return this
  },
  setState(state) {
    this.state = state
    return this
  },
  isProcessing() {
    return this.state & PROCESSING
  },
  isStarted() {
    return this.state & STARTED
  },
  isFailed() {
    return this.state & FAILED
  },
  emit(event) {
    this.trigger('emit', event)
  },
  addCondition(fn) {
    this.conditions.push(fn)
  }
})