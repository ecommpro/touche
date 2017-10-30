import base from './base'

import {
  STATE_STARTED as STARTED,
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
    direction: 0,
  }
})
  
export default (options = {}) => {

  options = Object.assign({}, proto.defaults, options)

  const attributes = {
    options,
    pointers: 0
  },
  {event} = options

  let thresholdReached

  const methods = {
    check(input, session) {
      const
        {action} = input,
        {npointers, npointersMax} = session,
        {threshold, pointers} = options,
        {abs} = Math
      
      let
        { deltaX, deltaY, velocity, velocityX, velocityY, direction } = input

      let
        okPointers = npointersMax >= options.pointers,
        okVelocity = abs(velocity) >= options.velocity

      thresholdReached = thresholdReached || abs(deltaX) > threshold || abs(deltaY) > threshold

      if (input.isLast && okPointers && thresholdReached) {
        if (okVelocity) {
          this.emit(`${event}`)
          this.emit(`${event}${direction}`)
          this.end()
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