import base from './base'

import {
  POINTER_START,
  POINTER_MOVE,
  POINTER_END,
} from '../input/constants'

const proto = Object.assign({}, base, {
  defaults: {
    event: 'pinch',
    pointers: 2,
    threshold: 0,
  }
})

const
  WAITING_FOR_THRESHOLD = 'waiting-for-threshold',
  SCALING = 'SCALING'
  
export default (options = {}) => {

  return Object.assign(Object.create(proto), {
    options: Object.assign({}, proto.defaults, options),
    pointers: 0,
    
    check(session, data) {
      let {action} = data
      let {npointers} = session
      
      switch(action) {
        case POINTER_START:
          if (!this.state) {
            this.setState(WAITING_FOR_THRESHOLD)
          }

          if (npointers === this.options.pointers) {
            if (this.state === WAITING_FOR_THRESHOLD && !this.options.threshold) {
              this.setState(SCALING)
            }
          }
          break
        
        case POINTER_MOVE:
          if (this.state === WAITING_FOR_THRESHOLD) {
            let distance = session.calculations.deltadistance
            if (Math.abs(distance) >= this.options.threshold) {
              this.setState(SCALING)
              session.calculations.deltadistance = 0
            }
          }

          if (this.state === SCALING) {
            this.ok({
              distance: session.calculations.deltadistance
            })
          }          
          break

        case POINTER_END:
          if (npointers !== this.options.pointers) {
            this.setState(WAITING_FOR_THRESHOLD)
          }
          break
      }
    },
    reset() {
      this.pointers = this.options.pointers
      proto.reset.call(this)
      return this
    }
  })
  
}