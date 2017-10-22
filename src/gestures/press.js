import base from './base'

import {
  POINTER_START as START,
  POINTER_END as END,
} from '../input/constants'

const proto = Object.assign({}, base, {
  defaults: {
    event: 'press',
    pointers: 1,
    time: 250,
    threshold: 10,
  }
})

export default (options = {}) => {
  
  options = Object.assign({}, proto.defaults, options)
  
  const
    autodetectPointers = options.pointers === 0

  let
    timeout,
    timedout,
    pointersGoal,
    ok,
    okPointers

  const gesture = Object.assign(Object.create(proto), {
    options: options,
    pointers: 0,    
    check(input, session) {
      const
        self = this,
        {action} = input,
        {npointers, calculations: { deltax, deltay }} = session,
        {threshold} = options,
        {abs} = Math,        
        okMovement = threshold === 0 || (abs(deltax) < threshold && abs(deltay) < threshold)
      
      if (action & START) {
        timedout = false
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          timedout = true
          if (okPointers) {
            this.change({
              pointers: pointersGoal
            })
            this.end()
          } else {
            this.fail()
          }
        }, options.time)

        if (!autodetectPointers && npointers > options.pointers) {
          return this.fail()
        }

        okPointers = npointers === pointersGoal
      }

      if (action & END) {
        if (!timedout || !autodetectPointers && !okPointers) {
          clearTimeout(timeout)
          return this.fail()
        }  
      }      
    },
    reset() {
      clearTimeout(timeout)
      okPointers = false
      pointersGoal = options.pointers
      return proto.reset.call(this)
    },
    fail() {
      return proto.fail.call(this)
    }
  })

  return gesture.initialize()
}