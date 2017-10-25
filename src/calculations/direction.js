import {
  DIR_LEFT,
  DIR_RIGHT,
  DIR_UP,
  DIR_DOWN,
} from '../input/constants'

export default (point) => {
  let 
    {x, y} = point,
    { abs } = Math

  if (abs(y) > abs(x)) {
    if (y > 0) {
      return DIR_DOWN
    } else {
      return DIR_UP
    }
  } else {
    if (x > 0) {
      return DIR_RIGHT
    } else {
      return DIR_LEFT
    }
  }
}
