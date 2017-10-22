import base from './base'

import {
  POINTER_START as START,
  POINTER_END as END,
} from '../input/constants'

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
    autodetectTaps = options.taps === 0

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
        {npointers, calculations: { deltax, deltay }} = session,
        {threshold} = options,
        {abs} = Math,
        okTaps = taps === tapsGoal,
        okMovement = threshold === 0 || (abs(deltax) < threshold && abs(deltay) < threshold)

      if (action & START) {
        clearTimeout(failTimeout)
        failTimeout = setTimeout(() => self.fail(), options.failTimeout)

        if (!autodetectPointers && npointers > options.pointers) {          
          return this.fail()
        }
        
        okPointers = npointers === pointersGoal
      }

      if (action & END) {
        if (!autodetectPointers && !okPointers) {
          return this.fail()
        }
  
        if (autodetectPointers && !pointersGoal) {
          pointersGoal = npointers + 1
          okPointers = true
        }
  
        if (okPointers && npointers === 0) {
          taps++
          okPointers = false

          this.trigger('up', {taps})

          clearTimeout(failTimeout)
          clearTimeout(intervalTimeout)
          intervalTimeout = setTimeout(checkInterval, options.interval)

          if (!autodetectTaps && taps === options.taps) {
            this.change({
              taps: taps,
              pointers: pointersGoal
            })
            return this.end()
          }
        }
      }      
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
    }
  })

  checkInterval = function() {
    if (autodetectTaps) {
      this.change({
        taps: taps,
        pointers: pointersGoal
      })
      this.end()
    } else {
      this.fail()
    }
  }.bind(gesture)
  
  return gesture.initialize() 
}