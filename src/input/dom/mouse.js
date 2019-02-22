import baseInput from './base'

import {
  MOUSE_DEVICE,
  MOUSE_POINTER_ID,
  EVENT_MAP
} from 'touche/input/constants'

export default (el, callback) => {

  return Object.assign(Object.create(baseInput(el, callback)), {
    inputType: MOUSE_DEVICE,
    elementEvent: 'mousedown',
    windowEvent: 'mousemove mouseup mousecancel',
    
    handler(ev) {
      this.handle({
        action: EVENT_MAP[ev.type],
        pointerType: MOUSE_DEVICE,
        id: MOUSE_POINTER_ID,
        x: ev.clientX,
        y: ev.clientY,
        buttons: ev.buttons
      })
    }
  })
  
}
