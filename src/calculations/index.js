import {hypo, radToDeg, angRange2PI, atan2, shortAngleDist} from '../helper/math'
import {point as P, vector as V, sub2d, sum2d} from '../helper/2d'

import getCenter from './center'
import getDistance from './distance'
import getRotation from './rotation'

import {
  POINTER_START,
  POINTER_MOVE,
  POINTER_END
} from '../input/constants'

function clonePointers(pointers) {
  return pointers.map((p) => ({x: p.x, y: p.y}))
}

export default function(session, input) {

  let { calculations, pointers } = session
  let { action } = input

  if (input.isFirst || input.isLast) {
    calculations.delta = {x: 0, y: 0}
    
    if (typeof(calculations.scale) === 'undefined') {
      calculations.scale = 1
    }
    
    if (typeof(calculations.rotation) === 'undefined') {
      calculations.rotation = 0
    }
  }

  if (!pointers.length) {
    return
  }

  let center = getCenter(pointers)
  
  let distance = getDistance({
    center,
    pointers
  })

  if (action & ~ POINTER_MOVE) {
    calculations.pointers0 = clonePointers(pointers)
    calculations.center0 = center
    calculations.delta0 = calculations.delta
    calculations.distance0 = distance
    calculations.scale0 = calculations.scale
    calculations.rotation0 = calculations.rotation
  }

  let {center0, delta0, distance0, scale0, rotation0} = calculations

  let delta = sum2d(delta0, sub2d(center, center0))
  
  let rotation = getRotation({
    center0,
    pointers0: calculations.pointers0,
    center,
    pointers
  })

  if (distance0 > 0) {
    calculations.scale = scale0 * distance / distance0
  }
  calculations.delta = delta
  calculations.distance = distance

  calculations.rotation = rotation0 + rotation

  Object.assign(input, {
    deltaX: delta.x,
    deltaY: delta.y,
    distance,
    scale: calculations.scale,
    rotation: calculations.rotation,
    rotationDeg: radToDeg(calculations.rotation),
  })
}