export default (angles) => {
  let sin = 0, cos = 0
  angles.forEach(angle => {
    sin += Math.sin(angle)
    cos += Math.cos(angle)
  })
  return Math.atan2(sin, cos)
}
