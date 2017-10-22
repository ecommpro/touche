import base from './base'

import {
  STATE_CHANGE as CHANGE,
} from './constants'

const proto = Object.assign({}, base, {
  defaults: {
    event: 'pan',
    pointers: 1,
    threshold: 0,
  }
})
  
export default (options = {}) => {

  options = Object.assign({}, proto.defaults, options)
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
        this.trigger('start')
        this.setState(CHANGE)
        session.calculations.deltax = deltax = 0
        session.calculations.deltay = deltay = 0
      }

      if (this.isChange()) {
        this.change({
          pointers: npointers,
          x: deltax,
          y: deltay
        })
      }
    },
    reset() {
      thresholdReached = options.threshold === 0
      return proto.reset.call(this)
    }
  }).initialize()
  
}