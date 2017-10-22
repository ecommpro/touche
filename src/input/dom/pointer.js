import baseInput from './base'

import {
  POINTER_DEVICE,
  EVENT_MAP
} from '../constants'

let isMS = window.MSPointerEvent && !window.PointerEvent

let elementEvent = isMS ? 'MSPointerDown' : 'pointerdown'
let windowEvent = isMS ? 
  'MSPointerMove MSPointerUp MSPointerCancel'
  :
  'pointermove pointerup pointercancel'

export default function(...args) {

  const base = baseInput(...args)

  return Object.assign(Object.create(base), {
    inputType: POINTER_DEVICE,
    elementEvent: elementEvent,
    windowEvent: windowEvent,

    handler(ev) {
      this.handle({
        action: EVENT_MAP[ev.type],
        pointerType: ev.pointerType,
        id: ev.pointerId,
        x: ev.clientX,
        y: ev.clientY
      })
    }

  })
}
