import {addEventListener, removeEventListener, stopEvent} from 'touche/helper/dom'
import baseInput from '../base'

import {
  POINTER_START,
  POINTER_END,
  POINTER_CANCEL,  
} from '../constants'

export default function({
  el,
  callback
}) {
  let npointers = 0
  let ownPointers = {}

  const base = baseInput({callback})

  return Object.assign(Object.create(base), {
    element: el,
    elementEvent: undefined,
    windowEvent: undefined,

    handle(data) {
      let {action, id, pointerType, device} = data
      const gid = `${id}:${pointerType}:${device}`

      if (action & POINTER_START) {
        ownPointers[gid] = true
        if (npointers <= 0) {
          this.attachToWindow()
        }
        npointers++
      } else if (action & (POINTER_END | POINTER_CANCEL)) {

        if (gid in ownPointers) {
          npointers--
          if (npointers <= 0) {
            this.detachFromWindow()
          }
          delete ownPointers[gid]
        }

      }
      return base.handle.call(this, data)
    },
    attach() {
      this.attachToElement()
      this.attachToWindow()
      return this
    },  
    detach() {
      this.detachFromElement()
      this.detachFromWindow()
      return this
    },  
    attachToElement() {
      this.elementEvent && addEventListener(this.element, this.elementEvent, this._handler)
      return this
    },
    attachToWindow() {
      this.windowEvent && addEventListener(window, this.windowEvent, this._handler)
      return this
    },
    detachFromElement() {
      this.elementEvent && removeEventListener(this.element, this.elementEvent, _this.handler)
      return this
    },
    detachFromWindow() {
      this.windowEvent && removeEventListener(window, this.windowEvent, this._handler)
      return this
    }  
  })

}