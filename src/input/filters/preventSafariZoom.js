import {
  POINTER_DEVICE,
  TOUCH_DEVICE,
  POINTER_START,
  POINTER_MOVE,
  POINTER_END
} from '../constants'

export default function(interval = 300) {
  
  let totalTouches = 0
  let doubleTouches = 0
  let timeout

  return input => {
    let {action, pointerType, event} = input
    
    if (action & POINTER_START) {
      doubleTouches++
      totalTouches++

      if (doubleTouches > 1) {
        input.stopEvent()
      }
      
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        doubleTouches = 0
      }, interval)
    } else if (action & POINTER_END) {
      totalTouches--
    }

    if (action & POINTER_MOVE && event.scale && event.scale !== 1) {
      input.stopEvent()
    }

    return true
  }
  
}