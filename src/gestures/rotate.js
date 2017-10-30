import base from './base'

import {
  STATE_PROCESSING as PROCESSING,
  STATE_STARTED as STARTED,
} from './constants'

const proto = Object.assign({}, base, {
  defaults: {
    event: 'rotate',
    pointers: 2,
    threshold: 0,
  }
})

import {
  POINTER_MOVE,
} from '../input/constants'

  
export default (options = {}) => {

  options = Object.assign({}, proto.defaults, options)

  const {event} = options

  let thresholdReached

  return Object.assign(Object.create(proto), {
    options: options,
    pointers: 0,
    
    check(input, session) {
      const
        {npointers} = session,
        {threshold, pointers} = options,
        {abs} = Math

      let
        {rotation} = input

      let
        okPointers = pointers === 0 || npointers === pointers
      
      thresholdReached = thresholdReached || abs(rotation) >= threshold

      if (this.isProcessing() && okPointers && thresholdReached) {
        this.start()
        this.emit(`${event}start`)
      }
      
      if (input.action & POINTER_MOVE && this.isStarted()) {
        this.emit(`${event}move`)
      }

      if (this.isStarted() && input.isLast) {
        this.emit(`${event}end`)
      }
    }
  }).initialize()
  
}