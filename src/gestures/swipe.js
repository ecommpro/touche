import base from './base'

import {
  STATE_CHANGE as CHANGE,
} from './constants'

import {
  POINTER_END,
} from '../input/constants'

const proto = Object.assign({}, base, {
  defaults: {
    event: 'swipe',
    pointers: 1,
    threshold: 0,
    velocity: 0.3,
  }
})
  
export default (options = {}) => {

  options = Object.assign({}, proto.defaults, options)

  const attributes = {
    options,
    pointers: 0
  }

  let thresholdReached

  const methods = {
    check(input, session) {
      const
        {action} = input,
        {npointers, npointersMax} = session,
        {threshold, pointers} = options,
        {abs} = Math
      
      let
        {calculations: { deltax, deltay, velocityx, velocityy, velocity }} = session

      let
        okPointers = npointersMax >= options.pointers,
        okVelocity = velocity >= options.velocity

      thresholdReached = thresholdReached || abs(deltax) > threshold || abs(deltay) > threshold

      if (this.isProcessing() && okPointers && thresholdReached) {
        this.trigger('start')
        this.setState(CHANGE)
      }
        
      if (input.isLast) {
        if (okVelocity) {
          this.change()
        } else {
          this.fail()
        }
      }
    },
    reset() {
      thresholdReached = options.threshold === 0
      return proto.reset.call(this)
    }    
  }

  return Object.assign(Object.create(proto), attributes, methods).initialize()
  
}