import {hypo, radToDeg, maxabs} from '../helper/math'
import {sub2d, sum2d, div2d} from '../helper/2d'

import getCenter from './center'
import getDirection from './direction'
import getDistance from './distance'
import getRotation from './rotation'

import {
  POINTER_MOVE,
} from '../input/constants'

function clonePointers(pointers) {
  return pointers.map((p) => ({x: p.x, y: p.y}))
}

export default () => {
  
  const initialValues = {
    position: {x: 0, y: 0},
    scale: 1,
    rotation: 0,
    distancetraveled: 0,
    velocity: {x: 0, y: 0}
  }

  let
    global = {},
    orig = {},
    recenter = {},
    last = {},
    recentered,
    center = {x: 0, y: 0}

  return {
    process(input, session) {

      recentered = false
      
      const { action } = input
      const { pointers } = session
      const now = Date.now()
      
      center = getCenter(pointers)
      
      const distance = getDistance({
        center,
        pointers
      })

      if (input.isFirst) {
        Object.assign(global, {}, initialValues)
        global.t = now
        last.t = now
        last.center = center
        recenter.center = center
      }

      let deltaposition;
      let deltarotation;
      let deltascale;

      if (input.action & ~POINTER_MOVE) {
        recenter.pointers = clonePointers(pointers)
        recentered = true

        recenter.center = center
        recenter.distance = distance

        orig.position = global.position
        orig.scale = global.scale
        orig.rotation = global.rotation

        deltaposition = [0, 0]
        deltarotation = 0
        deltascale = 1

      } else {
        const deltat = (now - global.t) || 1
        const dt = (now - last.t) || 1
        
        deltaposition = sub2d(center, recenter.center)  
        
        deltarotation = getRotation({
          center0: recenter.center,
          pointers0: recenter.pointers,
          center,
          pointers
        })

        deltascale = recenter.distance > 0 ? distance / recenter.distance : 1
  
        global.position = sum2d(orig.position, deltaposition)
        global.rotation = orig.rotation - deltarotation
        global.scale = orig.scale * deltascale
  
        global.velocity = div2d(global.position, deltat)
        global.direction = getDirection(global.position)
      }

      let velocityMax = maxabs(global.velocity.x, global.velocity.y)
      
      // REVIEW THIS. WE NEED A BETTER WAY TO DO IT
      Object.assign(input, {
        centerX: center.x,
        centerY: center.y,
        deltaX: global.position.x,
        deltaY: global.position.y,
        scale: global.scale,
        rotationRad: global.rotation,
        rotation: radToDeg(global.rotation),
        velocityX: global.velocity.x,
        velocityY: global.velocity.y,
        velocity: velocityMax,
        direction: global.direction,
        deltaPosition: deltaposition,
        deltaScale: deltascale,
        deltaRotation: deltarotation,
        distance: distance - recenter.distance
      })

      return {
        recentered,
        center
      }

    }
  }

}