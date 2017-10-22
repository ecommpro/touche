import {
  MOUSE_DEVICE,
  TOUCH_DEVICE,
  POINTER_START,
  POINTER_END
} from 'touche/input/constants'

export default function(threshold = 10, interval = 1000) {
  let touches = []

  return data => {
    let {action, pointerType} = data
    
    if (pointerType & TOUCH_DEVICE && action & (POINTER_START | POINTER_END)) {
      touches.push(data)
      setTimeout(() => {
        const index = touches.indexOf(data)
        if (index >= 0) {
          touches.splice(index, 1)
        }
      }, interval)
      return true
    }
  
    if (pointerType & MOUSE_DEVICE && action & (POINTER_START | POINTER_END)) {
      let legit = touches.every((touch) => {
        let dx = data.x - touch.x
        let dy = data.y - touch.y
        if (
          data.action === touch.action &&
          Math.abs(dx) < threshold &&
          Math.abs(dy) < threshold
        ) {
          return false
        }
        return true
      })
      return legit
    }
    return true
  }
  
}