import {hypo, radToDeg, angRange2PI, atan2, shortAngleDist} from '../helper/math'
import {point as P, vector as V, sub2d} from '../helper/2d'
import {toArray} from 'touche/helper/toArray'
import getCenter from './getCenter'
import getRotation from './getRotation'

import {
  POINTER_START,
  POINTER_MOVE,
  POINTER_END
} from '../input/constants'

export default function(session, data) {

  let
    centerx = 0,
    centery = 0,
    npointers = 0

  let { calculations } = session

  let pointers = Object.values(session.pointers)
  npointers = pointers.length

  let center = getCenter(pointers)
  
  // if reset ...
  if (
    data.action === POINTER_START && session.npointers === 1 || 
    data.action === POINTER_END && session.npointers === 0
  ) {
    calculations.deltaangle = 0
    calculations.deltax = 0
    calculations.deltay = 0
    calculations.t0 = Date.now()
  }

  if (data.action & ~POINTER_MOVE) {
    console.log('reset center0')
    session.center0 = center
  }

  //console.log(center)
  let delta = sub2d(center, session.center0)
  
  if (npointers > 1) {
    calculateForTwoOrMorePointers()
  }

  function calculateForTwoOrMorePointers() {
    
    getRotation({center, center0: session.center0, pointers})

    /*
    pointerKeys.forEach((gid) => {
      let pointer = session.pointers[gid]
      let x = pointer.x
      let y = pointer.y
      let deltax = x - centerx
      let deltay = y - centery
      
      let angle = atan2(-deltay, deltax)
      
      pointer.angle = angle
      pointer.distance = distance

      let dangle = shortAngleDist(pointer.anglePrev, angle)
      let ddistance = distance - pointer.distancePrev

      pointer.anglePrev = pointer.angle
      pointer.distancePrev = distance
      
      dangleMean += dangle
      ddistanceMean += ddistance
    })

    ddistanceMean = ddistanceMean / npointers
    dangleMean = dangleMean / npointers
    
    calculations.deltadistance += ddistanceMean
    
    calculations.deltaangle += dangleMean
    //calculations.deltaangle = angRange2PI(calculations.deltaangle)
    calculations.deltaangleDeg = radToDeg(calculations.deltaangle)
    */
  }
  
}