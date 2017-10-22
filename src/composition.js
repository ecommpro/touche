const withConstructor = constructor => o => {
  const proto = Object.assign({},
    Object.getPrototypeOf(o),
    { constructor }
  )
  return Object.assign(Object.create(proto), o)
}

const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x)

export {
  withConstructor,
  pipe
}
 