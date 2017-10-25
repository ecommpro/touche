export default ({instanceId}) => {
  
  let gestures = []
  let callback = () => {}

  function process(input, session) {
    gestures.forEach(gesture => gesture.doCheck(input, session))
  }

  return {
    add(gesture) {
      gestures.push(
        gesture
          .onall((event, ...args) => {
            /*
            if (event === 'fail') {
              process()
            }
            */
            callback(event, ...args)
          })
      )
    },

    process(input, session) {
      process(input, session)
    },

    callback(fn) {
      callback = fn
      return this
    }
  }

}