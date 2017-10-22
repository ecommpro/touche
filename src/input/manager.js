import evented from 'touche/mixins/evented'
import createPointer from 'touche/pointer'
import createSession from 'touche/input/session'

import {
  POINTER_START,
  POINTER_MOVE,
  POINTER_END,
  POINTER_CANCEL,
  POINTER_SET,
} from 'touche/input/constants'

export default ({
  instanceId
}) => {
  let npointers = 0
  let inputs = []

  let sessions = {}
  let sessionHashForPointer = {}

  let getSessionHash = (input, sessions) => {
    return 0;
  }

  function getSession(hash) {
    
    if (!(hash in sessions)) {
      sessions[hash] = createSession({hash, instanceId})
    }
    return sessions[hash]
  }

  const callback = function(input) {

    let {device, action, pointerType, id, x, y, event} = input
    let pointer, session, hash

    const gid = `${id}:${pointerType}:${device}`
    
    if (action === POINTER_START) {
      hash = getSessionHash()
      sessionHashForPointer[gid] = hash
      session = getSession(hash)
    } else {
      hash = sessionHashForPointer[gid]
      session = getSession(hash)
    }

    input.isFirst = false
    input.isLast = false
    
    switch(action) {
      case POINTER_START:
        pointer = createPointer({
          x: input.x,
          y: input.y
        })

        input.talive = 0
        input.isFirst = session.npointers === 0
        
        session._pointersHash[gid] = pointer
        session.pointers.push(pointer)
        session.npointers++
        npointers++

        if (session.npointers > session.npointersMax) {
          session.npointersMax = session.npointers
        }
        break

      case POINTER_MOVE:
        pointer = session._pointersHash[gid]
        pointer.moveTo(input.x, input.y)
        input.distance = pointer.distance
        break

      case POINTER_END:
      case POINTER_CANCEL:
        pointer = session._pointersHash[gid]

        let index = session.pointers.indexOf(pointer)
        session.pointers.splice(index, 1)

        input.talive = pointer.talive()
        session.npointers--
        npointers--

        input.isLast = session.npointers === 0
        delete session._pointersHash[gid]
        break
    }

    this.trigger('input', input, session)
    
  }

  const inputManager = Object.assign({}, evented, {
    initialize() {    
      evented.initialize.call(this)
      return this
    },
    add(input) {
      inputs.push(input.callback(_callback).init())
      return this
    },
  })
  
  const _callback = callback.bind(inputManager)

  return inputManager.initialize()

}