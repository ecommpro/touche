import toArray from '../../helper/toArray'
import baseInput from './base'

import {
  TOUCH_DEVICE,
  EVENT_MAP
} from '../constants'

export default function(el, callback) {

  return Object.assign(Object.create(baseInput(el, callback)), {
    inputType: TOUCH_DEVICE,
    elementEvent: 'touchstart',
    windowEvent: 'touchmove touchend touchcancel',
    
    handler(ev) {
      toArray(ev.changedTouches).forEach((touch) => {
        if (typeof touch.identifier !== 'undefined') {
          this.handle({
            action: EVENT_MAP[ev.type],
            pointerType: TOUCH_DEVICE,
            id: touch.identifier,
            x: touch.clientX,
            y: touch.clientY,
          })          
        }
      })
    }
  })
}
