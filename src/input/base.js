import {stopEvent} from 'touche/helper/dom'

import {
  POINTER_START,
  POINTER_MOVE,
  POINTER_END,
  POINTER_CANCEL,
} from 'touche/input/constants'

export default function({callback = () => {}}) {

  let ownPointers = {}
  let lastx, lasty;

  return {
    inputType: undefined,
    init() {
      this._handler = this._handler.bind(this)
      return this
    },
    _handler(ev) {
      this.ev = ev
      this.handler(ev)
    },
    handle(inputData) {

      // TODO: BACK TO THIS
      /*
      if (inputData.action & POINTER_MOVE && lastx === x && lasty === y) {
        return false
      }
      */

      Object.assign(inputData, {
        device: this.inputType,
        srcEvent: this.ev,
        target: this.ev.target,
        stopEvent() {
          if (this.srcEvent) {
            stopEvent(this.srcEvent)
          }
        }
      })

      let {device, action, pointerType, id, x, y, event} = inputData
      const pid = '' + id

      if (action & POINTER_START) {        
        ownPointers[pid] = true
      } else if (!(pid in ownPointers)) {
        return false
      } else if (action & (POINTER_END | POINTER_CANCEL)) {
        delete ownPointers[pid]
      }

      lastx = x
      lasty = y

      callback(inputData)
      
      return true
    },
    callback(fn) {
      callback = fn
      return this
    }
  
  }
}