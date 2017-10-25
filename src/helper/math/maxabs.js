export default (...args) => {
  const
    abs = args.map(Math.abs),
    max = Math.max.apply(null, abs),
    i = abs.indexOf(max)
  
    return args[i]
  //Math.max.apply(null, args.map(Math.abs));
}