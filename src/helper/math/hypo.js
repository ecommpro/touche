export default (...args) => {
  return Math.sqrt(
    args
      .map((x) => x * x)
      .reduce((x1, x2) => x1 + x2)
  )
}