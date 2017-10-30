export default ({instanceId}) => {
  
  let gestures = []
  let callback = () => {}

  function process(input, session, calculator) {
    gestures.forEach(gesture => gesture.doCheck(input, session, calculator))
  }

  return {
    add(gesture) {
      gestures.push(
        gesture
          .onall((event, ...args) => {
            //console.log(event, args)
            /*
            if (event === 'fail') {
              process()
            }
            */
            callback(event, ...args)
          })
      )
    },

    process(input, session, calculator) {
      process(input, session, calculator)
    },

    callback(fn) {
      callback = fn
      return this
    }
  }

}