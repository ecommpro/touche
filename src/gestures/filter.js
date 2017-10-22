import {
  STATE_READY as READY,
  STATE_PROCESSING as PROCESSING,
  STATE_CHANGE as CHANGE,
  STATE_OK as OK,
  STATE_END as END,
  STATE_FAIL as FAIL,
} from './constants'

import lastSuccessful from './filters/lastSuccessful'

export default (gestures) => {

  let
    gesturesByInstanceId = {},
    queue = [],
    states = {},
    handlers = {},
    filter = () => {}

  const
    ngestures = gestures.length

  function addGesture(gesture) {
    let {instanceId} = gesture
    gesturesByInstanceId[instanceId] = gesture

    gesture.addDelegate(function(context, event, handler, ...args) {
      let {instanceId, state} = context

      console.log(event, args)

      if (!(state & (CHANGE | END | FAIL))) {
        return
      }

      states[instanceId] = state

      console.log(states)

      let index = queue.indexOf(instanceId)
      if (index > -1) {
        queue.splice(index, 1)
      }

      if (state & (CHANGE | END)) {
        if (state & CHANGE) {
          handlers[instanceId] = {
            handler,
            context,
            args
          }
        }

        queue.unshift(instanceId)
      } else if (state & FAIL) {
        delete handlers[instanceId]
        queue.push(instanceId)
      }
      
      if (!filter({
        gestures,
        ngestures,
        context,
        queue,
        states,
        gesturesByInstanceId,
        handlers
      })) {
        handler.call(context, ...args)
      }
    })
  }

  gestures.forEach((gesture) => {
    addGesture(gesture)
  })

  return {
    lastSuccessful() {
      filter = lastSuccessful
      return this
    },
    addGesture(gesture) {
      addGesture(gesture)
      return this
    }
  }

}
