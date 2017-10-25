import base from './base'

import {
  STATE_STARTED as STARTED,
} from './constants'

const proto = Object.assign({}, base, {
  defaults: {
    event: 'pan',
    pointers: 1,
    threshold: 0,
    direction: 0,
  }
})

import {
  POINTER_MOVE,
} from '../input/constants'


export default (options = {}) => {

  options = Object.assign({}, proto.defaults, options)

  const {event} = options
  
  let dirx, diry
  let thresholdReached

  return Object.assign(Object.create(proto), {
    options: options,
    pointers: 0,
    
    check(input, session) {
      const
        {state} = this,
        {action} = input,
        {npointers} = session,
        {threshold, pointers} = options,
        {abs} = Math
      
      let
        {calculations: { deltax, deltay }} = session

      let
        okPointers = pointers === 0 || npointers === pointers

      thresholdReached = thresholdReached || abs(deltax) > threshold || abs(deltay) > threshold

      if (this.isProcessing() && okPointers && thresholdReached) {
        this.emit(`${event}start`)
        this.start()
      }

      if (input.action & POINTER_MOVE && this.isStarted()) {
        this.emit(`${event}move`)
        /*
        this.change({
          pointers: npointers,
          x: deltax,
          y: deltay
        })
        */
      }

      if (this.state & STARTED && input.isLast) {
        this.emit(`${event}end`)
      }
    },
    reset() {
      thresholdReached = options.threshold === 0
      return proto.reset.call(this)
    }
  }).initialize()
  
}