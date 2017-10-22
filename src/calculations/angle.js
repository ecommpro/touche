import {radToDeg, angRange2PI, atan2, shortAngleDist} from '../helper/math'
import {point as P, vector as V} from '../helper/2d'

export default {
  _origin: P(0, 0),
  npoints: 0,
  
  angle: 0,
  dangleMean: 0,
  
  reset() {
    this._origin = P(0, 0)
  },
  origin(point) {
    this._origin = point
  },
  add(point) {
    const delta = V.fromTwoPoints(this._origin, point)
    let angle = atan2(-delta.y, delta.x)
    console.log(delta)
  }
}