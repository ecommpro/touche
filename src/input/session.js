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
    },
    hash: hash,
    instanceId: instanceId,
  }

}