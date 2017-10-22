import {hypo, radToDeg, angRange2PI, atan2, shortAngleDist} from '../helper/math'
import {point as P} from '../helper/2d'

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

  // if reset ...
  if (
    data.action === POINTER_START && session.npointers === 1 || 
    data.action === POINTER_END && session.npointers === 0
  ) {
    calculations.deltadistance = 0
    calculations.deltaangle = 0
    calculations.deltaangleDeg = 0
    calculations.deltax = 0
    calculations.deltay = 0
    calculations.t0 = Date.now()
    calculations.velocityx = 0
    calculations.velocityy = 0
    calculations.velocity = 0
  }
  
  let pointerKeys = Object.keys(session.pointers)
  pointerKeys.forEach((gid) => {
    let pointer = session.pointers[gid]
    let {x, y, x0, y0} = pointer
    centerx += x
    centery += y
    pointer.deltax = x - x0
    pointer.deltay = y - y0
    npointers++
  })

  //if (!npointers) return

  if (npointers > 0) {
    centerx = centerx / npointers
    centery = centery / npointers
  }
  
  if (data.action !== POINTER_MOVE) {
    calculations.centerxPrev = centerx
    calculations.centeryPrev = centery
  }
  
  calculations.centerx = centerx
  calculations.centery = centery
  

  calculations.dx = calculations.centerx - calculations.centerxPrev
  calculations.dy = calculations.centery - calculations.centeryPrev

  calculations.deltax += calculations.dx
  calculations.deltay += calculations.dy

  calculations.deltax = Math.floor(calculations.deltax)
  calculations.deltay = Math.floor(calculations.deltay)
  calculations.deltaposition = hypo(calculations.deltax, calculations.deltay)

  calculations.centerxPrev = calculations.centerx
  calculations.centeryPrev = calculations.centery

  let deltat = Date.now() - calculations.t0
  if (deltat < 1) {
    deltat = 1
  }

  calculations.velocityx = calculations.deltax / deltat
  calculations.velocityy = calculations.deltay / deltat
  calculations.velocity = calculations.deltaposition / deltat
  
  if (npointers > 1) {
    calculateForTwoOrMorePointers()
  }

  function calculateForTwoOrMorePointers() {

    let ddistanceMean = 0
    let dangleMean = 0

    pointerKeys.forEach((gid) => {
      let pointer = session.pointers[gid]
      let x = pointer.x
      let y = pointer.y
      let deltax = x - centerx
      let deltay = y - centery
      
      let distance = hypo(deltax, deltay)
      let angle = atan2(-deltay, deltax)

      
      if (data.action !== POINTER_MOVE) {        
        pointer.anglePrev = angle
        pointer.distancePrev = distance
      }
      
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
  }
  
}