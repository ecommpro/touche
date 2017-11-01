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
    newCenterDelta

  return {
    process(input, session) {

      recentered = false
      
      const { action } = input
      const { pointers } = session
      const now = Date.now()

      /*
      if (input.isLast) {
        return
      }*/
      
      const center = getCenter(pointers)
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

      if (input.action & ~POINTER_MOVE) {
        recenter.pointers = clonePointers(pointers)

        // TODO: use this to adjst CSS transformations
        newCenterDelta = sub2d(recenter.center, center)
        recentered = true

        //console.log(newCenterDelta)

        recenter.center = center
        recenter.distance = distance

        orig.position = global.position
        orig.scale = global.scale
        orig.rotation = global.rotation
      } else {
        const deltat = (now - global.t) || 1
        const dt = (now - last.t) || 1
        
        const deltaposition = sub2d(center, recenter.center)
  
        const deltarotation = getRotation({
          center0: recenter.center,
          pointers0: recenter.pointers,
          center,
          pointers
        })
  
        const deltascale = recenter.distance > 0 ? distance / recenter.distance : 1
  
        global.position = sum2d(orig.position, deltaposition)
        global.rotation = orig.rotation + deltarotation
        global.scale = orig.scale * deltascale
  
        global.velocity = div2d(global.position, deltat)
        global.direction = getDirection(global.position)
  
        // DERIVATIVE dt
  
        //const dposition = sub2d(center, last.center)
        
        /*
        const ddistance = hypo(dposition.x, dposition.y)
        global.distancetraveled += ddistance
        global.velocitymag = global.distancetraveled / deltat
        */
  
        //last.velocitymag = ddistance / dt
  
        //last.direction = getDirection(dposition)
  
        //last.t = now
        //last.center = center
      }

      
      let velocityMax = maxabs(global.velocity.x, global.velocity.y)
      // REVIEW THIS. WE NEED A BETTER WAY TO DO IT
      Object.assign(input, {
        centerX: center.x,
        centerY: center.y,
        deltaX: global.position.x,
        deltaY: global.position.y,
        scale: global.scale,
        rotation: radToDeg(-global.rotation),
        velocityX: global.velocity.x,
        velocityY: global.velocity.y,
        velocity: velocityMax,
        direction: global.direction
      })

      return {
        recentered,
        newCenterDelta
      }

    }
  }

}