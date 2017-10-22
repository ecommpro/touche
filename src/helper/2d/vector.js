const vector = (x, y) => ({x, y})

Object.assign(vector, {
  fromTwoPoints(p, q) {
    return vector(q.x - p.x, q.y - p.y)
  }
})

export default vector