import evented from 'touche/mixins/evented'
import calculations from 'touche/calculations'

import createGestureManager from 'touche/gestures/manager'
import createInputManager from 'touche/input/manager'

import {
  POINTER_START,
  POINTER_MOVE,
  POINTER_END,
  POINTER_CANCEL,
} from 'touche/input/constants'

let _instanceId = 0;

export default () => {
  let instanceId = _instanceId++

  let callback = () => {}

  function emit(data, event, state) {
    if (event === 'change') {
      if (data && 'event' in data) {
        this.trigger(data.event, data)
      }
    } else {
      this.trigger(event, data)
    }
  }

  let _emit = emit

  const
    gestureManager = createGestureManager({instanceId})
      .callback((data, event, state) => {
        callback(data, event, state)
        _emit(data, event, state)
      })
  
  const inputManager = createInputManager({
    instanceId
  }).on('input', (input, session) => {
    if (input.action & (POINTER_END | POINTER_CANCEL)) {
      gestureManager.process(input, session)
      _emit(null, 'input')
      calculations(session, input)
    } else {
      calculations(session, input)
      _emit(null, 'input')
      gestureManager.process(input, session)
    }
  })

  const manager = Object.assign({}, evented, {
    hash(fn) {
      return this
    },
    addGesture(gesture) {
      gestureManager.add(gesture)
      return this
    },
    addInput(input) {
      inputManager.add(input)
      return this
    },
    
    callback(fn) {
      callback = fn
      return this
    }
  }).initialize()

  _emit = emit.bind(manager)

  return manager

}