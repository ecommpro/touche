export default pointers => {
  let x = 0, y = 0, i = 0
  pointers.forEach(pointer => {
    x += pointer.x
    y += pointer.y
    i++
  })

  return {
    x: x/i,
    y: y/i
  }
}