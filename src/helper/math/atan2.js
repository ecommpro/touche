import {PI2} from './constants'

export default (deltay, deltax) => {
  let angle = 0
  if (deltay || deltax) {
    angle = Math.atan2(-deltay, deltax)
    if (angle < 0) {
      angle += PI2
    }
  }
  return angle
}