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
  doCheck(input, session, calculator) {
    input = input || this.input
    session = session || this.session
    calculator = calculator || this.calculator

    this.input = input
    this.session = session
    this.calculator = calculator

    if (this.state & WAITING_FOR_CONDITIONS) {
      this.start()
    }
    
    if (this.preCheck(input, session, calculator)) {
      this.check(input, session, calculator)
      this.postCheck(input, session, calculator)
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

    //console.log(this.options.event, 'canStart', canStart)
    
    if (!canStart) {
      this.setState(WAITING_FOR_CONDITIONS)
    } else {
      this.setState(STARTED)
      this.trigger('start', data)
    }
    return this
  },
  end() {
    //console.log(this.options.event, 'END')
    this.setState(ENDED)
    this.trigger('end')
    if (this.autoreset) {
      this.reset()
    }
    return this
  },
  fail() {
    //console.log(this.options.event, 'FAIL')
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
    this.trigger('emit', event, this.result, this.input, this.session, this.calculator)
  },
  addCondition(fn) {
    this.conditions.push(fn)
  }
})