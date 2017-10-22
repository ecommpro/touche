export default function({
  hash,
  instanceId
}) {
  
  return {
    pointers: [],
    _pointersHash: {},
    npointers: 0,
    npointersMax: 0,
    calculations: {
      deltadistance: 0,
      deltaangle: 0,
      deltaangleDeg: 0,
      deltax: 0,
      deltay: 0,
      t0: Date.now(),
      velocityx: 0,
      velocityy: 0,
      velocity: 0,
    },
    hash: hash,
    instanceId: instanceId,



  }

}