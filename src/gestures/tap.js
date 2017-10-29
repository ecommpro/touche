import base from './base'

import {
  POINTER_START as START,
  POINTER_END as END,
} from '../input/constants'

import {
  STATE_WAITING_FOR_CONDITIONS as WAITING_FOR_CONDITIONS,
} from './constants'

const defaults = {
  event: 'tap',
  pointers: 1,
  taps: 1,
  interval: 250,
  threshold: 10,
  failTimeout: 250
}

const proto = Object.assign({}, base, {defaults})

export default (options = {}) => {

  options = Object.assign({}, defaults, options)

  const
    autodetectPointers = options.pointers === 0,
    autodetectTaps = options.taps === 0,
    {event} = options

  let
    failTimeout, intervalTimeout,
    taps = 0,
    tapsGoal, pointersGoal,
    okPointers,
    checkInterval

  const gesture = Object.assign(Object.create(proto), {
    options: options,
    taps: 0,
    pointers: 0,
    check(input, session) {
      const
        self = this,
        {action} = input,
        {npointers} = session,
        {deltaX, deltaY} = input,
        {threshold} = options,
        {abs} = Math,
        okTaps = taps === tapsGoal,
        okMovement = threshold === 0 || (abs(deltaX) < threshold && abs(deltaY) < threshold)

      if (action & START && okMovement) {
        clearTimeout(failTimeout)
        failTimeout = setTimeout(() => self.fail(), options.failTimeout)

        if (!autodetectPointers && npointers > options.pointers) {
          return this.fail()
        }
        
        okPointers = npointers === pointersGoal
      }

      if (action & END && okMovement) {
        if (!autodetectPointers && !okPointers) {
          return this.fail()
        }
  
        if (autodetectPointers && !pointersGoal) {
          pointersGoal = npointers + 1
          okPointers = true
        }
  
        if (okPointers && npointers === 0) {
          if (this.state & ~WAITING_FOR_CONDITIONS) {
            taps++
          }

          okPointers = false

          clearTimeout(failTimeout)
          clearTimeout(intervalTimeout)

          if (!autodetectTaps && taps === options.taps) {
            this.start()
          } else {
            intervalTimeout = setTimeout(checkInterval, options.interval)
          }
        }
      }

      this.tryEnd()

    },
    reset() {
      clearTimeout(failTimeout)
      clearTimeout(intervalTimeout)
      taps = 0
      tapsGoal = options.taps
      pointersGoal = options.pointers
      okPointers = false
      return base.reset.call(this)
    },
    fail() {
      return base.fail.call(this)
    },
    tryEnd() {
      if (this.isStarted()) {
        this.result = {
          taps: taps,
          pointers: pointersGoal
        }
        this.emit(event)
        return this.end()
      }
    }
  })

  checkInterval = function() {
    if (autodetectTaps) {
      this.start()
      this.tryEnd()
    } else {
      this.fail()
    }
  }.bind(gesture)
  
  return gesture.initialize() 
}