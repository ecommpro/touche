import base from './base'

import {
  STATE_CHANGE as CHANGE,
} from './constants'

const proto = Object.assign({}, base, {
  defaults: {
    event: 'pinch',
    pointers: 2,
    threshold: 0,
  }
})
  
export default (options = {}) => {

  options = Object.assign({}, proto.defaults, options)

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
        {calculations: { deltadistance }} = session

      let
        okPointers = pointers === 0 || npointers === pointers
      
      thresholdReached = thresholdReached || abs(deltadistance) >= threshold

      if (this.isProcessing() && okPointers && thresholdReached) {
        this.trigger('start')
        this.setState(CHANGE)
        session.deltadistance = deltadistance = 0
      }
      
      if (this.isChange()) {
        this.change({
          pointers: npointers,
          distance: deltadistance,
        })
      }      
    }
  }).initialize()
  
}